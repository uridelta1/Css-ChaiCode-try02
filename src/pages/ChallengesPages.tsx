import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDataStore } from '../store';
import { Target, ChevronLeft, CheckCircle, XCircle, Lightbulb, Play, RotateCcw, Trophy, Clock } from 'lucide-react';

export default function ChallengesPages() {
  const { challengeSlug } = useParams();
  if (challengeSlug) return <ChallengeView slug={challengeSlug} />;
  return <ChallengesList />;
}

function ChallengesList() {
  const { challenges, challengeAttempts } = useDataStore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">CSS Challenges</h1>
      <p className="text-text-muted mb-8">Test your CSS skills with hands-on coding challenges.</p>
      <div className="space-y-4">
        {challenges.map(challenge => {
          const attempts = challengeAttempts.filter(a => a.challengeId === challenge.id);
          const passed = attempts.some(a => a.passed);
          const attemptCount = attempts.length;
          return (
            <Link key={challenge.id} to={`/challenges/${challenge.slug}`} className="block bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${passed ? 'bg-success/20' : 'bg-accent/10'}`}>
                    {passed ? <CheckCircle className="w-5 h-5 text-success" /> : <Target className="w-5 h-5 text-accent" />}
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">{challenge.title}</h3>
                    <p className="text-sm text-text-muted mt-1">{challenge.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${challenge.difficulty === 'beginner' ? 'bg-success/10 text-success' : challenge.difficulty === 'intermediate' ? 'bg-pro/10 text-pro' : 'bg-error/10 text-error'}`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-xs text-text-muted flex items-center gap-1"><Target className="w-3 h-3" /> {challenge.type.replace('-', ' ')}</span>
                      {attemptCount > 0 && <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> {attemptCount} attempts</span>}
                    </div>
                  </div>
                </div>
                {challenge.accessLevel === 'pro' && <span className="text-xs px-2 py-0.5 bg-pro/10 text-pro rounded-full">Pro</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ChallengeView({ slug }: { slug: string }) {
  const { challenges, addChallengeAttempt } = useDataStore();
  const challenge = challenges.find(c => c.slug === slug);
  const [css, setCss] = useState('');
  const [result, setResult] = useState<{ passed: boolean; feedback: string[] } | null>(null);
  const [showHint, setShowHint] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (challenge) {
      setCss(challenge.starterCode.css);
      setResult(null);
      setShowHint(0);
      setShowSolution(false);
    }
  }, [challenge]);

  useEffect(() => {
    updatePreview();
  }, [css, challenge]);

  if (!challenge) return <div className="p-8 text-center text-text-muted">Challenge not found</div>;

  const updatePreview = () => {
    if (!iframeRef.current) return;
    const fullCss = `${challenge.starterCode.css.split('/*')[0]}\n${css}`;
    const doc = `<!DOCTYPE html><html><head><style>${fullCss}</style></head><body>${challenge.starterCode.html}</body></html>`;
    iframeRef.current.srcdoc = doc;
  };

  const handleSubmit = () => {
    const feedback: string[] = [];
    let passed = true;
    for (const rule of challenge.validationRules) {
      if (!css.includes(rule.expected) && !css.includes(rule.property)) {
        passed = false;
        feedback.push(`Missing: ${rule.property} should include "${rule.expected}"`);
      } else if (!css.includes(rule.expected)) {
        passed = false;
        feedback.push(`${rule.property} should be "${rule.expected}"`);
      }
    }
    if (passed) feedback.push('All checks passed! Great work! 🎉');
    setResult({ passed, feedback });
    addChallengeAttempt({ challengeId: challenge.id, submittedCode: css, score: passed ? 100 : 0, passed, feedback });
  };

  const handleReset = () => {
    setCss(challenge.starterCode.css);
    setResult(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <Link to="/challenges" className="text-sm text-text-muted hover:text-accent mb-4 inline-flex items-center gap-1">
        <ChevronLeft className="w-4 h-4" /> All Challenges
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold mb-1">{challenge.title}</h1>
          <p className="text-text-muted text-sm">{challenge.description}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full ${challenge.difficulty === 'beginner' ? 'bg-success/10 text-success' : challenge.difficulty === 'intermediate' ? 'bg-pro/10 text-pro' : 'bg-error/10 text-error'}`}>
          {challenge.difficulty}
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
              <span className="text-xs text-text-muted code-font">CSS</span>
              <div className="flex gap-2">
                <button onClick={handleReset} className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Reset</button>
              </div>
            </div>
            <textarea
              value={css}
              onChange={e => setCss(e.target.value)}
              className="w-full h-64 p-4 bg-bg text-text-primary code-font text-sm resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Submit
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className={`p-4 rounded-xl border ${result.passed ? 'bg-success/5 border-success/20' : 'bg-error/5 border-error/20'}`}>
              <div className="flex items-center gap-2 mb-2">
                {result.passed ? <Trophy className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-error" />}
                <span className={`font-medium text-sm ${result.passed ? 'text-success' : 'text-error'}`}>
                  {result.passed ? 'Challenge Complete!' : 'Not quite right'}
                </span>
              </div>
              <ul className="space-y-1">
                {result.feedback.map((f, i) => (
                  <li key={i} className="text-sm text-text-muted">{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Hints */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium flex items-center gap-2"><Lightbulb className="w-4 h-4 text-pro" /> Hints</span>
              <button onClick={() => setShowHint(Math.min(showHint + 1, challenge.hints.length))} disabled={showHint >= challenge.hints.length} className="text-xs text-accent hover:text-accent-hover disabled:opacity-50 disabled:cursor-not-allowed">
                {showHint >= challenge.hints.length ? 'All shown' : 'Reveal hint'}
              </button>
            </div>
            <div className="space-y-2">
              {challenge.hints.slice(0, showHint).map((hint, i) => (
                <p key={i} className="text-sm text-text-muted bg-surface rounded-lg p-2.5">{hint}</p>
              ))}
              {showHint === 0 && <p className="text-xs text-text-muted">Click "Reveal hint" for help</p>}
            </div>
            <button onClick={() => setShowSolution(!showSolution)} className="mt-3 text-xs text-text-muted hover:text-accent">
              {showSolution ? 'Hide solution' : 'Show solution'}
            </button>
            {showSolution && (
              <pre className="mt-2 bg-surface rounded-lg p-3 text-xs code-font text-text-muted overflow-x-auto">{challenge.solution}</pre>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-border bg-surface">
            <span className="text-xs text-text-muted">Preview</span>
          </div>
          <div className="p-4">
            <div className="bg-bg rounded-lg border border-border overflow-hidden min-h-[300px]">
              <iframe ref={iframeRef} className="w-full h-72 border-0" title="challenge-preview" sandbox="allow-same-origin" />
            </div>
          </div>
          <div className="px-4 py-3 border-t border-border bg-surface">
            <p className="text-xs text-text-muted">Requirements:</p>
            <ul className="mt-1 space-y-1">
              {challenge.validationRules.map((rule, i) => (
                <li key={i} className="text-xs text-text-muted flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {rule.property} should include "{rule.expected}"
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
