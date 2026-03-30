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
    <div className="flex flex-col p-6 space-y-6 text-neutral-300">
      <div className="space-y-3">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Prompt Content</label>
        <textarea
          value={state.prompt}
          onChange={(e) => handleChange('prompt', e.target.value)}
          className="w-full h-72 p-4 border border-white/10 rounded-xl focus:border-white/30 focus:bg-neutral-800/50 focus:outline-none focus:ring-1 focus:ring-white/10 bg-neutral-800/30 text-neutral-200 transition-all font-mono text-sm resize-y placeholder-neutral-600"
          placeholder="Enter your prompt here..."
        />
      </div>

      <div className="space-y-3">
        <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Agent Harness</label>
        <div className="grid grid-cols-2 gap-2">
          {(['claude', 'opencode', 'aider', 'cursor'] as Agent[]).map((agent) => (
            <button
              key={agent}
              onClick={() => handleChange('agent', agent)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                state.agent === agent
                  ? 'bg-white/15 text-white ring-1 ring-white/30'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {agent.charAt(0).toUpperCase() + agent.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Specific Settings */}
      <div className="p-4 bg-neutral-800/30 border border-white/10 rounded-xl space-y-4">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">Agent Settings</h3>
        
        {state.agent === 'claude' && (
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <input
                type="checkbox"
                checked={state.claudeSkipPermissions}
                onChange={(e) => handleChange('claudeSkipPermissions', e.target.checked)}
                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-white checked:border-white checked:text-neutral-900 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1.5 before:w-2 before:h-3.5 before:border-r-2 before:border-b-2 before:border-neutral-900 before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--dangerously-skip-permissions</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <input
                type="checkbox"
                checked={state.claudeVerbose}
                onChange={(e) => handleChange('claudeVerbose', e.target.checked)}
                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-white checked:border-white checked:text-neutral-900 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1.5 before:w-2 before:h-3.5 before:border-r-2 before:border-b-2 before:border-neutral-900 before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--verbose</span>
            </label>
          </div>
        )}

        {state.agent === 'opencode' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Model</label>
              <input
                type="text"
                value={state.opencodeModel}
                onChange={(e) => handleChange('opencodeModel', e.target.value)}
                placeholder="e.g. gpt-4o"
                className="w-full p-2.5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-neutral-800/50 focus:outline-none focus:ring-1 focus:ring-white/10 bg-neutral-800/30 text-neutral-200 transition-all text-sm placeholder-neutral-600"
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
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        )}

        {state.agent === 'aider' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Model</label>
              <input
                type="text"
                value={state.aiderModel}
                onChange={(e) => handleChange('aiderModel', e.target.value)}
                placeholder="e.g. sonnet"
                className="w-full p-2.5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-neutral-800/50 focus:outline-none focus:ring-1 focus:ring-white/10 bg-neutral-800/30 text-neutral-200 transition-all text-sm placeholder-neutral-600"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <input
                type="checkbox"
                checked={state.aiderAutoCommits}
                onChange={(e) => handleChange('aiderAutoCommits', e.target.checked)}
                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-white checked:border-white checked:text-neutral-900 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1.5 before:w-2 before:h-3.5 before:border-r-2 before:border-b-2 before:border-neutral-900 before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">Auto Commits</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <input
                type="checkbox"
                checked={state.aiderLint}
                onChange={(e) => handleChange('aiderLint', e.target.checked)}
                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-white checked:border-white checked:text-neutral-900 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1.5 before:w-2 before:h-3.5 before:border-r-2 before:border-b-2 before:border-neutral-900 before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--lint</span>
            </label>
          </div>
        )}

        {state.agent === 'cursor' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Model</label>
              <input
                type="text"
                value={state.cursorModel}
                onChange={(e) => handleChange('cursorModel', e.target.value)}
                placeholder="e.g. claude-3.5-sonnet"
                className="w-full p-2.5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-neutral-800/50 focus:outline-none focus:ring-1 focus:ring-white/10 bg-neutral-800/30 text-neutral-200 transition-all text-sm placeholder-neutral-600"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <input
                type="checkbox"
                checked={state.cursorNewWindow}
                onChange={(e) => handleChange('cursorNewWindow', e.target.checked)}
                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-white checked:border-white checked:text-neutral-900 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1.5 before:w-2 before:h-3.5 before:border-r-2 before:border-b-2 before:border-neutral-900 before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--new-window</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
