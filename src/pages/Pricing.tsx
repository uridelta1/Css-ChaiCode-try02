import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with CSS',
      features: [
        '3 learning tracks (Foundations, Layout, Responsive)',
        '11 interactive lessons',
        'CSS playground access',
        '4 coding challenges',
        '3 guided projects',
        '10 AI tutor questions/day',
        'Progress tracking',
        'Community access',
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      description: 'For serious learners who want the full experience',
      features: [
        'All 5+ learning tracks',
        'All current and future lessons',
        'Unlimited playground projects',
        'All coding challenges',
        'All guided projects',
        '50 AI tutor questions/day',
        'Advanced analytics',
        'Priority support',
        'Certificate of completion',
        'Early access to new features',
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">CSS Visual</span>
          </Link>
          <Link to="/login" className="text-sm text-text-muted hover:text-text-primary transition-colors">Sign In</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-text-muted max-w-lg mx-auto">Start learning CSS for free. Upgrade to Pro for the complete experience with all tracks, challenges, and AI tutor access.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map(plan => (
            <div key={plan.name} className={`bg-card border rounded-2xl p-6 relative ${plan.highlighted ? 'border-accent shadow-lg shadow-accent/10' : 'border-border'}`}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1">{plan.name}</h2>
                <p className="text-sm text-text-muted mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-text-muted text-sm">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-accent' : 'text-success'}`} />
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${plan.highlighted ? 'bg-accent hover:bg-accent-hover text-white' : 'bg-card-elevated border border-border hover:border-accent/50 text-text-primary'}`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-text-muted">All plans include access to the CSS playground, community, and basic progress tracking.</p>
          <p className="text-xs text-text-muted mt-2">Payment integration requires Stripe/Razorpay configuration. Contact us for enterprise plans.</p>
        </div>
      </div>
    </div>
  );
}
