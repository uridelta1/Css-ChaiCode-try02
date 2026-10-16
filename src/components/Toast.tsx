import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  type: string;
  title: string;
  message: string;
  onClose: () => void;
}

export default function Toast({ type, title, message, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-error" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-pro" />,
  };

  return (
    <div className="animate-slide-in bg-card border border-border rounded-xl p-4 shadow-xl flex items-start gap-3 min-w-[300px] max-w-[400px]">
      {icons[type as keyof typeof icons] || icons.info}
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-text-muted mt-0.5">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-card-elevated rounded transition-colors">
        <X className="w-4 h-4 text-text-muted" />
      </button>
    </div>
  );
}
