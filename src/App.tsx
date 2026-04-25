import React, { useState, useRef } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { AppState, BACKGROUNDS } from './types';
import { ContentControls } from './components/ContentControls';
import { AppearanceControls } from './components/AppearanceControls';
import { CardPreview } from './components/CardPreview';
import { Copy, Download, Terminal, Check, X, Palette, Type } from 'lucide-react';

const DEFAULT_PROMPT = `Refactor src/auth/session.ts to use the new TokenStore API.
Keep the existing public surface identical, add unit tests, and run typecheck before you finish.`;

// "dusk" mesh gradient — calm cool tones, doesn't compete with the card
const DEFAULT_BACKGROUND =
  'radial-gradient(at 100% 0%, rgba(129,140,248,0.24) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(244,114,182,0.18) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(45,212,191,0.16) 0px, transparent 60%), #0c0a18';

export default function App() {
  const [state, setState] = useState<AppState>({
    agent: 'claude',
    prompt: DEFAULT_PROMPT,
    theme: 'dracula',
    padding: 56,
    dropShadow: true,
    windowControls: 'mac',
    background: DEFAULT_BACKGROUND,
    showPromptSymbol: true,

    claudeModel: 'claude-sonnet-4-6',
    claudeMaxTurns: 0,
    claudeOutputFormat: 'text',
    claudeAppendSystemPrompt: '',
    claudePermissionMode: 'default',
    claudeAllowedTools: '',
    claudeAddDir: '',
    claudeVerbose: false,

    codexModel: '',
    codexSandbox: 'workspace-write',
    codexApproval: 'full-auto',
    codexJson: false,
    codexCd: '',
    codexImage: '',

    geminiModel: '',
    geminiOutputFormat: 'text',
    geminiDebug: false,
    geminiAllFiles: false,
    geminiSandbox: false,

    opencodeModel: '',
    opencodeAgent: '',
    opencodeFormat: 'default',
    opencodeContinue: false,
    opencodeShare: false,

    aiderModel: '',
    aiderArchitect: false,
    aiderNoAutoCommits: false,
    aiderNoGit: false,
    aiderNoStream: true,
    aiderRead: '',
    aiderMapTokens: 0,

    ampStream: 'off',
    ampSettingsFile: '',

    qwenModel: '',
    qwenOutputFormat: 'text',
    qwenDebug: false,
    qwenAllFiles: false,

    kiloModel: '',
    kiloAgent: '',
    kiloFormat: 'default',
    kiloContinue: false,

    indentSize: 4,
    fontSize: 22,
    fontFamily: 'JetBrains Mono',
  });

  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedImg, setCopiedImg] = useState(false);
  const [exported, setExported] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState<'content' | 'appearance' | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const getCommandString = () => {
    const promptText = state.prompt ? `"${state.prompt.replace(/"/g, '\\"')}"` : '""';
    const lines: string[] = [];
    const indent = ' '.repeat(state.indentSize);

    if (state.agent === 'claude') {
      lines.push('claude');
      if (state.claudeModel) lines.push(`${indent}--model ${state.claudeModel}`);
      lines.push(`${indent}--dangerously-skip-permissions`);
      if (state.claudePermissionMode !== 'default')
        lines.push(`${indent}--permission-mode ${state.claudePermissionMode}`);
      if (state.claudeMaxTurns > 0) lines.push(`${indent}--max-turns ${state.claudeMaxTurns}`);
      if (state.claudeOutputFormat !== 'text')
        lines.push(`${indent}--output-format ${state.claudeOutputFormat}`);
      if (state.claudeAllowedTools)
        lines.push(`${indent}--allowedTools "${state.claudeAllowedTools}"`);
      if (state.claudeAddDir) lines.push(`${indent}--add-dir ${state.claudeAddDir}`);
      if (state.claudeAppendSystemPrompt)
        lines.push(`${indent}--append-system-prompt "${state.claudeAppendSystemPrompt.replace(/"/g, '\\"')}"`);
      if (state.claudeVerbose) lines.push(`${indent}--verbose`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'codex') {
      lines.push('codex exec');
      if (state.codexModel) lines.push(`${indent}--model ${state.codexModel}`);
      if (state.codexApproval === 'full-auto') lines.push(`${indent}--full-auto`);
      else if (state.codexApproval === 'bypass')
        lines.push(`${indent}--dangerously-bypass-approvals-and-sandbox`);
      else lines.push(`${indent}--ask-for-approval`);
      if (state.codexApproval !== 'bypass')
        lines.push(`${indent}--sandbox ${state.codexSandbox}`);
      if (state.codexCd) lines.push(`${indent}--cd ${state.codexCd}`);
      if (state.codexImage) lines.push(`${indent}--image ${state.codexImage}`);
      if (state.codexJson) lines.push(`${indent}--json`);
      lines.push(`${indent}${promptText}`);
    } else if (state.agent === 'gemini') {
      lines.push('gemini');
      if (state.geminiModel) lines.push(`${indent}--model ${state.geminiModel}`);
      lines.push(`${indent}--yolo`);
      if (state.geminiOutputFormat !== 'text')
        lines.push(`${indent}--output-format ${state.geminiOutputFormat}`);
      if (state.geminiSandbox) lines.push(`${indent}--sandbox`);
      if (state.geminiAllFiles) lines.push(`${indent}--all-files`);
      if (state.geminiDebug) lines.push(`${indent}--debug`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'opencode') {
      lines.push('opencode run');
      if (state.opencodeModel) lines.push(`${indent}--model ${state.opencodeModel}`);
      if (state.opencodeAgent) lines.push(`${indent}--agent ${state.opencodeAgent}`);
      lines.push(`${indent}--dangerously-skip-permissions`);
      if (state.opencodeContinue) lines.push(`${indent}--continue`);
      if (state.opencodeShare) lines.push(`${indent}--share`);
      if (state.opencodeFormat !== 'default')
        lines.push(`${indent}--format ${state.opencodeFormat}`);
      lines.push(`${indent}${promptText}`);
    } else if (state.agent === 'aider') {
      lines.push('aider');
      if (state.aiderModel) lines.push(`${indent}--model ${state.aiderModel}`);
      if (state.aiderArchitect) lines.push(`${indent}--architect`);
      lines.push(`${indent}--yes-always`);
      if (state.aiderNoAutoCommits) lines.push(`${indent}--no-auto-commits`);
      if (state.aiderNoGit) lines.push(`${indent}--no-git`);
      if (state.aiderNoStream) lines.push(`${indent}--no-stream`);
      if (state.aiderRead) lines.push(`${indent}--read ${state.aiderRead}`);
      if (state.aiderMapTokens > 0)
        lines.push(`${indent}--map-tokens ${state.aiderMapTokens}`);
      lines.push(`${indent}--message ${promptText}`);
    } else if (state.agent === 'amp') {
      lines.push('amp');
      lines.push(`${indent}--dangerously-allow-all`);
      if (state.ampStream === 'json') lines.push(`${indent}--stream-json`);
      else if (state.ampStream === 'json-thinking')
        lines.push(`${indent}--stream-json-thinking`);
      if (state.ampSettingsFile) lines.push(`${indent}--settings-file ${state.ampSettingsFile}`);
      lines.push(`${indent}-x ${promptText}`);
    } else if (state.agent === 'qwen') {
      lines.push('qwen');
      if (state.qwenModel) lines.push(`${indent}--model ${state.qwenModel}`);
      lines.push(`${indent}--yolo`);
      if (state.qwenOutputFormat !== 'text')
        lines.push(`${indent}--output-format ${state.qwenOutputFormat}`);
      if (state.qwenAllFiles) lines.push(`${indent}--all-files`);
      if (state.qwenDebug) lines.push(`${indent}--debug`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'kilo') {
      lines.push('kilo run');
      if (state.kiloModel) lines.push(`${indent}--model ${state.kiloModel}`);
      if (state.kiloAgent) lines.push(`${indent}--agent ${state.kiloAgent}`);
      lines.push(`${indent}--auto`);
      if (state.kiloContinue) lines.push(`${indent}--continue`);
      if (state.kiloFormat !== 'default') lines.push(`${indent}--format ${state.kiloFormat}`);
      lines.push(`${indent}${promptText}`);
    }

    return lines.join(' \\\n');
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(getCommandString());
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    try {
      const blob = await toBlob(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopiedImg(true);
        setTimeout(() => setCopiedImg(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `talkshow-${state.agent}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  return (
    <div className="bg-[var(--color-bauhaus-bg)] font-sans text-[var(--color-bauhaus-text)] flex flex-col relative overflow-hidden" style={{ height: '100dvh' }}>
      {/* Subtle Bauhaus decorations on the chrome only — kept off the preview area */}

      {/* Header */}
      <header className="h-12 flex items-center justify-between px-4 md:px-6 bg-[var(--color-bauhaus-surface)] border-b-2 border-[var(--color-bauhaus-border)] shrink-0 z-30">
        <div className="flex items-center gap-2">
          <div className="bauhaus-square-accent" />
          <h1 className="text-sm font-black tracking-[3px] uppercase text-white">TalkShow</h1>
          <span className="hidden sm:inline text-[10px] font-semibold tracking-[2px] uppercase text-[var(--color-bauhaus-text-dim)] ml-1.5 pl-2 border-l border-[var(--color-bauhaus-border-light)]">
            Prompts → Cards
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          <button className="bauhaus-btn flex items-center gap-1.5" onClick={handleCopyCommand}>
            {copiedCmd ? <Check className="w-3 h-3 text-green-400" /> : <Terminal className="w-3 h-3" />}
            <span>{copiedCmd ? 'Copied' : 'Command'}</span>
          </button>
          <button className="bauhaus-btn flex items-center gap-1.5" onClick={handleCopyImage}>
            {copiedImg ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedImg ? 'Copied' : 'Image'}</span>
          </button>
          <button
            className={`bauhaus-btn flex items-center gap-1.5 ${exported ? 'border-green-500 text-green-400' : 'bauhaus-btn-primary'}`}
            onClick={handleDownloadImage}
          >
            {exported ? <Check className="w-3 h-3" /> : <Download className="w-3 h-3" />}
            <span>{exported ? 'Done' : 'Export'}</span>
          </button>
        </div>
        {/* Mobile: just an export button — copy/image live in the bottom tab bar */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            className={`bauhaus-btn flex items-center gap-1 ${exported ? 'border-green-500 text-green-400' : 'bauhaus-btn-primary'}`}
            onClick={handleDownloadImage}
          >
            {exported ? <Check className="w-3 h-3" /> : <Download className="w-3 h-3" />}
            <span>{exported ? 'Done' : 'PNG'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace - Desktop: 3 columns, Mobile: preview only */}
      <div className="flex flex-1 relative min-h-0">
        {/* Background layer */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none"
          style={{
            background:
              state.background === 'transparent'
                ? 'radial-gradient(ellipse at center, #131316 0%, #0a0a0c 100%)'
                : state.background,
          }}
        />
        {/* Quiet vignette to anchor the card center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.25) 100%)',
          }}
        />

        {/* Left Panel: Content & Agent - hidden on mobile */}
        <div className="hidden md:flex w-80 flex-shrink-0 bg-[var(--color-bauhaus-surface)] overflow-y-auto hide-scrollbar z-10 border-r-2 border-[var(--color-bauhaus-border)] flex-col">
          <div className="bauhaus-section-header">
            <div className="bauhaus-dot bg-[var(--color-bauhaus-red)]" />
            <span>Content</span>
          </div>
          <ContentControls state={state} setState={setState} />
        </div>

        {/* Center: Preview */}
        <div className="flex-1 flex items-center justify-center overflow-auto hide-scrollbar relative z-10 p-3 md:p-6 pb-24 md:pb-6">
          <CardPreview state={state} ref={cardRef} />
        </div>

        {/* Right Panel: Appearance - hidden on mobile */}
        <div className="hidden md:flex w-80 flex-shrink-0 bg-[var(--color-bauhaus-surface)] overflow-y-auto hide-scrollbar z-10 border-l-2 border-[var(--color-bauhaus-border)] flex-col">
          <div className="bauhaus-section-header">
            <div className="bauhaus-dot bg-[var(--color-bauhaus-blue)]" />
            <span>Appearance</span>
          </div>
          <AppearanceControls state={state} setState={setState} />
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="mobile-tab-bar">
        <button onClick={() => setMobileDrawer(mobileDrawer === 'content' ? null : 'content')}>
          <Type className="w-4 h-4" style={{ color: mobileDrawer === 'content' ? 'var(--color-bauhaus-red)' : 'var(--color-bauhaus-text-muted)' }} />
          <span style={{ color: mobileDrawer === 'content' ? 'var(--color-bauhaus-red)' : 'var(--color-bauhaus-text-muted)' }}>Content</span>
        </button>
        <button onClick={handleCopyCommand}>
          <Terminal className="w-4 h-4" style={{ color: copiedCmd ? '#4ade80' : 'var(--color-bauhaus-text-muted)' }} />
          <span style={{ color: copiedCmd ? '#4ade80' : 'var(--color-bauhaus-text-muted)' }}>{copiedCmd ? 'Copied' : 'Command'}</span>
        </button>
        <button onClick={handleCopyImage}>
          <Copy className="w-4 h-4" style={{ color: copiedImg ? '#4ade80' : 'var(--color-bauhaus-text-muted)' }} />
          <span style={{ color: copiedImg ? '#4ade80' : 'var(--color-bauhaus-text-muted)' }}>{copiedImg ? 'Copied' : 'Image'}</span>
        </button>
        <button onClick={() => setMobileDrawer(mobileDrawer === 'appearance' ? null : 'appearance')}>
          <Palette className="w-4 h-4" style={{ color: mobileDrawer === 'appearance' ? 'var(--color-bauhaus-blue)' : 'var(--color-bauhaus-text-muted)' }} />
          <span style={{ color: mobileDrawer === 'appearance' ? 'var(--color-bauhaus-blue)' : 'var(--color-bauhaus-text-muted)' }}>Style</span>
        </button>
      </div>

      {/* Mobile drawer overlay */}
      <div className={`drawer-overlay ${mobileDrawer ? 'open' : ''}`} onClick={() => setMobileDrawer(null)} />

      {/* Mobile drawer panel */}
      <div className={`drawer-panel hide-scrollbar ${mobileDrawer ? 'open' : ''}`}>
        <div className="drawer-handle" />
        <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-[var(--color-bauhaus-border)] sticky top-0 bg-[var(--color-bauhaus-surface)] z-10">
          <div className="flex items-center gap-2">
            <div className={`bauhaus-dot ${mobileDrawer === 'content' ? 'bg-[var(--color-bauhaus-red)]' : 'bg-[var(--color-bauhaus-blue)]'}`} />
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-white">
              {mobileDrawer === 'content' ? 'Content' : 'Appearance'}
            </span>
          </div>
          <button onClick={() => setMobileDrawer(null)} className="text-[var(--color-bauhaus-text-muted)] -m-2 p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
        {mobileDrawer === 'content' && <ContentControls state={state} setState={setState} />}
        {mobileDrawer === 'appearance' && <AppearanceControls state={state} setState={setState} />}
      </div>
    </div>
  );
}
