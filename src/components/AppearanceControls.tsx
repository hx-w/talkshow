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
    <div className="flex flex-col p-4 space-y-5">
      {/* Theme */}
      <div className="space-y-2">
        <label className="bauhaus-label">Theme</label>
        <div className="grid grid-cols-3 gap-1.5">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleChange('theme', theme.value)}
              className={`flex items-center gap-2 px-2.5 py-2 text-[11px] font-semibold transition-all ${
                state.theme === theme.value
                  ? 'bg-[var(--color-bauhaus-blue)] text-white border border-[var(--color-bauhaus-blue)]'
                  : 'border border-[var(--color-bauhaus-border-light)] text-[var(--color-bauhaus-text-dim)] hover:text-[var(--color-bauhaus-text)] hover:border-[var(--color-bauhaus-text-muted)]'
              }`}
            >
              <div
                className="w-3.5 h-3.5 border border-[var(--color-bauhaus-border-light)]"
                style={{ backgroundColor: theme.color }}
              />
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      {/* Background */}
      <div className="space-y-2">
        <label className="bauhaus-label">Background</label>
        <div className="grid grid-cols-4 gap-1.5">
          {BACKGROUNDS.map((bg, i) => (
            <button
              key={i}
              onClick={() => handleChange('background', bg)}
              className={`aspect-square rounded border-2 transition-all ${
                state.background === bg
                  ? 'border-[var(--color-bauhaus-yellow)] scale-105'
                  : 'border-[var(--color-bauhaus-border)] hover:border-[var(--color-bauhaus-text-muted)]'
              }`}
              style={{ background: bg === 'transparent' ? 'repeating-conic-gradient(#222 0% 25%, #111 0% 50%) 50% / 8px 8px' : bg, minHeight: '36px' }}
              title={bg === 'transparent' ? 'Transparent' : bg}
            >
              {bg === 'transparent' && (
                <div className="w-full h-full flex items-center justify-center text-[8px] text-[var(--color-bauhaus-text-dim)] font-bold">NONE</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Padding */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="bauhaus-label">Padding</label>
          <span className="text-xs text-[var(--color-bauhaus-text-muted)] font-mono">{state.padding}px</span>
        </div>
        <input
          type="range" min="16" max="128" step="8"
          value={state.padding}
          onChange={(e) => handleChange('padding', parseInt(e.target.value))}
          className="bauhaus-slider"
        />
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <label className="bauhaus-label">Font Family</label>
        <select
          value={state.fontFamily}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
          className="bauhaus-select"
        >
          {FONTS.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="bauhaus-label">Font Size</label>
          <span className="text-xs text-[var(--color-bauhaus-text-muted)] font-mono">{state.fontSize}px</span>
        </div>
        <input
          type="range" min="12" max="48" step="1"
          value={state.fontSize}
          onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
          className="bauhaus-slider"
        />
      </div>

      {/* Indent Size */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="bauhaus-label">Indent Size</label>
          <span className="text-xs text-[var(--color-bauhaus-text-muted)] font-mono">{state.indentSize} spaces</span>
        </div>
        <input
          type="range" min="2" max="8" step="2"
          value={state.indentSize}
          onChange={(e) => handleChange('indentSize', parseInt(e.target.value))}
          className="bauhaus-slider"
        />
      </div>

      {/* Window Controls */}
      <div className="space-y-2">
        <label className="bauhaus-label">Window Controls</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['mac', 'windows', 'none'] as const).map((ctrl) => (
            <button
              key={ctrl}
              onClick={() => handleChange('windowControls', ctrl)}
              className={`px-2.5 py-2 text-[11px] font-semibold transition-all ${
                state.windowControls === ctrl
                  ? 'bg-[var(--color-bauhaus-blue)] text-white border border-[var(--color-bauhaus-blue)]'
                  : 'border border-[var(--color-bauhaus-border-light)] text-[var(--color-bauhaus-text-dim)] hover:text-[var(--color-bauhaus-text)]'
              }`}
            >
              {ctrl === 'mac' ? 'macOS' : ctrl === 'windows' ? 'Windows' : 'None'}
            </button>
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-1.5 pt-2 border-t-2 border-[var(--color-bauhaus-border)]">
        <label className="flex items-center gap-2.5 cursor-pointer group py-1">
          <input
            type="checkbox"
            checked={state.dropShadow}
            onChange={(e) => handleChange('dropShadow', e.target.checked)}
            className="bauhaus-checkbox"
          />
          <span className="text-[13px] text-[var(--color-bauhaus-text-muted)] group-hover:text-[var(--color-bauhaus-text)] transition-colors">Drop Shadow</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer group py-1">
          <input
            type="checkbox"
            checked={state.showPromptSymbol}
            onChange={(e) => handleChange('showPromptSymbol', e.target.checked)}
            className="bauhaus-checkbox"
          />
          <span className="text-[13px] text-[var(--color-bauhaus-text-muted)] group-hover:text-[var(--color-bauhaus-text)] transition-colors">Show $ Prompt</span>
        </label>
      </div>
    </div>
  );
};
