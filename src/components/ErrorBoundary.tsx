import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ጥንተ ጥበብ:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-6 font-ethiopic">
          <div className="max-w-md w-full rounded-3xl parchment-gold p-8 border border-amber-500/50 text-center shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-amber-200">ይቅርታ፣ ያልተጠበቀ ችግር አጋጥሟል</h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              መተግበሪያውን ዳግም በማስጀመር በቀላሉ መክፈት ይችላሉ።
            </p>
            {this.state.error && (
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-[11px] font-mono text-amber-300/80 text-left break-all">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>ገጹን ዳግም ጫን (Reload)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
