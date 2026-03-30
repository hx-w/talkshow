import React, { useState, useRef } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { AppState, BACKGROUNDS } from './types';
import { ContentControls } from './components/ContentControls';
import { AppearanceControls } from './components/AppearanceControls';
import { CardPreview } from './components/CardPreview';
import { Copy, Download, Terminal, Check } from 'lucide-react';

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
    fontSize: 14,
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
    <div className="flex flex-col h-screen bg-neutral-900 font-sans text-neutral-200 overflow-hidden selection:bg-neutral-700 selection:text-white">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-neutral-900 border-b border-neutral-800 shrink-0 z-20">
        <div className="flex items-center">
          <h1 className="text-xl font-medium tracking-widest text-white">TALKSHOW</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded transition-colors w-32 justify-center" 
            onClick={handleCopyCommand}
          >
            {copiedCmd ? <Check className="w-4 h-4 mr-2 text-white" /> : <Terminal className="w-4 h-4 mr-2" />}
            <span className={copiedCmd ? "text-white" : ""}>{copiedCmd ? "Copied!" : "Command"}</span>
          </button>
          <button 
            className="flex items-center px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded transition-colors w-32 justify-center" 
            onClick={handleCopyImage}
          >
            {copiedImg ? <Check className="w-4 h-4 mr-2 text-white" /> : <Copy className="w-4 h-4 mr-2" />}
            <span className={copiedImg ? "text-white" : ""}>{copiedImg ? "Copied!" : "Image"}</span>
          </button>
          <button 
            className={`flex items-center px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-black rounded transition-colors w-32 justify-center ${exported ? 'bg-neutral-300' : 'bg-white hover:bg-neutral-200'}`} 
            onClick={handleDownloadImage}
          >
            {exported ? <Check className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
            {exported ? "Exported!" : "Export"}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden z-10">
        {/* Left Panel: Content & Agent */}
        <div className="w-80 flex-shrink-0 bg-neutral-900 border-r border-neutral-800 overflow-y-auto hide-scrollbar z-10">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Content</h2>
          </div>
          <ContentControls state={state} setState={setState} />
        </div>

        {/* Center: Preview */}
        <div className="flex-1 flex items-center justify-center bg-neutral-950 overflow-auto hide-scrollbar p-8 relative">
          {/* Minimalist Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <div className="z-10 w-full flex justify-center">
            <CardPreview state={state} ref={cardRef} />
          </div>
        </div>

        {/* Right Panel: Appearance */}
        <div className="w-80 flex-shrink-0 bg-neutral-900 border-l border-neutral-800 overflow-y-auto hide-scrollbar z-10">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Appearance</h2>
          </div>
          <AppearanceControls state={state} setState={setState} />
        </div>
      </div>
    </div>
  );
}
