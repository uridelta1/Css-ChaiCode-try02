import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Sparkles, ArrowRight, Code2, Target, Layers, Zap, BookOpen, Play, CheckCircle, Star, ChevronRight } from 'lucide-react';

export default function Landing() {
  const [flexDir, setFlexDir] = useState('row');
  const [flexJustify, setFlexJustify] = useState('center');
  const [flexAlign, setFlexAlign] = useState('center');

  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">CSS Visual</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-text-muted hover:text-text-primary transition-colors">Features</a>
            <a href="#tracks" className="text-sm text-text-muted hover:text-text-primary transition-colors">Tracks</a>
            <Link to="/playground" className="text-sm text-text-muted hover:text-text-primary transition-colors">Playground</Link>
            <Link to="/visualizers" className="text-sm text-text-muted hover:text-text-primary transition-colors">Visualizers</Link>
            <Link to="/pricing" className="text-sm text-text-muted hover:text-text-primary transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-text-muted hover:text-text-primary transition-colors">Sign In</Link>
            <Link to="/register" className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm mb-6">
              <Zap className="w-3.5 h-3.5" /> Interactive CSS Learning
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              CSS you can <span className="text-accent">see.</span>
            </h1>
            <p className="text-lg text-text-muted max-w-xl mx-auto mb-8">
              Stop memorizing. Start seeing. Learn CSS through interactive visualizers, live playgrounds, and hands-on challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-colors">
                Start Learning CSS <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/playground" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border hover:border-accent/50 text-text-primary font-medium rounded-xl transition-colors">
                <Play className="w-4 h-4" /> Explore Playground
              </Link>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
                <div className="w-3 h-3 rounded-full bg-error/60" />
                <div className="w-3 h-3 rounded-full bg-pro/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="ml-2 text-xs text-text-muted code-font">live-demo.css</span>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-4 space-y-3">
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Try Flexbox</p>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">flex-direction</span>
                      <select value={flexDir} onChange={e => setFlexDir(e.target.value)} className="bg-surface border border-border rounded px-2 py-0.5 text-text-primary text-xs">
                        <option value="row">row</option>
                        <option value="column">column</option>
                        <option value="row-reverse">row-reverse</option>
                      </select>
                    </label>
                    <label className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">justify-content</span>
                      <select value={flexJustify} onChange={e => setFlexJustify(e.target.value)} className="bg-surface border border-border rounded px-2 py-0.5 text-text-primary text-xs">
                        <option value="center">center</option>
                        <option value="flex-start">flex-start</option>
                        <option value="flex-end">flex-end</option>
                        <option value="space-between">space-between</option>
                        <option value="space-around">space-around</option>
                      </select>
                    </label>
                    <label className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">align-items</span>
                      <select value={flexAlign} onChange={e => setFlexAlign(e.target.value)} className="bg-surface border border-border rounded px-2 py-0.5 text-text-primary text-xs">
                        <option value="center">center</option>
                        <option value="flex-start">flex-start</option>
                        <option value="flex-end">flex-end</option>
                        <option value="stretch">stretch</option>
                      </select>
                    </label>
                  </div>
                  <div className="bg-surface rounded-lg p-3 code-font text-xs text-text-muted">
                    <div>.container &#123;</div>
                    <div className="pl-4">display: <span className="text-accent">flex</span>;</div>
                    <div className="pl-4">flex-direction: <span className="text-accent">{flexDir}</span>;</div>
                    <div className="pl-4">justify-content: <span className="text-accent">{flexJustify}</span>;</div>
                    <div className="pl-4">align-items: <span className="text-accent">{flexAlign}</span>;</div>
                    <div>&#125;</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-3">Preview</p>
                  <div className="h-48 bg-bg rounded-lg border border-border flex items-center justify-center p-4"
                    style={{ display: 'flex', flexDirection: flexDir as any, justifyContent: flexJustify, alignItems: flexAlign, gap: '8px' }}>
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div className="w-12 h-16 bg-accent/80 rounded-lg flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div className="w-12 h-10 bg-accent/60 rounded-lg flex items-center justify-center text-white text-xs font-bold">3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Learn by <span className="text-accent">seeing</span></h2>
            <p className="text-text-muted max-w-lg mx-auto">Every concept comes with an interactive visualizer. Change properties, see results instantly.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: 'Visual Learning', desc: 'Interactive visualizers for box model, flexbox, grid, positioning, and more.' },
              { icon: Code2, title: 'Live Playground', desc: 'Full code editor with HTML, CSS, and live preview. Experiment freely.' },
              { icon: Target, title: 'Coding Challenges', desc: 'Test your skills with progressive challenges and instant feedback.' },
              { icon: BookOpen, title: 'Structured Tracks', desc: 'Follow curated learning paths from fundamentals to advanced CSS.' },
              { icon: Zap, title: 'AI Tutor', desc: 'Get instant help with CSS questions, debugging, and explanations.' },
              { icon: Star, title: 'Track Progress', desc: 'Earn achievements, maintain streaks, and monitor your growth.' },
            ].map((f, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Learning <span className="text-accent">Roadmap</span></h2>
            <p className="text-text-muted">From CSS basics to advanced techniques — a clear path to mastery.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'CSS Foundations', lessons: 4, desc: 'Selectors, box model, colors, units', free: true },
              { title: 'Layout', lessons: 3, desc: 'Flexbox, Grid, Display, Position', free: true },
              { title: 'Responsive CSS', lessons: 2, desc: 'Media queries, fluid layouts', free: true },
              { title: 'CSS Animations', lessons: 1, desc: 'Keyframes, transitions, transforms', free: false },
              { title: 'Advanced CSS', lessons: 1, desc: 'clamp(), custom properties', free: false },
              { title: 'CSS Architecture', lessons: 4, desc: 'BEM, methodologies, maintainability', free: false },
            ].map((track, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-text-muted code-font">Track {i + 1}</span>
                  {!track.free && <span className="text-xs px-2 py-0.5 bg-pro/10 text-pro rounded-full">Pro</span>}
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">{track.title}</h3>
                <p className="text-sm text-text-muted mb-3">{track.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">{track.lessons} lessons</span>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to <span className="text-accent">see</span> CSS differently?</h2>
          <p className="text-text-muted mb-8">Join thousands of developers learning CSS through visual experimentation.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-colors text-lg">
            Start Learning Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">CSS Visual</span>
              </div>
              <p className="text-sm text-text-muted">Learn CSS by seeing it. Interactive visualizers, live playground, and guided challenges.</p>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm">Platform</h4>
              <div className="space-y-2">
                <Link to="/learn" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Learn</Link>
                <Link to="/playground" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Playground</Link>
                <Link to="/challenges" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Challenges</Link>
                <Link to="/pricing" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Pricing</Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm">Resources</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-text-muted hover:text-text-primary transition-colors">About</Link>
                <a href="#" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Documentation</a>
                <a href="#" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="block text-sm text-text-muted hover:text-text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-text-muted">
            © 2024 CSS Visual. Built for developers who learn by doing.
          </div>
        </div>
      </footer>
    </div>
  );
}
