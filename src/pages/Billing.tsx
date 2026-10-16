import { Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { CreditCard, Check, ArrowUpRight, Crown } from 'lucide-react';

export default function BillingPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Billing & Subscription</h1>
      <p className="text-text-muted mb-8">Manage your subscription and billing.</p>

      {/* Current Plan */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Current Plan</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${user?.plan === 'pro' ? 'bg-pro/10 text-pro border border-pro/20' : 'bg-surface border border-border text-text-muted'}`}>
            {user?.plan === 'pro' ? 'Pro' : 'Free'}
          </span>
        </div>
        {user?.plan === 'pro' ? (
          <div className="space-y-3">
            <p className="text-sm text-text-muted">You have access to all features including Pro tracks, unlimited AI tutor questions, and priority support.</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-card-elevated border border-border rounded-lg text-sm text-text-muted hover:text-text-primary transition-colors">
                Manage Subscription
              </button>
              <button className="px-4 py-2 bg-error/10 border border-error/20 rounded-lg text-sm text-error hover:bg-error/20 transition-colors">
                Cancel Plan
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-text-muted">Upgrade to Pro for access to all learning tracks, unlimited projects, and more AI tutor questions.</p>
            <Link to="/pricing" className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
              <Crown className="w-4 h-4" /> Upgrade to Pro
            </Link>
          </div>
        )}
      </div>

      {/* Plan Comparison */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-4">Plan Features</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div></div>
          <div className="text-center font-medium">Free</div>
          <div className="text-center font-medium text-accent">Pro</div>
          {[
            ['Learning tracks', '3', 'All'],
            ['Lessons', '11', 'All'],
            ['AI questions/day', '10', '50'],
            ['Projects', 'Limited', 'Unlimited'],
            ['Challenges', '4', 'All'],
            ['Support', 'Community', 'Priority'],
          ].map(([feature, free, pro], i) => (
            <div key={i} className="contents">
              <div className="text-text-muted">{feature}</div>
              <div className="text-center text-text-muted">{free}</div>
              <div className="text-center">{pro}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Payment Method</h2>
        <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
          <CreditCard className="w-5 h-5 text-text-muted" />
          <div className="flex-1">
            <p className="text-sm">No payment method on file</p>
            <p className="text-xs text-text-muted">Payment integration requires Stripe/Razorpay configuration</p>
          </div>
        </div>
        <p className="text-xs text-text-muted mt-3">
          Payment processing requires server-side integration with Stripe or Razorpay. Set the PAYMENT_PROVIDER environment variable and configure API keys to enable billing.
        </p>
      </div>
    </div>
  );
}
