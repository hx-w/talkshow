import React from 'react';
import { AppState, Theme, BACKGROUNDS, FONTS } from '../types';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const AppearanceControls: React.FC<Props> = ({ state, setState }) => {
  const handleChange = (key: keyof AppState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const themes: { value: Theme; label: string; color: string }[] = [
    { value: 'nord', label: 'Nord', color: '#2E3440' },
    { value: 'dracula', label: 'Dracula', color: '#282a36' },
    { value: 'monokai', label: 'Monokai', color: '#272822' },
    { value: 'github-dark', label: 'GitHub', color: '#0d1117' },
    { value: 'vercel', label: 'Vercel', color: '#000000' },
    { value: 'swiss', label: 'Swiss', color: '#ffffff' },
  ];

  return (
    <div className="flex flex-col p-6 space-y-6 text-neutral-300">
      <div className="space-y-3">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Theme</label>
        <div className="grid grid-cols-3 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleChange('theme', theme.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                state.theme === theme.value
                  ? 'bg-white/10 text-white ring-2 ring-indigo-500/50'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full border border-white/20" 
                style={{ backgroundColor: theme.color }} 
              />
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Background</label>
        <div className="grid grid-cols-4 gap-2">
          {BACKGROUNDS.map((bg, i) => (
            <button
              key={i}
              onClick={() => handleChange('background', bg)}
              className={`aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                state.background === bg 
                  ? 'ring-2 ring-indigo-500/50 border-white/30 scale-105' 
                  : 'border-white/10 hover:border-white/20'
              }`}
              style={{ background: bg === 'transparent' ? '#0a0a0a' : bg }}
              title={bg === 'transparent' ? 'Transparent' : bg}
            >
              {bg === 'transparent' && (
                <div className="w-full h-full flex items-center justify-center text-[8px] text-neutral-500 font-medium">NONE</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Padding</label>
          <span className="text-xs text-neutral-500 font-mono">{state.padding}px</span>
        </div>
        <input
          type="range"
          min="16"
          max="128"
          step="8"
          value={state.padding}
          onChange={(e) => handleChange('padding', parseInt(e.target.value))}
          className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Font Family</label>
        <div className="relative">
          <select
            value={state.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full p-2.5 border border-white/10 rounded-lg focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-neutral-900/30 text-neutral-200 transition-all text-sm appearance-none cursor-pointer pr-10"
          >
            {FONTS.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Font Size</label>
          <span className="text-xs text-neutral-500 font-mono">{state.fontSize}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="24"
          step="1"
          value={state.fontSize}
          onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
          className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Indent Size</label>
          <span className="text-xs text-neutral-500 font-mono">{state.indentSize} spaces</span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          step="2"
          value={state.indentSize}
          onChange={(e) => handleChange('indentSize', parseInt(e.target.value))}
          className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Window Controls</label>
        <div className="grid grid-cols-3 gap-2">
          {(['mac', 'windows', 'none'] as const).map((ctrl) => (
            <button
              key={ctrl}
              onClick={() => handleChange('windowControls', ctrl)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                state.windowControls === ctrl
                  ? 'bg-white/10 text-white ring-2 ring-indigo-500/50'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {ctrl === 'mac' ? 'macOS' : ctrl === 'windows' ? 'Windows' : 'None'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${state.dropShadow ? 'bg-indigo-500 border-indigo-500' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
            {state.dropShadow && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">Drop Shadow</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${state.showPromptSymbol ? 'bg-indigo-500 border-indigo-500' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
            {state.showPromptSymbol && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">Show $ Prompt</span>
        </label>
      </div>
    </div>
  );
};
