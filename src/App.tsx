import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from './store';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import AuthPages from './pages/AuthPages';
import Dashboard from './pages/Dashboard';
import LearnPages from './pages/LearnPages';
import PlaygroundPage from './pages/Playground';
import ChallengesPages from './pages/ChallengesPages';
import ProjectsPages from './pages/ProjectsPages';
import ProgressPage from './pages/Progress';
import AchievementsPage from './pages/Achievements';
import AdminPages from './pages/AdminPages';
import SettingsPages from './pages/Settings';
import PricingPage from './pages/Pricing';
import NotFound from './pages/NotFound';
import VisualizersPage from './pages/VisualizersPage';
import BookmarksPage from './pages/Bookmarks';
import NotificationsPage from './pages/Notifications';
import BillingPage from './pages/Billing';
import LeaderboardPage from './pages/Leaderboard';
import AITutor from './components/AITutor';
import Toast from './components/Toast';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" /></div>;
  if (!isAuthenticated || user?.role !== 'admin') return <Navigate to="/dashboard" />;
  return <>{children}</>;
}

export default function App() {
  const { loadUser } = useAuthStore();
  const [toasts, setToasts] = useState<{ id: string; type: string; title: string; message: string }[]>([]);

  useEffect(() => { loadUser(); }, []);

  const addToast = (type: string, title: string, message: string) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPages mode="login" />} />
        <Route path="/register" element={<AuthPages mode="register" />} />
        <Route path="/forgot-password" element={<AuthPages mode="forgot" />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/playground" element={<Layout><PlaygroundPage /></Layout>} />
        <Route path="/visualizers" element={<Layout><VisualizersPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/learn" element={<ProtectedRoute><Layout><LearnPages /></Layout></ProtectedRoute>} />
        <Route path="/learn/:trackSlug" element={<ProtectedRoute><Layout><LearnPages /></Layout></ProtectedRoute>} />
        <Route path="/lesson/:lessonSlug" element={<ProtectedRoute><Layout><LearnPages /></Layout></ProtectedRoute>} />
        <Route path="/challenges" element={<ProtectedRoute><Layout><ChallengesPages /></Layout></ProtectedRoute>} />
        <Route path="/challenges/:challengeSlug" element={<ProtectedRoute><Layout><ChallengesPages /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><ProjectsPages /></Layout></ProtectedRoute>} />
        <Route path="/projects/:projectSlug" element={<ProtectedRoute><Layout><ProjectsPages /></Layout></ProtectedRoute>} />
        <Route path="/my-projects" element={<ProtectedRoute><Layout><ProjectsPages mode="my" /></Layout></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Layout><ProgressPage /></Layout></ProtectedRoute>} />
        <Route path="/achievements" element={<ProtectedRoute><Layout><AchievementsPage /></Layout></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute><Layout><BookmarksPage /></Layout></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Layout><NotificationsPage /></Layout></ProtectedRoute>} />
        <Route path="/billing" element={<ProtectedRoute><Layout><BillingPage /></Layout></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Layout><LeaderboardPage /></Layout></ProtectedRoute>} />
        <Route path="/settings/*" element={<ProtectedRoute><Layout><SettingsPages /></Layout></ProtectedRoute>} />
        <Route path="/admin/*" element={<AdminRoute><Layout><AdminPages /></Layout></AdminRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AITutor />
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map(t => <Toast key={t.id} type={t.type} title={t.title} message={t.message} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />)}
      </div>
    </BrowserRouter>
  );
}

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About CSS Visual</h1>
      <div className="prose prose-invert space-y-4 text-text-muted">
        <p>CSS Visual is an interactive learning platform designed to help developers understand CSS through visual experimentation rather than memorizing static documentation.</p>
        <p>Our approach combines structured lessons with live visualizers, coding challenges, and a full-featured playground to create an engaging learning experience.</p>
        <h2 className="text-xl font-semibold text-text-primary mt-8">Our Mission</h2>
        <p>We believe that seeing CSS in action is the fastest path to mastery. Every property, every layout technique, and every animation becomes intuitive when you can experiment with it in real-time.</p>
        <h2 className="text-xl font-semibold text-text-primary mt-8">Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Interactive CSS visualizers for every major concept</li>
          <li>Full-featured code playground with live preview</li>
          <li>Progressive coding challenges with instant feedback</li>
          <li>Guided projects from beginner to advanced</li>
          <li>AI-powered tutor for personalized help</li>
          <li>Progress tracking and achievements</li>
        </ul>
      </div>
    </div>
  );
}
