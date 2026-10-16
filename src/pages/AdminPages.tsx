import { useDataStore, useAuthStore } from '../store';
import { Shield, Users, BookOpen, Target, FolderOpen, CreditCard, Brain, BarChart3, Settings, FileText } from 'lucide-react';
import { useState } from 'react';

export default function AdminPages() {
  const [activeSection, setActiveSection] = useState('overview');
  const { tracks, lessons, challenges, projectTemplates, lessonProgress, challengeAttempts, userProjects } = useDataStore();
  const users = JSON.parse(localStorage.getItem('cssv_users') || '[]');

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'ai-settings', label: 'AI Settings', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'audit-logs', label: 'Audit Logs', icon: FileText },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-accent" />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <nav className="w-48 flex-shrink-0 hidden lg:block">
          <div className="space-y-1">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === s.id ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-card hover:text-text-primary'}`}>
                <s.icon className="w-4 h-4" /> {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile nav */}
        <div className="lg:hidden mb-4 w-full overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)} className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${activeSection === s.id ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-card'}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeSection === 'overview' && <AdminOverview users={users} tracks={tracks} lessons={lessons} challenges={challenges} lessonProgress={lessonProgress} challengeAttempts={challengeAttempts} />}
          {activeSection === 'users' && <AdminUsers users={users} />}
          {activeSection === 'courses' && <AdminCourses tracks={tracks} lessons={lessons} />}
          {activeSection === 'challenges' && <AdminChallenges challenges={challenges} />}
          {activeSection === 'projects' && <AdminProjects projectTemplates={projectTemplates} userProjects={userProjects} />}
          {activeSection === 'subscriptions' && <AdminSubscriptions users={users} />}
          {activeSection === 'ai-settings' && <AdminAISettings />}
          {activeSection === 'analytics' && <AdminAnalytics lessonProgress={lessonProgress} challengeAttempts={challengeAttempts} />}
          {activeSection === 'audit-logs' && <AdminAuditLogs />}
        </div>
      </div>
    </div>
  );
}

