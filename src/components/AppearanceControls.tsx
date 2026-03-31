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
    { value: 'aurora', label: 'Aurora', color: '#f0f4ff' },
    { value: 'sunset', label: 'Sunset', color: '#fff7ed' },
    { value: 'ocean', label: 'Ocean', color: '#ecfeff' },
    { value: 'forest', label: 'Forest', color: '#f0fdf4' },
    { value: 'candy', label: 'Candy', color: '#fdf2f8' },
    { value: 'neon', label: 'Neon', color: '#0a0a1a' },
  ];

  return (
    <div className="flex flex-col p-4 space-y-5 text-slate-400">
      <div className="space-y-2">
        <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Theme</label>
        <div className="grid grid-cols-3 gap-1.5">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleChange('theme', theme.value)}
              className={`px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                state.theme === theme.value
                  ? 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/40'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full border border-slate-600 shadow-sm"
                style={{ backgroundColor: theme.color }}
              />
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Background</label>
        <div className="grid grid-cols-4 gap-1.5">
          {BACKGROUNDS.map((bg, i) => (
            <button
              key={i}
              onClick={() => handleChange('background', bg)}
              className={`aspect-square rounded-lg border transition-all duration-200 hover:scale-105 ${
                state.background === bg
                  ? 'ring-2 ring-orange-400 border-orange-500/50 scale-105'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
              style={{ background: bg === 'transparent' ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : bg }}
              title={bg === 'transparent' ? 'Transparent' : bg}
            >
              {bg === 'transparent' && (
                <div className="w-full h-full flex items-center justify-center text-[7px] text-slate-400 font-medium">NONE</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Padding</label>
          <span className="text-[10px] text-slate-400 font-mono">{state.padding}px</span>
        </div>
        <input
          type="range"
          min="16"
          max="128"
          step="8"
          value={state.padding}
          onChange={(e) => handleChange('padding', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:bg-orange-400
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Font Family</label>
        <div className="relative">
          <select
            value={state.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs appearance-none cursor-pointer pr-8
              [&>option]:bg-slate-800 [&>option]:text-slate-300 [&>option]:py-1"
          >
            {FONTS.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Font Size</label>
          <span className="text-[10px] text-slate-400 font-mono">{state.fontSize}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="48"
          step="1"
          value={state.fontSize}
          onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:bg-orange-400
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Indent Size</label>
          <span className="text-[10px] text-slate-400 font-mono">{state.indentSize} spaces</span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          step="2"
          value={state.indentSize}
          onChange={(e) => handleChange('indentSize', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:bg-orange-400
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Window Controls</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['mac', 'windows', 'none'] as const).map((ctrl) => (
            <button
              key={ctrl}
              onClick={() => handleChange('windowControls', ctrl)}
              className={`px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200 ${
                state.windowControls === ctrl
                  ? 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/40'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              {ctrl === 'mac' ? 'macOS' : ctrl === 'windows' ? 'Windows' : 'None'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5 pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
          <input
            type="checkbox"
            checked={state.dropShadow}
            onChange={(e) => handleChange('dropShadow', e.target.checked)}
            className="w-4 h-4 rounded border border-slate-600 bg-slate-800 checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
              before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
          />
          <span className="text-xs font-medium tracking-tight text-slate-400 group-hover:text-slate-300 transition-colors">Drop Shadow</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
          <input
            type="checkbox"
            checked={state.showPromptSymbol}
            onChange={(e) => handleChange('showPromptSymbol', e.target.checked)}
            className="w-4 h-4 rounded border border-slate-600 bg-slate-800 checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
              before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
          />
          <span className="text-xs font-medium tracking-tight text-slate-400 group-hover:text-slate-300 transition-colors">Show $ Prompt</span>
        </label>
      </div>
    </div>
  );
};
