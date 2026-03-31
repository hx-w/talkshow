export type Agent = 'claude' | 'opencode' | 'aider' | 'pi' | 'qwen-code' | 'kilo';
export type Theme = 'nord' | 'dracula' | 'monokai' | 'github-dark' | 'vercel' | 'swiss' | 'aurora' | 'sunset' | 'ocean' | 'forest' | 'candy' | 'neon';

export interface AppState {
  agent: Agent;
  prompt: string;
  theme: Theme;
  padding: number;
  dropShadow: boolean;
  windowControls: 'mac' | 'windows' | 'none';
  background: string;
  showPromptSymbol: boolean;
  
  // Claude Code specific
  claudeModel: string;
  claudeSkipPermissions: boolean;
  claudeDebug: boolean;
  claudeMaxTurns: number;
  claudePermissionMode: 'default' | 'acceptEdits' | 'plan' | 'auto' | 'bypassPermissions';
  claudeAppendSystemPrompt: string;

  // OpenCode specific
  opencodeModel: string;
  opencodeFormat: 'default' | 'json';
  opencodeThinking: boolean;
  
  // Aider specific
  aiderModel: string;
  aiderAutoCommits: boolean;
  aiderLint: boolean;
  aiderEditFormat: 'diff' | 'whole' | 'udiff' | 'architect';
  aiderNoAutoLint: boolean;

  // Pi (pi-mono) specific
  piProvider: string;
  piModel: string;
  piThinking: 'off' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh';
  piTools: string;

  // Qwen Code specific
  qwenModel: string;
  qwenAuthType: 'openai' | 'anthropic' | 'gemini' | 'qwen-oauth';
  qwenOutputFormat: 'text' | 'json' | 'stream-json';

  // Kilo specific
  kiloModel: string;
  kiloTemperature: number;
  
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
  swiss: { bg: '#ffffff', text: '#1a1a1a', keyword: '#d63031', string: '#0984e3', comment: '#b2bec3', border: '#dfe6e9' },
  aurora: { bg: '#f0f4ff', text: '#1e293b', keyword: '#2563eb', string: '#0891b2', comment: '#94a3b8', border: '#cbd5e1' },
  sunset: { bg: '#fff7ed', text: '#431407', keyword: '#ea580c', string: '#d97706', comment: '#fdba74', border: '#fed7aa' },
  ocean: { bg: '#ecfeff', text: '#164e63', keyword: '#0e7490', string: '#0284c7', comment: '#67e8f9', border: '#a5f3fc' },
  forest: { bg: '#f0fdf4', text: '#14532d', keyword: '#15803d', string: '#059669', comment: '#86efac', border: '#bbf7d0' },
  candy: { bg: '#fdf2f8', text: '#831843', keyword: '#db2777', string: '#c026d3', comment: '#f9a8d4', border: '#fbcfe8' },
  neon: { bg: '#0a0a1a', text: '#e0e0ff', keyword: '#00f5ff', string: '#ff10f0', comment: '#7b68ee', border: '#1e1e3a' },
};

export const BACKGROUNDS = [
  '#1a1a1a',
  '#ffffff',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'transparent'
];
