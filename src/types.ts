export type Agent =
  | 'claude'
  | 'codex'
  | 'gemini'
  | 'opencode'
  | 'aider'
  | 'amp'
  | 'qwen'
  | 'kilo';

export type Theme =
  | 'nord'
  | 'dracula'
  | 'monokai'
  | 'github-dark'
  | 'vercel'
  | 'swiss'
  | 'aurora'
  | 'sunset'
  | 'ocean'
  | 'forest'
  | 'candy'
  | 'neon';

export interface AppState {
  agent: Agent;
  prompt: string;
  theme: Theme;
  padding: number;
  dropShadow: boolean;
  windowControls: 'mac' | 'windows' | 'none';
  background: string;
  showPromptSymbol: boolean;

  // Claude Code: claude -p "..." --dangerously-skip-permissions
  // https://code.claude.com/docs/en/cli-reference
  claudeModel: string;
  claudeMaxTurns: number;
  claudeOutputFormat: 'text' | 'json' | 'stream-json';
  claudeAppendSystemPrompt: string;
  claudePermissionMode: 'default' | 'acceptEdits' | 'plan' | 'bypassPermissions';
  claudeAllowedTools: string;
  claudeAddDir: string;
  claudeVerbose: boolean;

  // OpenAI Codex CLI: codex exec "..." [--full-auto | -s ...]
  // https://github.com/openai/codex
  codexModel: string;
  codexSandbox: 'read-only' | 'workspace-write' | 'danger-full-access';
  codexApproval: 'full-auto' | 'ask-for-approval' | 'bypass';
  codexJson: boolean;
  codexCd: string;
  codexImage: string;

  // Gemini CLI: gemini -p "..." --yolo
  // https://github.com/google-gemini/gemini-cli
  geminiModel: string;
  geminiOutputFormat: 'text' | 'json' | 'stream-json';
  geminiDebug: boolean;
  geminiAllFiles: boolean;
  geminiSandbox: boolean;

  // OpenCode: opencode run "..." --dangerously-skip-permissions
  // https://opencode.ai/docs/cli
  opencodeModel: string;
  opencodeAgent: string;
  opencodeFormat: 'default' | 'json';
  opencodeContinue: boolean;
  opencodeShare: boolean;

  // Aider: aider --message "..." --yes-always
  // https://aider.chat/docs/config/options.html
  aiderModel: string;
  aiderArchitect: boolean;
  aiderNoAutoCommits: boolean;
  aiderNoGit: boolean;
  aiderNoStream: boolean;
  aiderRead: string;
  aiderMapTokens: number;

  // Amp (Sourcegraph): amp -x "..." --dangerously-allow-all
  // https://ampcode.com/manual
  ampStream: 'off' | 'json' | 'json-thinking';
  ampSettingsFile: string;

  // Qwen Code: qwen -p "..." --yolo
  // https://github.com/QwenLM/qwen-code (fork of gemini-cli)
  qwenModel: string;
  qwenOutputFormat: 'text' | 'json' | 'stream-json';
  qwenDebug: boolean;
  qwenAllFiles: boolean;

  // Kilo Code: kilo run "..." --auto
  // https://kilo.ai/docs/cli (fork of OpenCode)
  kiloModel: string;
  kiloAgent: string;
  kiloFormat: 'default' | 'json';
  kiloContinue: boolean;

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

// Stage backdrops for the card. Designed to be quiet enough that the card
// stays the hero — soft mesh gradients and tonal radials, low saturation,
// no hard color edges that would clash with a syntax-highlighted card.
export const BACKGROUNDS = [
  // Tonal stages — subtle vignettes
  'radial-gradient(ellipse at top, #1d1d20 0%, #0d0d10 70%)',          // graphite
  'radial-gradient(ellipse at top, #f4f1ec 0%, #e6e0d4 100%)',         // bone (for light themes)
  'radial-gradient(ellipse at center, #0e0e10 0%, #050507 100%)',      // ink

  // Tinted stages — single hue, deep, calm
  'radial-gradient(ellipse at 30% 0%, #2d1f3d 0%, #1a1525 50%, #0d0a14 100%)', // plum
  'radial-gradient(ellipse at 30% 0%, #1a2a3a 0%, #111a25 50%, #08101a 100%)', // ocean
  'radial-gradient(ellipse at 30% 0%, #1f2a22 0%, #14201a 50%, #0a120e 100%)', // forest
  'radial-gradient(ellipse at 30% 0%, #2a1f24 0%, #1f1518 50%, #110b0d 100%)', // rose dust

  // Mesh gradients — multi-stop radial layers, low alpha
  'radial-gradient(at 0% 0%, rgba(248,113,113,0.18) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(168,85,247,0.22) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(56,189,248,0.18) 0px, transparent 50%), #0e0e14', // dawn
  'radial-gradient(at 100% 0%, rgba(129,140,248,0.24) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(244,114,182,0.18) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(45,212,191,0.16) 0px, transparent 60%), #0c0a18', // dusk
  'radial-gradient(at 30% 0%, rgba(251,191,36,0.20) 0px, transparent 55%), radial-gradient(at 100% 100%, rgba(220,38,38,0.16) 0px, transparent 55%), #14100c', // amber
  'radial-gradient(at 50% 0%, rgba(125,211,252,0.22) 0px, transparent 55%), radial-gradient(at 50% 100%, rgba(167,139,250,0.16) 0px, transparent 60%), #0b1018', // arctic

  // Bauhaus — refined, soft 3-stop diagonal (not hard blocks)
  'linear-gradient(135deg, #b91c1c 0%, #d97706 50%, #1d4ed8 100%)',

  // Pure
  '#000000',
  'transparent',
];

// One-line description per agent shown under the agent picker — based on real CLI behavior.
export const AGENT_META: Record<Agent, { binary: string; subcommand?: string; promptFlag: string; autoFlag: string; doc: string }> = {
  claude:   { binary: 'claude',   promptFlag: '-p',          autoFlag: '--dangerously-skip-permissions', doc: 'code.claude.com/docs/en/cli-reference' },
  codex:    { binary: 'codex',    subcommand: 'exec', promptFlag: '<positional>', autoFlag: '--full-auto', doc: 'github.com/openai/codex' },
  gemini:   { binary: 'gemini',   promptFlag: '-p',          autoFlag: '--yolo',                          doc: 'github.com/google-gemini/gemini-cli' },
  opencode: { binary: 'opencode', subcommand: 'run', promptFlag: '<positional>', autoFlag: '--dangerously-skip-permissions', doc: 'opencode.ai/docs/cli' },
  aider:    { binary: 'aider',    promptFlag: '--message',   autoFlag: '--yes-always',                    doc: 'aider.chat/docs/config/options.html' },
  amp:      { binary: 'amp',      promptFlag: '-x',          autoFlag: '--dangerously-allow-all',         doc: 'ampcode.com/manual' },
  qwen:     { binary: 'qwen',     promptFlag: '-p',          autoFlag: '--yolo',                          doc: 'github.com/QwenLM/qwen-code' },
  kilo:     { binary: 'kilo',     subcommand: 'run', promptFlag: '<positional>', autoFlag: '--auto',                          doc: 'kilo.ai/docs/cli' },
};
