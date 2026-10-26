import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Maximize2,
  Minimize2,
  Send,
  Paperclip,
  BookOpen,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Plus
} from 'lucide-react';
import { ChatMessage } from '../chat/ChatMessage';
import { RESPONSE_FORMATS, STARTER_PROMPTS, streamAIResponse, synthesizeAcademicResponse, generateSuggestedFollowUps } from '../../utils/aiEngine';

export const AssistantSlideDrawer = () => {
  const {
    isAssistantDrawerOpen,
    setIsAssistantDrawerOpen,
    activeThreadId,
    setActiveThreadId,
    chatThreads,
    createNewThread,
    addMessageToThread,
    updateMessageInThread,
    documents,
    user,
    geminiApiKey,
    navigate
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const activeThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0] || null;

  const [scope, setScope] = useState(activeThread?.scope || 'universal');
  const [format, setFormat] = useState(activeThread?.format || 'Standard Assistant');

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Synchronize activeThreadId if drawer opens on an initial thread
  useEffect(() => {
    if (activeThread && activeThreadId !== activeThread.id && setActiveThreadId) {
      setActiveThreadId(activeThread.id);
    }
  }, [activeThread, activeThreadId, setActiveThreadId]);

  useEffect(() => {
    if (isAssistantDrawerOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAssistantDrawerOpen, activeThread?.messages, isGenerating]);

  if (!isAssistantDrawerOpen) return null;

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async (customQuery = null, customFormat = null) => {
    const rawQuery = typeof customQuery === 'string' ? customQuery : inputText;
    if (!rawQuery || typeof rawQuery !== 'string' || !rawQuery.trim() || isGenerating) return;

    const queryToSend = rawQuery.trim();
    const currentFormat = customFormat || format;
    const currentScope = scope;
    const attachedDocs = currentScope === 'grounded' ? documents.slice(0, 2) : [];

    // Clear input immediately for instantaneous responsiveness
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsGenerating(true);

    let targetThreadId = activeThread ? activeThread.id : activeThreadId;
    if (!targetThreadId) {
      const fresh = createNewThread(queryToSend.slice(0, 36), currentScope, [], currentFormat);
      targetThreadId = fresh.id;
    }

    // Capture conversation history before appending the current turn
    const conversationHistory = activeThread?.messages ? [...activeThread.messages] : [];

    const userMessage = {
      id: `msg-drawer-${Date.now()}`,
      role: 'user',
      content: queryToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: attachedDocs.map(d => d.name)
    };

    const assistantMsgId = `msg-drawer-ai-${Date.now()}`;
    const initialAssistantMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      format: currentFormat,
      sources: attachedDocs.map(d => `${d.name}, Unit: ${d.unit}`)
    };

    try {
      addMessageToThread(targetThreadId, userMessage);
      addMessageToThread(targetThreadId, initialAssistantMessage);

      const finalResponse = await streamAIResponse({
        query: queryToSend,
        history: conversationHistory,
        scope: currentScope,
        attachedDocs,
        format: currentFormat,
        examPattern: user.examPattern || 'Standard Marking Scheme',
        apiKey: geminiApiKey,
        onChunk: (accumulated) => {
          updateMessageInThread(targetThreadId, assistantMsgId, {
            content: accumulated,
            isStreaming: true
          });
        }
      });

      const followUps = generateSuggestedFollowUps(queryToSend, finalResponse);

      updateMessageInThread(targetThreadId, assistantMsgId, {
        content: finalResponse,
        isStreaming: false,
        suggestedFollowUps: followUps
      });
    } catch (err) {
      console.error("AI Error:", err);
      const fallbackResponse = synthesizeAcademicResponse({
        query: queryToSend,
        history: conversationHistory,
        scope: currentScope,
        attachedDocs,
        format: currentFormat,
        examPattern: user.examPattern || 'Standard Marking Scheme'
      });
      const followUps = generateSuggestedFollowUps(queryToSend, fallbackResponse);
      updateMessageInThread(targetThreadId, assistantMsgId, {
        content: fallbackResponse,
        isStreaming: false,
        suggestedFollowUps: followUps
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CampusAI Quick Assistant"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(21, 21, 21, 0.45)',
        backdropFilter: 'blur(2px)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={() => setIsAssistantDrawerOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: isExpanded ? '780px' : '520px',
          height: '100%',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '2px solid var(--ink-primary)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          transition: 'max-width 0.2s ease',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <header
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: 'var(--ink-primary)',
                color: 'var(--brand-coral)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <BookOpen size={16} strokeWidth={2.4} aria-hidden="true" />
            </div>
            <div>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                Campus<span style={{ color: 'var(--brand-coral)' }}>AI</span> Quick-Ask
              </span>
              <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
                Shortcut: Ctrl+J • Side Panel
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {/* New Chat Button */}
            <button
              onClick={() => createNewThread()}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
              title="Start New Thread"
            >
              <Plus size={13} />
              <span>New</span>
            </button>

            {/* Expand / Minimize Width */}
            <button
              onClick={() => setIsExpanded(prev => !prev)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.35rem 0.5rem' }}
              title={isExpanded ? "Collapse Width" : "Expand Width"}
              aria-label={isExpanded ? "Collapse Width" : "Expand Width"}
            >
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Go to Full Screen Route */}
            <button
              onClick={() => {
                setIsAssistantDrawerOpen(false);
                navigate('/dashboard/chat');
              }}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.35rem 0.5rem' }}
              title="Open in Full Workspace (/dashboard/chat)"
              aria-label="Open Full Workspace"
            >
              <ExternalLink size={14} />
            </button>

            {/* Close Drawer */}
            <button
              onClick={() => setIsAssistantDrawerOpen(false)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.35rem 0.5rem' }}
              aria-label="Close Assistant Drawer"
            >
              <X size={16} />
            </button>
          </div>
        </header>

        {/* Scope & Format Sub-header */}
        <div
          style={{
            padding: '0.5rem 1.25rem',
            backgroundColor: 'var(--bg-muted)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'var(--bg-surface)', padding: '0.15rem', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setScope('universal')}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.72rem',
                fontWeight: scope === 'universal' ? 700 : 500,
                borderRadius: 'var(--radius-btn)',
                backgroundColor: scope === 'universal' ? 'var(--ink-primary)' : 'transparent',
                color: scope === 'universal' ? 'var(--ink-inverse)' : 'var(--ink-secondary)'
              }}
            >
              Universal
            </button>
            <button
              onClick={() => setScope('grounded')}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.72rem',
                fontWeight: scope === 'grounded' ? 700 : 500,
                borderRadius: 'var(--radius-btn)',
                backgroundColor: scope === 'grounded' ? 'var(--ink-primary)' : 'transparent',
                color: scope === 'grounded' ? 'var(--ink-inverse)' : 'var(--ink-secondary)'
              }}
            >
              My Uploads
            </button>
          </div>

          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.72rem',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--ink-primary)',
              maxWidth: '240px'
            }}
            aria-label="Response Format"
          >
            {RESPONSE_FORMATS.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Message Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
          {!activeThread || activeThread.messages.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', padding: '1rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--ink-primary)',
                  color: 'var(--brand-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}
              >
                <Sparkles size={22} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Ask CampusAI Instantly
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
                Study assistant available right alongside your active summaries, quizzes, and revision tasks.
              </p>

              {/* Starter cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                {STARTER_PROMPTS.slice(0, 3).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setFormat(prompt.format);
                      handleSendMessage(prompt.query, prompt.format);
                    }}
                    className="card"
                    style={{ padding: '0.75rem', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <strong style={{ display: 'block', color: 'var(--ink-primary)', marginBottom: '0.2rem' }}>
                      {prompt.title}
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--brand-coral)' }}>
                      {prompt.format} &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {activeThread.messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onRegenerate={() => handleSendMessage(msg.content)}
                  threadTitle={activeThread.title}
                  onSelectSuggestion={(suggestion) => handleSendMessage(suggestion)}
                />
              ))}

              {isGenerating && (!activeThread.messages.length || !activeThread.messages[activeThread.messages.length - 1]?.content) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', color: 'var(--ink-muted)', fontSize: '0.8rem' }}>
                  <div className="spinner" style={{ width: '14px', height: '14px', border: '2px solid var(--border-medium)', borderTopColor: 'var(--brand-coral)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  <span>Synthesizing response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Drawer Composer */}
        <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or search your notes..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontSize: '0.875rem',
                backgroundColor: 'transparent',
                color: 'var(--ink-primary)',
                lineHeight: 1.4,
                maxHeight: '120px'
              }}
              aria-label="Quick Ask Input"
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.2rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
                Press Enter to send
              </span>
              <button
                type="button"
                id="drawer-send-btn"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isGenerating}
                className="btn btn-primary btn-sm"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                aria-label="Send query"
              >
                <span>Send</span>
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
