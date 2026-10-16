import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDataStore } from '../store';
import { BookOpen, Clock, CheckCircle, ChevronLeft, ChevronRight, Lock, Play, Copy, RotateCcw } from 'lucide-react';

export default function LearnPages() {
  const { trackSlug, lessonSlug } = useParams();
  const { tracks, lessons, lessonProgress, completeLesson } = useDataStore();

  if (lessonSlug) return <LessonView slug={lessonSlug} />;
  if (trackSlug) return <TrackView slug={trackSlug} />;
  return <TracksList />;
}

function TracksList() {
  const { tracks, lessons, lessonProgress } = useDataStore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Learning Tracks</h1>
      <p className="text-text-muted mb-8">Master CSS step by step with structured learning paths.</p>
      <div className="space-y-4">
        {tracks.map(track => {
          const trackLessons = lessons.filter(l => l.trackId === track.id);
          const completed = trackLessons.filter(l => lessonProgress.find(p => p.lessonId === l.id && p.completed)).length;
          const percent = trackLessons.length > 0 ? Math.round((completed / trackLessons.length) * 100) : 0;
          return (
            <Link key={track.id} to={`/learn/${track.slug}`} className="block bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold group-hover:text-accent transition-colors">{track.title}</h2>
                    {track.accessLevel === 'pro' && <Lock className="w-3.5 h-3.5 text-pro" />}
                  </div>
                  <p className="text-sm text-text-muted">{track.description}</p>
                </div>
                <span className="text-sm text-text-muted">{trackLessons.length} lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${percent}%` }} />
                </div>
                <span className="text-xs text-text-muted">{percent}%</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TrackView({ slug }: { slug: string }) {
  const { tracks, lessons, lessonProgress } = useDataStore();
  const track = tracks.find(t => t.slug === slug);
  if (!track) return <div className="p-8 text-center text-text-muted">Track not found</div>;
  const trackLessons = lessons.filter(l => l.trackId === track.id).sort((a, b) => a.order - b.order);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <Link to="/learn" className="text-sm text-text-muted hover:text-accent mb-4 inline-flex items-center gap-1">
        <ChevronLeft className="w-4 h-4" /> All Tracks
      </Link>
      <h1 className="text-2xl font-bold mb-2">{track.title}</h1>
      <p className="text-text-muted mb-8">{track.description}</p>
      <div className="space-y-3">
        {trackLessons.map((lesson, i) => {
          const progress = lessonProgress.find(p => p.lessonId === lesson.id);
          return (
            <Link key={lesson.id} to={`/lesson/${lesson.slug}`} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/30 transition-all group">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${progress?.completed ? 'bg-success/20 text-success' : 'bg-accent/10 text-accent'}`}>
                {progress?.completed ? <CheckCircle className="w-5 h-5" /> : i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-medium group-hover:text-accent transition-colors">{lesson.title}</h3>
                <p className="text-sm text-text-muted">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Clock className="w-3 h-3" /> {lesson.estimatedMinutes}m
                {lesson.accessLevel === 'pro' && <Lock className="w-3 h-3 text-pro ml-2" />}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function LessonView({ slug }: { slug: string }) {
  const { lessons, tracks, completeLesson, lessonProgress } = useDataStore();
  const navigate = useNavigate();
  const lesson = lessons.find(l => l.slug === slug);
  const [activeExample, setActiveExample] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!lesson) return <div className="p-8 text-center text-text-muted">Lesson not found</div>;

  const track = tracks.find(t => t.id === lesson.trackId);
  const trackLessons = lessons.filter(l => l.trackId === lesson.trackId).sort((a, b) => a.order - b.order);
  const currentIndex = trackLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? trackLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < trackLessons.length - 1 ? trackLessons[currentIndex + 1] : null;
  const progress = lessonProgress.find(p => p.lessonId === lesson.id);

  useEffect(() => {
    updatePreview();
  }, [activeExample]);

  const updatePreview = () => {
    if (!iframeRef.current || !lesson.codeExamples[activeExample]) return;
    const example = lesson.codeExamples[activeExample];
    const html = `<!DOCTYPE html><html><head><style>${example.css}</style></head><body>${example.html}</body></html>`;
    iframeRef.current.srcdoc = html;
  };

  const handleComplete = () => {
    completeLesson(lesson.id);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <Link to={`/learn/${track?.slug}`} className="text-sm text-text-muted hover:text-accent mb-4 inline-flex items-center gap-1">
        <ChevronLeft className="w-4 h-4" /> {track?.title}
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} min</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${lesson.difficulty === 'beginner' ? 'bg-success/10 text-success' : lesson.difficulty === 'intermediate' ? 'bg-pro/10 text-pro' : 'bg-error/10 text-error'}`}>
              {lesson.difficulty}
            </span>
          </div>
        </div>
        {progress?.completed && (
          <span className="flex items-center gap-1 text-success text-sm"><CheckCircle className="w-4 h-4" /> Completed</span>
        )}
      </div>

      {/* Objectives */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wider text-text-muted">Learning Objectives</h2>
        <ul className="space-y-2">
          {lesson.objectives.map((obj, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-accent">{i + 1}</span>
              </div>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="prose prose-invert max-w-none">
          {lesson.content.split('\n\n').map((para, i) => (
            <p key={i} className="text-text-muted leading-relaxed mb-4">{para}</p>
          ))}
        </div>
      </div>

      {/* Interactive Example */}
      {lesson.codeExamples.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Live Example</span>
            </div>
            {lesson.codeExamples.length > 1 && (
              <div className="flex gap-1">
                {lesson.codeExamples.map((ex, i) => (
                  <button key={i} onClick={() => setActiveExample(i)} className={`px-2.5 py-1 text-xs rounded-md transition-colors ${i === activeExample ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary'}`}>
                    {ex.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted code-font">CSS</span>
                <button onClick={() => navigator.clipboard.writeText(lesson.codeExamples[activeExample].css)} className="text-xs text-text-muted hover:text-accent flex items-center gap-1">
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <pre className="bg-surface rounded-lg p-3 overflow-x-auto text-sm code-font text-text-primary">
                <code>{lesson.codeExamples[activeExample].css}</code>
              </pre>
            </div>
            <div className="p-4">
              <span className="text-xs text-text-muted code-font mb-2 block">Preview</span>
              <div className="bg-bg rounded-lg border border-border overflow-hidden">
                <iframe ref={iframeRef} className="w-full h-48 border-0" title="lesson-preview" sandbox="allow-same-origin" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete & Navigate */}
      <div className="flex items-center justify-between">
        <div>
          {prevLesson && (
            <Link to={`/lesson/${prevLesson.slug}`} className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent">
              <ChevronLeft className="w-4 h-4" /> {prevLesson.title}
            </Link>
          )}
        </div>
        <button onClick={handleComplete} className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${progress?.completed ? 'bg-success/20 text-success' : 'bg-accent hover:bg-accent-hover text-white'}`}>
          {progress?.completed ? '✓ Completed' : 'Mark Complete'}
        </button>
        <div>
          {nextLesson && (
            <Link to={`/lesson/${nextLesson.slug}`} className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent">
              {nextLesson.title} <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
