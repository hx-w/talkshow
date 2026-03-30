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
          className="w-full h-72 p-4 border border-white/10 rounded-xl focus:border-indigo-500/50 focus:bg-neutral-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-neutral-900/30 text-neutral-200 transition-all font-mono text-sm resize-y placeholder-neutral-600"
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
                  ? 'bg-white/15 text-white ring-2 ring-white/30 shadow-lg shadow-black/20'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {agent.charAt(0).toUpperCase() + agent.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Specific Settings */}
      <div className="p-4 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-xl space-y-4">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">Agent Settings</h3>
        
        {state.agent === 'claude' && (
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${state.claudeSkipPermissions ? 'bg-indigo-500 border-indigo-500' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
                {state.claudeSkipPermissions && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--dangerously-skip-permissions</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${state.claudeVerbose ? 'bg-indigo-500 border-indigo-500' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
                {state.claudeVerbose && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
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
                className="w-full p-2.5 border border-white/10 rounded-lg focus:border-indigo-500/50 focus:bg-neutral-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-neutral-900/30 text-neutral-200 transition-all text-sm placeholder-neutral-600"
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
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
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
                className="w-full p-2.5 border border-white/10 rounded-lg focus:border-indigo-500/50 focus:bg-neutral-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-neutral-900/30 text-neutral-200 transition-all text-sm placeholder-neutral-600"
              />
            </div>
            <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${state.aiderAutoCommits ? 'bg-indigo-500 border-indigo-500' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
                {state.aiderAutoCommits && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">Auto Commits</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${state.aiderLint ? 'bg-indigo-500 border-indigo-500' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
                {state.aiderLint && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
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
                className="w-full p-2.5 border border-white/10 rounded-lg focus:border-indigo-500/50 focus:bg-neutral-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-neutral-900/30 text-neutral-200 transition-all text-sm placeholder-neutral-600"
              />
            </div>
            <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${state.cursorNewWindow ? 'bg-indigo-500 border-indigo-500' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
                {state.cursorNewWindow && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">--new-window</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
