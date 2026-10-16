import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuthStore, useDataStore } from '../store';
import { Play, RotateCcw, Save, Download, Copy, Smartphone, Tablet, Monitor, Code2, Eye } from 'lucide-react';

const starterTemplates = [
  { name: 'Blank', html: '', css: '/* Your CSS here */\n' },
  { name: 'Flexbox Demo', html: '<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>', css: '.container {\n  display: flex;\n  gap: 16px;\n  padding: 20px;\n  background: #1b1a15;\n  min-height: 200px;\n}\n.item {\n  flex: 1;\n  background: #ff7a45;\n  padding: 20px;\n  border-radius: 8px;\n  color: white;\n  text-align: center;\n  font-weight: bold;\n}' },
  { name: 'Grid Layout', html: '<div class="grid">\n  <div class="cell header">Header</div>\n  <div class="cell sidebar">Sidebar</div>\n  <div class="cell main">Main Content</div>\n  <div class="cell footer">Footer</div>\n</div>', css: '.grid {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: auto 1fr auto;\n  gap: 8px;\n  padding: 8px;\n  min-height: 300px;\n  background: #0d0e09;\n}\n.cell {\n  padding: 16px;\n  border-radius: 8px;\n  color: white;\n}\n.header { grid-column: 1 / -1; background: #ff7a45; }\n.sidebar { background: #21201a; }\n.main { background: #1b1a15; }\n.footer { grid-column: 1 / -1; background: #21201a; }' },
  { name: 'Card', html: '<div class="card">\n  <div class="card-img">🖼️</div>\n  <div class="card-body">\n    <h2>Card Title</h2>\n    <p>Some description text for this card component.</p>\n    <button>Read More</button>\n  </div>\n</div>', css: '.card {\n  width: 300px;\n  background: #1b1a15;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid #302d25;\n}\n.card-img {\n  height: 150px;\n  background: linear-gradient(135deg, #ff7a45, #c9a24a);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 3rem;\n}\n.card-body {\n  padding: 20px;\n}\n.card-body h2 {\n  color: #eee8d8;\n  margin: 0 0 8px;\n}\n.card-body p {\n  color: #9b9687;\n  font-size: 0.9rem;\n  margin: 0 0 16px;\n}\n.card-body button {\n  background: #ff7a45;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n}' },
  { name: 'Animation', html: '<div class="scene">\n  <div class="box">Animate</div>\n</div>', css: '.scene {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 200px;\n  background: #1b1a15;\n}\n.box {\n  width: 80px;\n  height: 80px;\n  background: #ff7a45;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: bold;\n  animation: float 3s ease-in-out infinite;\n}\n@keyframes float {\n  0%, 100% { transform: translateY(0) rotate(0deg); }\n  25% { transform: translateY(-20px) rotate(5deg); }\n  75% { transform: translateY(10px) rotate(-3deg); }\n}' },
];

export default function PlaygroundPage() {
  const { isAuthenticated } = useAuthStore();
  const { saveProject } = useDataStore();
  const [html, setHtml] = useState(starterTemplates[1].html);
  const [css, setCss] = useState(starterTemplates[1].css);
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('css');
  const [previewSize, setPreviewSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [projectName, setProjectName] = useState('Untitled Project');
  const [showSaved, setShowSaved] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return;
    const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`;
    iframeRef.current.srcdoc = doc;
  }, [html, css]);

  useEffect(() => {
    const timer = setTimeout(updatePreview, 300);
    return () => clearTimeout(timer);
  }, [updatePreview]);

  const handleReset = () => {
    setHtml('');
    setCss('/* Your CSS here */\n');
  };

  const handleSave = () => {
    if (!isAuthenticated) return;
    saveProject({ title: projectName, html, css });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleCopy = () => {
    const code = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}`;
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const content = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>${projectName}</title>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n</body>\n</html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadTemplate = (idx: number) => {
    setHtml(starterTemplates[idx].html);
    setCss(starterTemplates[idx].css);
  };

  const previewWidth = previewSize === 'mobile' ? '375px' : previewSize === 'tablet' ? '768px' : '100%';

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            className="bg-transparent border-none text-sm font-medium focus:outline-none text-text-primary w-40"
          />
          <div className="flex gap-1 bg-card rounded-lg p-0.5">
            {starterTemplates.map((t, i) => (
              <button key={i} onClick={() => loadTemplate(i)} className="px-2 py-1 text-xs text-text-muted hover:text-text-primary rounded transition-colors">
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-card rounded-lg p-0.5">
            <button onClick={() => setPreviewSize('mobile')} className={`p-1.5 rounded ${previewSize === 'mobile' ? 'bg-card-elevated text-accent' : 'text-text-muted'}`}><Smartphone className="w-4 h-4" /></button>
            <button onClick={() => setPreviewSize('tablet')} className={`p-1.5 rounded ${previewSize === 'tablet' ? 'bg-card-elevated text-accent' : 'text-text-muted'}`}><Tablet className="w-4 h-4" /></button>
            <button onClick={() => setPreviewSize('desktop')} className={`p-1.5 rounded ${previewSize === 'desktop' ? 'bg-card-elevated text-accent' : 'text-text-muted'}`}><Monitor className="w-4 h-4" /></button>
          </div>
          <button onClick={handleReset} className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-card transition-colors" title="Reset"><RotateCcw className="w-4 h-4" /></button>
          <button onClick={handleCopy} className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-card transition-colors" title="Copy"><Copy className="w-4 h-4" /></button>
          <button onClick={handleDownload} className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-card transition-colors" title="Download"><Download className="w-4 h-4" /></button>
          {isAuthenticated && (
            <button onClick={handleSave} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${showSaved ? 'bg-success/20 text-success' : 'bg-accent hover:bg-accent-hover text-white'}`}>
              <Save className="w-3.5 h-3.5" /> {showSaved ? 'Saved!' : 'Save'}
            </button>
          )}
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/2 flex flex-col border-r border-border">
          <div className="flex border-b border-border">
            <button onClick={() => setActiveTab('html')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'html' ? 'text-accent border-b-2 border-accent' : 'text-text-muted hover:text-text-primary'}`}>
              <span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> HTML</span>
            </button>
            <button onClick={() => setActiveTab('css')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'css' ? 'text-accent border-b-2 border-accent' : 'text-text-muted hover:text-text-primary'}`}>
              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> CSS</span>
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <textarea
              value={activeTab === 'html' ? html : css}
              onChange={e => activeTab === 'html' ? setHtml(e.target.value) : setCss(e.target.value)}
              className="w-full h-full p-4 bg-bg text-text-primary code-font text-sm resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
              placeholder={activeTab === 'html' ? '<!-- Write your HTML here -->' : '/* Write your CSS here */'}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 flex flex-col bg-bg">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-surface">
            <span className="text-xs text-text-muted">Preview</span>
            <span className="text-xs text-text-muted code-font">{previewSize}</span>
          </div>
          <div className="flex-1 overflow-auto p-4 flex justify-center">
            <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-xl transition-all" style={{ maxWidth: previewWidth }}>
              <iframe ref={iframeRef} className="w-full h-full border-0" title="playground-preview" sandbox="allow-scripts allow-same-origin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
