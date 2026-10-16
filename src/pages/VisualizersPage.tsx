import { useState } from 'react';
import { BoxModelVisualizer, FlexboxVisualizer, GridVisualizer, PositionVisualizer, SpecificityCalculator, AnimationPlayground } from '../components/Visualizers';
import { Box, Layout, Grid3x3, Move, Calculator, Sparkles } from 'lucide-react';

const visualizers = [
  { id: 'box-model', label: 'Box Model', icon: Box, component: BoxModelVisualizer },
  { id: 'flexbox', label: 'Flexbox', icon: Layout, component: FlexboxVisualizer },
  { id: 'grid', label: 'CSS Grid', icon: Grid3x3, component: GridVisualizer },
  { id: 'position', label: 'Position', icon: Move, component: PositionVisualizer },
  { id: 'specificity', label: 'Specificity', icon: Calculator, component: SpecificityCalculator },
  { id: 'animation', label: 'Animations', icon: Sparkles, component: AnimationPlayground },
];

export default function VisualizersPage() {
  const [active, setActive] = useState('flexbox');

  const ActiveComponent = visualizers.find(v => v.id === active)?.component || BoxModelVisualizer;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">CSS Visualizers</h1>
        <p className="text-text-muted text-sm">Interactive tools to understand CSS properties visually.</p>
      </div>

      {/* Visualizer Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
        {visualizers.map(v => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${active === v.id ? 'bg-accent/10 text-accent border border-accent/20' : 'text-text-muted hover:bg-card hover:text-text-primary border border-transparent'}`}
          >
            <v.icon className="w-4 h-4" /> {v.label}
          </button>
        ))}
      </div>

      {/* Active Visualizer */}
      <ActiveComponent />
    </div>
  );
}
