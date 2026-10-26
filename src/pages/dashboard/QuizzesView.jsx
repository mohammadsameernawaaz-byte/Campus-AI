import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Clock, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';

export const QuizzesView = () => {
  const { documents = [], recordQuiz } = useApp();
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || '');
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIndex]: optionIndex }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const currentDoc = documents.find(d => d.id === selectedDocId) || documents[0];
  const questions = currentDoc?.quiz || [];

  // Reset quiz state when changing document
  const handleSelectDoc = (docId) => {
    setSelectedDocId(docId);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizScore(null);
    setTimeLeft(300);
    setTimerActive(false);
  };

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (timerEnabled && timerActive && timeLeft > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted && timerActive) {
      handleSubmitQuiz();
    }
    return () => clearInterval(interval);
  }, [timerEnabled, timerActive, timeLeft, isSubmitted]);

  const handleStartQuiz = () => {
    setTimerActive(true);
  };

  const handleSelectOption = (qIdx, optIdx) => {
    if (isSubmitted) return;
    if (!timerActive) setTimerActive(true);
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: optIdx
    });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const weakTopicsList = [];

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      } else {
        weakTopicsList.push(q.question.slice(0, 45) + "...");
      }
    });

    const scorePct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    setQuizScore(scorePct);
    setIsSubmitted(true);
    setTimerActive(false);

    // Record result into global state and localStorage (dynamically updates metrics!)
    recordQuiz({
      id: `qh-${Date.now()}`,
      title: `${currentDoc.name} Practice Test`,
      documentName: currentDoc.name,
      score: scorePct,
      totalQuestions: questions.length,
      date: new Date().toISOString().split('T')[0],
      weakTopics: weakTopicsList
    });
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizScore(null);
    setTimeLeft(300);
    setTimerActive(false);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (questions.length === 0) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Practice Quizzes</h1>
        <p style={{ marginTop: '0.75rem', color: 'var(--ink-secondary)' }}>
          No quiz questions available for this material. Please upload or select another document.
        </p>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Interactive Practice Quizzes
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
            Timed diagnostic checks with instant feedback and weak-area identification.
          </p>
        </div>

        {/* Document Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Quiz:</span>
          <select
            value={currentDoc.id}
            onChange={(e) => handleSelectDoc(e.target.value)}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', maxWidth: '280px' }}
          >
            {documents.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quiz Control Bar */}
      <div className="card" style={{ padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Progress
            </span>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--ink-primary)' }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                disabled={timerActive && !isSubmitted}
              />
              <span>Enable Timer</span>
            </label>
          </div>
        </div>

        {timerEnabled && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.85rem',
            backgroundColor: timeLeft < 60 ? 'var(--bg-soft-accent)' : 'var(--bg-muted)',
            borderRadius: 'var(--radius-btn)',
            color: timeLeft < 60 ? 'var(--brand-coral)' : 'var(--ink-primary)',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}>
            <Clock size={16} />
            <span className="font-mono">{formatTimer(timeLeft)}</span>
            {!timerActive && !isSubmitted && (
              <button
                onClick={handleStartQuiz}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem', marginLeft: '0.35rem' }}
                title="Start Timer Countdown"
              >
                Start Timer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Quiz Arena */}
      {!isSubmitted ? (
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span className="badge badge-teal" style={{ fontSize: '0.75rem' }}>
              Question {currentQuestionIndex + 1}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              {Object.keys(selectedAnswers).length} answered of {questions.length}
            </span>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1.75rem', lineHeight: 1.4 }}>
            {currentQ.question}
          </h2>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-btn)',
                    border: isSelected ? '2px solid var(--ink-primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: isSelected ? 'var(--bg-muted)' : 'var(--bg-surface)',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? 'var(--ink-primary)' : 'var(--bg-muted)',
                    color: isSelected ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span style={{ fontSize: '0.95rem', color: 'var(--ink-primary)', fontWeight: isSelected ? 600 : 400 }}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Question Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="btn btn-secondary"
              style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1, cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>

            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {questions.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentQuestionIndex(dotIdx)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: currentQuestionIndex === dotIdx
                      ? 'var(--ink-primary)'
                      : selectedAnswers[dotIdx] !== undefined
                      ? 'var(--bg-teal-subtle)'
                      : 'var(--bg-muted)',
                    color: currentQuestionIndex === dotIdx
                      ? 'var(--ink-inverse)'
                      : 'var(--ink-primary)'
                  }}
                >
                  {dotIdx + 1}
                </button>
              ))}
            </div>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="btn btn-primary"
              >
                <span>Next Question</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="btn btn-coral"
              >
                <span>Submit Quiz</span>
                <CheckCircle2 size={15} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Score Header Card */}
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
            <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Quiz Results Summary</span>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--ink-primary)', lineHeight: 1 }}>
              {quizScore}%
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              {quizScore >= 80 ? "Exemplary understanding! You have mastered this syllabus unit." : "Solid attempt. Review the model explanations below to improve."}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleRetake}
                className="btn btn-primary"
              >
                <RotateCcw size={15} />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* Question Breakdown with Explanations */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Detailed Question Analysis & Explanations
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div key={idx} style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-card)',
                    border: isCorrect ? '1px solid #C3E6CB' : '1px solid #F5C6CB',
                    backgroundColor: isCorrect ? 'rgba(212, 237, 218, 0.2)' : 'rgba(248, 215, 218, 0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {isCorrect ? (
                        <span className="badge" style={{ backgroundColor: '#D4EDDA', color: '#155724' }}>Correct</span>
                      ) : (
                        <span className="badge badge-coral">Incorrect</span>
                      )}
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Question {idx + 1}</span>
                    </div>

                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--ink-primary)' }}>
                      {q.question}
                    </h3>

                    <div style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                      <div>Your Answer: <strong>{userChoice !== undefined ? q.options[userChoice] : "Unanswered"}</strong></div>
                      {!isCorrect && (
                        <div style={{ color: 'var(--brand-teal)', marginTop: '0.2rem' }}>
                          Correct Answer: <strong>{q.options[q.correctIndex]}</strong>
                        </div>
                      )}
                    </div>

                    <div style={{
                      backgroundColor: 'var(--bg-surface)',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-btn)',
                      fontSize: '0.825rem',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.5
                    }}>
                      <strong style={{ color: 'var(--ink-primary)', display: 'block', marginBottom: '0.25rem' }}>
                        Explanation:
                      </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
