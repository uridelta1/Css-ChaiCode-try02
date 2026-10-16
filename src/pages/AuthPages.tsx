import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Sparkles, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AuthPages({ mode }: { mode: 'login' | 'register' | 'forgot' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'login') {
      const ok = await login(email, password);
      if (ok) navigate('/dashboard');
      else setError('Invalid email or password');
    } else if (mode === 'register') {
      if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters'); setLoading(false); return; }
      const ok = await register(name, email, password);
      if (ok) navigate('/dashboard');
      else setError('An account with this email already exists');
    } else if (mode === 'forgot') {
      setSuccess('If an account exists with this email, a reset link has been sent.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">CSS Visual</span>
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-2">
            {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create your account' : 'Reset password'}
          </h1>
          <p className="text-text-muted text-sm mb-6">
            {mode === 'login' ? 'Sign in to continue learning' : mode === 'register' ? 'Start your CSS journey today' : 'Enter your email to receive a reset link'}
          </p>

          {error && <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">{error}</div>}
          {success && <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm text-text-muted mb-1.5">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm text-text-muted mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors" />
              </div>
            </div>
            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm text-text-muted mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-10 pr-10 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-muted">
            {mode === 'login' && (
              <>
                <Link to="/forgot-password" className="text-accent hover:text-accent-hover">Forgot password?</Link>
                <span className="mx-2">·</span>
                <Link to="/register" className="text-accent hover:text-accent-hover">Create account</Link>
              </>
            )}
            {mode === 'register' && (
              <>Already have an account? <Link to="/login" className="text-accent hover:text-accent-hover">Sign in</Link></>
            )}
            {mode === 'forgot' && (
              <Link to="/login" className="text-accent hover:text-accent-hover">Back to sign in</Link>
            )}
          </div>
        </div>

        {mode === 'login' && (
          <div className="mt-4 bg-card/50 border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-2">Demo accounts:</p>
            <div className="space-y-1 text-xs code-font text-text-muted">
              <p>User: demo@cssvisual.com / demo123</p>
              <p>Admin: admin@cssvisual.com / admin123</p>
            </div>
            <button onClick={() => { setEmail('admin@cssvisual.com'); setPassword('admin123'); }} className="mt-2 text-xs text-accent hover:text-accent-hover">
              Fill admin credentials →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
