import { useState } from 'react';
import { useAuthStore } from '../store';
import { User, Lock, Palette, Save } from 'lucide-react';

export default function SettingsPages() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, updateProfile } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  const handleSaveProfile = () => {
    updateProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="flex gap-6">
        <nav className="w-40 flex-shrink-0 hidden sm:block">
          <div className="space-y-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-card hover:text-text-primary'}`}>
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1">
          {/* Mobile tabs */}
          <div className="flex gap-1 mb-6 sm:hidden">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-1.5 rounded-lg text-xs ${activeTab === tab.id ? 'bg-accent/10 text-accent' : 'text-text-muted'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">Role</label>
                  <input type="text" value={user?.role || 'user'} disabled className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-text-muted" />
                </div>
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">Plan</label>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1.5 rounded-lg text-sm ${user?.plan === 'pro' ? 'bg-pro/10 text-pro border border-pro/20' : 'bg-surface border border-border text-text-muted'}`}>
                      {user?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
                    </span>
                  </div>
                </div>
                <button onClick={handleSaveProfile} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-success/20 text-success' : 'bg-accent hover:bg-accent-hover text-white'}`}>
                  <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent/50" />
                </div>
                <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
                  Update Password
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium mb-3 text-sm">Active Sessions</h3>
                <div className="p-3 bg-surface rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Current session</p>
                      <p className="text-xs text-text-muted">This device · Active now</p>
                    </div>
                    <span className="text-xs text-success">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">Theme</label>
                  <select className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent/50">
                    <option value="dark">Dark (Default)</option>
                    <option value="light">Light (Coming soon)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-text-muted block mb-1.5">Editor Font Size</label>
                  <input type="range" min="12" max="20" defaultValue={user?.preferences?.fontSize || 14} className="w-full" />
                </div>
                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div>
                    <p className="text-sm">Editor Minimap</p>
                    <p className="text-xs text-text-muted">Show code minimap in playground</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-border peer-checked:bg-accent rounded-full peer-focus:ring-2 peer-focus:ring-accent/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
                <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
