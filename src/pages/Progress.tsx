import { useDataStore } from '../store';
import { BarChart3, BookOpen, Target, FolderOpen, TrendingUp, Calendar } from 'lucide-react';

export default function ProgressPage() {
  const { tracks, lessons, lessonProgress, challengeAttempts, userProjects, userAchievements } = useDataStore();

  const completedLessons = lessonProgress.filter(p => p.completed).length;
  const totalLessons = lessons.length;
  const passedChallenges = challengeAttempts.filter(a => a.passed).length;
  const totalChallenges = challengeAttempts.length;
  const successRate = totalChallenges > 0 ? Math.round((passedChallenges / totalChallenges) * 100) : 0;

  // Weekly activity
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toDateString();
    const count = lessonProgress.filter(p => p.lastVisitedAt && new Date(p.lastVisitedAt).toDateString() === dateStr).length;
    return { day: date.toLocaleDateString('en', { weekday: 'short' }), count, date: dateStr };
  });
  const maxActivity = Math.max(...last7Days.map(d => d.count), 1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Learning Progress</h1>
      <p className="text-text-muted mb-8">Track your CSS learning journey.</p>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-5">
          <BookOpen className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-bold">{completedLessons}/{totalLessons}</p>
          <p className="text-xs text-text-muted">Lessons completed</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <Target className="w-5 h-5 text-success mb-2" />
          <p className="text-2xl font-bold">{passedChallenges}</p>
          <p className="text-xs text-text-muted">Challenges passed</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <TrendingUp className="w-5 h-5 text-blue-400 mb-2" />
          <p className="text-2xl font-bold">{successRate}%</p>
          <p className="text-xs text-text-muted">Success rate</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <FolderOpen className="w-5 h-5 text-pro mb-2" />
          <p className="text-2xl font-bold">{userProjects.length}</p>
          <p className="text-xs text-text-muted">Projects saved</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" /> Weekly Activity
          </h2>
          <div className="flex items-end gap-2 h-32">
            {last7Days.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-surface rounded-t relative" style={{ height: '100px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-accent rounded-t transition-all"
                    style={{ height: `${(day.count / maxActivity) * 100}%`, minHeight: day.count > 0 ? '8px' : '0' }}
                  />
                </div>
                <span className="text-[10px] text-text-muted">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track Progress */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" /> Track Progress
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
                    <span className="text-xs text-text-muted">{percent}%</span>
                  </div>
                  <div className="h-3 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                  </div>
                  <p className="text-xs text-text-muted mt-1">{completed} of {trackLessons.length} lessons</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievements Summary */}
      <div className="bg-card border border-border rounded-xl p-6 mt-6">
        <h2 className="font-semibold mb-4">Achievements</h2>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-accent">{userAchievements.length}</div>
          <div>
            <p className="text-sm">of 8 achievements earned</p>
            <div className="h-2 w-32 bg-surface rounded-full overflow-hidden mt-1">
              <div className="h-full bg-pro rounded-full" style={{ width: `${(userAchievements.length / 8) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
