import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const HeaderSeo = () => {
  const { currentPath } = useApp();

  useEffect(() => {
    // Determine meta properties based on current route
    let pageTitle = "CampusAI | Academic Exam Preparation Platform";
    let metaDescription = "AI-powered EdTech platform transforming college lecture notes, PDFs, PPTs, and previous exam papers into structured summaries, important questions, quizzes, viva prep, and study plans.";

    const routesMeta = {
      '/': {
        title: "CampusAI | Academic Exam Preparation Platform",
        desc: "Transform your PDFs, PPTs, lecture notes, and previous question papers into structured summaries, high-weightage exam questions, quizzes, and study plans in one workspace."
      },
      '/features': {
        title: "Features & Architecture | CampusAI",
        desc: "Explore CampusAI's academic document parser, automated syllabus unit mapping, 2-mark and 10-mark question generator, and faculty assessment tools."
      },
      '/pricing': {
        title: "Transparent Academic Pricing | CampusAI",
        desc: "Simple, honest pricing with zero hidden fees. Free tier for individual students, affordable semester packs, and institutional plans for universities."
      },
      '/about': {
        title: "About Us & Data Ethics | CampusAI",
        desc: "Learn about CampusAI's mission to empower collegiate academic achievement, our strict data privacy policies, and zero model-training commitments."
      },
      '/login': {
        title: "Log In to Your Academic Workspace | CampusAI",
        desc: "Access your saved summaries, practice quizzes, flashcards, and exam countdown schedules."
      },
      '/signup': {
        title: "Create Your Free Academic Workspace | CampusAI",
        desc: "Sign up for CampusAI with student or faculty credentials. No credit card required."
      },
      '/privacy-policy': {
        title: "Privacy Policy | CampusAI",
        desc: "Our commitment to data minimization, zero public foundation model training on student notes, and compliance with the DPDP Act and GDPR."
      },
      '/terms-of-service': {
        title: "Terms of Service | CampusAI",
        desc: "Terms governing acceptable academic integrity, intellectual property ownership of notes, and platform use."
      },
      '/refund-policy': {
        title: "Refund Policy | CampusAI",
        desc: "Clear 7-day no-questions-asked refund policy for Student Premium and pro-rata institutional terms."
      },
      '/cookie-policy': {
        title: "Cookie Policy | CampusAI",
        desc: "Transparent breakdown of strictly necessary session storage and optional analytical preferences."
      },
      '/unsubscribe': {
        title: "Email Notification Preferences | CampusAI",
        desc: "Manage and unsubscribe from non-essential product updates and academic newsletters."
      },
      '/dashboard': {
        title: "Student Workspace Overview | CampusAI",
        desc: "Overview of your uploaded materials, quiz completions, active study plans, and overall exam readiness."
      },
      '/dashboard/upload': {
        title: "Upload Study Materials | CampusAI",
        desc: "Upload and manage course PDFs, lecture PPTs, docx files, and past university question papers."
      },
      '/dashboard/summaries': {
        title: "Course Summaries & Formula Sheets | CampusAI",
        desc: "Browse unit-level summaries, key definitions, and formula sheets extracted from your uploaded materials."
      },
      '/dashboard/questions': {
        title: "Important Exam Questions & Model Answers | CampusAI",
        desc: "Categorized 2-mark short answers, 5-mark analytical questions, and 10-mark essay problems."
      },
      '/dashboard/quizzes': {
        title: "Interactive Practice Quizzes | CampusAI",
        desc: "Timed multiple-choice tests with real-time score verification, detailed explanations, and progress tracking."
      },
      '/dashboard/viva': {
        title: "Oral Viva Voce Prep | CampusAI",
        desc: "Interactive conceptual oral exam simulator with examiner answers and confidence self-ratings."
      },
      '/dashboard/flashcards': {
        title: "Active Recall Flashcards | CampusAI",
        desc: "Spaced repetition flashcards with keyboard navigation for key terms, definitions, and algorithms."
      },
      '/dashboard/study-plan': {
        title: "Exam Countdown Study Planner | CampusAI",
        desc: "Personalized day-by-day revision checklists to pace preparation before semester exams."
      },
      '/dashboard/progress': {
        title: "Academic Mastery & Analytics | CampusAI",
        desc: "Detailed topic mastery breakdowns, quiz score history, and weak-area identification."
      },
      '/dashboard/settings': {
        title: "Account Settings & Data Controls | CampusAI",
        desc: "Manage profile, subscription tiers, cookie preferences, export data, or delete your account."
      }
    };

    const cleanPath = (currentPath || '/')
      .split('?')[0]
      .split('#')[0]
      .trim();
    const normalizedPath = (cleanPath.length > 1 && cleanPath.endsWith('/'))
      ? cleanPath.slice(0, -1)
      : (cleanPath || '/');

    const currentMeta = routesMeta[normalizedPath] || {
      title: "Page Not Found (404) | CampusAI",
      desc: "The requested academic resource or page could not be located."
    };

    pageTitle = currentMeta.title;
    metaDescription = currentMeta.desc;

    document.title = pageTitle;

    // Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.name = 'description';
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', metaDescription);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    const canonicalPath = normalizedPath === '/' ? '' : normalizedPath;
    canonicalTag.setAttribute('href', `https://campusai.in${canonicalPath}`);
  }, [currentPath]);

  return null;
};
