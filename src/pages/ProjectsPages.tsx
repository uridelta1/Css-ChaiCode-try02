import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuthStore, useDataStore } from '../store';
import { FolderOpen, Plus, Trash2, Edit3, Play, ChevronLeft, Save, Eye } from 'lucide-react';

export default function ProjectsPages({ mode }: { mode?: 'my' }) {
  const { projectSlug } = useParams();
  if (projectSlug) return <ProjectView slug={projectSlug} />;
  if (mode === 'my') return <MyProjects />;
  return <ProjectCatalog />;
}

function ProjectCatalog() {
  const { projectTemplates } = useDataStore();
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Projects</h1>
          <p className="text-text-muted text-sm">Build real-world CSS projects with guided instructions.</p>
        </div>
        <Link to="/my-projects" className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
          <FolderOpen className="w-4 h-4" /> My Projects
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTemplates.map(template => (
          <Link key={template.id} to={`/projects/${template.slug}`} className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full ${template.difficulty === 'beginner' ? 'bg-success/10 text-success' : template.difficulty === 'intermediate' ? 'bg-pro/10 text-pro' : 'bg-error/10 text-error'}`}>
                {template.difficulty}
              </span>
              {template.accessLevel === 'pro' && <span className="text-xs px-2 py-0.5 bg-pro/10 text-pro rounded-full">Pro</span>}
            </div>
            <h3 className="font-semibold group-hover:text-accent transition-colors mb-2">{template.title}</h3>
            <p className="text-sm text-text-muted mb-3">{template.description}</p>
            <div className="flex items-center gap-1 flex-wrap">
              {template.requirements.slice(0, 3).map((req, i) => (
                <span key={i} className="text-xs bg-surface px-2 py-0.5 rounded text-text-muted">{req}</span>
              ))}
              {template.requirements.length > 3 && <span className="text-xs text-text-muted">+{template.requirements.length - 3} more</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MyProjects() {
  const { userProjects, deleteProject } = useDataStore();
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Projects</h1>
          <p className="text-text-muted text-sm">Your saved playground projects.</p>
        </div>
        <Link to="/playground" className="flex items-center gap-1.5 px-3 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>
      {userProjects.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <FolderOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-muted mb-4">No projects saved yet</p>
          <Link to="/playground" className="text-accent hover:text-accent-hover text-sm">Open the Playground →</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProjects.map(project => (
            <div key={project.id} className="bg-card border border-border rounded-xl p-5 group">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm truncate">{project.title}</h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => navigate(`/playground`)} className="p-1.5 hover:bg-card-elevated rounded text-text-muted hover:text-accent"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteProject(project.id)} className="p-1.5 hover:bg-card-elevated rounded text-text-muted hover:text-error"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="bg-bg rounded-lg border border-border h-24 overflow-hidden mb-3">
                <iframe srcDoc={`<!DOCTYPE html><html><head><style>${project.css}</style></head><body>${project.html}</body></html>`} className="w-full h-full border-0 pointer-events-none" title={project.title} sandbox="allow-same-origin" />
              </div>
              <p className="text-xs text-text-muted">{new Date(project.updatedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectView({ slug }: { slug: string }) {
  const { projectTemplates, saveProject } = useDataStore();
  const { isAuthenticated } = useAuthStore();
  const template = projectTemplates.find(t => t.slug === slug);
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('css');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (template) {
      setHtml(template.starterHtml);
      setCss(template.starterCss);
    }
  }, [template]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`;
    iframeRef.current.srcdoc = doc;
  }, [html, css]);

  if (!template) return <div className="p-8 text-center text-text-muted">Project not found</div>;

  const handleSave = () => {
    if (!isAuthenticated) return;
    saveProject({ title: template.title, html, css, templateId: template.id });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
        <div className="flex items-center gap-3">
          <Link to="/projects" className="text-text-muted hover:text-accent"><ChevronLeft className="w-4 h-4" /></Link>
          <h1 className="font-medium text-sm">{template.title}</h1>
          <span className={`text-xs px-2 py-0.5 rounded-full ${template.difficulty === 'beginner' ? 'bg-success/10 text-success' : template.difficulty === 'intermediate' ? 'bg-pro/10 text-pro' : 'bg-error/10 text-error'}`}>
            {template.difficulty}
          </span>
        </div>
        <button onClick={handleSave} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-success/20 text-success' : 'bg-accent hover:bg-accent-hover text-white'}`}>
          <Save className="w-3.5 h-3.5" /> {saved ? 'Saved!' : 'Save to My Projects'}
        </button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 flex flex-col border-r border-border">
          <div className="flex border-b border-border">
            <button onClick={() => setActiveTab('html')} className={`px-4 py-2 text-sm ${activeTab === 'html' ? 'text-accent border-b-2 border-accent' : 'text-text-muted'}`}>HTML</button>
            <button onClick={() => setActiveTab('css')} className={`px-4 py-2 text-sm ${activeTab === 'css' ? 'text-accent border-b-2 border-accent' : 'text-text-muted'}`}>CSS</button>
          </div>
          <textarea
            value={activeTab === 'html' ? html : css}
            onChange={e => activeTab === 'html' ? setHtml(e.target.value) : setCss(e.target.value)}
            className="flex-1 p-4 bg-bg text-text-primary code-font text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
          <div className="border-t border-border p-3 bg-surface">
            <p className="text-xs text-text-muted font-medium mb-1">Requirements:</p>
            <ul className="space-y-0.5">
              {template.requirements.map((req, i) => (
                <li key={i} className="text-xs text-text-muted flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="px-3 py-1.5 border-b border-border bg-surface flex items-center justify-between">
            <span className="text-xs text-text-muted">Preview</span>
          </div>
          <div className="flex-1 p-4 bg-bg">
            <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg">
              <iframe ref={iframeRef} className="w-full h-full border-0" title="project-preview" sandbox="allow-same-origin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
