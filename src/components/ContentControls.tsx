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

  const agents: { value: Agent; label: string }[] = [
    { value: 'claude', label: 'Claude Code' },
    { value: 'opencode', label: 'OpenCode' },
    { value: 'aider', label: 'Aider' },
    { value: 'pi', label: 'Pi (pi-mono)' },
    { value: 'qwen-code', label: 'Qwen Code' },
    { value: 'kilo', label: 'Kilo' },
  ];

  return (
    <div className="flex flex-col p-4 space-y-5 text-slate-400">
      <div className="space-y-2">
        <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Prompt Content</label>
        <textarea
          value={state.prompt}
          onChange={(e) => handleChange('prompt', e.target.value)}
          className="w-full h-64 p-3 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all font-mono text-xs resize-y placeholder-slate-500"
          placeholder="Enter your prompt here..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Agent</label>
        <div className="grid grid-cols-2 gap-1.5">
          {agents.map((agent) => (
            <button
              key={agent.value}
              onClick={() => handleChange('agent', agent.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                state.agent === agent.value
                  ? 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/40'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              {agent.label}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Specific Settings */}
      <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg space-y-3">
        <h3 className="text-[9px] font-medium uppercase tracking-widest text-slate-400 mb-1">Agent Settings</h3>
        
        {state.agent === 'claude' && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Model</label>
              <input
                type="text"
                value={state.claudeModel}
                onChange={(e) => handleChange('claudeModel', e.target.value)}
                placeholder="e.g. claude-sonnet-4-6"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Permission Mode</label>
              <select
                value={state.claudePermissionMode}
                onChange={(e) => handleChange('claudePermissionMode', e.target.value)}
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs appearance-none cursor-pointer pr-8"
              >
                <option value="default">default</option>
                <option value="acceptEdits">acceptEdits</option>
                <option value="plan">plan</option>
                <option value="auto">auto</option>
                <option value="bypassPermissions">bypassPermissions</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Max Turns ({state.claudeMaxTurns})</label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={state.claudeMaxTurns}
                onChange={(e) => handleChange('claudeMaxTurns', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-orange-500
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:bg-orange-400
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:bg-orange-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Append System Prompt</label>
              <input
                type="text"
                value={state.claudeAppendSystemPrompt}
                onChange={(e) => handleChange('claudeAppendSystemPrompt', e.target.value)}
                placeholder="e.g. Always use TypeScript"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <input
                type="checkbox"
                checked={state.claudeSkipPermissions}
                onChange={(e) => handleChange('claudeSkipPermissions', e.target.checked)}
                className="w-4 h-4 rounded border border-slate-600 bg-transparent checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-xs font-medium tracking-tight group-hover:text-slate-300 transition-colors">--dangerously-skip-permissions</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <input
                type="checkbox"
                checked={state.claudeDebug}
                onChange={(e) => handleChange('claudeDebug', e.target.checked)}
                className="w-4 h-4 rounded border border-slate-600 bg-transparent checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-xs font-medium tracking-tight group-hover:text-slate-300 transition-colors">--debug</span>
            </label>
          </div>
        )}

        {state.agent === 'opencode' && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Model (provider/model)</label>
              <input
                type="text"
                value={state.opencodeModel}
                onChange={(e) => handleChange('opencodeModel', e.target.value)}
                placeholder="e.g. anthropic/claude-sonnet-4-6"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Output Format</label>
              <select
                value={state.opencodeFormat}
                onChange={(e) => handleChange('opencodeFormat', e.target.value)}
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs appearance-none cursor-pointer pr-8"
              >
                <option value="default">default</option>
                <option value="json">json</option>
              </select>
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <input
                type="checkbox"
                checked={state.opencodeThinking}
                onChange={(e) => handleChange('opencodeThinking', e.target.checked)}
                className="w-4 h-4 rounded border border-slate-600 bg-transparent checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-xs font-medium tracking-tight group-hover:text-slate-300 transition-colors">--thinking</span>
            </label>
          </div>
        )}

        {state.agent === 'aider' && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Model</label>
              <input
                type="text"
                value={state.aiderModel}
                onChange={(e) => handleChange('aiderModel', e.target.value)}
                placeholder="e.g. sonnet"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Edit Format</label>
              <select
                value={state.aiderEditFormat}
                onChange={(e) => handleChange('aiderEditFormat', e.target.value)}
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs appearance-none cursor-pointer pr-8"
              >
                <option value="diff">diff</option>
                <option value="whole">whole</option>
                <option value="udiff">udiff</option>
                <option value="architect">architect</option>
              </select>
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <input
                type="checkbox"
                checked={state.aiderAutoCommits}
                onChange={(e) => handleChange('aiderAutoCommits', e.target.checked)}
                className="w-4 h-4 rounded border border-slate-600 bg-transparent checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-xs font-medium tracking-tight group-hover:text-slate-300 transition-colors">--auto-commits</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <input
                type="checkbox"
                checked={state.aiderLint}
                onChange={(e) => handleChange('aiderLint', e.target.checked)}
                className="w-4 h-4 rounded border border-slate-600 bg-transparent checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-xs font-medium tracking-tight group-hover:text-slate-300 transition-colors">--lint</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <input
                type="checkbox"
                checked={state.aiderNoAutoLint}
                onChange={(e) => handleChange('aiderNoAutoLint', e.target.checked)}
                className="w-4 h-4 rounded border border-slate-600 bg-transparent checked:bg-orange-500 checked:border-orange-500 focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none relative transition-all
                  before:content-[''] before:absolute before:top-0.5 before:left-1 before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0 checked:before:opacity-100 before:transition-opacity"
              />
              <span className="text-xs font-medium tracking-tight group-hover:text-slate-300 transition-colors">--no-auto-lint</span>
            </label>
          </div>
        )}

        {state.agent === 'pi' && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Provider</label>
              <input
                type="text"
                value={state.piProvider}
                onChange={(e) => handleChange('piProvider', e.target.value)}
                placeholder="e.g. anthropic"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Model</label>
              <input
                type="text"
                value={state.piModel}
                onChange={(e) => handleChange('piModel', e.target.value)}
                placeholder="e.g. claude-sonnet-4-20250514"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Thinking Level</label>
              <select
                value={state.piThinking}
                onChange={(e) => handleChange('piThinking', e.target.value)}
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs appearance-none cursor-pointer pr-8"
              >
                <option value="off">off</option>
                <option value="minimal">minimal</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="xhigh">xhigh</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Tools (comma-separated)</label>
              <input
                type="text"
                value={state.piTools}
                onChange={(e) => handleChange('piTools', e.target.value)}
                placeholder="e.g. read,bash,edit,write"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
          </div>
        )}

        {state.agent === 'qwen-code' && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Model</label>
              <input
                type="text"
                value={state.qwenModel}
                onChange={(e) => handleChange('qwenModel', e.target.value)}
                placeholder="e.g. qwen3-coder-plus"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Auth Type</label>
              <select
                value={state.qwenAuthType}
                onChange={(e) => handleChange('qwenAuthType', e.target.value)}
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs appearance-none cursor-pointer pr-8"
              >
                <option value="openai">openai</option>
                <option value="anthropic">anthropic</option>
                <option value="gemini">gemini</option>
                <option value="qwen-oauth">qwen-oauth</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Output Format</label>
              <select
                value={state.qwenOutputFormat}
                onChange={(e) => handleChange('qwenOutputFormat', e.target.value)}
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs appearance-none cursor-pointer pr-8"
              >
                <option value="text">text</option>
                <option value="json">json</option>
                <option value="stream-json">stream-json</option>
              </select>
            </div>
          </div>
        )}

        {state.agent === 'kilo' && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Model</label>
              <input
                type="text"
                value={state.kiloModel}
                onChange={(e) => handleChange('kiloModel', e.target.value)}
                placeholder="e.g. claude-sonnet-4-20250514"
                className="w-full p-2 border border-slate-700 rounded-lg focus:border-orange-500/50 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/20 bg-slate-800 text-slate-300 transition-all text-xs placeholder-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium uppercase tracking-widest text-slate-400">Temperature ({state.kiloTemperature})</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={state.kiloTemperature}
                onChange={(e) => handleChange('kiloTemperature', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:bg-orange-400
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
