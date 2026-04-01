import React, { useState, useRef } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { AppState, BACKGROUNDS } from './types';
import { ContentControls } from './components/ContentControls';
import { AppearanceControls } from './components/AppearanceControls';
import { CardPreview } from './components/CardPreview';
import { Copy, Download, Terminal, Check, Mic, Menu, X, Palette, Type } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>({
    agent: 'claude',
    prompt: 'You are an expert developer...',
    theme: 'nord',
    padding: 64,
    dropShadow: true,
    windowControls: 'mac',
    background: BACKGROUNDS[0],
    showPromptSymbol: true,
    claudeModel: '',
    claudeMaxTurns: 0,
    claudeOutputFormat: 'text',
    claudeAppendSystemPrompt: '',
    claudeDebug: false,
    opencodeModel: '',
    opencodeProvider: '',
    opencodeMaxTurns: 0,
    opencodeOutput: 'text',
    opencodeThinking: false,
    aiderModel: '',
    aiderEditFormat: 'diff',
    aiderNoAutoCommits: false,
    aiderLint: false,
    aiderNoAutoLint: false,
    aiderNoStream: true,
    ampModel: '',
    ampStreamJson: false,
    qwenModel: '',
    qwenOutputFormat: 'text',
    kiloModel: '',
    kiloProvider: '',
    kiloMode: 'Code',
    kiloMaxTurns: 0,
    indentSize: 4,
    fontSize: 24,
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
      if (state.claudeMaxTurns > 0) lines.push(`${indent}--max-turns ${state.claudeMaxTurns}`);
      if (state.claudeOutputFormat !== 'text') lines.push(`${indent}--output-format ${state.claudeOutputFormat}`);
      if (state.claudeAppendSystemPrompt) lines.push(`${indent}--append-system-prompt "${state.claudeAppendSystemPrompt.replace(/"/g, '\\"')}"`);
      if (state.claudeDebug) lines.push(`${indent}--debug`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'opencode') {
      lines.push('opencode');
      if (state.opencodeProvider) lines.push(`${indent}--provider ${state.opencodeProvider}`);
      if (state.opencodeModel) lines.push(`${indent}--model ${state.opencodeModel}`);
      lines.push(`${indent}--yes`);
      if (state.opencodeMaxTurns > 0) lines.push(`${indent}--max-turns ${state.opencodeMaxTurns}`);
      if (state.opencodeOutput !== 'text') lines.push(`${indent}--output ${state.opencodeOutput}`);
      if (state.opencodeThinking) lines.push(`${indent}--thinking`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'aider') {
      lines.push('aider');
      if (state.aiderModel) lines.push(`${indent}--model ${state.aiderModel}`);
      if (state.aiderEditFormat !== 'diff') lines.push(`${indent}--edit-format ${state.aiderEditFormat}`);
      lines.push(`${indent}--yes-always`);
      if (state.aiderNoAutoCommits) lines.push(`${indent}--no-auto-commits`);
      if (state.aiderLint) lines.push(`${indent}--lint`);
      if (state.aiderNoAutoLint) lines.push(`${indent}--no-auto-lint`);
      if (state.aiderNoStream) lines.push(`${indent}--no-stream`);
      lines.push(`${indent}--message ${promptText}`);
    } else if (state.agent === 'amp') {
      lines.push('amp');
      if (state.ampModel) lines.push(`${indent}--model ${state.ampModel}`);
      lines.push(`${indent}--yes`);
      if (state.ampStreamJson) lines.push(`${indent}--stream-json`);
      lines.push(`${indent}--execute ${promptText}`);
    } else if (state.agent === 'qwen-code') {
      lines.push('qwen-code');
      if (state.qwenModel) lines.push(`${indent}--model ${state.qwenModel}`);
      lines.push(`${indent}--yolo`);
      if (state.qwenOutputFormat !== 'text') lines.push(`${indent}--output-format ${state.qwenOutputFormat}`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'kilo') {
      lines.push('kilo');
      if (state.kiloProvider) lines.push(`${indent}--provider ${state.kiloProvider}`);
      if (state.kiloModel) lines.push(`${indent}--model ${state.kiloModel}`);
      lines.push(`${indent}--autonomous`);
      if (state.kiloMode !== 'Code') lines.push(`${indent}--mode ${state.kiloMode}`);
      if (state.kiloMaxTurns > 0) lines.push(`${indent}--max-turns ${state.kiloMaxTurns}`);
      lines.push(`${indent}-p ${promptText}`);
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
    <div className="min-h-screen bg-[var(--color-bauhaus-bg)] font-sans text-[var(--color-bauhaus-text)] flex flex-col relative overflow-hidden">
      {/* Bauhaus geometric decorations */}
      <div className="bauhaus-triangle-tr" style={{ width: 120, height: 120 }} />
      <div className="bauhaus-circle-bl" style={{ width: 80, height: 80, bottom: -25, left: -25 }} />
      <div className="absolute top-1/2 right-0 w-[3px] h-32 bg-[var(--color-bauhaus-yellow)] opacity-10 pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-6 h-6 bg-[var(--color-bauhaus-blue)] opacity-[0.06] pointer-events-none" />

      {/* Header */}
      <header className="h-12 flex items-center justify-between px-4 md:px-6 bg-[var(--color-bauhaus-surface)] border-b-2 border-[var(--color-bauhaus-border)] shrink-0 z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="bauhaus-square-accent" />
          <h1 className="text-sm font-black tracking-[3px] uppercase text-white">TalkShow</h1>
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
        {/* Mobile: hamburger for export actions */}
        <div className="flex md:hidden items-center gap-1.5">
          <button className="bauhaus-btn bauhaus-btn-primary flex items-center gap-1" onClick={handleDownloadImage}>
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Main Workspace - Desktop: 3 columns, Mobile: preview only */}
      <div className="flex flex-1 relative">
        {/* Background layer */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none"
          style={{
            background: state.background === 'transparent' ? 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)' : state.background,
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(var(--color-bauhaus-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-bauhaus-border) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
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
        <div className="flex-1 flex items-center justify-center overflow-auto hide-scrollbar relative z-10 p-4 md:p-6 pb-20 md:pb-6">
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
          <span style={{ color: copiedCmd ? '#4ade80' : 'var(--color-bauhaus-text-muted)' }}>{copiedCmd ? 'Copied' : 'Copy'}</span>
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
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[var(--color-bauhaus-border)]">
          <span className="text-sm font-bold uppercase tracking-widest text-white">
            {mobileDrawer === 'content' ? 'Content' : 'Appearance'}
          </span>
          <button onClick={() => setMobileDrawer(null)} className="text-[var(--color-bauhaus-text-muted)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        {mobileDrawer === 'content' && <ContentControls state={state} setState={setState} />}
        {mobileDrawer === 'appearance' && <AppearanceControls state={state} setState={setState} />}
      </div>
    </div>
  );
}
