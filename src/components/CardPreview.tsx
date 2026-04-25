import React, { forwardRef } from 'react';
import { AppState, THEMES } from '../types';

interface CardPreviewProps {
  state: AppState;
}

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ state }, ref) => {
  const theme = THEMES[state.theme];

  const renderCommand = () => {
    const promptText = state.prompt ? `"${state.prompt.replace(/"/g, '\\"')}"` : '""';
    const lines: React.ReactNode[] = [];

    const k = (s: string) => <span style={{ color: theme.keyword }}>{s}</span>;
    const c = (s: string) => <span style={{ color: theme.comment }}>{s}</span>;
    const v = (s: string) => <span style={{ color: theme.string }}>{s}</span>;

    if (state.agent === 'claude') {
      lines.push(k('claude'));
      if (state.claudeModel) lines.push(<>{c('--model ')}{v(state.claudeModel)}</>);
      lines.push(c('--dangerously-skip-permissions'));
      if (state.claudePermissionMode !== 'default')
        lines.push(<>{c('--permission-mode ')}{v(state.claudePermissionMode)}</>);
      if (state.claudeMaxTurns > 0) lines.push(<>{c('--max-turns ')}{v(String(state.claudeMaxTurns))}</>);
      if (state.claudeOutputFormat !== 'text')
        lines.push(<>{c('--output-format ')}{v(state.claudeOutputFormat)}</>);
      if (state.claudeAllowedTools)
        lines.push(<>{c('--allowedTools ')}{v(`"${state.claudeAllowedTools}"`)}</>);
      if (state.claudeAddDir)
        lines.push(<>{c('--add-dir ')}{v(state.claudeAddDir)}</>);
      if (state.claudeAppendSystemPrompt)
        lines.push(<>{c('--append-system-prompt ')}{v(`"${state.claudeAppendSystemPrompt}"`)}</>);
      if (state.claudeVerbose) lines.push(c('--verbose'));
      lines.push(<>{c('-p ')}{v(promptText)}</>);
    } else if (state.agent === 'codex') {
      lines.push(<>{k('codex')} {k('exec')}</>);
      if (state.codexModel) lines.push(<>{c('--model ')}{v(state.codexModel)}</>);
      if (state.codexApproval === 'full-auto') lines.push(c('--full-auto'));
      else if (state.codexApproval === 'bypass') lines.push(c('--dangerously-bypass-approvals-and-sandbox'));
      else lines.push(c('--ask-for-approval'));
      if (state.codexApproval !== 'bypass')
        lines.push(<>{c('--sandbox ')}{v(state.codexSandbox)}</>);
      if (state.codexCd) lines.push(<>{c('--cd ')}{v(state.codexCd)}</>);
      if (state.codexImage) lines.push(<>{c('--image ')}{v(state.codexImage)}</>);
      if (state.codexJson) lines.push(c('--json'));
      lines.push(v(promptText));
    } else if (state.agent === 'gemini') {
      lines.push(k('gemini'));
      if (state.geminiModel) lines.push(<>{c('--model ')}{v(state.geminiModel)}</>);
      lines.push(c('--yolo'));
      if (state.geminiOutputFormat !== 'text')
        lines.push(<>{c('--output-format ')}{v(state.geminiOutputFormat)}</>);
      if (state.geminiSandbox) lines.push(c('--sandbox'));
      if (state.geminiAllFiles) lines.push(c('--all-files'));
      if (state.geminiDebug) lines.push(c('--debug'));
      lines.push(<>{c('-p ')}{v(promptText)}</>);
    } else if (state.agent === 'opencode') {
      lines.push(<>{k('opencode')} {k('run')}</>);
      if (state.opencodeModel) lines.push(<>{c('--model ')}{v(state.opencodeModel)}</>);
      if (state.opencodeAgent) lines.push(<>{c('--agent ')}{v(state.opencodeAgent)}</>);
      lines.push(c('--dangerously-skip-permissions'));
      if (state.opencodeContinue) lines.push(c('--continue'));
      if (state.opencodeShare) lines.push(c('--share'));
      if (state.opencodeFormat !== 'default')
        lines.push(<>{c('--format ')}{v(state.opencodeFormat)}</>);
      lines.push(v(promptText));
    } else if (state.agent === 'aider') {
      lines.push(k('aider'));
      if (state.aiderModel) lines.push(<>{c('--model ')}{v(state.aiderModel)}</>);
      if (state.aiderArchitect) lines.push(c('--architect'));
      lines.push(c('--yes-always'));
      if (state.aiderNoAutoCommits) lines.push(c('--no-auto-commits'));
      if (state.aiderNoGit) lines.push(c('--no-git'));
      if (state.aiderNoStream) lines.push(c('--no-stream'));
      if (state.aiderRead) lines.push(<>{c('--read ')}{v(state.aiderRead)}</>);
      if (state.aiderMapTokens > 0)
        lines.push(<>{c('--map-tokens ')}{v(String(state.aiderMapTokens))}</>);
      lines.push(<>{c('--message ')}{v(promptText)}</>);
    } else if (state.agent === 'amp') {
      lines.push(k('amp'));
      lines.push(c('--dangerously-allow-all'));
      if (state.ampStream === 'json') lines.push(c('--stream-json'));
      else if (state.ampStream === 'json-thinking') lines.push(c('--stream-json-thinking'));
      if (state.ampSettingsFile) lines.push(<>{c('--settings-file ')}{v(state.ampSettingsFile)}</>);
      lines.push(<>{c('-x ')}{v(promptText)}</>);
    } else if (state.agent === 'qwen') {
      lines.push(k('qwen'));
      if (state.qwenModel) lines.push(<>{c('--model ')}{v(state.qwenModel)}</>);
      lines.push(c('--yolo'));
      if (state.qwenOutputFormat !== 'text')
        lines.push(<>{c('--output-format ')}{v(state.qwenOutputFormat)}</>);
      if (state.qwenAllFiles) lines.push(c('--all-files'));
      if (state.qwenDebug) lines.push(c('--debug'));
      lines.push(<>{c('-p ')}{v(promptText)}</>);
    } else if (state.agent === 'kilo') {
      lines.push(<>{k('kilo')} {k('run')}</>);
      if (state.kiloModel) lines.push(<>{c('--model ')}{v(state.kiloModel)}</>);
      if (state.kiloAgent) lines.push(<>{c('--agent ')}{v(state.kiloAgent)}</>);
      lines.push(c('--auto'));
      if (state.kiloContinue) lines.push(c('--continue'));
      if (state.kiloFormat !== 'default')
        lines.push(<>{c('--format ')}{v(state.kiloFormat)}</>);
      lines.push(v(promptText));
    }

    return (
      <div className="flex flex-col space-y-1.5">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            {i === 0 ? (
              <span className={`select-none opacity-50 mr-1.5 shrink-0 ${!state.showPromptSymbol ? 'hidden' : ''}`}>$&nbsp;</span>
            ) : (
              <span className={`select-none opacity-0 mr-1.5 shrink-0 ${!state.showPromptSymbol ? 'hidden' : ''}`}>$&nbsp;</span>
            )}
            <div className="flex-1 min-w-0 break-words">
              {i > 0 && <span className="select-none opacity-50 inline-block" style={{ width: `${state.indentSize * 8}px` }}></span>}
              {line}
              {i < lines.length - 1 && <span className="select-none opacity-50 ml-3">\</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="flex items-center justify-center transition-all duration-300 ease-out"
      style={{
        background: state.background === 'transparent' ? '#111114' : state.background,
        padding: `${state.padding}px`,
      }}
    >
      <div
        className="relative overflow-hidden transition-all duration-300 ease-out w-full max-w-3xl"
        style={{
          backgroundColor: theme.bg,
          color: theme.text,
          borderRadius: '14px',
          border: theme.border
            ? `1px solid ${theme.border}`
            : '1px solid rgba(255,255,255,0.06)',
          boxShadow: state.dropShadow
            ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.55), 0 6px 14px -6px rgba(0,0,0,0.35)'
            : '0 1px 0 rgba(255,255,255,0.04) inset',
          fontSize: `${state.fontSize}px`,
          lineHeight: 1.7,
        }}
      >
        {/* Window Controls */}
        {state.windowControls !== 'none' && (
          <div className="flex items-center px-6 pt-5 pb-2 space-x-2.5">
            {state.windowControls === 'mac' ? (
              <>
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </>
            ) : (
              <div className="flex space-x-3.5 ml-auto text-gray-500">
                <svg className="w-3.5 h-3.5" viewBox="0 0 12 12"><path d="M 0,6 L 12,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                <svg className="w-3.5 h-3.5" viewBox="0 0 12 12"><rect x="1.5" y="1.5" width="9" height="9" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1" /></svg>
                <svg className="w-3.5 h-3.5" viewBox="0 0 12 12"><path d="M 1.5,1.5 L 10.5,10.5 M 10.5,1.5 L 1.5,10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            )}
          </div>
        )}

        {/* Code Content */}
        <div
          className="px-6 pb-6 pt-2 leading-relaxed whitespace-pre-wrap break-words"
          style={{ fontFamily: `"${state.fontFamily}", monospace` }}
        >
          {renderCommand()}
        </div>
      </div>
    </div>
  );
});

CardPreview.displayName = 'CardPreview';
