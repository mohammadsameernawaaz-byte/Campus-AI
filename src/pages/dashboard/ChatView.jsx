import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Plus,
  Search,
  Pin,
  Trash2,
  Edit2,
  Paperclip,
  Send,
  Sparkles,
  BookOpen,
  FileText,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { ChatMessage } from '../../components/chat/ChatMessage';
import { RESPONSE_FORMATS, STARTER_PROMPTS, streamAIResponse, synthesizeAcademicResponse, generateSuggestedFollowUps } from '../../utils/aiEngine';
import { parseDocumentClientSide } from '../../utils/documentParser';

export const ChatView = () => {
  const {
    user,
    documents,
    addDocument,
    chatThreads,
    activeThreadId,
    setActiveThreadId,
    createNewThread,
    deleteThread,
    renameThread,
    togglePinThread,
    addMessageToThread,
    updateMessageInThread,
    geminiApiKey
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingThreadId, setEditingThreadId] = useState(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active thread state
  const activeThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0] || null;

  const [scope, setScope] = useState(activeThread?.scope || 'universal'); // 'universal' | 'grounded'
  const [format, setFormat] = useState(activeThread?.format || 'Standard Assistant');
  const [selectedDocIds, setSelectedDocIds] = useState(activeThread?.attachedDocIds || (documents[0] ? [documents[0].id] : []));
  const [attachModalOpen, setAttachModalOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Ensure activeThreadId is always synchronized with the active thread
  useEffect(() => {
    if (activeThread && activeThreadId !== activeThread.id) {
      setActiveThreadId(activeThread.id);
    }
  }, [activeThread, activeThreadId, setActiveThreadId]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages, isGenerating]);

  // Sync thread settings when active thread changes
  useEffect(() => {
    if (activeThread) {
      setScope(activeThread.scope || 'universal');
      setFormat(activeThread.format || 'Standard Assistant');
      setSelectedDocIds(activeThread.attachedDocIds || []);
    }
  }, [activeThreadId]);

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
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
    const attachedDocs = currentScope === 'grounded'
      ? documents.filter(d => selectedDocIds.includes(d.id))
      : [];

    // Clear input immediately for instantaneous responsiveness
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsGenerating(true);

    let targetThreadId = activeThread ? activeThread.id : activeThreadId;
    if (!targetThreadId) {
      const fresh = createNewThread(queryToSend.slice(0, 36), currentScope, selectedDocIds, currentFormat);
      targetThreadId = fresh.id;
    }

    // Capture continuous conversation history before appending this turn
    const conversationHistory = activeThread?.messages ? [...activeThread.messages] : [];

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: queryToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: attachedDocs.map(d => d.name)
    };

    const assistantMsgId = `msg-ai-${Date.now()}`;
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

  const handleRegenerate = async () => {
    if (!activeThread || activeThread.messages.length === 0 || isGenerating) return;
    const lastUserMessage = [...activeThread.messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    setIsGenerating(true);
    const attachedDocs = scope === 'grounded'
      ? documents.filter(d => selectedDocIds.includes(d.id))
      : [];

    const conversationHistory = activeThread.messages.filter(m => m !== activeThread.messages[activeThread.messages.length - 1]);

    const assistantMsgId = `msg-ai-regen-${Date.now()}`;
    const initialAssistantMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      format,
      sources: attachedDocs.map(d => `${d.name}, Unit: ${d.unit}`)
    };

    try {
      addMessageToThread(activeThread.id, initialAssistantMessage);

      const finalResponse = await streamAIResponse({
        query: `${lastUserMessage.content} (Provide an alternative in-depth explanation)`,
        history: conversationHistory,
        scope,
        attachedDocs,
        format,
        examPattern: user.examPattern || 'Standard Marking Scheme',
        apiKey: geminiApiKey,
        onChunk: (accumulated) => {
          updateMessageInThread(activeThread.id, assistantMsgId, {
            content: accumulated,
            isStreaming: true
          });
        }
      });

      const followUps = generateSuggestedFollowUps(lastUserMessage.content, finalResponse);

      updateMessageInThread(activeThread.id, assistantMsgId, {
        content: finalResponse,
        isStreaming: false,
        suggestedFollowUps: followUps
      });
    } catch (err) {
      console.error("AI Regen Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Direct In-Chat File Upload using Unified Client-Side Parser
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const newDoc = await parseDocumentClientSide(
        file,
        "Chat Attached Material",
        "Custom Ingested File",
        user?.examPattern || "Standard University Blueprint"
      );
      addDocument(newDoc);
      setScope('grounded');
      setSelectedDocIds(prev => [...prev, newDoc.id]);
      setAttachModalOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error("Direct chat file parse error:", err);
    }
  };

  // Thread grouping filters
  const filteredThreads = chatThreads.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = t.title.toLowerCase().includes(q);
    const msgMatch = t.messages?.some(m => m.content.toLowerCase().includes(q));
    return titleMatch || msgMatch;
  });

  const pinnedThreads = filteredThreads.filter(t => t.pinned);
  const now = new Date();
  const todayThreads = filteredThreads.filter(t => {
    if (t.pinned) return false;
    const d = new Date(t.createdAt);
    return d.toDateString() === now.toDateString();
  });
  const olderThreads = filteredThreads.filter(t => {
    if (t.pinned) return false;
    const d = new Date(t.createdAt);
    return d.toDateString() !== now.toDateString();
  });

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 105px)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
      {/* A. Multi-Thread Conversation Sidebar */}
      <aside
        style={{
          width: '280px',
          backgroundColor: 'var(--bg-muted)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}
        aria-label="Conversation History Sidebar"
      >
        {/* Top + New Chat Button */}
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => createNewThread()}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem 1rem' }}
            aria-label="Start New Chat"
          >
            <Plus size={16} />
            <span style={{ fontWeight: 700 }}>New Chat</span>
          </button>

          {/* Search past threads */}
          <div style={{ marginTop: '0.75rem', position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat history..."
              style={{
                width: '100%',
                padding: '0.45rem 0.65rem 0.45rem 2rem',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-btn)'
              }}
              aria-label="Search chat threads"
            />
          </div>
        </div>

        {/* Grouped Threads List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Pinned Threads */}
          {pinnedThreads.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.5rem 0.35rem' }}>
                Pinned
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {pinnedThreads.map(renderThreadItem)}
              </div>
            </div>
          )}

          {/* Today Threads */}
          {todayThreads.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.5rem 0.35rem' }}>
                Today
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {todayThreads.map(renderThreadItem)}
              </div>
            </div>
          )}

          {/* Older Threads */}
          {olderThreads.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.5rem 0.35rem' }}>
                Previous 7 Days
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {olderThreads.map(renderThreadItem)}
              </div>
            </div>
          )}

          {filteredThreads.length === 0 && (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--ink-muted)', fontSize: '0.825rem' }}>
              No chats match "{searchQuery}"
            </div>
          )}
        </div>
      </aside>

      {/* Main Conversational Canvas */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, backgroundColor: 'var(--bg-surface)' }}>
        {/* Top Controls Bar */}
        <header
          style={{
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-primary)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}
        >
          {/* Active Thread Title & Rename */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '320px' }}>
              {activeThread?.title || 'CampusAI Study Assistant'}
            </span>
            <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
              {scope === 'grounded' ? `${selectedDocIds.length} Attached Material(s)` : 'Universal Knowledge'}
            </span>
          </div>

          {/* Context Scope & Response Style Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Scope Selector */}
            <div style={{ display: 'flex', backgroundColor: 'var(--bg-muted)', padding: '0.2rem', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setScope('universal')}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: scope === 'universal' ? 700 : 500,
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: scope === 'universal' ? 'var(--ink-primary)' : 'transparent',
                  color: scope === 'universal' ? 'var(--ink-inverse)' : 'var(--ink-secondary)'
                }}
              >
                Universal AI
              </button>
              <button
                onClick={() => setScope('grounded')}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: scope === 'grounded' ? 700 : 500,
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: scope === 'grounded' ? 'var(--ink-primary)' : 'transparent',
                  color: scope === 'grounded' ? 'var(--ink-inverse)' : 'var(--ink-secondary)'
                }}
              >
                Grounded in Uploads
              </button>
            </div>

            {/* If Grounded, Show Attachment Picker Trigger */}
            {scope === 'grounded' && (
              <button
                onClick={() => setAttachModalOpen(true)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                title="Manage attached study files"
              >
                <FileText size={13} color="var(--brand-coral)" />
                <span>Files ({selectedDocIds.length})</span>
              </button>
            )}

            {/* Response Format Selector */}
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--ink-primary)',
                fontWeight: 600
              }}
              aria-label="Academic Response Format"
            >
              {RESPONSE_FORMATS.map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Message Scroll Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          {!activeThread || activeThread.messages.length === 0 ? (
            /* Empty State with 4 Starter Prompt Cards */
            <div style={{ margin: 'auto', maxWidth: '720px', width: '100%', textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--ink-primary)',
                  color: 'var(--brand-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <BookOpen size={28} strokeWidth={2.4} aria-hidden="true" />
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--ink-primary)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                How can CampusAI assist your studies today?
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginBottom: '2rem' }}>
                Ask anything across engineering, sciences, computer science, or medicine, or ground conversational responses directly in your uploaded course materials.
              </p>

              {/* 4 Clickable Starter Prompt Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', textAlign: 'left' }}>
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setFormat(prompt.format);
                      handleSendMessage(prompt.query, prompt.format);
                    }}
                    className="card"
                    style={{
                      padding: '1.15rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '10px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                        <Sparkles size={14} color="var(--brand-coral)" />
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                          {prompt.format}
                        </span>
                      </div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--ink-primary)', display: 'block', lineHeight: 1.4 }}>
                        {prompt.title}
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brand-teal)', marginTop: '0.75rem', fontWeight: 700 }}>
                      Send prompt &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Render Messages */
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {activeThread.messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onRegenerate={handleRegenerate}
                  threadTitle={activeThread.title}
                  onSelectSuggestion={(suggestion) => handleSendMessage(suggestion)}
                />
              ))}

              {isGenerating && (!activeThread.messages.length || !activeThread.messages[activeThread.messages.length - 1]?.content) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', color: 'var(--ink-muted)', fontSize: '0.875rem' }}>
                  <div className="spinner" style={{ width: '18px', height: '18px', border: '2px solid var(--border-medium)', borderTopColor: 'var(--brand-coral)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  <span>Synthesizing response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* D. Multi-Modal Rectangular Composer Bar */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border-medium)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {/* Auto-expanding textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                scope === 'grounded'
                  ? `Ask question grounded in ${selectedDocIds.length} attached document(s)...`
                  : "Ask anything (code, math proof, essay breakdown, viva questions, career prep)..."
              }
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontSize: '0.925rem',
                backgroundColor: 'transparent',
                color: 'var(--ink-primary)',
                lineHeight: 1.5,
                maxHeight: '180px'
              }}
              aria-label="CampusAI Question Composer"
            />

            {/* Bottom Composer Utilities */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.25rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* + Attach File Button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.pptx,.ppt,.docx,.doc,.txt"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                  title="Upload new file to attach to chat"
                >
                  <Paperclip size={13} />
                  <span>Attach File</span>
                </button>

                {scope === 'grounded' && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                    {selectedDocIds.length === 0 ? "No files selected (click Files above)" : `${selectedDocIds.length} file(s) active`}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', display: 'none' }}>
                  Press Enter to send
                </span>
                <button
                  type="button"
                  id="chat-send-btn"
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isGenerating}
                  className="btn btn-primary btn-sm"
                  style={{ padding: '0.4rem 0.85rem', gap: '0.4rem' }}
                  aria-label="Send message"
                >
                  <span>Send</span>
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '0.35rem', textAlign: 'center' }}>
            CampusAI answers any university subject • Press Enter to send, Shift+Enter for new line • Ctrl+J for Quick-Ask drawer
          </div>
        </div>
      </main>

      {/* Attachment Selection Modal */}
      {attachModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(21, 21, 21, 0.55)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setAttachModalOpen(false)}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: '520px', padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Select Attached Documents</h3>
              <button onClick={() => setAttachModalOpen(false)} className="btn btn-secondary btn-sm" aria-label="Close modal">
                <X size={16} />
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1rem' }}>
              The AI will directly cite and reference specific units and slides from the checked materials:
            </p>

            <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {documents.map(doc => {
                const isSelected = selectedDocIds.includes(doc.id);
                return (
                  <label
                    key={doc.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: isSelected ? 'var(--bg-muted)' : 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-btn)',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        setSelectedDocIds(prev =>
                          prev.includes(doc.id) ? prev.filter(id => id !== doc.id) : [...prev, doc.id]
                        );
                      }}
                    />
                    <FileText size={16} color="var(--brand-coral)" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ fontSize: '0.85rem', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.name}
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                        {doc.subject} • {doc.unit}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            <button
              onClick={() => setAttachModalOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Done Selecting ({selectedDocIds.length} Selected)
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Helper to render individual thread item in sidebar
  function renderThreadItem(thread) {
    const isActive = activeThreadId === thread.id;
    const isEditing = editingThreadId === thread.id;

    return (
      <div
        key={thread.id}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.55rem 0.65rem',
          borderRadius: 'var(--radius-btn)',
          backgroundColor: isActive ? 'var(--ink-primary)' : 'transparent',
          color: isActive ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
          cursor: 'pointer',
          fontSize: '0.825rem',
          fontWeight: isActive ? 700 : 500,
          transition: 'all var(--transition-fast)'
        }}
        onClick={() => {
          if (!isEditing) setActiveThreadId(thread.id);
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
          <MessageSquare size={14} style={{ color: isActive ? 'var(--brand-coral)' : 'currentColor', flexShrink: 0 }} />
          {isEditing ? (
            <input
              type="text"
              value={editTitleInput}
              autoFocus
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setEditTitleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  renameThread(thread.id, editTitleInput);
                  setEditingThreadId(null);
                } else if (e.key === 'Escape') {
                  setEditingThreadId(null);
                }
              }}
              style={{
                width: '100%',
                fontSize: '0.78rem',
                padding: '0.15rem 0.35rem',
                color: 'var(--ink-primary)'
              }}
            />
          ) : (
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {thread.title}
            </span>
          )}
        </div>

        {/* Action icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginLeft: '0.35rem' }} onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <button
              onClick={() => {
                renameThread(thread.id, editTitleInput);
                setEditingThreadId(null);
              }}
              style={{ background: 'none', border: 'none', color: 'inherit', padding: '0.2rem' }}
              aria-label="Confirm rename"
            >
              <Check size={12} />
            </button>
          ) : (
            <>
              <button
                onClick={() => togglePinThread(thread.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: thread.pinned ? 'var(--brand-coral)' : 'inherit',
                  opacity: thread.pinned || isActive ? 1 : 0.6,
                  padding: '0.2rem'
                }}
                title={thread.pinned ? "Unpin chat" : "Pin chat"}
                aria-label={thread.pinned ? "Unpin chat" : "Pin chat"}
              >
                <Pin size={12} />
              </button>
              <button
                onClick={() => {
                  setEditingThreadId(thread.id);
                  setEditTitleInput(thread.title);
                }}
                style={{ background: 'none', border: 'none', color: 'inherit', opacity: isActive ? 1 : 0.6, padding: '0.2rem' }}
                title="Rename chat"
                aria-label="Rename chat"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete conversation "${thread.title}"?`)) {
                    deleteThread(thread.id);
                  }
                }}
                style={{ background: 'none', border: 'none', color: 'inherit', opacity: isActive ? 1 : 0.6, padding: '0.2rem' }}
                title="Delete chat"
                aria-label="Delete chat"
              >
                <Trash2 size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
};
