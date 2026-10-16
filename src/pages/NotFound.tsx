import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page not found</h2>
        <p className="text-text-muted mb-8 max-w-md">The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/learn" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-card border border-border hover:border-accent/50 text-text-primary font-medium rounded-lg transition-colors">
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
}
