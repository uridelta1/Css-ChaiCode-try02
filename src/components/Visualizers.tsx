import { useState } from 'react';
import { Copy, RotateCcw, Eye } from 'lucide-react';

// Box Model Visualizer
export function BoxModelVisualizer() {
  const [margin, setMargin] = useState(20);
  const [border, setBorder] = useState(3);
  const [padding, setPadding] = useState(20);
  const [contentWidth, setContentWidth] = useState(150);
  const [contentHeight, setContentHeight] = useState(100);

  const css = `.box {
  width: ${contentWidth}px;
  height: ${contentHeight}px;
  padding: ${padding}px;
  border: ${border}px solid #ff7a45;
  margin: ${margin}px;
  box-sizing: border-box;
}`;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-surface flex items-center justify-between">
        <span className="text-sm font-medium">Box Model Visualizer</span>
        <div className="flex gap-2">
          <button onClick={() => navigator.clipboard.writeText(css)} className="text-text-muted hover:text-accent"><Copy className="w-4 h-4" /></button>
          <button onClick={() => { setMargin(20); setBorder(3); setPadding(20); setContentWidth(150); setContentHeight(100); }} className="text-text-muted hover:text-accent"><RotateCcw className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-4 space-y-3">
          <SliderControl label="Margin" value={margin} onChange={setMargin} max={60} color="#7fb069" />
          <SliderControl label="Border" value={border} onChange={setBorder} max={10} color="#ff7a45" />
          <SliderControl label="Padding" value={padding} onChange={setPadding} max={50} color="#c9a24a" />
          <SliderControl label="Width" value={contentWidth} onChange={setContentWidth} max={300} color="#60a5fa" />
          <SliderControl label="Height" value={contentHeight} onChange={setContentHeight} max={200} color="#60a5fa" />
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex-1 bg-bg rounded-lg border border-border flex items-center justify-center overflow-auto p-4 min-h-[200px]">
            <div style={{ margin: `${margin}px`, backgroundColor: 'rgba(127, 176, 105, 0.2)', padding: '0' }}>
              <div style={{ border: `${border}px solid #ff7a45`, backgroundColor: 'rgba(201, 162, 74, 0.2)' }}>
                <div style={{ padding: `${padding}px` }}>
                  <div style={{ width: `${contentWidth}px`, height: `${contentHeight}px`, backgroundColor: 'rgba(96, 165, 250, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-xs text-text-muted code-font">
                    content
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="bg-surface rounded-lg p-3 text-xs code-font text-text-muted overflow-x-auto">{css}</pre>
        </div>
      </div>
    </div>
  );
}

// Flexbox Visualizer
export function FlexboxVisualizer() {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('center');
  const [align, setAlign] = useState('center');
  const [wrap, setWrap] = useState('nowrap');
  const [gap, setGap] = useState(12);
  const [itemCount, setItemCount] = useState(4);

  const css = `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-surface flex items-center justify-between">
        <span className="text-sm font-medium">Flexbox Visualizer</span>
        <button onClick={() => navigator.clipboard.writeText(css)} className="text-text-muted hover:text-accent"><Copy className="w-4 h-4" /></button>
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-4 space-y-3">
          <SelectControl label="flex-direction" value={direction} onChange={setDirection} options={['row', 'row-reverse', 'column', 'column-reverse']} />
          <SelectControl label="justify-content" value={justify} onChange={setJustify} options={['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']} />
          <SelectControl label="align-items" value={align} onChange={setAlign} options={['flex-start', 'flex-end', 'center', 'stretch', 'baseline']} />
          <SelectControl label="flex-wrap" value={wrap} onChange={setWrap} options={['nowrap', 'wrap', 'wrap-reverse']} />
          <SliderControl label="gap" value={gap} onChange={setGap} max={40} color="#ff7a45" />
          <SliderControl label="items" value={itemCount} onChange={setItemCount} min={1} max={8} color="#60a5fa" />
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex-1 bg-bg rounded-lg border border-border p-4 min-h-[200px]" style={{ display: 'flex', flexDirection: direction as any, justifyContent: justify, alignItems: align, flexWrap: wrap as any, gap: `${gap}px` }}>
            {Array.from({ length: itemCount }, (_, i) => (
              <div key={i} className="bg-accent/80 rounded-lg px-4 py-3 text-white text-sm font-medium flex items-center justify-center" style={{ minWidth: '50px', minHeight: '40px' }}>
                {i + 1}
              </div>
            ))}
          </div>
          <pre className="bg-surface rounded-lg p-3 text-xs code-font text-text-muted overflow-x-auto">{css}</pre>
        </div>
      </div>
    </div>
  );
}

// Grid Visualizer
export function GridVisualizer() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(12);
  const [colSize, setColSize] = useState('1fr');

  const template = `repeat(${cols}, ${colSize})`;
  const css = `.grid {
  display: grid;
  grid-template-columns: ${template};
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
}`;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-surface flex items-center justify-between">
        <span className="text-sm font-medium">CSS Grid Visualizer</span>
        <button onClick={() => navigator.clipboard.writeText(css)} className="text-text-muted hover:text-accent"><Copy className="w-4 h-4" /></button>
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-4 space-y-3">
          <SliderControl label="columns" value={cols} onChange={setCols} min={1} max={6} color="#ff7a45" />
          <SliderControl label="rows" value={rows} onChange={setRows} min={1} max={4} color="#60a5fa" />
          <SliderControl label="gap" value={gap} onChange={setGap} max={40} color="#7fb069" />
          <SelectControl label="column size" value={colSize} onChange={setColSize} options={['1fr', '100px', '200px', 'auto', 'minmax(100px, 1fr)']} />
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex-1 bg-bg rounded-lg border border-border p-4 min-h-[200px]" style={{ display: 'grid', gridTemplateColumns: template.includes('minmax') ? `repeat(${cols}, minmax(100px, 1fr))` : template === 'auto' ? `repeat(${cols}, auto)` : template, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: `${gap}px` }}>
            {Array.from({ length: cols * rows }, (_, i) => (
              <div key={i} className="bg-accent/70 rounded-lg flex items-center justify-center text-white text-sm font-medium min-h-[60px]">
                {i + 1}
              </div>
            ))}
          </div>
          <pre className="bg-surface rounded-lg p-3 text-xs code-font text-text-muted overflow-x-auto">{css}</pre>
        </div>
      </div>
    </div>
  );
}

// Position Visualizer
export function PositionVisualizer() {
  const [position, setPosition] = useState('relative');
  const [top, setTop] = useState(20);
  const [left, setLeft] = useState(20);

  const css = `.element {
  position: ${position};
  ${position !== 'static' ? `top: ${top}px;\n  left: ${left}px;` : ''}
}`;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-surface flex items-center justify-between">
        <span className="text-sm font-medium">Position Visualizer</span>
        <button onClick={() => navigator.clipboard.writeText(css)} className="text-text-muted hover:text-accent"><Copy className="w-4 h-4" /></button>
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-4 space-y-3">
          <SelectControl label="position" value={position} onChange={setPosition} options={['static', 'relative', 'absolute', 'fixed', 'sticky']} />
          {position !== 'static' && (
            <>
              <SliderControl label="top" value={top} onChange={setTop} max={100} color="#ff7a45" />
              <SliderControl label="left" value={left} onChange={setLeft} max={100} color="#60a5fa" />
            </>
          )}
          <div className="bg-surface rounded-lg p-3 text-xs text-text-muted">
            <p><strong className="text-text-primary">static:</strong> Default flow</p>
            <p><strong className="text-text-primary">relative:</strong> Offset from normal position</p>
            <p><strong className="text-text-primary">absolute:</strong> Relative to positioned ancestor</p>
            <p><strong className="text-text-primary">fixed:</strong> Relative to viewport</p>
            <p><strong className="text-text-primary">sticky:</strong> Toggles based on scroll</p>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex-1 bg-bg rounded-lg border border-border p-4 min-h-[200px] relative">
            <div className="absolute inset-4 border border-dashed border-border rounded" />
            <div
              className="bg-accent rounded-lg px-4 py-3 text-white text-sm font-medium w-24 text-center"
              style={{
                position: position as any,
                ...(position !== 'static' ? { top: `${top}px`, left: `${left}px` } : {}),
              }}
            >
              Element
            </div>
          </div>
          <pre className="bg-surface rounded-lg p-3 text-xs code-font text-text-muted overflow-x-auto">{css}</pre>
        </div>
      </div>
    </div>
  );
}

// Specificity Calculator
export function SpecificityCalculator() {
  const [selector, setSelector] = useState('.card .title');
  
  const calculateSpecificity = (sel: string): [number, number, number] => {
    let ids = 0, classes = 0, elements = 0;
    const cleaned = sel.replace(/\s+/g, ' ').trim();
    // Count IDs
    ids = (cleaned.match(/#[a-zA-Z_-][\w-]*/g) || []).length;
    // Count classes, attributes, pseudo-classes
    classes = (cleaned.match(/\.[a-zA-Z_-][\w-]*/g) || []).length;
    classes += (cleaned.match(/\[[\w-]+(=[^\]]+)?\]/g) || []).length;
    classes += (cleaned.match(/:(?!:)[a-zA-Z_-][\w-]*(\([^)]*\))?/g) || []).length;
    // Count elements, pseudo-elements
    elements = (cleaned.match(/(?:^|[\s+>~])([a-zA-Z][\w-]*)/g) || []).length;
    elements += (cleaned.match(/::[a-zA-Z_-][\w-]*/g) || []).length;
    return [ids, classes, elements];
  };

  const [ids, classes, elements] = calculateSpecificity(selector);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-surface">
        <span className="text-sm font-medium">CSS Specificity Calculator</span>
      </div>
      <div className="p-4 space-y-4">
        <input
          type="text"
          value={selector}
          onChange={e => setSelector(e.target.value)}
          placeholder="Enter a CSS selector..."
          className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm code-font focus:outline-none focus:border-accent/50"
        />
        <div className="flex items-center gap-4">
          <div className="flex-1 text-center bg-surface rounded-lg p-3">
            <p className="text-2xl font-bold text-error">{ids}</p>
            <p className="text-xs text-text-muted">IDs</p>
          </div>
          <div className="flex-1 text-center bg-surface rounded-lg p-3">
            <p className="text-2xl font-bold text-pro">{classes}</p>
            <p className="text-xs text-text-muted">Classes</p>
          </div>
          <div className="flex-1 text-center bg-surface rounded-lg p-3">
            <p className="text-2xl font-bold text-success">{elements}</p>
            <p className="text-xs text-text-muted">Elements</p>
          </div>
        </div>
        <div className="text-center">
          <span className="text-lg code-font">Specificity: <span className="text-accent font-bold">{ids},{classes},{elements}</span></span>
        </div>
      </div>
    </div>
  );
}

// Animation Playground
export function AnimationPlayground() {
  const [duration, setDuration] = useState(2);
  const [timing, setTiming] = useState('ease-in-out');
  const [iteration, setIteration] = useState('infinite');
  const [animation, setAnimation] = useState('bounce');

  const animations: Record<string, string> = {
    bounce: '@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }',
    spin: '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
    pulse: '@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.8; } }',
    slide: '@keyframes slide { 0% { transform: translateX(-50px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }',
    fade: '@keyframes fade { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }',
  };

  const css = `.element {
  animation: ${animation} ${duration}s ${timing} ${iteration};
}
${animations[animation]}`;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-surface flex items-center justify-between">
        <span className="text-sm font-medium">Animation Playground</span>
        <button onClick={() => navigator.clipboard.writeText(css)} className="text-text-muted hover:text-accent"><Copy className="w-4 h-4" /></button>
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-4 space-y-3">
          <SelectControl label="animation" value={animation} onChange={setAnimation} options={['bounce', 'spin', 'pulse', 'slide', 'fade']} />
          <SliderControl label="duration (s)" value={duration} onChange={setDuration} min={0.5} max={5} step={0.5} color="#ff7a45" />
          <SelectControl label="timing" value={timing} onChange={setTiming} options={['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']} />
          <SelectControl label="iteration" value={iteration} onChange={setIteration} options={['infinite', '1', '2', '3']} />
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex-1 bg-bg rounded-lg border border-border flex items-center justify-center min-h-[200px]">
            <style>{animations[animation]}</style>
            <div
              className="w-20 h-20 bg-accent rounded-xl flex items-center justify-center text-white font-bold"
              style={{ animation: `${animation} ${duration}s ${timing} ${iteration}` }}
            >
              CSS
            </div>
          </div>
          <pre className="bg-surface rounded-lg p-3 text-xs code-font text-text-muted overflow-x-auto max-h-32">{css}</pre>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function SliderControl({ label, value, onChange, min = 0, max = 100, step = 1, color = '#ff7a45' }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; color?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-muted">{label}</span>
        <span className="text-xs code-font" style={{ color }}>{value}{typeof step === 'number' && step < 1 ? 's' : 'px'}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-surface rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
      />
    </div>
  );
}

function SelectControl({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <span className="text-xs text-text-muted block mb-1">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-2.5 py-1.5 bg-surface border border-border rounded-lg text-xs code-font text-text-primary focus:outline-none focus:border-accent/50"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
