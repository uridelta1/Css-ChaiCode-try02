import { Link } from 'react-router-dom';
import { useAuthStore, useDataStore } from '../store';
import { BookOpen, Target, FolderOpen, Trophy, Flame, TrendingUp, ArrowRight, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { tracks, lessons, lessonProgress, challengeAttempts, userProjects, userAchievements } = useDataStore();

  const completedLessons = lessonProgress.filter(p => p.completed).length;
  const totalLessons = lessons.length;
  const completedChallenges = challengeAttempts.filter(a => a.passed).length;
  const totalProjects = userProjects.length;
  const totalAchievements = userAchievements.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Find next lesson
  const nextLesson = lessons.find(l => !lessonProgress.find(p => p.lessonId === l.id && p.completed));
  const currentTrack = nextLesson ? tracks.find(t => t.id === nextLesson.trackId) : null;

  // Recent activity
  const recentProgress = [...lessonProgress].sort((a, b) => new Date(b.lastVisitedAt).getTime() - new Date(a.lastVisitedAt).getTime()).slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name} 👋</h1>
        <p className="text-text-muted">Continue your CSS learning journey.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-accent" />
            </div>
            <span className="text-2xl font-bold">{completedLessons}</span>
          </div>
          <p className="text-xs text-text-muted">Lessons completed</p>
          <div className="mt-2 h-1.5 bg-surface rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-success" />
            </div>
            <span className="text-2xl font-bold">{completedChallenges}</span>
          </div>
          <p className="text-xs text-text-muted">Challenges passed</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FolderOpen className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-2xl font-bold">{totalProjects}</span>
          </div>
          <p className="text-xs text-text-muted">Projects saved</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-pro/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-pro" />
            </div>
            <span className="text-2xl font-bold">{totalAchievements}</span>
          </div>
          <p className="text-xs text-text-muted">Achievements</p>
        </div>
      </div>

      {/* Continue Learning */}
      {nextLesson && (
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent" /> Continue Learning
            </h2>
            {currentTrack && <span className="text-xs text-text-muted">{currentTrack.title}</span>}
          </div>
          <Link to={`/lesson/${nextLesson.slug}`} className="flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-card-elevated transition-colors group">
            <div>
              <h3 className="font-medium group-hover:text-accent transition-colors">{nextLesson.title}</h3>
              <p className="text-sm text-text-muted mt-1">{nextLesson.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> {nextLesson.estimatedMinutes} min</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${nextLesson.difficulty === 'beginner' ? 'bg-success/10 text-success' : nextLesson.difficulty === 'intermediate' ? 'bg-pro/10 text-pro' : 'bg-error/10 text-error'}`}>
                  {nextLesson.difficulty}
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Track Progress */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" /> Track Progress
          </h2>
          <div className="space-y-4">
            {tracks.map(track => {
              const trackLessons = lessons.filter(l => l.trackId === track.id);
              const completed = trackLessons.filter(l => lessonProgress.find(p => p.lessonId === l.id && p.completed)).length;
              const percent = trackLessons.length > 0 ? Math.round((completed / trackLessons.length) * 100) : 0;
              return (
                <div key={track.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm">{track.title}</span>
                    <span className="text-xs text-text-muted">{completed}/{trackLessons.length}</span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" /> Recent Activity
          </h2>
          {recentProgress.length > 0 ? (
            <div className="space-y-3">
              {recentProgress.map(prog => {
                const lesson = lessons.find(l => l.id === prog.lessonId);
                if (!lesson) return null;
                return (
                  <Link key={prog.lessonId} to={`/lesson/${lesson.slug}`} className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-card-elevated transition-colors">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${prog.completed ? 'text-success' : 'text-text-muted'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{lesson.title}</p>
                      <p className="text-xs text-text-muted">{new Date(prog.lastVisitedAt).toLocaleDateString()}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-8">No activity yet. Start learning!</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Link to="/playground" className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors group">
          <Code2Icon className="w-5 h-5 text-accent mb-2" />
          <p className="font-medium text-sm group-hover:text-accent transition-colors">Open Playground</p>
          <p className="text-xs text-text-muted mt-1">Experiment with CSS</p>
        </Link>
        <Link to="/challenges" className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors group">
          <Target className="w-5 h-5 text-accent mb-2" />
          <p className="font-medium text-sm group-hover:text-accent transition-colors">Try Challenges</p>
          <p className="text-xs text-text-muted mt-1">Test your skills</p>
        </Link>
        <Link to="/achievements" className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors group">
          <Trophy className="w-5 h-5 text-accent mb-2" />
          <p className="font-medium text-sm group-hover:text-accent transition-colors">View Achievements</p>
          <p className="text-xs text-text-muted mt-1">{totalAchievements} earned</p>
        </Link>
      </div>
    </div>
  );
}

function Code2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
