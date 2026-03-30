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

  return (
    <div className="flex flex-col p-6 space-y-8 text-neutral-300">
      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Theme</label>
        <select
          value={state.theme}
          onChange={(e) => handleChange('theme', e.target.value as Theme)}
          className="w-full p-2.5 border border-neutral-800 rounded focus:border-neutral-600 focus:bg-neutral-950 focus:outline-none bg-neutral-950 text-neutral-200 transition-colors text-sm appearance-none"
        >
          <option value="nord">Nord</option>
          <option value="dracula">Dracula</option>
          <option value="monokai">Monokai</option>
          <option value="github-dark">GitHub Dark</option>
          <option value="vercel">Vercel</option>
          <option value="swiss">Swiss</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Background</label>
        <div className="grid grid-cols-4 gap-2">
          {BACKGROUNDS.map((bg, i) => (
            <button
              key={i}
              onClick={() => handleChange('background', bg)}
              className={`aspect-square rounded border-2 transition-transform hover:scale-105 ${state.background === bg ? 'border-neutral-400 scale-105' : 'border-neutral-800'}`}
              style={{ background: bg }}
              title={bg}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Padding ({state.padding}px)</label>
        <input
          type="range"
          min="16"
          max="128"
          step="8"
          value={state.padding}
          onChange={(e) => handleChange('padding', parseInt(e.target.value))}
          className="w-full accent-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Font Family</label>
        <select
          value={state.fontFamily}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
          className="w-full p-2.5 border border-neutral-800 rounded focus:border-neutral-600 focus:bg-neutral-950 focus:outline-none bg-neutral-950 text-neutral-200 transition-colors text-sm appearance-none"
        >
          {FONTS.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Font Size ({state.fontSize}px)</label>
        <input
          type="range"
          min="12"
          max="24"
          step="1"
          value={state.fontSize}
          onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
          className="w-full accent-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Indent Size ({state.indentSize} spaces)</label>
        <input
          type="range"
          min="2"
          max="8"
          step="2"
          value={state.indentSize}
          onChange={(e) => handleChange('indentSize', parseInt(e.target.value))}
          className="w-full accent-neutral-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Window Controls</label>
        <select
          value={state.windowControls}
          onChange={(e) => handleChange('windowControls', e.target.value)}
          className="w-full p-2.5 border border-neutral-800 rounded focus:border-neutral-600 focus:bg-neutral-950 focus:outline-none bg-neutral-950 text-neutral-200 transition-colors text-sm appearance-none"
        >
          <option value="mac">macOS</option>
          <option value="windows">Windows</option>
          <option value="none">None</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={state.dropShadow}
            onChange={(e) => handleChange('dropShadow', e.target.checked)}
            className="w-4 h-4 border border-neutral-700 rounded bg-neutral-900 text-neutral-200 focus:ring-0 focus:ring-offset-0 transition-colors"
          />
          <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">Drop Shadow</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={state.showPromptSymbol}
            onChange={(e) => handleChange('showPromptSymbol', e.target.checked)}
            className="w-4 h-4 border border-neutral-700 rounded bg-neutral-900 text-neutral-200 focus:ring-0 focus:ring-offset-0 transition-colors"
          />
          <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">Show $ Prompt</span>
        </label>
      </div>
    </div>
  );
};
