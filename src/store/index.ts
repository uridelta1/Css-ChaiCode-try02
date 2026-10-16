import { create } from 'zustand';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro';
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  preferences: { theme: string; fontSize: number; editorMinimap: boolean };
}

export interface Track {
  id: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  accessLevel: 'free' | 'pro';
  published: boolean;
  lessonCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  trackId: string;
  trackSlug: string;
  description: string;
  objectives: string[];
  content: string;
  codeExamples: { title: string; html: string; css: string }[];
  visualizerType: string;
  visualizerConfig: Record<string, any>;
  accessLevel: 'free' | 'pro';
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  status: 'published' | 'draft';
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'fill-code' | 'debug' | 'visual-target' | 'responsive' | 'mcq';
  starterCode: { html: string; css: string };
  solution: string;
  validationRules: { property: string; expected: string }[];
  hints: string[];
  accessLevel: 'free' | 'pro';
  status: 'published' | 'draft';
}

export interface ChallengeAttempt {
  id: string;
  challengeId: string;
  submittedCode: string;
  score: number;
  passed: boolean;
  feedback: string[];
  attemptedAt: string;
}

export interface UserProject {
  id: string;
  title: string;
  html: string;
  css: string;
  js?: string;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  starterHtml: string;
  starterCss: string;
  requirements: string[];
  accessLevel: 'free' | 'pro';
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  lastVisitedAt: string;
  score?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface UserAchievement {
  achievementId: string;
  awardedAt: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Seed Data
const tracks: Track[] = [
  { id: 't1', title: 'CSS Foundations', slug: 'css-foundations', description: 'Master the fundamentals of CSS including selectors, properties, and the cascade.', order: 1, accessLevel: 'free', published: true, lessonCount: 4 },
  { id: 't2', title: 'Layout', slug: 'layout', description: 'Learn Flexbox, Grid, and positioning to create powerful layouts.', order: 2, accessLevel: 'free', published: true, lessonCount: 3 },
  { id: 't3', title: 'Responsive CSS', slug: 'responsive-css', description: 'Build layouts that work beautifully on any screen size.', order: 3, accessLevel: 'free', published: true, lessonCount: 2 },
  { id: 't4', title: 'CSS Animations', slug: 'css-animations', description: 'Bring your designs to life with transitions and keyframe animations.', order: 4, accessLevel: 'pro', published: true, lessonCount: 1 },
  { id: 't5', title: 'Advanced CSS', slug: 'advanced-css', description: 'Explore modern CSS features like custom properties, clamp(), and more.', order: 5, accessLevel: 'pro', published: true, lessonCount: 1 },
];

const lessons: Lesson[] = [
  { id: 'l1', title: 'What CSS Actually Does', slug: 'what-css-does', trackId: 't1', trackSlug: 'css-foundations', description: 'Understand the role of CSS in web development.', objectives: ['Understand CSS purpose', 'Learn CSS syntax', 'See CSS in action'], content: 'CSS (Cascading Style Sheets) is the language that makes web pages beautiful. While HTML provides structure, CSS controls how elements look — their colors, sizes, spacing, and layout.\n\nCSS works by selecting HTML elements and applying style rules to them. Each rule consists of a selector and a declaration block containing property-value pairs.', codeExamples: [{ title: 'Basic CSS Rule', html: '<h1>Hello CSS!</h1>\n<p>This is styled text.</p>', css: 'h1 {\n  color: #ff7a45;\n  font-size: 2rem;\n}\np {\n  color: #9b9687;\n  line-height: 1.6;\n}' }], visualizerType: 'basic', visualizerConfig: {}, accessLevel: 'free', order: 1, difficulty: 'beginner', estimatedMinutes: 10, status: 'published' },
  { id: 'l2', title: 'Selectors & Specificity', slug: 'selectors-specificity', trackId: 't1', trackSlug: 'css-foundations', description: 'Learn how to target elements and understand specificity.', objectives: ['Master CSS selectors', 'Understand specificity', 'Learn the cascade'], content: 'CSS selectors determine which elements your styles apply to. Specificity is the algorithm browsers use to determine which CSS rule wins when multiple rules target the same element.\n\nSpecificity hierarchy (lowest to highest):\n1. Element selectors (p, div)\n2. Class selectors (.class)\n3. ID selectors (#id)\n4. Inline styles\n5. !important (avoid when possible)', codeExamples: [{ title: 'Selector Examples', html: '<div class="card" id="main">\n  <h2 class="title">Title</h2>\n  <p>Content here</p>\n</div>', css: '/* Element selector - specificity: 0,0,1 */\np { color: gray; }\n\n/* Class selector - specificity: 0,1,0 */\n.title { color: #ff7a45; }\n\n/* ID selector - specificity: 1,0,0 */\n#main { border: 1px solid #302d25; }' }], visualizerType: 'specificity', visualizerConfig: {}, accessLevel: 'free', order: 2, difficulty: 'beginner', estimatedMinutes: 15, status: 'published' },
  { id: 'l3', title: 'Colors & Units', slug: 'colors-units', trackId: 't1', trackSlug: 'css-foundations', description: 'Work with colors and measurement units in CSS.', objectives: ['Use color values', 'Understand px, em, rem', 'Learn viewport units'], content: 'CSS supports multiple color formats: named colors, hex (#ff7a45), RGB, RGBA, HSL, and HSLA. Units determine sizes: px (absolute), em (relative to parent font), rem (relative to root font), vw/vh (viewport percentage).', codeExamples: [{ title: 'Colors and Units', html: '<div class="box">Box</div>', css: '.box {\n  width: 200px;\n  height: 100px;\n  background: linear-gradient(135deg, #ff7a45, #c9a24a);\n  color: white;\n  padding: 1rem;\n  font-size: 1.2em;\n  border-radius: 8px;\n}' }], visualizerType: 'colors', visualizerConfig: {}, accessLevel: 'free', order: 3, difficulty: 'beginner', estimatedMinutes: 12, status: 'published' },
  { id: 'l4', title: 'The Box Model', slug: 'box-model', trackId: 't1', trackSlug: 'css-foundations', description: 'Understand how every element is a box with margin, border, padding, and content.', objectives: ['Understand box model layers', 'Control spacing with padding/margin', 'Use box-sizing effectively'], content: 'Every HTML element is a rectangular box. The box model consists of: content (the actual content), padding (space inside the border), border (the edge), and margin (space outside the border).\n\nUse box-sizing: border-box to include padding and border in the element\'s total width and height.', codeExamples: [{ title: 'Box Model', html: '<div class="box">Content</div>', css: '.box {\n  width: 200px;\n  padding: 20px;\n  border: 3px solid #ff7a45;\n  margin: 20px;\n  box-sizing: border-box;\n  background: #1b1a15;\n  color: #eee8d8;\n}' }], visualizerType: 'box-model', visualizerConfig: {}, accessLevel: 'free', order: 4, difficulty: 'beginner', estimatedMinutes: 15, status: 'published' },
  { id: 'l5', title: 'The Display Property', slug: 'display-property', trackId: 't2', trackSlug: 'layout', description: 'Learn how display controls element layout behavior.', objectives: ['Understand block vs inline', 'Master display values', 'Know when to use each'], content: 'The display property is one of the most important CSS properties. It determines how an element behaves in the layout flow.\n\n- block: Takes full width, starts on new line\n- inline: Only takes needed width, stays in line\n- inline-block: Inline but with block-like sizing\n- flex: Enables flexbox layout\n- grid: Enables grid layout\n- none: Hides the element', codeExamples: [{ title: 'Display Values', html: '<div class="container">\n  <span class="item">Inline</span>\n  <span class="item">Inline</span>\n  <span class="item block-item">Block</span>\n  <span class="item">Inline</span>\n</div>', css: '.container { padding: 16px; background: #1b1a15; }\n.item { background: #ff7a45; padding: 8px 12px; margin: 4px; color: white; }\n.block-item { display: block; width: 100%; text-align: center; }' }], visualizerType: 'display', visualizerConfig: {}, accessLevel: 'free', order: 1, difficulty: 'beginner', estimatedMinutes: 12, status: 'published' },
  { id: 'l6', title: 'Flexbox', slug: 'flexbox', trackId: 't2', trackSlug: 'layout', description: 'Master one-dimensional layouts with Flexbox.', objectives: ['Create flex containers', 'Control alignment', 'Distribute space'], content: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex to fill additional space or shrink to fit into smaller spaces.\n\nKey properties:\n- flex-direction: row | column\n- justify-content: main axis alignment\n- align-items: cross axis alignment\n- flex-wrap: wrapping behavior\n- gap: space between items', codeExamples: [{ title: 'Flexbox Layout', html: '<div class="flex-container">\n  <div class="flex-item">1</div>\n  <div class="flex-item">2</div>\n  <div class="flex-item">3</div>\n</div>', css: '.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  padding: 20px;\n  background: #1b1a15;\n}\n.flex-item {\n  background: #ff7a45;\n  padding: 20px 30px;\n  border-radius: 8px;\n  color: white;\n  font-weight: 600;\n}' }], visualizerType: 'flexbox', visualizerConfig: {}, accessLevel: 'free', order: 2, difficulty: 'intermediate', estimatedMinutes: 20, status: 'published' },
  { id: 'l7', title: 'CSS Grid', slug: 'css-grid', trackId: 't2', trackSlug: 'layout', description: 'Create two-dimensional layouts with CSS Grid.', objectives: ['Define grid templates', 'Place items in grid', 'Create responsive grids'], content: 'CSS Grid is a two-dimensional layout system. It lets you define rows and columns and place items precisely within the grid.\n\nKey properties:\n- grid-template-columns/rows: Define tracks\n- grid-gap: Space between cells\n- grid-column/row: Place items\n- fr unit: Fractional unit for flexible sizing', codeExamples: [{ title: 'CSS Grid', html: '<div class="grid">\n  <div class="grid-item">1</div>\n  <div class="grid-item">2</div>\n  <div class="grid-item">3</div>\n  <div class="grid-item">4</div>\n</div>', css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n  padding: 20px;\n  background: #1b1a15;\n}\n.grid-item {\n  background: #ff7a45;\n  padding: 24px;\n  border-radius: 8px;\n  text-align: center;\n  color: white;\n  font-weight: 600;\n}' }], visualizerType: 'grid', visualizerConfig: {}, accessLevel: 'free', order: 3, difficulty: 'intermediate', estimatedMinutes: 20, status: 'published' },
  { id: 'l8', title: 'Position', slug: 'position', trackId: 't3', trackSlug: 'responsive-css', description: 'Control element positioning with CSS position property.', objectives: ['Understand position values', 'Create overlays', 'Build sticky headers'], content: 'The position property controls how elements are positioned in the document.\n\n- static: Default, normal flow\n- relative: Offset from normal position\n- absolute: Relative to positioned ancestor\n- fixed: Relative to viewport\n- sticky: Toggles between relative and fixed', codeExamples: [{ title: 'Positioning', html: '<div class="parent">\n  <div class="child absolute">Absolute</div>\n  <div class="child relative">Relative</div>\n</div>', css: '.parent {\n  position: relative;\n  height: 200px;\n  background: #1b1a15;\n  padding: 20px;\n}\n.child {\n  padding: 12px;\n  border-radius: 6px;\n  color: white;\n}\n.absolute {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #ff7a45;\n}\n.relative {\n  position: relative;\n  top: 20px;\n  left: 20px;\n  background: #7fb069;\n}' }], visualizerType: 'position', visualizerConfig: {}, accessLevel: 'free', order: 1, difficulty: 'intermediate', estimatedMinutes: 15, status: 'published' },
  { id: 'l9', title: 'Responsive Basics', slug: 'responsive-basics', trackId: 't3', trackSlug: 'responsive-css', description: 'Build layouts that adapt to any screen size.', objectives: ['Use media queries', 'Apply mobile-first design', 'Create fluid layouts'], content: 'Responsive design ensures your website looks great on all devices. Key techniques include media queries, fluid layouts with percentages and fr units, and modern CSS functions like clamp(), min(), and max().', codeExamples: [{ title: 'Media Queries', html: '<div class="responsive">\n  <div class="col">Column 1</div>\n  <div class="col">Column 2</div>\n  <div class="col">Column 3</div>\n</div>', css: '.responsive {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 12px;\n  padding: 16px;\n}\n.col {\n  background: #ff7a45;\n  padding: 20px;\n  border-radius: 8px;\n  text-align: center;\n  color: white;\n}' }], visualizerType: 'responsive', visualizerConfig: {}, accessLevel: 'free', order: 2, difficulty: 'intermediate', estimatedMinutes: 15, status: 'published' },
  { id: 'l10', title: 'Keyframe Animations', slug: 'keyframe-animations', trackId: 't4', trackSlug: 'css-animations', description: 'Create smooth animations with CSS keyframes.', objectives: ['Define keyframes', 'Control timing', 'Chain animations'], content: 'CSS animations let you animate property changes over time using @keyframes. Define the start and end states (and intermediate steps), then apply the animation to elements.', codeExamples: [{ title: 'Animation', html: '<div class="animated-box">Animate Me</div>', css: '.animated-box {\n  width: 100px;\n  height: 100px;\n  background: #ff7a45;\n  border-radius: 8px;\n  animation: bounce 2s infinite;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 600;\n}\n@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-30px); }\n}' }], visualizerType: 'animation', visualizerConfig: {}, accessLevel: 'pro', order: 1, difficulty: 'advanced', estimatedMinutes: 20, status: 'published' },
  { id: 'l11', title: 'clamp(), min() & max()', slug: 'css-functions', trackId: 't5', trackSlug: 'advanced-css', description: 'Modern CSS functions for responsive design.', objectives: ['Use clamp() for fluid typography', 'Apply min() and max()', 'Create responsive without media queries'], content: 'Modern CSS provides powerful math functions:\n- clamp(min, preferred, max): Sets a value within a range\n- min(): Picks the smallest value\n- max(): Picks the largest value\n\nThese enable responsive designs without media queries.', codeExamples: [{ title: 'CSS Functions', html: '<h1 class="fluid">Fluid Typography</h1>\n<p class="fluid-text">This text scales smoothly between sizes.</p>', css: '.fluid {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n  color: #ff7a45;\n}\n.fluid-text {\n  font-size: clamp(0.9rem, 2vw, 1.2rem);\n  color: #9b9687;\n  max-width: min(90%, 600px);\n  line-height: 1.6;\n}' }], visualizerType: 'functions', visualizerConfig: {}, accessLevel: 'pro', order: 1, difficulty: 'advanced', estimatedMinutes: 15, status: 'published' },
];

const challenges: Challenge[] = [
  { id: 'c1', title: 'Fill the Code — Centering', slug: 'centering', description: 'Center an element both horizontally and vertically using Flexbox.', difficulty: 'beginner', type: 'fill-code', starterCode: { html: '<div class="container">\n  <div class="box">Center me!</div>\n</div>', css: '.container {\n  height: 200px;\n  background: #1b1a15;\n  /* Add your CSS here */\n}\n.box {\n  width: 100px;\n  height: 100px;\n  background: #ff7a45;\n  border-radius: 8px;\n}' }, solution: '.container {\n  height: 200px;\n  background: #1b1a15;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', validationRules: [{ property: 'display', expected: 'flex' }, { property: 'justify-content', expected: 'center' }, { property: 'align-items', expected: 'center' }], hints: ['Use display: flex on the container', 'justify-content controls horizontal alignment', 'align-items controls vertical alignment'], accessLevel: 'free', status: 'published' },
  { id: 'c2', title: 'Debug CSS — Broken Flex Row', slug: 'broken-flex', description: 'Fix the CSS so items display in a horizontal row with equal spacing.', difficulty: 'beginner', type: 'debug', starterCode: { html: '<div class="row">\n  <div class="item">A</div>\n  <div class="item">B</div>\n  <div class="item">C</div>\n</div>', css: '/* Fix this CSS */\n.row {\n  display: block;\n  gap: 0;\n}\n.item {\n  background: #ff7a45;\n  padding: 16px 24px;\n  color: white;\n  border-radius: 6px;\n}' }, solution: '.row {\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;\n}', validationRules: [{ property: 'display', expected: 'flex' }, { property: 'gap', expected: '16px' }], hints: ['The display should be flex, not block', 'Add a gap between items', 'Consider justify-content for spacing'], accessLevel: 'free', status: 'published' },
  { id: 'c3', title: 'Visual Target — Stacked Card', slug: 'stacked-card', description: 'Create a card with a colored header, content area, and footer using the box model.', difficulty: 'intermediate', type: 'visual-target', starterCode: { html: '<div class="card">\n  <div class="card-header">Header</div>\n  <div class="card-body">Card content goes here</div>\n  <div class="card-footer">Footer</div>\n</div>', css: '/* Style the card */\n.card {\n  width: 280px;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.card-header {\n  /* Add styles */\n}\n.card-body {\n  /* Add styles */\n}\n.card-footer {\n  /* Add styles */\n}' }, solution: '.card {\n  width: 280px;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid #302d25;\n}\n.card-header {\n  background: #ff7a45;\n  padding: 16px;\n  color: white;\n  font-weight: 600;\n}\n.card-body {\n  padding: 20px;\n  background: #1b1a15;\n  color: #eee8d8;\n}\n.card-footer {\n  padding: 12px 16px;\n  background: #21201a;\n  color: #9b9687;\n  border-top: 1px solid #302d25;\n}', validationRules: [{ property: 'border-radius', expected: '12px' }, { property: 'padding', expected: '16px' }], hints: ['Use border-radius for rounded corners', 'Add padding to each section', 'Use different background colors for visual separation'], accessLevel: 'free', status: 'published' },
  { id: 'c4', title: 'Responsive Challenge — Stack on Mobile', slug: 'stack-mobile', description: 'Make a 3-column layout stack vertically on screens narrower than 768px.', difficulty: 'intermediate', type: 'responsive', starterCode: { html: '<div class="grid">\n  <div class="col">Column 1</div>\n  <div class="col">Column 2</div>\n  <div class="col">Column 3</div>\n</div>', css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n.col {\n  background: #ff7a45;\n  padding: 20px;\n  border-radius: 8px;\n  color: white;\n  text-align: center;\n}\n/* Add media query below */' }, solution: '@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}', validationRules: [{ property: 'grid-template-columns', expected: '1fr' }], hints: ['Use @media (max-width: 768px)', 'Change grid-template-columns to a single column', 'The 1fr value makes it take full width'], accessLevel: 'free', status: 'published' },
  { id: 'c5', title: 'Animation Challenge — Pulse Effect', slug: 'pulse-effect', description: 'Create a pulsing animation that scales an element up and down.', difficulty: 'advanced', type: 'fill-code', starterCode: { html: '<div class="pulse">Pulse</div>', css: '.pulse {\n  width: 80px;\n  height: 80px;\n  background: #ff7a45;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 600;\n  /* Add animation */\n}\n/* Define keyframes */' }, solution: '.pulse {\n  width: 80px;\n  height: 80px;\n  background: #ff7a45;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 600;\n  animation: pulse 1.5s ease-in-out infinite;\n}\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.2); }\n}', validationRules: [{ property: 'animation', expected: 'pulse' }, { property: 'transform', expected: 'scale' }], hints: ['Use @keyframes to define the animation', 'Scale between 1 and 1.2', 'Use ease-in-out timing for smooth motion'], accessLevel: 'pro', status: 'published' },
];

const projectTemplates: ProjectTemplate[] = [
  { id: 'p1', title: 'Profile Card', slug: 'profile-card', description: 'Create a stylish profile card with avatar, name, and bio.', difficulty: 'beginner', starterHtml: '<div class="profile-card">\n  <div class="avatar">👤</div>\n  <h2 class="name">Jane Developer</h2>\n  <p class="bio">Frontend Developer & CSS Enthusiast</p>\n  <div class="stats">\n    <span>128 Projects</span>\n    <span>1.2k Followers</span>\n  </div>\n  <button class="btn">Follow</button>\n</div>', starterCss: '.profile-card {\n  width: 300px;\n  background: #1b1a15;\n  border-radius: 16px;\n  padding: 32px;\n  text-align: center;\n  border: 1px solid #302d25;\n}\n.avatar { font-size: 3rem; margin-bottom: 16px; }\n.name { color: #eee8d8; margin: 0 0 8px; }\n.bio { color: #9b9687; font-size: 0.9rem; margin: 0 0 20px; }\n.stats { display: flex; justify-content: center; gap: 24px; margin-bottom: 20px; color: #9b9687; font-size: 0.85rem; }\n.btn { /* Style me! */ }', requirements: ['Centered layout', 'Styled button with accent color', 'Proper spacing and typography', 'Rounded corners'], accessLevel: 'free' },
  { id: 'p2', title: 'Button Collection', slug: 'button-collection', description: 'Design a collection of styled buttons with different variants.', difficulty: 'beginner', starterHtml: '<div class="button-group">\n  <button class="btn btn-primary">Primary</button>\n  <button class="btn btn-secondary">Secondary</button>\n  <button class="btn btn-outline">Outline</button>\n  <button class="btn btn-ghost">Ghost</button>\n  <button class="btn btn-danger">Danger</button>\n</div>', starterCss: '.button-group { display: flex; flex-wrap: wrap; gap: 12px; padding: 24px; background: #1b1a15; border-radius: 12px; }\n.btn { padding: 10px 20px; border-radius: 8px; font-weight: 500; cursor: pointer; border: none; font-size: 0.9rem; transition: all 0.2s; }\n/* Style each variant */', requirements: ['Primary button with accent color', 'Secondary button variant', 'Outline button variant', 'Ghost button variant', 'Danger/error variant', 'Hover effects'], accessLevel: 'free' },
  { id: 'p3', title: 'Responsive Navbar', slug: 'responsive-navbar', description: 'Build a navigation bar that collapses to a hamburger menu on mobile.', difficulty: 'intermediate', starterHtml: '<nav class="navbar">\n  <div class="nav-brand">CSS Visual</div>\n  <button class="nav-toggle">☰</button>\n  <ul class="nav-links">\n    <li><a href="#">Home</a></li>\n    <li><a href="#">Learn</a></li>\n    <li><a href="#">Playground</a></li>\n    <li><a href="#">Challenges</a></li>\n  </ul>\n</nav>', starterCss: '.navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: #151610; border-bottom: 1px solid #302d25; }\n.nav-brand { color: #ff7a45; font-weight: 700; font-size: 1.2rem; }\n.nav-links { display: flex; list-style: none; gap: 24px; margin: 0; padding: 0; }\n.nav-links a { color: #9b9687; text-decoration: none; transition: color 0.2s; }\n.nav-toggle { display: none; background: none; border: none; color: #eee8d8; font-size: 1.5rem; cursor: pointer; }\n/* Add mobile styles */', requirements: ['Horizontal links on desktop', 'Hamburger menu on mobile', 'Smooth transitions', 'Active link styling', 'Brand/logo area'], accessLevel: 'free' },
  { id: 'p4', title: 'Pricing Card', slug: 'pricing-card', description: 'Design a pricing card with features list and CTA button.', difficulty: 'intermediate', starterHtml: '<div class="pricing-card featured">\n  <div class="badge">Most Popular</div>\n  <h3 class="plan-name">Pro</h3>\n  <div class="price">$9<span class="period">/month</span></div>\n  <ul class="features">\n    <li>✓ All learning tracks</li>\n    <li>✓ AI tutor access</li>\n    <li>✓ Unlimited projects</li>\n    <li>✓ Priority support</li>\n  </ul>\n  <button class="cta">Get Started</button>\n</div>', starterCss: '.pricing-card { width: 320px; background: #1b1a15; border-radius: 16px; padding: 32px; text-align: center; border: 1px solid #302d25; position: relative; }\n.pricing-card.featured { border-color: #ff7a45; }\n.badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #ff7a45; color: white; padding: 4px 16px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }\n.plan-name { color: #eee8d8; margin: 8px 0; }\n.price { font-size: 2.5rem; font-weight: 700; color: #eee8d8; }\n.period { font-size: 1rem; color: #9b9687; font-weight: 400; }\n.features { list-style: none; padding: 0; margin: 24px 0; text-align: left; }\n.features li { padding: 8px 0; color: #9b9687; border-bottom: 1px solid #302d25; }\n.cta { /* Style me! */ }', requirements: ['Featured card highlight', 'Badge positioning', 'Feature list styling', 'Prominent CTA button', 'Clean typography hierarchy'], accessLevel: 'free' },
  { id: 'p5', title: 'Login Form', slug: 'login-form', description: 'Create a modern login form with validation styling.', difficulty: 'intermediate', starterHtml: '<div class="login-container">\n  <div class="login-card">\n    <h2>Welcome Back</h2>\n    <p class="subtitle">Sign in to continue learning</p>\n    <form class="login-form">\n      <div class="form-group">\n        <label for="email">Email</label>\n        <input type="email" id="email" placeholder="you@example.com">\n      </div>\n      <div class="form-group">\n        <label for="password">Password</label>\n        <input type="password" id="password" placeholder="••••••••">\n      </div>\n      <div class="form-options">\n        <label class="checkbox"><input type="checkbox"> Remember me</label>\n        <a href="#" class="forgot">Forgot password?</a>\n      </div>\n      <button type="submit" class="submit-btn">Sign In</button>\n    </form>\n  </div>\n</div>', starterCss: '.login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0d0e09; padding: 20px; }\n.login-card { width: 100%; max-width: 400px; background: #1b1a15; border-radius: 16px; padding: 40px; border: 1px solid #302d25; }\n.login-card h2 { color: #eee8d8; margin: 0 0 8px; }\n.subtitle { color: #9b9687; margin: 0 0 24px; }\n.form-group { margin-bottom: 16px; }\n.form-group label { display: block; color: #9b9687; font-size: 0.85rem; margin-bottom: 6px; }\n.form-group input { width: 100%; padding: 12px; background: #151610; border: 1px solid #302d25; border-radius: 8px; color: #eee8d8; font-size: 0.95rem; }\n.form-options { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: 0.85rem; }\n.forgot { color: #ff7a45; text-decoration: none; }\n.submit-btn { /* Style me! */ }', requirements: ['Centered card layout', 'Styled form inputs', 'Focus states', 'Submit button with accent color', 'Remember me checkbox', 'Forgot password link'], accessLevel: 'free' },
  { id: 'p6', title: 'SaaS Dashboard Shell', slug: 'dashboard-shell', description: 'Build a dashboard layout with sidebar, header, and content area.', difficulty: 'advanced', starterHtml: '<div class="dashboard">\n  <aside class="sidebar">\n    <div class="logo">CSS Visual</div>\n    <nav class="sidebar-nav">\n      <a href="#" class="nav-item active">Dashboard</a>\n      <a href="#" class="nav-item">Lessons</a>\n      <a href="#" class="nav-item">Challenges</a>\n      <a href="#" class="nav-item">Projects</a>\n      <a href="#" class="nav-item">Settings</a>\n    </nav>\n  </aside>\n  <main class="main-content">\n    <header class="top-bar">\n      <h1>Dashboard</h1>\n      <div class="user-menu">👤</div>\n    </header>\n    <div class="content">\n      <div class="stat-card"><span class="stat-value">12</span><span class="stat-label">Lessons Done</span></div>\n      <div class="stat-card"><span class="stat-value">5</span><span class="stat-label">Challenges</span></div>\n      <div class="stat-card"><span class="stat-value">3</span><span class="stat-label">Projects</span></div>\n    </div>\n  </main>\n</div>', starterCss: '.dashboard { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; background: #0d0e09; }\n.sidebar { background: #151610; border-right: 1px solid #302d25; padding: 24px 16px; }\n.logo { color: #ff7a45; font-weight: 700; font-size: 1.2rem; margin-bottom: 32px; padding: 0 8px; }\n.sidebar-nav { display: flex; flex-direction: column; gap: 4px; }\n.nav-item { padding: 10px 12px; border-radius: 8px; color: #9b9687; text-decoration: none; transition: all 0.2s; }\n.nav-item:hover, .nav-item.active { background: #1b1a15; color: #eee8d8; }\n.nav-item.active { color: #ff7a45; }\n.main-content { display: flex; flex-direction: column; }\n.top-bar { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid #302d25; }\n.top-bar h1 { margin: 0; color: #eee8d8; font-size: 1.3rem; }\n.content { padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }\n.stat-card { background: #1b1a15; border: 1px solid #302d25; border-radius: 12px; padding: 24px; }\n.stat-value { display: block; font-size: 2rem; font-weight: 700; color: #ff7a45; }\n.stat-label { color: #9b9687; font-size: 0.85rem; }', requirements: ['Sidebar with navigation', 'Active state styling', 'Top header bar', 'Stat cards grid', 'Responsive layout', 'Clean visual hierarchy'], accessLevel: 'pro' },
];

const achievements: Achievement[] = [
  { id: 'a1', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', criteria: 'lessons_completed >= 1' },
  { id: 'a2', title: 'Quick Learner', description: 'Complete 5 lessons', icon: '⚡', criteria: 'lessons_completed >= 5' },
  { id: 'a3', title: 'CSS Master', description: 'Complete all lessons in a track', icon: '🏆', criteria: 'track_completed' },
  { id: 'a4', title: 'Challenge Accepted', description: 'Complete your first challenge', icon: '🔥', criteria: 'challenges_completed >= 1' },
  { id: 'a5', title: 'Problem Solver', description: 'Complete 5 challenges', icon: '💡', criteria: 'challenges_completed >= 5' },
  { id: 'a6', title: 'Builder', description: 'Complete your first project', icon: '🛠️', criteria: 'projects_completed >= 1' },
  { id: 'a7', title: 'Streak Master', description: 'Maintain a 7-day learning streak', icon: '📅', criteria: 'streak >= 7' },
  { id: 'a8', title: 'Playground Pro', description: 'Save 10 playground projects', icon: '🎮', criteria: 'projects_saved >= 10' },
];

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('cssv_users') || '[]');
    const user = users.find((u: any) => u.email === email);
    if (user && user.password === password) {
      const { password: _, ...safeUser } = user;
      set({ user: safeUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem('cssv_session', JSON.stringify(safeUser));
      return true;
    }
    set({ isLoading: false });
    return false;
  },
  register: async (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('cssv_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    const newUser: User = {
      id: crypto.randomUUID(),
      name, email, role: 'user', plan: 'free',
      emailVerified: true,
      createdAt: new Date().toISOString(),
      preferences: { theme: 'dark', fontSize: 14, editorMinimap: false },
    };
    users.push({ ...newUser, password });
    localStorage.setItem('cssv_users', JSON.stringify(users));
    set({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('cssv_session', JSON.stringify(newUser));
    return true;
  },
  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
    localStorage.removeItem('cssv_session');
  },
  updateProfile: (updates) => {
    const { user } = get();
    if (!user) return;
    const updated = { ...user, ...updates };
    set({ user: updated });
    localStorage.setItem('cssv_session', JSON.stringify(updated));
    const users = JSON.parse(localStorage.getItem('cssv_users') || '[]');
    const idx = users.findIndex((u: any) => u.id === user.id);
    if (idx >= 0) { users[idx] = { ...users[idx], ...updates }; localStorage.setItem('cssv_users', JSON.stringify(users)); }
  },
  loadUser: () => {
    const session = localStorage.getItem('cssv_session');
    if (session) {
      const user = JSON.parse(session);
      set({ user, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },
}));

// Data Store
interface DataState {
  tracks: Track[];
  lessons: Lesson[];
  challenges: Challenge[];
  projectTemplates: ProjectTemplate[];
  achievements: Achievement[];
  lessonProgress: LessonProgress[];
  challengeAttempts: ChallengeAttempt[];
  userProjects: UserProject[];
  userAchievements: UserAchievement[];
  notifications: Notification[];
  aiUsageCount: number;
  aiUsageDate: string;
  completeLesson: (lessonId: string) => void;
  addChallengeAttempt: (attempt: Omit<ChallengeAttempt, 'id' | 'attemptedAt'>) => void;
  saveProject: (project: Omit<UserProject, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (id: string, updates: Partial<UserProject>) => void;
  deleteProject: (id: string) => void;
  awardAchievement: (achievementId: string) => void;
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  incrementAIUsage: () => boolean;
  getAIUsageRemaining: () => number;
}

export const useDataStore = create<DataState>((set, get) => ({
  tracks,
  lessons,
  challenges,
  projectTemplates,
  achievements,
  lessonProgress: JSON.parse(localStorage.getItem('cssv_progress') || '[]'),
  challengeAttempts: JSON.parse(localStorage.getItem('cssv_attempts') || '[]'),
  userProjects: JSON.parse(localStorage.getItem('cssv_projects') || '[]'),
  userAchievements: JSON.parse(localStorage.getItem('cssv_achievements') || '[]'),
  notifications: JSON.parse(localStorage.getItem('cssv_notifications') || '[]'),
  aiUsageCount: 0,
  aiUsageDate: new Date().toDateString(),
  completeLesson: (lessonId) => {
    const { lessonProgress, userAchievements, achievements } = get();
    const existing = lessonProgress.find(p => p.lessonId === lessonId);
    let updated: LessonProgress[];
    if (existing) {
      updated = lessonProgress.map(p => p.lessonId === lessonId ? { ...p, completed: true, completedAt: new Date().toISOString() } : p);
    } else {
      updated = [...lessonProgress, { lessonId, completed: true, completedAt: new Date().toISOString(), lastVisitedAt: new Date().toISOString() }];
    }
    set({ lessonProgress: updated });
    localStorage.setItem('cssv_progress', JSON.stringify(updated));
    // Check achievements
    const completedCount = updated.filter(p => p.completed).length;
    if (completedCount >= 1 && !userAchievements.find(a => a.achievementId === 'a1')) {
      get().awardAchievement('a1');
    }
    if (completedCount >= 5 && !userAchievements.find(a => a.achievementId === 'a2')) {
      get().awardAchievement('a2');
    }
  },
  addChallengeAttempt: (attempt) => {
    const newAttempt: ChallengeAttempt = { ...attempt, id: crypto.randomUUID(), attemptedAt: new Date().toISOString() };
    const updated = [...get().challengeAttempts, newAttempt];
    set({ challengeAttempts: updated });
    localStorage.setItem('cssv_attempts', JSON.stringify(updated));
    const passedCount = updated.filter(a => a.passed).length;
    const { userAchievements } = get();
    if (passedCount >= 1 && !userAchievements.find(a => a.achievementId === 'a4')) get().awardAchievement('a4');
    if (passedCount >= 5 && !userAchievements.find(a => a.achievementId === 'a5')) get().awardAchievement('a5');
  },
  saveProject: (project) => {
    const id = crypto.randomUUID();
    const newProject: UserProject = { ...project, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const updated = [...get().userProjects, newProject];
    set({ userProjects: updated });
    localStorage.setItem('cssv_projects', JSON.stringify(updated));
    return id;
  },
  updateProject: (id, updates) => {
    const updated = get().userProjects.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p);
    set({ userProjects: updated });
    localStorage.setItem('cssv_projects', JSON.stringify(updated));
  },
  deleteProject: (id) => {
    const updated = get().userProjects.filter(p => p.id !== id);
    set({ userProjects: updated });
    localStorage.setItem('cssv_projects', JSON.stringify(updated));
  },
  awardAchievement: (achievementId) => {
    const { userAchievements } = get();
    if (userAchievements.find(a => a.achievementId === achievementId)) return;
    const updated = [...userAchievements, { achievementId, awardedAt: new Date().toISOString() }];
    set({ userAchievements: updated });
    localStorage.setItem('cssv_achievements', JSON.stringify(updated));
  },
  addNotification: (n) => {
    const newN: Notification = { ...n, id: crypto.randomUUID(), createdAt: new Date().toISOString(), read: false };
    const updated = [newN, ...get().notifications];
    set({ notifications: updated });
    localStorage.setItem('cssv_notifications', JSON.stringify(updated));
  },
  markNotificationRead: (id) => {
    const updated = get().notifications.map(n => n.id === id ? { ...n, read: true } : n);
    set({ notifications: updated });
    localStorage.setItem('cssv_notifications', JSON.stringify(updated));
  },
  incrementAIUsage: () => {
    const { aiUsageDate, aiUsageCount } = get();
    const authUser = useAuthStore.getState().user;
    const today = new Date().toDateString();
    let count = aiUsageDate === today ? aiUsageCount : 0;
    const limit = authUser?.role === 'admin' ? 999 : authUser?.plan === 'pro' ? 50 : 10;
    if (count >= limit) return false;
    count++;
    set({ aiUsageCount: count, aiUsageDate: today });
    return true;
  },
  getAIUsageRemaining: () => {
    const { aiUsageDate, aiUsageCount } = get();
    const authUser = useAuthStore.getState().user;
    const today = new Date().toDateString();
    const count = aiUsageDate === today ? aiUsageCount : 0;
    const limit = authUser?.role === 'admin' ? 999 : authUser?.plan === 'pro' ? 50 : 10;
    return Math.max(0, limit - count);
  },
}));

// Initialize seed data
const initSeedData = () => {
  const users = JSON.parse(localStorage.getItem('cssv_users') || '[]');
  if (!users.find((u: any) => u.role === 'admin')) {
    users.push({
      id: 'admin-001', name: 'Admin', email: 'admin@cssvisual.com', password: 'admin123',
      role: 'admin', plan: 'pro', emailVerified: true,
      createdAt: new Date().toISOString(),
      preferences: { theme: 'dark', fontSize: 14, editorMinimap: false },
    });
  }
  if (!users.find((u: any) => u.email === 'demo@cssvisual.com')) {
    users.push({
      id: 'demo-001', name: 'Demo User', email: 'demo@cssvisual.com', password: 'demo123',
      role: 'user', plan: 'free', emailVerified: true,
      createdAt: new Date().toISOString(),
      preferences: { theme: 'dark', fontSize: 14, editorMinimap: false },
    });
  }
  localStorage.setItem('cssv_users', JSON.stringify(users));
};
initSeedData();
