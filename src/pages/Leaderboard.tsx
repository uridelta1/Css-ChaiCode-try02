import { useDataStore } from '../store';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

export default function LeaderboardPage() {
  const { lessonProgress, challengeAttempts, userProjects } = useDataStore();

  // Simulate leaderboard data based on actual progress
  const completedLessons = lessonProgress.filter(p => p.completed).length;
  const passedChallenges = challengeAttempts.filter(a => a.passed).length;
  const totalProjects = userProjects.length;

  const leaderboard = [
    { rank: 1, name: 'You', lessons: completedLessons, challenges: passedChallenges, projects: totalProjects, score: completedLessons * 10 + passedChallenges * 20 + totalProjects * 15, isUser: true },
    { rank: 2, name: 'CSSNinja', lessons: 9, challenges: 4, projects: 6, score: 230, isUser: false },
    { rank: 3, name: 'FlexMaster', lessons: 7, challenges: 3, projects: 4, score: 180, isUser: false },
    { rank: 4, name: 'GridGuru', lessons: 6, challenges: 2, projects: 3, score: 145, isUser: false },
    { rank: 5, name: 'BoxModelPro', lessons: 5, challenges: 2, projects: 2, score: 120, isUser: false },
    { rank: 6, name: 'StyleWiz', lessons: 4, challenges: 1, projects: 2, score: 90, isUser: false },
    { rank: 7, name: 'PixelPerfect', lessons: 3, challenges: 1, projects: 1, score: 65, isUser: false },
    { rank: 8, name: 'CSSRookie', lessons: 2, challenges: 0, projects: 1, score: 35, isUser: false },
  ].sort((a, b) => b.score - a.score).map((entry, i) => ({ ...entry, rank: i + 1 }));

  const userEntry = leaderboard.find(e => e.isUser);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
      <p className="text-text-muted mb-6">See how you rank among CSS learners.</p>

      {/* Your Position */}
      {userEntry && (
        <div className="bg-card border border-accent/20 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <span className="text-accent font-bold">#{userEntry.rank}</span>
          </div>
          <div className="flex-1">
            <p className="font-medium">Your Position</p>
            <p className="text-xs text-text-muted">{userEntry.score} points</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-text-muted">{userEntry.lessons} lessons · {userEntry.challenges} challenges</p>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-surface grid grid-cols-12 text-xs text-text-muted font-medium">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Learner</div>
          <div className="col-span-2 text-center">Lessons</div>
          <div className="col-span-2 text-center">Challenges</div>
          <div className="col-span-3 text-right">Score</div>
        </div>
        {leaderboard.map(entry => (
          <div key={entry.rank} className={`px-5 py-3 grid grid-cols-12 items-center text-sm border-t border-border ${entry.isUser ? 'bg-accent/5' : ''}`}>
            <div className="col-span-1">
              {entry.rank === 1 ? <Crown className="w-5 h-5 text-pro" /> :
               entry.rank === 2 ? <Medal className="w-5 h-5 text-gray-300" /> :
               entry.rank === 3 ? <Award className="w-5 h-5 text-amber-600" /> :
               <span className="text-text-muted">#{entry.rank}</span>}
            </div>
            <div className="col-span-4">
              <span className={`font-medium ${entry.isUser ? 'text-accent' : ''}`}>{entry.name}</span>
              {entry.isUser && <span className="ml-2 text-xs text-accent">(You)</span>}
            </div>
            <div className="col-span-2 text-center text-text-muted">{entry.lessons}</div>
            <div className="col-span-2 text-center text-text-muted">{entry.challenges}</div>
            <div className="col-span-3 text-right font-medium">{entry.score} pts</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-text-muted mt-4 text-center">
        Scoring: 10 pts per lesson · 20 pts per challenge · 15 pts per project
      </p>
    </div>
  );
}
