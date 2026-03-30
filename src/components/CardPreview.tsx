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
      if (state.claudeSkipPermissions) {
        addLine(<span style={{ color: theme.comment }}>--dangerously-skip-permissions</span>);
      }
      if (state.claudeVerbose) {
        addLine(<span style={{ color: theme.comment }}>--verbose</span>);
      }
      addLine(<><span style={{ color: theme.comment }}>-p </span><span style={{ color: theme.string }}>{promptText}</span></>);
    } else if (state.agent === 'opencode') {
      addLine(<span style={{ color: theme.keyword }}>opencode</span>);
      if (state.opencodeModel) {
        addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.opencodeModel}</span></>);
      }
      if (state.opencodeTemperature !== 0.7) {
        addLine(<><span style={{ color: theme.comment }}>--temperature </span><span style={{ color: theme.string }}>{state.opencodeTemperature}</span></>);
      }
      addLine(<><span style={{ color: theme.comment }}>-p </span><span style={{ color: theme.string }}>{promptText}</span></>);
    } else if (state.agent === 'aider') {
      addLine(<span style={{ color: theme.keyword }}>aider</span>);
      if (state.aiderModel) {
        addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.aiderModel}</span></>);
      }
      if (!state.aiderAutoCommits) {
        addLine(<span style={{ color: theme.comment }}>--no-auto-commits</span>);
      }
      if (state.aiderLint) {
        addLine(<span style={{ color: theme.comment }}>--lint</span>);
      }
      addLine(<><span style={{ color: theme.comment }}>--message </span><span style={{ color: theme.string }}>{promptText}</span></>);
    } else if (state.agent === 'cursor') {
      addLine(<span style={{ color: theme.keyword }}>cursor</span>);
      if (state.cursorModel) {
        addLine(<><span style={{ color: theme.comment }}>--model </span><span style={{ color: theme.string }}>{state.cursorModel}</span></>);
      }
      if (state.cursorNewWindow) {
        addLine(<span style={{ color: theme.comment }}>--new-window</span>);
      }
      addLine(<><span style={{ color: theme.comment }}>--prompt </span><span style={{ color: theme.string }}>{promptText}</span></>);
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
        background: state.background === 'transparent' ? '#0a0a0a' : state.background,
        padding: `${state.padding}px`,
      }}
    >
      <div
        className="relative overflow-hidden transition-all duration-300 ease-out w-full max-w-3xl"
        style={{
          backgroundColor: theme.bg,
          color: theme.text,
          borderRadius: '16px',
          boxShadow: state.dropShadow 
            ? '0 25px 80px -12px rgba(0, 0, 0, 0.6), 0 8px 32px -8px rgba(0, 0, 0, 0.4)' 
            : 'none',
          border: theme.border ? `1px solid ${theme.border}` : '1px solid rgba(255,255,255,0.08)',
          fontSize: `${state.fontSize}px`,
          lineHeight: 1.7,
        }}
      >
        {/* Subtle inner glow */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
          }}
        />

        {/* Window Controls */}
        {state.windowControls !== 'none' && (
          <div className="flex items-center px-5 pt-5 pb-3 space-x-2">
            {state.windowControls === 'mac' ? (
              <>
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-sm" style={{ boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1)' }} />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-sm" style={{ boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1)' }} />
                <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-sm" style={{ boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1)' }} />
              </>
            ) : (
              <div className="flex space-x-4 ml-auto text-gray-500">
                <svg className="w-3.5 h-3.5 hover:text-gray-400 transition-colors" viewBox="0 0 12 12">
                  <path d="M 0,6 L 12,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <svg className="w-3.5 h-3.5 hover:text-gray-400 transition-colors" viewBox="0 0 12 12">
                  <rect x="1.5" y="1.5" width="9" height="9" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1" />
                </svg>
                <svg className="w-3.5 h-3.5 hover:text-gray-400 transition-colors" viewBox="0 0 12 12">
                  <path d="M 1.5,1.5 L 10.5,10.5 M 10.5,1.5 L 1.5,10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Code Content */}
        <div 
          className="px-6 pb-6 pt-1 leading-relaxed whitespace-pre-wrap break-words"
          style={{ fontFamily: `"${state.fontFamily}", monospace` }}
        >
          {renderCommand()}
        </div>
      </div>
    </div>
  );
});

CardPreview.displayName = 'CardPreview';
