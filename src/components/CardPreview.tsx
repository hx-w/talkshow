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

    const addLine = (content: React.ReactNode) => {
      lines.push(content);
    };

    if (state.agent === 'claude') {
      addLine(<span style={{ color: theme.keyword }}>claude</span>);
      if (state.claudeModel) addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.claudeModel}</span></>);
      addLine(<span style={{ color: theme.comment }}>--dangerously-skip-permissions</span>);
      if (state.claudeMaxTurns > 0) addLine(<><span style={{ color: theme.comment }}>--max-turns </span><span style={{ color: theme.string }}>{state.claudeMaxTurns}</span></>);
      if (state.claudeOutputFormat !== 'text') addLine(<><span style={{ color: theme.comment }}>--output-format </span><span style={{ color: theme.string }}>{state.claudeOutputFormat}</span></>);
      if (state.claudeAppendSystemPrompt) addLine(<><span style={{ color: theme.comment }}>--append-system-prompt </span><span style={{ color: theme.string }}>"{state.claudeAppendSystemPrompt}"</span></>);
      if (state.claudeDebug) addLine(<span style={{ color: theme.comment }}>--debug</span>);
      addLine(<><span style={{ color: theme.comment }}>-p </span><span style={{ color: theme.string }}>{promptText}</span></>);
    } else if (state.agent === 'opencode') {
      addLine(<span style={{ color: theme.keyword }}>opencode</span>);
      if (state.opencodeProvider) addLine(<><span style={{ color: theme.comment }}>--provider </span><span style={{ color: theme.string }}>{state.opencodeProvider}</span></>);
      if (state.opencodeModel) addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.opencodeModel}</span></>);
      addLine(<span style={{ color: theme.comment }}>--yes</span>);
      if (state.opencodeMaxTurns > 0) addLine(<><span style={{ color: theme.comment }}>--max-turns </span><span style={{ color: theme.string }}>{state.opencodeMaxTurns}</span></>);
      if (state.opencodeOutput !== 'text') addLine(<><span style={{ color: theme.comment }}>--output </span><span style={{ color: theme.string }}>{state.opencodeOutput}</span></>);
      if (state.opencodeThinking) addLine(<span style={{ color: theme.comment }}>--thinking</span>);
      addLine(<><span style={{ color: theme.comment }}>-p </span><span style={{ color: theme.string }}>{promptText}</span></>);
    } else if (state.agent === 'aider') {
      addLine(<span style={{ color: theme.keyword }}>aider</span>);
      if (state.aiderModel) addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.aiderModel}</span></>);
      if (state.aiderEditFormat !== 'diff') addLine(<><span style={{ color: theme.comment }}>--edit-format </span><span style={{ color: theme.string }}>{state.aiderEditFormat}</span></>);
      addLine(<span style={{ color: theme.comment }}>--yes-always</span>);
      if (state.aiderNoAutoCommits) addLine(<span style={{ color: theme.comment }}>--no-auto-commits</span>);
      if (state.aiderLint) addLine(<span style={{ color: theme.comment }}>--lint</span>);
      if (state.aiderNoAutoLint) addLine(<span style={{ color: theme.comment }}>--no-auto-lint</span>);
      if (state.aiderNoStream) addLine(<span style={{ color: theme.comment }}>--no-stream</span>);
      addLine(<><span style={{ color: theme.comment }}>--message </span><span style={{ color: theme.string }}>{promptText}</span></>);
    } else if (state.agent === 'amp') {
      addLine(<span style={{ color: theme.keyword }}>amp</span>);
      if (state.ampModel) addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.ampModel}</span></>);
      addLine(<span style={{ color: theme.comment }}>--yes</span>);
      if (state.ampStreamJson) addLine(<span style={{ color: theme.comment }}>--stream-json</span>);
      addLine(<><span style={{ color: theme.comment }}>--execute </span><span style={{ color: theme.string }}>{promptText}</span></>);
    } else if (state.agent === 'qwen-code') {
      addLine(<span style={{ color: theme.keyword }}>qwen-code</span>);
      if (state.qwenModel) addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.qwenModel}</span></>);
      addLine(<span style={{ color: theme.comment }}>--yolo</span>);
      if (state.qwenOutputFormat !== 'text') addLine(<><span style={{ color: theme.comment }}>--output-format </span><span style={{ color: theme.string }}>{state.qwenOutputFormat}</span></>);
      addLine(<><span style={{ color: theme.comment }}>-p </span><span style={{ color: theme.string }}>{promptText}</span></>);
    } else if (state.agent === 'kilo') {
      addLine(<span style={{ color: theme.keyword }}>kilo</span>);
      if (state.kiloProvider) addLine(<><span style={{ color: theme.comment }}>--provider </span><span style={{ color: theme.string }}>{state.kiloProvider}</span></>);
      if (state.kiloModel) addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.kiloModel}</span></>);
      addLine(<span style={{ color: theme.comment }}>--autonomous</span>);
      if (state.kiloMode !== 'Code') addLine(<><span style={{ color: theme.comment }}>--mode </span><span style={{ color: theme.string }}>{state.kiloMode}</span></>);
      if (state.kiloMaxTurns > 0) addLine(<><span style={{ color: theme.comment }}>--max-turns </span><span style={{ color: theme.string }}>{state.kiloMaxTurns}</span></>);
      addLine(<><span style={{ color: theme.comment }}>-p </span><span style={{ color: theme.string }}>{promptText}</span></>);
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
        background: state.background === 'transparent' ? 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' : state.background,
        padding: `${state.padding}px`,
      }}
    >
      <div
        className="relative overflow-hidden transition-all duration-300 ease-out w-full max-w-3xl"
        style={{
          backgroundColor: theme.bg,
          color: theme.text,
          borderRadius: '20px',
          border: theme.border ? `1px solid ${theme.border}` : '1px solid rgba(255,255,255,0.1)',
          boxShadow: state.dropShadow
            ? '0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 8px 24px -8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.06)'
            : 'inset 0 1px 0 rgba(255,255,255,0.06)',
          fontSize: `${state.fontSize}px`,
          lineHeight: 1.7,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Subtle inner highlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[20px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)',
          }}
        />
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
