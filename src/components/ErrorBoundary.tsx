import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
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
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div className="no-results-panel" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>⚠️</span>
            <h2 style={{ marginBottom: '12px' }}>Nešto je pošlo po zlu</h2>
            <p style={{ color: 'var(--color-neutral-muted)', marginBottom: '24px', fontSize: '14px' }}>
              Došlo je do neočekivane pogreške pri učitavanju ove stranice.
            </p>
            {this.state.error && (
              <pre style={{ 
                textAlign: 'left', 
                backgroundColor: 'var(--color-neutral-light)', 
                padding: '12px', 
                borderRadius: 'var(--radius-sm)', 
                fontSize: '11px', 
                overflowX: 'auto',
                marginBottom: '24px',
                color: 'var(--color-neutral-dark)',
                border: '1px solid var(--color-neutral-border)'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <button onClick={this.handleReset} className="btn-primary">
              Vrati se na početnu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
