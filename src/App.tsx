import React, { useState, useRef } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { AppState, BACKGROUNDS } from './types';
import { ContentControls } from './components/ContentControls';
import { AppearanceControls } from './components/AppearanceControls';
import { CardPreview } from './components/CardPreview';
import { Copy, Download, Terminal, Check, Mic } from 'lucide-react';

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
    claudeSkipPermissions: true,
    claudeDebug: false,
    claudeMaxTurns: 0,
    claudePermissionMode: 'bypassPermissions',
    claudeAppendSystemPrompt: '',
    opencodeModel: '',
    opencodeFormat: 'default',
    opencodeThinking: false,
    aiderModel: '',
    aiderAutoCommits: true,
    aiderLint: false,
    aiderEditFormat: 'diff',
    aiderNoAutoLint: false,
    piProvider: 'anthropic',
    piModel: '',
    piThinking: 'medium',
    piTools: 'read,bash,edit,write',
    qwenModel: '',
    qwenAuthType: 'qwen-oauth',
    qwenOutputFormat: 'text',
    kiloModel: '',
    kiloTemperature: 0.7,
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
      if (state.claudeModel) lines.push(`${indent}--model ${state.claudeModel}`);
      if (state.claudePermissionMode !== 'default') lines.push(`${indent}--permission-mode ${state.claudePermissionMode}`);
      if (state.claudeMaxTurns > 0) lines.push(`${indent}--max-turns ${state.claudeMaxTurns}`);
      if (state.claudeAppendSystemPrompt) lines.push(`${indent}--append-system-prompt "${state.claudeAppendSystemPrompt.replace(/"/g, '\\"')}"`);
      if (state.claudeSkipPermissions) lines.push(`${indent}--dangerously-skip-permissions`);
      if (state.claudeDebug) lines.push(`${indent}--debug`);
      lines.push(`${indent}-p ${promptText}`);
    } else if (state.agent === 'opencode') {
      lines.push('opencode run');
      if (state.opencodeModel) lines.push(`${indent}-m ${state.opencodeModel}`);
      if (state.opencodeFormat !== 'default') lines.push(`${indent}--format ${state.opencodeFormat}`);
      if (state.opencodeThinking) lines.push(`${indent}--thinking`);
      lines.push(`${indent}${promptText}`);
    } else if (state.agent === 'aider') {
      lines.push('aider');
      if (state.aiderModel) lines.push(`${indent}--model ${state.aiderModel}`);
      if (state.aiderEditFormat !== 'diff') lines.push(`${indent}--edit-format ${state.aiderEditFormat}`);
      if (!state.aiderAutoCommits) lines.push(`${indent}--no-auto-commits`);
      if (state.aiderLint) lines.push(`${indent}--lint`);
      if (state.aiderNoAutoLint) lines.push(`${indent}--no-auto-lint`);
      lines.push(`${indent}--message ${promptText}`);
    } else if (state.agent === 'pi') {
      lines.push('pi');
      if (state.piProvider) lines.push(`${indent}--provider ${state.piProvider}`);
      if (state.piModel) lines.push(`${indent}--model ${state.piModel}`);
      if (state.piThinking !== 'medium') lines.push(`${indent}--thinking ${state.piThinking}`);
      if (state.piTools) lines.push(`${indent}--tools ${state.piTools}`);
      lines.push(`${indent}--print ${promptText}`);
    } else if (state.agent === 'qwen-code') {
      lines.push('qwen-code');
      if (state.qwenModel) lines.push(`${indent}--model ${state.qwenModel}`);
      if (state.qwenAuthType !== 'qwen-oauth') lines.push(`${indent}--auth-type ${state.qwenAuthType}`);
      if (state.qwenOutputFormat !== 'text') lines.push(`${indent}--output-format ${state.qwenOutputFormat}`);
      lines.push(`${indent}--prompt ${promptText}`);
    } else if (state.agent === 'kilo') {
      lines.push('kilo run');
      if (state.kiloModel) lines.push(`${indent}--model ${state.kiloModel}`);
      if (state.kiloTemperature !== 0.7) lines.push(`${indent}--temperature ${state.kiloTemperature}`);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-sans text-slate-300 selection:bg-orange-500/30 selection:text-orange-200 flex flex-col">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 bg-slate-900/95 border-b border-slate-800 shrink-0 z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 via-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Mic className="w-3.5 h-3.5 text-white" />
          </div>
          <h1 className="text-base font-semibold tracking-tight text-slate-100">TalkShow</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 gap-1.5 border border-slate-700"
            onClick={handleCopyCommand}
          >
            {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5" />}
            <span>{copiedCmd ? "Copied!" : "Command"}</span>
          </button>
          <button
            className="flex items-center px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 gap-1.5 border border-slate-700"
            onClick={handleCopyImage}
          >
            {copiedImg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedImg ? "Copied!" : "Image"}</span>
          </button>
          <button
            className={`flex items-center px-4 py-2 text-[10px] font-medium uppercase tracking-wider rounded-lg transition-all duration-200 gap-1.5 ${
              exported
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20'
            }`}
            onClick={handleDownloadImage}
          >
            {exported ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            {exported ? "Exported!" : "Export"}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 relative">
        {/* Background layer */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none"
          style={{
            background: state.background === 'transparent' ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' : state.background,
          }}
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        {/* Decorative glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Left Panel: Content & Agent */}
        <div className="w-72 flex-shrink-0 bg-slate-900 overflow-y-auto hide-scrollbar z-10 border-r border-slate-800 relative">
          <div className="sticky top-0 p-4 border-b border-slate-800 bg-slate-900 z-10">
            <h2 className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">Content</h2>
          </div>
          <ContentControls state={state} setState={setState} />
        </div>

        {/* Center: Preview */}
        <div className="flex-1 flex items-center justify-center overflow-auto hide-scrollbar relative z-10 p-6">
          <CardPreview state={state} ref={cardRef} />
        </div>

        {/* Right Panel: Appearance */}
        <div className="w-72 flex-shrink-0 bg-slate-900 overflow-y-auto hide-scrollbar z-10 border-l border-slate-800 relative">
          <div className="sticky top-0 p-4 border-b border-slate-800 bg-slate-900 z-10">
            <h2 className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">Appearance</h2>
          </div>
          <AppearanceControls state={state} setState={setState} />
        </div>
      </div>
    </div>
  );
}
