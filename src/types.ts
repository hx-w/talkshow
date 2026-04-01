export type Agent = 'claude' | 'opencode' | 'aider' | 'amp' | 'qwen-code' | 'kilo';
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

  // Claude Code: claude -p "prompt" --dangerously-skip-permissions
  claudeModel: string;
  claudeMaxTurns: number;
  claudeOutputFormat: 'text' | 'json' | 'stream-json';
  claudeAppendSystemPrompt: string;
  claudeDebug: boolean;

  // OpenCode: opencode -p "prompt" --yes
  opencodeModel: string;
  opencodeProvider: string;
  opencodeMaxTurns: number;
  opencodeOutput: 'text' | 'json';
  opencodeThinking: boolean;

  // Aider: aider --message "prompt" --yes-always
  aiderModel: string;
  aiderEditFormat: 'diff' | 'whole' | 'udiff' | 'architect';
  aiderNoAutoCommits: boolean;
  aiderLint: boolean;
  aiderNoAutoLint: boolean;
  aiderNoStream: boolean;

  // Amp (Sourcegraph): amp --execute "prompt" --yes
  ampModel: string;
  ampStreamJson: boolean;

  // Qwen Code: qwen-code -p "prompt" --yolo
  qwenModel: string;
  qwenOutputFormat: 'text' | 'json' | 'stream-json';

  // Kilo: kilo -p "prompt" --autonomous
  kiloModel: string;
  kiloProvider: string;
  kiloMode: 'Orchestrator' | 'Architect' | 'Code' | 'Ask' | 'Debug';
  kiloMaxTurns: number;

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
  // Solids
  '#0a0a0a',
  '#1a1a2e',
  '#f5f5f7',
  // Deep & moody
  'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  'linear-gradient(160deg, #0c0c1d 0%, #1a1a3e 40%, #2d1b4e 100%)',
  'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
  // Warm sunset
  'linear-gradient(160deg, #2d1f3d 0%, #6b3a5e 40%, #c4547a 70%, #f4a261 100%)',
  'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
  // Cool ocean
  'linear-gradient(160deg, #0a192f 0%, #112d4e 40%, #1a6b8a 70%, #3dd5c8 100%)',
  'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  // Aurora / neon
  'linear-gradient(160deg, #0d0221 0%, #0d6b5e 35%, #6b21a8 65%, #d946ef 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1e3a5f 40%, #4c1d95 70%, #ec4899 100%)',
  // Earth tones
  'linear-gradient(160deg, #1a120b 0%, #3c2415 40%, #6b4226 70%, #d4a574 100%)',
  'linear-gradient(135deg, #1b2838 0%, #2e4057 50%, #4a7c59 100%)',
  // Bauhaus primaries
  'linear-gradient(135deg, #d32f2f 0%, #f9a825 50%, #1565c0 100%)',
  'linear-gradient(160deg, #0a0a0a 0%, #d32f2f 50%, #0a0a0a 100%)',
  // Transparent
  'transparent'
];
