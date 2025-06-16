import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary capturou um erro:", error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h3>Algo deu errado neste componente</h3>
                    <p>{this.state.error.message}</p>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Tentar novamente
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}