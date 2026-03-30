export type Agent = 'claude' | 'opencode' | 'aider' | 'cursor';
export type Theme = 'nord' | 'dracula' | 'monokai' | 'github-dark' | 'vercel' | 'swiss';

export interface AppState {
  agent: Agent;
  prompt: string;
  theme: Theme;
  padding: number;
  dropShadow: boolean;
  windowControls: 'mac' | 'windows' | 'none';
  background: string;
  showPromptSymbol: boolean;
  
  // Claude specific
  claudeSkipPermissions: boolean;
  claudeVerbose: boolean;
  
  // Aider specific
  aiderModel: string;
  aiderAutoCommits: boolean;
  aiderLint: boolean;
  
  // Cursor specific
  cursorModel: string;
  cursorNewWindow: boolean;
  
  // OpenCode specific
  opencodeModel: string;
  opencodeTemperature: number;
  
  // Typography
  indentSize: number;
  fontSize: number;
  fontFamily: string;
}

export const FONTS = [
  'JetBrains Mono',
  'Fira Code',
  'Source Code Pro',
  'Inconsolata',
  'Space Mono',
  'Consolas',
  'Courier New'
];

export const THEMES: Record<Theme, { bg: string, text: string, keyword: string, string: string, comment: string, border?: string }> = {
  nord: { bg: '#2E3440', text: '#D8DEE9', keyword: '#81A1C1', string: '#A3BE8C', comment: '#4C566A' },
  dracula: { bg: '#282a36', text: '#f8f8f2', keyword: '#ff79c6', string: '#f1fa8c', comment: '#6272a4' },
  monokai: { bg: '#272822', text: '#f8f8f2', keyword: '#f92672', string: '#e6db74', comment: '#75715e' },
  'github-dark': { bg: '#0d1117', text: '#c9d1d9', keyword: '#ff7b72', string: '#a5d6ff', comment: '#8b949e', border: '#30363d' },
  vercel: { bg: '#000000', text: '#ffffff', keyword: '#0070f3', string: '#50e3c2', comment: '#888888', border: '#333333' },
  swiss: { bg: '#ffffff', text: '#000000', keyword: '#ff0000', string: '#0000ff', comment: '#888888', border: '#000000' },
};

export const BACKGROUNDS = [
  '#1a1a1a',
  '#ffffff',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
  'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  'transparent'
];
