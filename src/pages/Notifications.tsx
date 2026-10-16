import { useDataStore } from '../store';
import { Bell, Check, CheckCheck, Info, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useDataStore();

  const markAllRead = () => {
    notifications.forEach(n => markNotificationRead(n.id));
  };

  const icons = {
    success: <CheckCircle className="w-4 h-4 text-success" />,
    error: <AlertCircle className="w-4 h-4 text-error" />,
    info: <Info className="w-4 h-4 text-blue-400" />,
    warning: <AlertTriangle className="w-4 h-4 text-pro" />,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Notifications</h1>
          <p className="text-text-muted text-sm">{notifications.filter(n => !n.read).length} unread</p>
        </div>
        {notifications.length > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-muted hover:text-text-primary bg-card border border-border rounded-lg transition-colors">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <Bell className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-muted">No notifications yet</p>
          <p className="text-xs text-text-muted mt-1">You'll see updates about your learning progress here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(n => (
            <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${n.read ? 'bg-card border-border' : 'bg-card border-accent/20 bg-accent/5'}`} onClick={() => !n.read && markNotificationRead(n.id)}>
              <div className="mt-0.5">{icons[n.type as keyof typeof icons]}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-text-muted mt-0.5">{n.message}</p>
                <p className="text-xs text-text-muted mt-1">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              {!n.read && (
                <button onClick={(e) => { e.stopPropagation(); markNotificationRead(n.id); }} className="p-1 hover:bg-card-elevated rounded">
                  <Check className="w-3.5 h-3.5 text-text-muted" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
