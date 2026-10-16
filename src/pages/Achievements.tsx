import { useDataStore } from '../store';
import { Trophy, Lock } from 'lucide-react';

export default function AchievementsPage() {
  const { achievements, userAchievements } = useDataStore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Achievements</h1>
      <p className="text-text-muted mb-8">Earn badges as you progress through your CSS learning journey.</p>

      <div className="mb-6 bg-card border border-border rounded-xl p-4 flex items-center gap-4">
        <Trophy className="w-8 h-8 text-pro" />
        <div>
          <p className="text-2xl font-bold">{userAchievements.length} <span className="text-sm font-normal text-text-muted">/ {achievements.length}</span></p>
          <p className="text-sm text-text-muted">Achievements earned</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {achievements.map(achievement => {
          const earned = userAchievements.find(a => a.achievementId === achievement.id);
          return (
            <div key={achievement.id} className={`bg-card border rounded-xl p-5 transition-all ${earned ? 'border-pro/30' : 'border-border opacity-60'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${earned ? 'bg-pro/10' : 'bg-surface'}`}>
                  {earned ? achievement.icon : <Lock className="w-5 h-5 text-text-muted" />}
                </div>
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-text-muted mt-0.5">{achievement.description}</p>
                  {earned && (
                    <p className="text-xs text-pro mt-2">Earned {new Date(earned.awardedAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
