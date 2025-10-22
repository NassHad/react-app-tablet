import React, { Component, type ReactNode } from 'react';
// Error type for error boundary
type LightsError = { message: string; code?: string; details?: any };

interface Props {
  children: ReactNode;
  fallback?: (error: LightsError, retry: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: LightsError | null;
}

class LightsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: {
        message: error.message,
        code: 'COMPONENT_ERROR',
        details: error.stack
      }
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LightsErrorBoundary caught an error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.retry);
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg">
          <div className="text-red-600 text-center">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="mb-4">{this.state.error?.message || 'An unexpected error occurred'}</p>
            <button
              onClick={this.retry}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default LightsErrorBoundary;
