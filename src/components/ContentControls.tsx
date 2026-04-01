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
    { value: 'amp', label: 'Amp' },
    { value: 'qwen-code', label: 'Qwen Code' },
    { value: 'kilo', label: 'Kilo' },
  ];

  return (
    <div className="flex flex-col p-4 space-y-5">
      {/* Prompt */}
      <div className="space-y-2">
        <label className="bauhaus-label">Prompt</label>
        <textarea
          value={state.prompt}
          onChange={(e) => handleChange('prompt', e.target.value)}
          className="bauhaus-input font-mono resize-y"
          style={{ minHeight: '200px' }}
          placeholder="Enter your prompt here..."
        />
      </div>

      {/* Agent selector */}
      <div className="space-y-2">
        <label className="bauhaus-label">Agent</label>
        <div className="grid grid-cols-2 gap-1.5">
          {agents.map((agent) => (
            <button
              key={agent.value}
              onClick={() => handleChange('agent', agent.value)}
              className={`bauhaus-agent-btn ${state.agent === agent.value ? 'active' : ''}`}
            >
              {agent.label}
            </button>
          ))}
        </div>
      </div>

      {/* Agent-specific settings */}
      <div className="border-2 border-[var(--color-bauhaus-border)] p-4 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 bg-[var(--color-bauhaus-yellow)]" />
          <span className="bauhaus-label" style={{ marginBottom: 0 }}>Agent Settings</span>
        </div>

        {/* Claude Code */}
        {state.agent === 'claude' && (
          <div className="space-y-3">
            <Field label="Model">
              <input type="text" value={state.claudeModel} onChange={(e) => handleChange('claudeModel', e.target.value)} placeholder="e.g. claude-sonnet-4-6" className="bauhaus-input" />
            </Field>
            <Field label="Max Turns" right={state.claudeMaxTurns > 0 ? String(state.claudeMaxTurns) : 'off'}>
              <input type="range" min="0" max="50" step="1" value={state.claudeMaxTurns} onChange={(e) => handleChange('claudeMaxTurns', parseInt(e.target.value))} className="bauhaus-slider" />
            </Field>
            <Field label="Output Format">
              <select value={state.claudeOutputFormat} onChange={(e) => handleChange('claudeOutputFormat', e.target.value)} className="bauhaus-select">
                <option value="text">text</option>
                <option value="json">json</option>
                <option value="stream-json">stream-json</option>
              </select>
            </Field>
            <Field label="Append System Prompt">
              <input type="text" value={state.claudeAppendSystemPrompt} onChange={(e) => handleChange('claudeAppendSystemPrompt', e.target.value)} placeholder="e.g. Always use TypeScript" className="bauhaus-input" />
            </Field>
            <div className="pt-2 space-y-1 border-t border-[var(--color-bauhaus-border)]">
              <div className="text-[9px] uppercase tracking-widest text-[var(--color-bauhaus-text-dim)] mb-1">CI flags (always on)</div>
              <div className="flex items-center gap-2 px-1 py-1">
                <div className="w-4 h-4 bg-[var(--color-bauhaus-red)] flex items-center justify-center"><span className="text-white text-[9px] font-bold">✓</span></div>
                <span className="text-[13px] text-[var(--color-bauhaus-text-muted)]">--dangerously-skip-permissions</span>
              </div>
            </div>
            <CheckboxField label="--debug" checked={state.claudeDebug} onChange={(v) => handleChange('claudeDebug', v)} />
          </div>
        )}

        {/* OpenCode */}
        {state.agent === 'opencode' && (
          <div className="space-y-3">
            <Field label="Provider">
              <input type="text" value={state.opencodeProvider} onChange={(e) => handleChange('opencodeProvider', e.target.value)} placeholder="e.g. anthropic" className="bauhaus-input" />
            </Field>
            <Field label="Model">
              <input type="text" value={state.opencodeModel} onChange={(e) => handleChange('opencodeModel', e.target.value)} placeholder="e.g. claude-sonnet-4-6" className="bauhaus-input" />
            </Field>
            <Field label="Max Turns" right={state.opencodeMaxTurns > 0 ? String(state.opencodeMaxTurns) : 'off'}>
              <input type="range" min="0" max="50" step="1" value={state.opencodeMaxTurns} onChange={(e) => handleChange('opencodeMaxTurns', parseInt(e.target.value))} className="bauhaus-slider" />
            </Field>
            <Field label="Output">
              <select value={state.opencodeOutput} onChange={(e) => handleChange('opencodeOutput', e.target.value)} className="bauhaus-select">
                <option value="text">text</option>
                <option value="json">json</option>
              </select>
            </Field>
            <div className="pt-2 space-y-1 border-t border-[var(--color-bauhaus-border)]">
              <div className="text-[9px] uppercase tracking-widest text-[var(--color-bauhaus-text-dim)] mb-1">CI flags (always on)</div>
              <div className="flex items-center gap-2 px-1 py-1">
                <div className="w-4 h-4 bg-[var(--color-bauhaus-red)] flex items-center justify-center"><span className="text-white text-[9px] font-bold">✓</span></div>
                <span className="text-[13px] text-[var(--color-bauhaus-text-muted)]">--yes</span>
              </div>
            </div>
            <CheckboxField label="--thinking" checked={state.opencodeThinking} onChange={(v) => handleChange('opencodeThinking', v)} />
          </div>
        )}

        {/* Aider */}
        {state.agent === 'aider' && (
          <div className="space-y-3">
            <Field label="Model">
              <input type="text" value={state.aiderModel} onChange={(e) => handleChange('aiderModel', e.target.value)} placeholder="e.g. sonnet" className="bauhaus-input" />
            </Field>
            <Field label="Edit Format">
              <select value={state.aiderEditFormat} onChange={(e) => handleChange('aiderEditFormat', e.target.value)} className="bauhaus-select">
                <option value="diff">diff</option>
                <option value="whole">whole</option>
                <option value="udiff">udiff</option>
                <option value="architect">architect</option>
              </select>
            </Field>
            <div className="pt-2 space-y-1 border-t border-[var(--color-bauhaus-border)]">
              <div className="text-[9px] uppercase tracking-widest text-[var(--color-bauhaus-text-dim)] mb-1">CI flags (always on)</div>
              <div className="flex items-center gap-2 px-1 py-1">
                <div className="w-4 h-4 bg-[var(--color-bauhaus-red)] flex items-center justify-center"><span className="text-white text-[9px] font-bold">✓</span></div>
                <span className="text-[13px] text-[var(--color-bauhaus-text-muted)]">--yes-always</span>
              </div>
            </div>
            <CheckboxField label="--no-auto-commits" checked={state.aiderNoAutoCommits} onChange={(v) => handleChange('aiderNoAutoCommits', v)} />
            <CheckboxField label="--lint" checked={state.aiderLint} onChange={(v) => handleChange('aiderLint', v)} />
            <CheckboxField label="--no-auto-lint" checked={state.aiderNoAutoLint} onChange={(v) => handleChange('aiderNoAutoLint', v)} />
            <CheckboxField label="--no-stream" checked={state.aiderNoStream} onChange={(v) => handleChange('aiderNoStream', v)} />
          </div>
        )}

        {/* Amp */}
        {state.agent === 'amp' && (
          <div className="space-y-3">
            <Field label="Model">
              <input type="text" value={state.ampModel} onChange={(e) => handleChange('ampModel', e.target.value)} placeholder="e.g. claude-sonnet-4-6" className="bauhaus-input" />
            </Field>
            <div className="pt-2 space-y-1 border-t border-[var(--color-bauhaus-border)]">
              <div className="text-[9px] uppercase tracking-widest text-[var(--color-bauhaus-text-dim)] mb-1">CI flags (always on)</div>
              <div className="flex items-center gap-2 px-1 py-1">
                <div className="w-4 h-4 bg-[var(--color-bauhaus-red)] flex items-center justify-center"><span className="text-white text-[9px] font-bold">✓</span></div>
                <span className="text-[13px] text-[var(--color-bauhaus-text-muted)]">--yes</span>
              </div>
            </div>
            <CheckboxField label="--stream-json" checked={state.ampStreamJson} onChange={(v) => handleChange('ampStreamJson', v)} />
          </div>
        )}

        {/* Qwen Code */}
        {state.agent === 'qwen-code' && (
          <div className="space-y-3">
            <Field label="Model">
              <input type="text" value={state.qwenModel} onChange={(e) => handleChange('qwenModel', e.target.value)} placeholder="e.g. qwen3-coder-plus" className="bauhaus-input" />
            </Field>
            <Field label="Output Format">
              <select value={state.qwenOutputFormat} onChange={(e) => handleChange('qwenOutputFormat', e.target.value)} className="bauhaus-select">
                <option value="text">text</option>
                <option value="json">json</option>
                <option value="stream-json">stream-json</option>
              </select>
            </Field>
            <div className="pt-2 space-y-1 border-t border-[var(--color-bauhaus-border)]">
              <div className="text-[9px] uppercase tracking-widest text-[var(--color-bauhaus-text-dim)] mb-1">CI flags (always on)</div>
              <div className="flex items-center gap-2 px-1 py-1">
                <div className="w-4 h-4 bg-[var(--color-bauhaus-red)] flex items-center justify-center"><span className="text-white text-[9px] font-bold">✓</span></div>
                <span className="text-[13px] text-[var(--color-bauhaus-text-muted)]">--yolo</span>
              </div>
            </div>
          </div>
        )}

        {/* Kilo */}
        {state.agent === 'kilo' && (
          <div className="space-y-3">
            <Field label="Provider">
              <input type="text" value={state.kiloProvider} onChange={(e) => handleChange('kiloProvider', e.target.value)} placeholder="e.g. anthropic" className="bauhaus-input" />
            </Field>
            <Field label="Model">
              <input type="text" value={state.kiloModel} onChange={(e) => handleChange('kiloModel', e.target.value)} placeholder="e.g. claude-sonnet-4-6" className="bauhaus-input" />
            </Field>
            <Field label="Mode">
              <select value={state.kiloMode} onChange={(e) => handleChange('kiloMode', e.target.value)} className="bauhaus-select">
                <option value="Orchestrator">Orchestrator</option>
                <option value="Architect">Architect</option>
                <option value="Code">Code</option>
                <option value="Ask">Ask</option>
                <option value="Debug">Debug</option>
              </select>
            </Field>
            <Field label="Max Turns" right={state.kiloMaxTurns > 0 ? String(state.kiloMaxTurns) : 'off'}>
              <input type="range" min="0" max="50" step="1" value={state.kiloMaxTurns} onChange={(e) => handleChange('kiloMaxTurns', parseInt(e.target.value))} className="bauhaus-slider" />
            </Field>
            <div className="pt-2 space-y-1 border-t border-[var(--color-bauhaus-border)]">
              <div className="text-[9px] uppercase tracking-widest text-[var(--color-bauhaus-text-dim)] mb-1">CI flags (always on)</div>
              <div className="flex items-center gap-2 px-1 py-1">
                <div className="w-4 h-4 bg-[var(--color-bauhaus-red)] flex items-center justify-center"><span className="text-white text-[9px] font-bold">✓</span></div>
                <span className="text-[13px] text-[var(--color-bauhaus-text-muted)]">--autonomous</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Field({ label, right, children }: { label: string; right?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="bauhaus-label">{label}</label>
        {right && <span className="text-xs text-[var(--color-bauhaus-text-muted)] font-mono">{right}</span>}
      </div>
      {children}
    </div>
  );
}

function CheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="bauhaus-checkbox" />
      <span className="text-[13px] text-[var(--color-bauhaus-text-muted)] group-hover:text-[var(--color-bauhaus-text)] transition-colors">{label}</span>
    </label>
  );
}
