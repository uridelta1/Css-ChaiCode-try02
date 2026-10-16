import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Code2, Target, Trash2, ExternalLink } from 'lucide-react';
import { useDataStore } from '../store';

export default function BookmarksPage() {
  const { lessons, challenges } = useDataStore();
  const [bookmarks, setBookmarks] = useState<{ type: string; id: string; title: string; slug: string }[]>(() => {
    return JSON.parse(localStorage.getItem('cssv_bookmarks') || '[]');
  });

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('cssv_bookmarks', JSON.stringify(updated));
  };

  const addBookmark = (type: string, id: string, title: string, slug: string) => {
    if (bookmarks.find(b => b.id === id)) return;
    const updated = [...bookmarks, { type, id, title, slug }];
    setBookmarks(updated);
    localStorage.setItem('cssv_bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Bookmarks</h1>
      <p className="text-text-muted mb-6">Your saved lessons and resources.</p>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <Bookmark className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-muted mb-2">No bookmarks yet</p>
          <p className="text-xs text-text-muted">Save lessons and challenges for quick access</p>
          <div className="mt-4 flex gap-2 justify-center">
            <Link to="/learn" className="text-sm text-accent hover:text-accent-hover">Browse Lessons →</Link>
            <Link to="/challenges" className="text-sm text-accent hover:text-accent-hover">Browse Challenges →</Link>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarks.map(bookmark => (
            <div key={bookmark.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  {bookmark.type === 'lesson' ? <BookOpen className="w-4 h-4 text-accent" /> : <Target className="w-4 h-4 text-accent" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{bookmark.title}</p>
                  <p className="text-xs text-text-muted">{bookmark.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={bookmark.type === 'lesson' ? `/lesson/${bookmark.slug}` : `/challenges/${bookmark.slug}`} className="p-2 hover:bg-card-elevated rounded-lg text-text-muted hover:text-accent">
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button onClick={() => removeBookmark(bookmark.id)} className="p-2 hover:bg-card-elevated rounded-lg text-text-muted hover:text-error">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick add section */}
      <div className="mt-8 bg-card border border-border rounded-xl p-5">
        <h2 className="font-medium mb-3 text-sm">Quick Add</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {lessons.slice(0, 4).map(lesson => (
            <button key={lesson.id} onClick={() => addBookmark('lesson', lesson.id, lesson.title, lesson.slug)} disabled={!!bookmarks.find(b => b.id === lesson.id)} className="flex items-center gap-2 p-2.5 bg-surface rounded-lg text-left text-sm hover:bg-card-elevated transition-colors disabled:opacity-50">
              <BookOpen className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="truncate">{lesson.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
