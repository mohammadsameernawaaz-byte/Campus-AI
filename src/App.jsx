import React from 'react';
import { useApp } from './context/AppContext';

// Common Components
import { HeaderSeo } from './components/common/HeaderSeo';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CookieBanner } from './components/common/CookieBanner';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { DocumentStudyDrawer } from './components/common/DocumentStudyDrawer';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { PricingPage } from './pages/public/PricingPage';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage, SignupPage } from './pages/public/AuthPages';
import {
  PrivacyPolicyPage,
  TermsOfServicePage,
  RefundPolicyPage,
  CookiePolicyPage
} from './pages/public/LegalPages';
import { UnsubscribePage } from './pages/public/UnsubscribePage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Dashboard Layout & Views
import { DashboardLayout } from './pages/dashboard/DashboardLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { OverviewView } from './pages/dashboard/OverviewView';
import { UploadView } from './pages/dashboard/UploadView';
import { SummariesView } from './pages/dashboard/SummariesView';
import { QuestionsView } from './pages/dashboard/QuestionsView';
import { QuizzesView } from './pages/dashboard/QuizzesView';
import { VivaView } from './pages/dashboard/VivaView';
import { FlashcardsView } from './pages/dashboard/FlashcardsView';
import { StudyPlanView } from './pages/dashboard/StudyPlanView';
import { ProgressView } from './pages/dashboard/ProgressView';
import { SettingsView } from './pages/dashboard/SettingsView';
import { ChatView } from './pages/dashboard/ChatView';

export function App() {
  const { currentPath } = useApp();

  // Helper to render public routes with Navbar and Footer
  const renderPublicPage = (Component) => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Component />
      <Footer />
    </div>
  );

  // Helper to render dashboard routes with persistent sidebar
  const renderDashboardPage = (Component) => (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );

  // Normalize path to handle trailing slashes, hashes, and query parameters cleanly
  const cleanPath = (currentPath || '/')
    .split('?')[0]
    .split('#')[0]
    .trim();
  const normalizedPath = (cleanPath.length > 1 && cleanPath.endsWith('/'))
    ? cleanPath.slice(0, -1)
    : (cleanPath || '/');

  // Clean route matching
  const renderRoute = () => {
    switch (normalizedPath) {
      // Public Routes
      case '':
      case '/':
        return renderPublicPage(LandingPage);
      case '/features':
        return renderPublicPage(FeaturesPage);
      case '/pricing':
        return renderPublicPage(PricingPage);
      case '/about':
        return renderPublicPage(AboutPage);
      case '/login':
        return renderPublicPage(LoginPage);
      case '/signup':
        return renderPublicPage(SignupPage);
      case '/privacy-policy':
        return renderPublicPage(PrivacyPolicyPage);
      case '/terms-of-service':
        return renderPublicPage(TermsOfServicePage);
      case '/refund-policy':
        return renderPublicPage(RefundPolicyPage);
      case '/cookie-policy':
        return renderPublicPage(CookiePolicyPage);
      case '/unsubscribe':
        return renderPublicPage(UnsubscribePage);

      // Authenticated Dashboard Routes
      case '/dashboard':
        return renderDashboardPage(Dashboard);
      case '/dashboard/chat':
        return renderDashboardPage(ChatView);
      case '/dashboard/upload':
        return renderDashboardPage(UploadView);
      case '/dashboard/summaries':
        return renderDashboardPage(SummariesView);
      case '/dashboard/questions':
        return renderDashboardPage(QuestionsView);
      case '/dashboard/quizzes':
        return renderDashboardPage(QuizzesView);
      case '/dashboard/viva':
        return renderDashboardPage(VivaView);
      case '/dashboard/flashcards':
        return renderDashboardPage(FlashcardsView);
      case '/dashboard/study-plan':
        return renderDashboardPage(StudyPlanView);
      case '/dashboard/progress':
        return renderDashboardPage(ProgressView);
      case '/dashboard/settings':
        return renderDashboardPage(SettingsView);

      // 404 Route
      default:
        return renderPublicPage(NotFoundPage);
    }
  };

  return (
    <>
      {/* Accessible Skip Link (hidden until focused) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Dynamic SEO & Head Manager */}
      <HeaderSeo />

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <DocumentStudyDrawer />
      <CookieBanner />

      {/* Active Page View */}
      {renderRoute()}
    </>
  );
}

export default App;