function AdminOverview({ users, tracks, lessons, challenges, lessonProgress, challengeAttempts }: any) {
  const proUsers = users.filter((u: any) => u.plan === 'pro').length;
  const freeUsers = users.length - proUsers;
  const completedLessons = lessonProgress.filter((p: any) => p.completed).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-xs text-text-muted">Total Users</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-success">{proUsers}</p>
          <p className="text-xs text-text-muted">Pro Users</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold">{completedLessons}</p>
          <p className="text-xs text-text-muted">Lessons Completed</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold">{challengeAttempts.filter((a: any) => a.passed).length}</p>
          <p className="text-xs text-text-muted">Challenges Passed</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-medium mb-3">Content Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Tracks</span><span>{tracks.length}</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Lessons</span><span>{lessons.length}</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Challenges</span><span>{challenges.length}</span></div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-medium mb-3">User Distribution</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Free users</span><span>{freeUsers}</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Pro users</span><span>{proUsers}</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Admins</span><span>{users.filter((u: any) => u.role === 'admin').length}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminUsers({ users }: any) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-medium">Users ({users.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="text-left px-4 py-2 text-text-muted font-medium">Name</th>
              <th className="text-left px-4 py-2 text-text-muted font-medium">Email</th>
              <th className="text-left px-4 py-2 text-text-muted font-medium">Role</th>
              <th className="text-left px-4 py-2 text-text-muted font-medium">Plan</th>
              <th className="text-left px-4 py-2 text-text-muted font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, i: number) => (
              <tr key={i} className="border-t border-border">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3 text-text-muted">{user.email}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-surface text-text-muted'}`}>{user.role}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${user.plan === 'pro' ? 'bg-pro/10 text-pro' : 'bg-surface text-text-muted'}`}>{user.plan}</span></td>
                <td className="px-4 py-3 text-text-muted">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCourses({ tracks, lessons }: any) {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-medium mb-3">Tracks ({tracks.length})</h3>
        <div className="space-y-2">
          {tracks.map((track: any) => (
            <div key={track.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div>
                <p className="text-sm font-medium">{track.title}</p>
                <p className="text-xs text-text-muted">{track.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${track.accessLevel === 'pro' ? 'bg-pro/10 text-pro' : 'bg-success/10 text-success'}`}>{track.accessLevel}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${track.published ? 'bg-success/10 text-success' : 'bg-surface text-text-muted'}`}>{track.published ? 'Published' : 'Draft'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-medium mb-3">Lessons ({lessons.length})</h3>
        <div className="space-y-2">
          {lessons.map((lesson: any) => (
            <div key={lesson.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div>
                <p className="text-sm font-medium">{lesson.title}</p>
                <p className="text-xs text-text-muted">{lesson.estimatedMinutes} min · {lesson.difficulty}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${lesson.status === 'published' ? 'bg-success/10 text-success' : 'bg-surface text-text-muted'}`}>{lesson.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminChallenges({ challenges }: any) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-medium mb-3">Challenges ({challenges.length})</h3>
      <div className="space-y-2">
        {challenges.map((c: any) => (
          <div key={c.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div>
              <p className="text-sm font-medium">{c.title}</p>
              <p className="text-xs text-text-muted">{c.type} · {c.difficulty}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === 'published' ? 'bg-success/10 text-success' : 'bg-surface text-text-muted'}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminProjects({ projectTemplates, userProjects }: any) {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-medium mb-3">Templates ({projectTemplates.length})</h3>
        <div className="space-y-2">
          {projectTemplates.map((p: any) => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <p className="text-sm">{p.title}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${p.difficulty === 'beginner' ? 'bg-success/10 text-success' : p.difficulty === 'intermediate' ? 'bg-pro/10 text-pro' : 'bg-error/10 text-error'}`}>{p.difficulty}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-medium mb-3">User Projects ({userProjects.length})</h3>
        {userProjects.length === 0 ? <p className="text-sm text-text-muted">No user projects yet.</p> : (
          <div className="space-y-2">
            {userProjects.map((p: any) => (
              <div key={p.id} className="p-3 bg-surface rounded-lg">
                <p className="text-sm">{p.title}</p>
                <p className="text-xs text-text-muted">{new Date(p.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminSubscriptions({ users }: any) {
  const proUsers = users.filter((u: any) => u.plan === 'pro');
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-medium mb-3">Subscription Overview</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-surface rounded-lg p-3 text-center">
          <p className="text-xl font-bold">{users.length}</p>
          <p className="text-xs text-text-muted">Total</p>
        </div>
        <div className="bg-surface rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-text-muted">{users.length - proUsers.length}</p>
          <p className="text-xs text-text-muted">Free</p>
        </div>
        <div className="bg-surface rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-pro">{proUsers.length}</p>
          <p className="text-xs text-text-muted">Pro</p>
        </div>
      </div>
      <p className="text-xs text-text-muted">Payment integration requires Stripe/Razorpay configuration. Set PAYMENT_PROVIDER environment variable to enable.</p>
    </div>
  );
}

function AdminAISettings() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-medium mb-4">AI Tutor Configuration</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-text-muted block mb-1">Guest daily limit</label>
            <input type="number" defaultValue={5} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-1">Free user daily limit</label>
            <input type="number" defaultValue={10} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-1">Pro user daily limit</label>
            <input type="number" defaultValue={50} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs text-text-muted block mb-1">Admin daily limit</label>
            <input type="number" defaultValue={999} className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">AI Provider</label>
          <select className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm">
            <option>Not configured</option>
            <option>OpenAI</option>
            <option>Anthropic</option>
            <option>Custom endpoint</option>
          </select>
        </div>
        <p className="text-xs text-text-muted">AI provider requires API key configuration via environment variables. The tutor currently uses a built-in knowledge base.</p>
        <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">Save Settings</button>
      </div>
    </div>
  );
}

function AdminAnalytics({ lessonProgress, challengeAttempts }: any) {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-medium mb-3">Learning Analytics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface rounded-lg p-3">
            <p className="text-lg font-bold">{lessonProgress.length}</p>
            <p className="text-xs text-text-muted">Total lesson visits</p>
          </div>
          <div className="bg-surface rounded-lg p-3">
            <p className="text-lg font-bold">{lessonProgress.filter((p: any) => p.completed).length}</p>
            <p className="text-xs text-text-muted">Lessons completed</p>
          </div>
          <div className="bg-surface rounded-lg p-3">
            <p className="text-lg font-bold">{challengeAttempts.length}</p>
            <p className="text-xs text-text-muted">Challenge attempts</p>
          </div>
          <div className="bg-surface rounded-lg p-3">
            <p className="text-lg font-bold">{challengeAttempts.filter((a: any) => a.passed).length}</p>
            <p className="text-xs text-text-muted">Challenges passed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminAuditLogs() {
  const logs = [
    { action: 'System initialized', timestamp: new Date().toISOString(), actor: 'System' },
    { action: 'Admin account created', timestamp: new Date().toISOString(), actor: 'System' },
    { action: 'Seed data loaded', timestamp: new Date().toISOString(), actor: 'System' },
  ];
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-medium mb-3">Audit Logs</h3>
      <div className="space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div>
              <p className="text-sm">{log.action}</p>
              <p className="text-xs text-text-muted">by {log.actor}</p>
            </div>
            <span className="text-xs text-text-muted">{new Date(log.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
