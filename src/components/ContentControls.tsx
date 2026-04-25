import React from 'react';
import { AppState, Agent, AGENT_META } from '../types';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AGENTS: { value: Agent; label: string }[] = [
  { value: 'claude', label: 'Claude Code' },
  { value: 'codex', label: 'Codex CLI' },
  { value: 'gemini', label: 'Gemini CLI' },
  { value: 'opencode', label: 'OpenCode' },
  { value: 'aider', label: 'Aider' },
  { value: 'amp', label: 'Amp' },
  { value: 'qwen', label: 'Qwen Code' },
  { value: 'kilo', label: 'Kilo Code' },
];

export const ContentControls: React.FC<Props> = ({ state, setState }) => {
  const handleChange = (key: keyof AppState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const meta = AGENT_META[state.agent];

  return (
    <div className="flex flex-col p-4 space-y-5">
      {/* Prompt */}
      <div className="space-y-2">
        <label className="bauhaus-label">Prompt</label>
        <textarea
          value={state.prompt}
          onChange={(e) => handleChange('prompt', e.target.value)}
          className="bauhaus-input font-mono resize-y"
          style={{ minHeight: '160px' }}
          placeholder="Describe the task for the agent…"
        />
      </div>

      {/* Agent selector */}
      <div className="space-y-2">
        <label className="bauhaus-label">Agent</label>
        <div className="grid grid-cols-2 gap-1.5">
          {AGENTS.map((agent) => (
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

      {/* Agent meta hint */}
      <div className="text-[10px] font-mono text-[var(--color-bauhaus-text-dim)] -mt-2 leading-relaxed">
        <span className="text-[var(--color-bauhaus-text-muted)]">{meta.binary}</span>
        {meta.subcommand && <> <span>{meta.subcommand}</span></>}
        {' '}<span>{meta.promptFlag}</span>{' '}<span>"…"</span>{' '}<span>{meta.autoFlag}</span>
        <div className="text-[var(--color-bauhaus-text-dim)] truncate mt-0.5">{meta.doc}</div>
      </div>

      {/* Agent-specific settings */}
      <div className="border-2 border-[var(--color-bauhaus-border)] p-4 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 bg-[var(--color-bauhaus-yellow)]" />
          <span className="bauhaus-label" style={{ marginBottom: 0 }}>Flags</span>
        </div>

        {/* Claude Code */}
        {state.agent === 'claude' && (
          <div className="space-y-3">
            <Field label="--model">
              <input type="text" value={state.claudeModel} onChange={(e) => handleChange('claudeModel', e.target.value)} placeholder="sonnet · opus · claude-sonnet-4-6" className="bauhaus-input" />
            </Field>
            <Field label="--max-turns" right={state.claudeMaxTurns > 0 ? String(state.claudeMaxTurns) : 'off'}>
              <input type="range" min="0" max="50" step="1" value={state.claudeMaxTurns} onChange={(e) => handleChange('claudeMaxTurns', parseInt(e.target.value))} className="bauhaus-slider" />
            </Field>
            <Field label="--output-format">
              <select value={state.claudeOutputFormat} onChange={(e) => handleChange('claudeOutputFormat', e.target.value)} className="bauhaus-select">
                <option value="text">text</option>
                <option value="json">json</option>
                <option value="stream-json">stream-json</option>
              </select>
            </Field>
            <Field label="--permission-mode">
              <select value={state.claudePermissionMode} onChange={(e) => handleChange('claudePermissionMode', e.target.value)} className="bauhaus-select">
                <option value="default">default</option>
                <option value="acceptEdits">acceptEdits</option>
                <option value="plan">plan</option>
                <option value="bypassPermissions">bypassPermissions</option>
              </select>
            </Field>
            <Field label="--allowedTools">
              <input type="text" value={state.claudeAllowedTools} onChange={(e) => handleChange('claudeAllowedTools', e.target.value)} placeholder="Bash,Edit,Read" className="bauhaus-input" />
            </Field>
            <Field label="--add-dir">
              <input type="text" value={state.claudeAddDir} onChange={(e) => handleChange('claudeAddDir', e.target.value)} placeholder="../apps ../lib" className="bauhaus-input" />
            </Field>
            <Field label="--append-system-prompt">
              <input type="text" value={state.claudeAppendSystemPrompt} onChange={(e) => handleChange('claudeAppendSystemPrompt', e.target.value)} placeholder="Always use TypeScript" className="bauhaus-input" />
            </Field>
            <AlwaysOn flag="--dangerously-skip-permissions" />
            <CheckboxField label="--verbose" checked={state.claudeVerbose} onChange={(v) => handleChange('claudeVerbose', v)} />
          </div>
        )}

        {/* Codex CLI */}
        {state.agent === 'codex' && (
          <div className="space-y-3">
            <Field label="--model">
              <input type="text" value={state.codexModel} onChange={(e) => handleChange('codexModel', e.target.value)} placeholder="gpt-5.1-codex · o4-mini" className="bauhaus-input" />
            </Field>
            <Field label="approval">
              <select value={state.codexApproval} onChange={(e) => handleChange('codexApproval', e.target.value)} className="bauhaus-select">
                <option value="full-auto">--full-auto (sandboxed, no network)</option>
                <option value="ask-for-approval">--ask-for-approval</option>
                <option value="bypass">--dangerously-bypass-approvals-and-sandbox</option>
              </select>
            </Field>
            {state.codexApproval !== 'bypass' && (
              <Field label="--sandbox">
                <select value={state.codexSandbox} onChange={(e) => handleChange('codexSandbox', e.target.value)} className="bauhaus-select">
                  <option value="read-only">read-only</option>
                  <option value="workspace-write">workspace-write</option>
                  <option value="danger-full-access">danger-full-access</option>
                </select>
              </Field>
            )}
            <Field label="--cd">
              <input type="text" value={state.codexCd} onChange={(e) => handleChange('codexCd', e.target.value)} placeholder="./packages/api" className="bauhaus-input" />
            </Field>
            <Field label="--image">
              <input type="text" value={state.codexImage} onChange={(e) => handleChange('codexImage', e.target.value)} placeholder="screenshot.png" className="bauhaus-input" />
            </Field>
            <CheckboxField label="--json (JSONL events)" checked={state.codexJson} onChange={(v) => handleChange('codexJson', v)} />
          </div>
        )}

        {/* Gemini CLI */}
        {state.agent === 'gemini' && (
          <div className="space-y-3">
            <Field label="--model">
              <input type="text" value={state.geminiModel} onChange={(e) => handleChange('geminiModel', e.target.value)} placeholder="gemini-2.5-pro · gemini-2.5-flash" className="bauhaus-input" />
            </Field>
            <Field label="--output-format">
              <select value={state.geminiOutputFormat} onChange={(e) => handleChange('geminiOutputFormat', e.target.value)} className="bauhaus-select">
                <option value="text">text</option>
                <option value="json">json</option>
                <option value="stream-json">stream-json</option>
              </select>
            </Field>
            <AlwaysOn flag="--yolo" />
            <CheckboxField label="--sandbox" checked={state.geminiSandbox} onChange={(v) => handleChange('geminiSandbox', v)} />
            <CheckboxField label="--all-files" checked={state.geminiAllFiles} onChange={(v) => handleChange('geminiAllFiles', v)} />
            <CheckboxField label="--debug" checked={state.geminiDebug} onChange={(v) => handleChange('geminiDebug', v)} />
          </div>
        )}

        {/* OpenCode */}
        {state.agent === 'opencode' && (
          <div className="space-y-3">
            <Field label="--model">
              <input type="text" value={state.opencodeModel} onChange={(e) => handleChange('opencodeModel', e.target.value)} placeholder="anthropic/claude-sonnet-4-6" className="bauhaus-input" />
            </Field>
            <Field label="--agent">
              <input type="text" value={state.opencodeAgent} onChange={(e) => handleChange('opencodeAgent', e.target.value)} placeholder="build · plan · review" className="bauhaus-input" />
            </Field>
            <Field label="--format">
              <select value={state.opencodeFormat} onChange={(e) => handleChange('opencodeFormat', e.target.value)} className="bauhaus-select">
                <option value="default">default</option>
                <option value="json">json</option>
              </select>
            </Field>
            <AlwaysOn flag="--dangerously-skip-permissions" />
            <CheckboxField label="--continue" checked={state.opencodeContinue} onChange={(v) => handleChange('opencodeContinue', v)} />
            <CheckboxField label="--share" checked={state.opencodeShare} onChange={(v) => handleChange('opencodeShare', v)} />
          </div>
        )}

        {/* Aider */}
        {state.agent === 'aider' && (
          <div className="space-y-3">
            <Field label="--model">
              <input type="text" value={state.aiderModel} onChange={(e) => handleChange('aiderModel', e.target.value)} placeholder="sonnet · gpt-5 · ollama/qwen2.5-coder" className="bauhaus-input" />
            </Field>
            <Field label="--read (read-only file)">
              <input type="text" value={state.aiderRead} onChange={(e) => handleChange('aiderRead', e.target.value)} placeholder="CONVENTIONS.md" className="bauhaus-input" />
            </Field>
            <Field label="--map-tokens" right={state.aiderMapTokens > 0 ? String(state.aiderMapTokens) : 'auto'}>
              <input type="range" min="0" max="8192" step="256" value={state.aiderMapTokens} onChange={(e) => handleChange('aiderMapTokens', parseInt(e.target.value))} className="bauhaus-slider" />
            </Field>
            <AlwaysOn flag="--yes-always" />
            <CheckboxField label="--architect" checked={state.aiderArchitect} onChange={(v) => handleChange('aiderArchitect', v)} />
            <CheckboxField label="--no-auto-commits" checked={state.aiderNoAutoCommits} onChange={(v) => handleChange('aiderNoAutoCommits', v)} />
            <CheckboxField label="--no-git" checked={state.aiderNoGit} onChange={(v) => handleChange('aiderNoGit', v)} />
            <CheckboxField label="--no-stream" checked={state.aiderNoStream} onChange={(v) => handleChange('aiderNoStream', v)} />
          </div>
        )}

        {/* Amp */}
        {state.agent === 'amp' && (
          <div className="space-y-3">
            <Field label="--settings-file">
              <input type="text" value={state.ampSettingsFile} onChange={(e) => handleChange('ampSettingsFile', e.target.value)} placeholder=".amp/settings.json" className="bauhaus-input" />
            </Field>
            <Field label="streaming">
              <select value={state.ampStream} onChange={(e) => handleChange('ampStream', e.target.value)} className="bauhaus-select">
                <option value="off">off</option>
                <option value="json">--stream-json</option>
                <option value="json-thinking">--stream-json-thinking</option>
              </select>
            </Field>
            <AlwaysOn flag="--dangerously-allow-all" />
            <div className="text-[10px] text-[var(--color-bauhaus-text-dim)] leading-relaxed">
              Note: Amp resolves the model server-side via your settings; there is no <span className="font-mono">--model</span> flag.
            </div>
          </div>
        )}

        {/* Qwen Code */}
        {state.agent === 'qwen' && (
          <div className="space-y-3">
            <Field label="--model">
              <input type="text" value={state.qwenModel} onChange={(e) => handleChange('qwenModel', e.target.value)} placeholder="qwen3-coder-plus" className="bauhaus-input" />
            </Field>
            <Field label="--output-format">
              <select value={state.qwenOutputFormat} onChange={(e) => handleChange('qwenOutputFormat', e.target.value)} className="bauhaus-select">
                <option value="text">text</option>
                <option value="json">json</option>
                <option value="stream-json">stream-json</option>
              </select>
            </Field>
            <AlwaysOn flag="--yolo" />
            <CheckboxField label="--all-files" checked={state.qwenAllFiles} onChange={(v) => handleChange('qwenAllFiles', v)} />
            <CheckboxField label="--debug" checked={state.qwenDebug} onChange={(v) => handleChange('qwenDebug', v)} />
          </div>
        )}

        {/* Kilo */}
        {state.agent === 'kilo' && (
          <div className="space-y-3">
            <Field label="--model">
              <input type="text" value={state.kiloModel} onChange={(e) => handleChange('kiloModel', e.target.value)} placeholder="anthropic/claude-sonnet-4-6" className="bauhaus-input" />
            </Field>
            <Field label="--agent">
              <input type="text" value={state.kiloAgent} onChange={(e) => handleChange('kiloAgent', e.target.value)} placeholder="build · plan · review" className="bauhaus-input" />
            </Field>
            <Field label="--format">
              <select value={state.kiloFormat} onChange={(e) => handleChange('kiloFormat', e.target.value)} className="bauhaus-select">
                <option value="default">default</option>
                <option value="json">json</option>
              </select>
            </Field>
            <AlwaysOn flag="--auto" />
            <CheckboxField label="--continue" checked={state.kiloContinue} onChange={(v) => handleChange('kiloContinue', v)} />
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
        <label className="bauhaus-label font-mono normal-case tracking-normal text-[11px]">{label}</label>
        {right && <span className="text-[10px] text-[var(--color-bauhaus-text-muted)] font-mono">{right}</span>}
      </div>
      {children}
    </div>
  );
}

function CheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="bauhaus-checkbox" />
      <span className="text-[12px] font-mono text-[var(--color-bauhaus-text-muted)] group-hover:text-[var(--color-bauhaus-text)] transition-colors">{label}</span>
    </label>
  );
}

function AlwaysOn({ flag }: { flag: string }) {
  return (
    <div className="pt-2 space-y-1 border-t border-[var(--color-bauhaus-border)]">
      <div className="text-[9px] uppercase tracking-widest text-[var(--color-bauhaus-text-dim)] mb-1">CI flag (always on)</div>
      <div className="flex items-center gap-2 px-1 py-1">
        <div className="w-4 h-4 bg-[var(--color-bauhaus-red)] flex items-center justify-center"><span className="text-white text-[9px] font-bold">✓</span></div>
        <span className="text-[12px] font-mono text-[var(--color-bauhaus-text-muted)]">{flag}</span>
      </div>
    </div>
  );
}
