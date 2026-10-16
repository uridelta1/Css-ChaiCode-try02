import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { useAuthStore, useDataStore } from '../store';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm your CSS tutor. Ask me anything about CSS — I can explain properties, help debug your code, or suggest learning paths. What would you like to know?", timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();
  const { incrementAIUsage, getAIUsageRemaining } = useDataStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const cssKnowledge: Record<string, string> = {
    'flexbox': 'Flexbox is a one-dimensional layout method. Use `display: flex` on a container, then control alignment with `justify-content` (main axis) and `align-items` (cross axis). Key properties include `flex-direction`, `flex-wrap`, `gap`, and individual item properties like `flex-grow`, `flex-shrink`, and `flex-basis`.',
    'grid': 'CSS Grid is a two-dimensional layout system. Define your grid with `grid-template-columns` and `grid-template-rows`, then place items using `grid-column` and `grid-row`. The `fr` unit distributes available space proportionally. Use `gap` for spacing between cells.',
    'box model': 'Every element is a box with four layers: content (innermost), padding, border, and margin (outermost). Use `box-sizing: border-box` to include padding and border in the element\'s width/height calculations.',
    'position': 'CSS position values: `static` (default flow), `relative` (offset from normal), `absolute` (relative to positioned ancestor), `fixed` (relative to viewport), `sticky` (toggles between relative and fixed based on scroll).',
    'responsive': 'Use media queries (`@media`), fluid units (`%`, `vw`, `vh`, `fr`), and modern CSS functions (`clamp()`, `min()`, `max()`) to create responsive designs. Mobile-first means writing base styles for mobile, then adding complexity for larger screens.',
    'animation': 'CSS animations use `@keyframes` to define intermediate states, then apply them with the `animation` property. Key properties: `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`, `animation-iteration-count`, `animation-direction`.',
    'specificity': 'Specificity determines which CSS rule wins. From lowest to highest: element selectors (0,0,1), class selectors (0,1,0), ID selectors (1,0,0), inline styles, !important. When specificity is equal, the last rule wins.',
    'selector': 'CSS selectors: element (p), class (.name), ID (#name), attribute ([type="text"]), pseudo-class (:hover, :first-child), pseudo-element (::before, ::after), combinator (>, +, ~), and universal (*).',
    'color': 'CSS color formats: named colors (red), hex (#ff7a45), rgb(255,122,69), rgba(255,122,69,0.5), hsl(20,100%,63%), hsla(). Use gradients with `linear-gradient()` or `radial-gradient()`.',
    'units': 'CSS units: px (absolute pixels), em (relative to parent font-size), rem (relative to root font-size), % (relative to parent), vw/vh (viewport percentage), ch (character width), fr (grid fraction).',
  };

  const getResponse = (question: string): string => {
    const q = question.toLowerCase();
    for (const [key, value] of Object.entries(cssKnowledge)) {
      if (q.includes(key)) return value;
    }
    if (q.includes('help') || q.includes('how')) {
      return "I can help with CSS concepts! Try asking about: flexbox, grid, box model, position, responsive design, animations, specificity, selectors, colors, or units. You can also paste CSS code and I'll help debug it.";
    }
    if (q.includes('center')) {
      return "To center an element, the most reliable modern approach is Flexbox:\n\n```css\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n```\n\nOr with Grid:\n```css\n.parent {\n  display: grid;\n  place-items: center;\n}\n```";
    }
    if (q.includes('thank')) {
      return "You're welcome! Keep practicing and experimenting. CSS becomes intuitive with visual practice. 🎨";
    }
    return "That's a great question! While I can provide general CSS guidance, try asking about specific topics like flexbox, grid, animations, or the box model. You can also paste code for debugging help. For deeper learning, check out our lessons in the Learn section!";
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    if (!isAuthenticated) {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: 'Please sign in to use the AI tutor. It\'s free with up to 10 questions per day!', timestamp: new Date().toISOString() }]);
      return;
    }
    const remaining = getAIUsageRemaining();
    if (remaining <= 0) {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: 'You\'ve reached your daily limit for AI tutor questions. Upgrade to Pro for 50 questions per day, or try again tomorrow!', timestamp: new Date().toISOString() }]);
      return;
    }

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    incrementAIUsage();

    setTimeout(() => {
      const response = getResponse(input);
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: response, timestamp: new Date().toISOString() }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const quickQuestions = ['Explain Flexbox', 'How does the box model work?', 'How do I center things?', 'What is CSS specificity?'];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accent-hover transition-all glow-pulse"
          aria-label="Open AI Tutor"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">CSS Tutor</p>
                <p className="text-xs text-text-muted">{isAuthenticated ? `${getAIUsageRemaining()} questions left today` : 'Sign in to use'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-card-elevated rounded-lg transition-colors">
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-accent/20' : 'bg-card-elevated'}`}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-accent" /> : <User className="w-4 h-4 text-text-muted" />}
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === 'assistant' ? 'bg-card-elevated text-text-primary' : 'bg-accent/10 text-text-primary'}`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="bg-card-elevated px-3 py-2 rounded-xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickQuestions.map(q => (
                <button key={q} onClick={() => { setInput(q); }} className="px-2.5 py-1 text-xs bg-card-elevated border border-border rounded-full text-text-muted hover:text-text-primary hover:border-accent/50 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about CSS..."
                className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-accent rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
