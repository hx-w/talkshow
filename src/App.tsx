import React, { useState, useRef } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { AppState, BACKGROUNDS } from './types';
import { ContentControls } from './components/ContentControls';
import { AppearanceControls } from './components/AppearanceControls';
import { CardPreview } from './components/CardPreview';
import { Copy, Download, Terminal, Check, Sparkles } from 'lucide-react';

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
    claudeSkipPermissions: true,
    claudeVerbose: false,
    aiderModel: '',
    aiderAutoCommits: true,
    aiderLint: false,
    cursorModel: '',
    cursorNewWindow: false,
    opencodeModel: '',
    opencodeTemperature: 0.7,
    indentSize: 4,
    fontSize: 24,
    fontFamily: 'JetBrains Mono',
  });

  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedImg, setCopiedImg] = useState(false);
  const [exported, setExported] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const getCommandString = () => {
    const promptText = state.prompt ? `"${state.prompt.replace(/"/g, '\\"')}"` : '""';
    const lines: string[] = [];
    const indent = ' '.repeat(state.indentSize);

    if (state.agent === 'claude') {
      lines.push('claude');
      if (state.claudeSkipPermissions) lines.push(`${indent}--dangerously-skip-permissions`);
      if (state.claudeVerbose) lines.push(`${indent}--verbose`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'opencode') {
      lines.push('opencode');
      if (state.opencodeModel) lines.push(`${indent}--model ${state.opencodeModel}`);
      if (state.opencodeTemperature !== 0.7) lines.push(`${indent}--temperature ${state.opencodeTemperature}`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'aider') {
      lines.push('aider');
      if (state.aiderModel) lines.push(`${indent}--model ${state.aiderModel}`);
      if (!state.aiderAutoCommits) lines.push(`${indent}--no-auto-commits`);
      if (state.aiderLint) lines.push(`${indent}--lint`);
      lines.push(`${indent}--message ${promptText}`);
    } else if (state.agent === 'cursor') {
      lines.push('cursor');
      if (state.cursorModel) lines.push(`${indent}--model ${state.cursorModel}`);
      if (state.cursorNewWindow) lines.push(`${indent}--new-window`);
      lines.push(`${indent}--prompt ${promptText}`);
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
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
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
    <div className="flex flex-col h-screen bg-neutral-950 font-sans text-neutral-200 overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-neutral-900/80 backdrop-blur-xl border-b border-white/5 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-md opacity-50 pulse-glow" />
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-semibold tracking-wide text-white">TalkShow</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="btn-fancy flex items-center px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 gap-2" 
            onClick={handleCopyCommand}
          >
            {copiedCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Terminal className="w-4 h-4" />}
            <span>{copiedCmd ? "Copied!" : "Command"}</span>
          </button>
          <button 
            className="btn-fancy flex items-center px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 gap-2" 
            onClick={handleCopyImage}
          >
            {copiedImg ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedImg ? "Copied!" : "Image"}</span>
          </button>
          <button 
            className={`btn-fancy flex items-center px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 gap-2 ${
              exported 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'
            }`} 
            onClick={handleDownloadImage}
          >
            {exported ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            {exported ? "Exported!" : "Export"}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden z-10">
        {/* Left Panel: Content & Agent */}
        <div className="w-80 flex-shrink-0 glass-panel overflow-y-auto hide-scrollbar z-10 border-r border-white/5">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Content</h2>
          </div>
          <ContentControls state={state} setState={setState} />
        </div>

        {/* Center: Preview */}
        <div className="flex-1 flex items-center justify-center overflow-auto hide-scrollbar relative">
          {/* Base background layer */}
          <div 
            className="absolute inset-0 transition-all duration-700"
            style={{ 
              background: state.background === 'transparent' ? '#0a0a0a' : state.background,
            }}
          />
          {/* Soft vignette - darker edges */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: 'radial-gradient(ellipse 80% 80% at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
            }}
          />
          {/* Blur layer for gradient backgrounds */}
          {state.background !== 'transparent' && state.background !== '#1a1a1a' && (
            <div 
              className="absolute inset-0 backdrop-blur-[100px] opacity-40"
            />
          )}
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
          
          {/* Very subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
          
          {/* Content */}
          <div className="z-10 w-full flex justify-center py-12 px-8">
            <CardPreview state={state} ref={cardRef} />
          </div>
        </div>

        {/* Right Panel: Appearance */}
        <div className="w-80 flex-shrink-0 glass-panel overflow-y-auto hide-scrollbar z-10 border-l border-white/5">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Appearance</h2>
          </div>
          <AppearanceControls state={state} setState={setState} />
        </div>
      </div>
    </div>
  );
}
