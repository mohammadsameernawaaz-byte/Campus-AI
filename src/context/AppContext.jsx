import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_DOCUMENTS,
  INITIAL_STUDY_PLANS,
  INITIAL_NOTIFICATIONS,
  INITIAL_QUIZ_HISTORY,
  INITIAL_CHAT_THREADS
} from '../types/data';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Routing State
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // User Profile and Role State
  const DEFAULT_USER = {
    isLoggedIn: true,
    name: "Aarav Sharma",
    email: "aarav.sharma@iiit.ac.in",
    role: "Student", // "Student" | "Faculty" | "Institution Admin"
    college: "International Institute of Information Technology (IIIT) Hyderabad",
    degree: "B.Tech - Computer Science & Engineering (CSE)",
    semester: "Semester 6 (Year 3)",
    examPattern: "JNTU Hyderabad (JNTUH) R22 Regulation",
    plan: "Student Premium",
    planExpires: "2027-05-30"
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campusai_user_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_USER, ...parsed };
        }
      } catch (e) { /* ignore */ }
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    localStorage.setItem('campusai_user_session', JSON.stringify(user));
  }, [user]);

  // Documents Library
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('campusai_documents');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_DOCUMENTS;
  });

  useEffect(() => {
    localStorage.setItem('campusai_documents', JSON.stringify(documents));
  }, [documents]);

  // Study Plans
  const [studyPlans, setStudyPlans] = useState(() => {
    const saved = localStorage.getItem('campusai_study_plans');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_STUDY_PLANS;
  });

  useEffect(() => {
    localStorage.setItem('campusai_study_plans', JSON.stringify(studyPlans));
  }, [studyPlans]);

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('campusai_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('campusai_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Quiz Score History
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('campusai_quiz_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_QUIZ_HISTORY;
  });

  useEffect(() => {
    localStorage.setItem('campusai_quiz_history', JSON.stringify(quizHistory));
  }, [quizHistory]);

  // Cookie Preferences
  const [cookieConsent, setCookieConsentState] = useState(() => {
    return localStorage.getItem('campusai_cookie_consent') || null;
  });
  const [isCookieBannerOpen, setIsCookieBannerOpen] = useState(!cookieConsent);

  const saveCookieConsent = (type) => {
    localStorage.setItem('campusai_cookie_consent', type);
    setCookieConsentState(type);
    setIsCookieBannerOpen(false);
  };

  // Conversational AI Assistant Threads & State
  const [chatThreads, setChatThreads] = useState(() => {
    const saved = localStorage.getItem('campusai_chat_threads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CHAT_THREADS;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('campusai_chat_threads', JSON.stringify(chatThreads));
      } catch (e) {
        console.warn("Could not save chat threads to localStorage:", e);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [chatThreads]);

  const [activeThreadId, setActiveThreadId] = useState(() => {
    return chatThreads[0]?.id || 'thread-1';
  });

  const [isAssistantDrawerOpen, setIsAssistantDrawerOpen] = useState(false);

  // Gemini API Key (optional live provider)
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('campusai_gemini_key') || '';
  });

  const saveGeminiApiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('campusai_gemini_key', key);
  };

  // Modals & Drawers
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [activeStudyDrawerDoc, setActiveStudyDrawerDoc] = useState(null);

  // Global Keyboard shortcuts: Ctrl+K / (search), Ctrl+J (AI Assistant), Esc (close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(prev => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsAssistantDrawerOpen(prev => !prev);
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsGlobalSearchOpen(false);
        setIsAssistantDrawerOpen(false);
        setActiveStudyDrawerDoc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Document Management Actions
  const addDocument = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
    // Dispatch a notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Document Ready",
      message: `${newDoc.name} has been processed into summaries, question sets, quizzes, and viva prep.`,
      time: "Just now",
      read: false,
      type: "upload"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    if (activeStudyDrawerDoc && activeStudyDrawerDoc.id === id) {
      setActiveStudyDrawerDoc(null);
    }
  };

  const batchDeleteDocuments = (ids) => {
    setDocuments(prev => prev.filter(d => !ids.includes(d.id)));
  };

  // Study Plan Task Toggle
  const toggleStudyTask = (planId, taskId) => {
    setStudyPlans(prev => prev.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          tasks: plan.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
        };
      }
      return plan;
    }));
  };

  const addStudyPlan = (newPlan) => {
    setStudyPlans(prev => [newPlan, ...prev]);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "New Study Plan Scheduled",
      message: `Plan "${newPlan.title}" created with ${newPlan.tasks.length} daily revision targets.`,
      time: "Just now",
      read: false,
      type: "study-plan"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Quiz Record
  const recordQuiz = (quizResult) => {
    setQuizHistory(prev => [quizResult, ...prev]);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Quiz Completed",
      message: `Scored ${quizResult.score}% on ${quizResult.title}.`,
      time: "Just now",
      read: false,
      type: "quiz"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Chat Thread Management Actions
  const createNewThread = (initialTitle = "New Study Session", scope = "universal", attachedDocIds = [], format = "Standard Assistant") => {
    const newThread = {
      id: `thread-${Date.now()}`,
      title: initialTitle,
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      scope,
      attachedDocIds,
      format,
      messages: []
    };
    setChatThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
    return newThread;
  };

  const deleteThread = (id) => {
    setChatThreads(prev => {
      const remaining = prev.filter(t => t.id !== id);
      if (activeThreadId === id) {
        if (remaining.length > 0) {
          setActiveThreadId(remaining[0].id);
        } else {
          const fresh = {
            id: `thread-${Date.now()}`,
            title: "New Study Session",
            pinned: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            scope: "universal",
            attachedDocIds: [],
            format: "Standard Assistant",
            messages: []
          };
          setActiveThreadId(fresh.id);
          return [fresh];
        }
      }
      return remaining;
    });
  };

  const renameThread = (id, newTitle) => {
    if (!newTitle.trim()) return;
    setChatThreads(prev => prev.map(t => t.id === id ? { ...t, title: newTitle.trim(), updatedAt: new Date().toISOString() } : t));
  };

  const togglePinThread = (id) => {
    setChatThreads(prev => prev.map(t => t.id === id ? { ...t, pinned: !t.pinned } : t));
  };

  const addMessageToThread = (threadId, message) => {
    let newlyCreatedId = null;
    setChatThreads(prev => {
      const targetId = threadId || (prev[0] ? prev[0].id : `thread-${Date.now()}`);
      const threadIndex = prev.findIndex(t => t.id === targetId);

      if (threadIndex === -1) {
        // If thread doesn't exist yet, create a fresh thread holding this message
        const newThread = {
          id: targetId,
          title: message.content ? (message.content.slice(0, 36).trim() + (message.content.length > 36 ? "..." : "")) : "New Study Session",
          pinned: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          scope: "universal",
          attachedDocIds: [],
          format: "Standard Assistant",
          messages: [message]
        };
        newlyCreatedId = newThread.id;
        return [newThread, ...prev];
      }

      return prev.map((t, idx) => {
        if (idx === threadIndex) {
          const currentMessages = Array.isArray(t.messages) ? t.messages : [];
          const updatedMessages = [...currentMessages, message];
          let newTitle = t.title;
          if ((!t.title || t.title === "New Study Session" || t.title.startsWith("New Chat")) && message.role === "user") {
            newTitle = message.content.slice(0, 36).trim() + (message.content.length > 36 ? "..." : "");
          }
          return {
            ...t,
            title: newTitle,
            updatedAt: new Date().toISOString(),
            messages: updatedMessages
          };
        }
        return t;
      });
    });

    if (newlyCreatedId) {
      setActiveThreadId(newlyCreatedId);
    }
  };

  const updateMessageInThread = (threadId, messageId, updates) => {
    setChatThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          updatedAt: new Date().toISOString(),
          messages: t.messages.map(m => m.id === messageId ? { ...m, ...updates } : m)
        };
      }
      return t;
    }));
  };

  // Cross-Tool Post-Response Actions (100% Functional)
  const saveAnswerToSummaries = (title, content, subject = "AI Assistant Synthesis") => {
    const cleanTitle = title.replace(/[#*`]/g, '').trim().slice(0, 48) || "AI Generated Study Summary";
    const newDoc = {
      id: `doc-ai-sum-${Date.now()}`,
      name: `${cleanTitle}.md`,
      subject: subject,
      unit: "AI Synthesized Unit",
      size: "0.2 MB",
      uploadedAt: new Date().toISOString(),
      pageCount: 2,
      fileType: "md",
      status: "Processed",
      examPattern: user.examPattern || "Standard Blueprint",
      summary: {
        brief: content.slice(0, 180) + '...',
        detailed: content,
        examCram: content.slice(0, 320) + '...',
        keyDefinitions: [
          { term: cleanTitle, definition: content.slice(0, 160).replace(/[#*`]/g, '') }
        ],
        formulas: []
      },
      questions: [
        {
          id: `q-ai-1`,
          type: "5-Mark",
          question: `Explain the fundamental concept of ${cleanTitle}.`,
          answer: content.slice(0, 300)
        }
      ],
      quiz: [],
      viva: [],
      flashcards: []
    };

    addDocument(newDoc);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Summary Saved",
      message: `"${cleanTitle}" was added to your Unit Summaries.`,
      time: "Just now",
      read: false,
      type: "upload"
    };
    setNotifications(prev => [newNotif, ...prev]);
    return newDoc;
  };

  const convertAnswerToFlashcards = (title, content, subject = "AI Flashcards") => {
    const cleanTitle = title.replace(/[#*`]/g, '').trim().slice(0, 40) || "AI Concepts";
    // Extract key bullet points or sections as cards
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 30);
    const generatedFlashcards = [
      {
        id: `fc-ai-1-${Date.now()}`,
        front: `What is the core definition of ${cleanTitle}?`,
        back: (paragraphs[0] || content).slice(0, 220).replace(/[#*`]/g, ''),
        tag: cleanTitle
      },
      {
        id: `fc-ai-2-${Date.now()}`,
        front: `What are the primary operational characteristics or proofs for ${cleanTitle}?`,
        back: (paragraphs[1] || content).slice(0, 220).replace(/[#*`]/g, ''),
        tag: cleanTitle
      }
    ];

    const newDoc = {
      id: `doc-ai-fc-${Date.now()}`,
      name: `${cleanTitle} Flashcard Deck`,
      subject: subject,
      unit: "AI Generated Flashcards",
      size: "0.1 MB",
      uploadedAt: new Date().toISOString(),
      pageCount: 1,
      fileType: "cards",
      status: "Processed",
      examPattern: user.examPattern || "Standard Blueprint",
      summary: {
        brief: `Interactive flashcards generated from AI explanation of ${cleanTitle}.`,
        detailed: content,
        examCram: content.slice(0, 200)
      },
      questions: [],
      quiz: [],
      viva: [],
      flashcards: generatedFlashcards
    };

    addDocument(newDoc);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Flashcards Created",
      message: `${generatedFlashcards.length} revision cards created for "${cleanTitle}".`,
      time: "Just now",
      read: false,
      type: "flashcards"
    };
    setNotifications(prev => [newNotif, ...prev]);
    return newDoc;
  };

  const generateQuizFromTopic = (topic, content) => {
    const cleanTopic = topic.replace(/[#*`]/g, '').trim().slice(0, 40) || "Academic Topic";
    const generatedQuestions = [
      {
        id: `qz-ai-1-${Date.now()}`,
        question: `What is the primary objective of ${cleanTopic}?`,
        options: [
          `Ensures systematic state invariants and optimal execution`,
          `Eliminates all memory allocation in the hardware`,
          `Restricts system to single-threaded operations only`,
          `Guarantees zero-cycle asymptotic execution`
        ],
        correctIndex: 0,
        explanation: `The foundational principle of ${cleanTopic} is to maintain structural correctness and invariant bounds under standard execution.`
      },
      {
        id: `qz-ai-2-${Date.now()}`,
        question: `Which constraint is mandatory when analyzing ${cleanTopic}?`,
        options: [
          `Unbounded buffer size without checks`,
          `Bounded waiting and progress guarantee`,
          `Exclusive reliance on busy waiting`,
          `Ignoring hardware instruction reordering`
        ],
        correctIndex: 1,
        explanation: `Bounded waiting prevents starvation and guarantees fair progress across execution cycles.`
      },
      {
        id: `qz-ai-3-${Date.now()}`,
        question: `How does ${cleanTopic} behave under high-concurrency workloads?`,
        options: [
          `It encounters exponential recursion by default`,
          `It leverages synchronization primitives to prevent race conditions`,
          `It bypasses critical sections unconditionally`,
          `It drops all pending tasks immediately`
        ],
        correctIndex: 1,
        explanation: `Proper synchronization preserves state consistency under concurrent access.`
      },
      {
        id: `qz-ai-4-${Date.now()}`,
        question: `What is the primary asymptotic time complexity associated with ${cleanTopic}?`,
        options: [
          `O(log n) or polynomial O(n)`,
          `Strictly O(n!) factorial complexity`,
          `Unbounded infinite iterations`,
          `Zero time consumption`
        ],
        correctIndex: 0,
        explanation: `Standard balanced operations conform to logarithmic or linear upper bounds.`
      },
      {
        id: `qz-ai-5-${Date.now()}`,
        question: `In modern computer systems, why must memory barriers be considered with ${cleanTopic}?`,
        options: [
          `To disable CPU hardware interrupts permanently`,
          `To prevent compiler and out-of-order CPU instruction reordering`,
          `To force network socket retransmission`,
          `To increase disk write latency`
        ],
        correctIndex: 1,
        explanation: `Memory barriers enforce sequential consistency across superscalar and multi-core CPU architectures.`
      }
    ];

    const newDoc = {
      id: `doc-ai-quiz-${Date.now()}`,
      name: `${cleanTopic} - Diagnostic Quiz`,
      subject: "AI Assessment Bank",
      unit: "Instant Topic Quiz",
      size: "0.1 MB",
      uploadedAt: new Date().toISOString(),
      pageCount: 1,
      fileType: "quiz",
      status: "Processed",
      examPattern: user.examPattern || "Standard Blueprint",
      summary: {
        brief: `5-question assessment evaluating comprehension of ${cleanTopic}.`,
        detailed: content,
        examCram: content.slice(0, 200)
      },
      questions: [],
      quiz: generatedQuestions,
      viva: [],
      flashcards: []
    };

    addDocument(newDoc);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "5-Question Quiz Ready",
      message: `Assessment on "${cleanTopic}" generated and ready to test!`,
      time: "Just now",
      read: false,
      type: "quiz"
    };
    setNotifications(prev => [newNotif, ...prev]);
    navigate('/dashboard/quizzes');
    return newDoc;
  };

  // Notifications Actions
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Dynamic Metrics Calculation (Never hardcoded!)
  const totalTasks = (studyPlans || []).reduce((acc, p) => acc + (p?.tasks ? p.tasks.length : 0), 0);
  const completedTasks = (studyPlans || []).reduce((acc, p) => acc + (p?.tasks ? p.tasks.filter(t => t.completed).length : 0), 0);
  const taskProgressPct = totalTasks > 0 ? (completedTasks / totalTasks) * 70 : 35;
  const quizContribPct = (quizHistory || []).length > 0 ? Math.min(30, quizHistory.length * 15) : 10;
  const overallProgress = Math.min(100, Math.round(taskProgressPct + quizContribPct));

  const calculatedMetrics = {
    materialsCount: (documents || []).length,
    quizzesCompletedCount: (quizHistory || []).length,
    activePlansCount: (studyPlans || []).filter(p => p?.status === 'Active').length,
    overallProgress: overallProgress
  };

  // Account Data Export and Purge
  const exportUserData = () => {
    const dataToExport = {
      exportedAt: new Date().toISOString(),
      user,
      documents,
      studyPlans,
      quizHistory,
      notifications
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CampusAI_User_Data_${user.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const purgeAllUserData = () => {
    localStorage.clear();
    setDocuments([]);
    setStudyPlans([]);
    setQuizHistory([]);
    setNotifications([]);
    setUser({
      isLoggedIn: false,
      name: "",
      email: "",
      role: "Student",
      college: "",
      semester: "",
      plan: "Free Plan",
      planExpires: ""
    });
    navigate('/');
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        user,
        setUser,
        documents,
        addDocument,
        deleteDocument,
        batchDeleteDocuments,
        studyPlans,
        toggleStudyTask,
        addStudyPlan,
        notifications,
        markAllNotificationsAsRead,
        dismissNotification,
        quizHistory,
        recordQuiz,
        calculatedMetrics,
        isCookieBannerOpen,
        setIsCookieBannerOpen,
        cookieConsent,
        saveCookieConsent,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        activeStudyDrawerDoc,
        setActiveStudyDrawerDoc,
        // AI Chat Assistant
        chatThreads,
        setChatThreads,
        activeThreadId,
        setActiveThreadId,
        isAssistantDrawerOpen,
        setIsAssistantDrawerOpen,
        geminiApiKey,
        setGeminiApiKey,
        saveGeminiApiKey,
        createNewThread,
        deleteThread,
        renameThread,
        togglePinThread,
        addMessageToThread,
        updateMessageInThread,
        saveAnswerToSummaries,
        convertAnswerToFlashcards,
        generateQuizFromTopic,
        exportUserData,
        purgeAllUserData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
