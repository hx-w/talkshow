import React from 'react';
import { AppState, Agent } from '../types';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const ContentControls: React.FC<Props> = ({ state, setState }) => {
  const handleChange = (key: keyof AppState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col p-6 space-y-8 text-neutral-300">
      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Prompt Content</label>
        <textarea
          value={state.prompt}
          onChange={(e) => handleChange('prompt', e.target.value)}
          className="w-full h-80 p-3 border border-neutral-800 rounded focus:border-neutral-600 focus:bg-neutral-950 focus:outline-none bg-neutral-950 text-neutral-200 transition-colors font-mono text-sm resize-y"
          placeholder="Enter your prompt here..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Agent Harness</label>
        <select
          value={state.agent}
          onChange={(e) => handleChange('agent', e.target.value as Agent)}
          className="w-full p-2.5 border border-neutral-800 rounded focus:border-neutral-600 focus:bg-neutral-950 focus:outline-none bg-neutral-950 text-neutral-200 transition-colors text-sm appearance-none"
        >
          <option value="claude">Claude</option>
          <option value="opencode">OpenCode</option>
          <option value="aider">Aider</option>
          <option value="cursor">Cursor</option>
        </select>
      </div>

      {/* Agent Specific Settings */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 rounded space-y-4">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800 pb-2">Agent Settings</h3>
        
        {state.agent === 'claude' && (
          <>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={state.claudeSkipPermissions}
                  onChange={(e) => handleChange('claudeSkipPermissions', e.target.checked)}
                  className="w-4 h-4 border border-neutral-700 rounded bg-neutral-900 text-neutral-200 focus:ring-0 focus:ring-offset-0 transition-colors"
                />
                <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--dangerously-skip-permissions</span>
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={state.claudeVerbose}
                  onChange={(e) => handleChange('claudeVerbose', e.target.checked)}
                  className="w-4 h-4 border border-neutral-700 rounded bg-neutral-900 text-neutral-200 focus:ring-0 focus:ring-offset-0 transition-colors"
                />
                <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--verbose</span>
              </label>
            </div>
          </>
        )}

        {state.agent === 'opencode' && (
          <>
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Model</label>
              <input
                type="text"
                value={state.opencodeModel}
                onChange={(e) => handleChange('opencodeModel', e.target.value)}
                placeholder="e.g. gpt-4o"
                className="w-full p-2.5 border border-neutral-800 rounded focus:border-neutral-600 focus:bg-neutral-950 focus:outline-none bg-neutral-950 text-neutral-200 transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Temperature ({state.opencodeTemperature})</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={state.opencodeTemperature}
                onChange={(e) => handleChange('opencodeTemperature', parseFloat(e.target.value))}
                className="w-full accent-neutral-500"
              />
            </div>
          </>
        )}

        {state.agent === 'aider' && (
          <>
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Model</label>
              <input
                type="text"
                value={state.aiderModel}
                onChange={(e) => handleChange('aiderModel', e.target.value)}
                placeholder="e.g. sonnet"
                className="w-full p-2.5 border border-neutral-800 rounded focus:border-neutral-600 focus:bg-neutral-950 focus:outline-none bg-neutral-950 text-neutral-200 transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={state.aiderAutoCommits}
                  onChange={(e) => handleChange('aiderAutoCommits', e.target.checked)}
                  className="w-4 h-4 border border-neutral-700 rounded bg-neutral-900 text-neutral-200 focus:ring-0 focus:ring-offset-0 transition-colors"
                />
                <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">Auto Commits</span>
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={state.aiderLint}
                  onChange={(e) => handleChange('aiderLint', e.target.checked)}
                  className="w-4 h-4 border border-neutral-700 rounded bg-neutral-900 text-neutral-200 focus:ring-0 focus:ring-offset-0 transition-colors"
                />
                <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--lint</span>
              </label>
            </div>
          </>
        )}

        {state.agent === 'cursor' && (
          <>
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Model</label>
              <input
                type="text"
                value={state.cursorModel}
                onChange={(e) => handleChange('cursorModel', e.target.value)}
                placeholder="e.g. claude-3.5-sonnet"
                className="w-full p-2.5 border border-neutral-800 rounded focus:border-neutral-600 focus:bg-neutral-950 focus:outline-none bg-neutral-950 text-neutral-200 transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={state.cursorNewWindow}
                  onChange={(e) => handleChange('cursorNewWindow', e.target.checked)}
                  className="w-4 h-4 border border-neutral-700 rounded bg-neutral-900 text-neutral-200 focus:ring-0 focus:ring-offset-0 transition-colors"
                />
                <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--new-window</span>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
