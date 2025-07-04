// File: frontend/src/components/UI/ErrorBoundary.jsx

import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error) {
        // Atualiza o estado para renderizar fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Você pode logar o erro em um serviço externo aqui
        console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        const { hasError, error } = this.state;
        if (hasError) {
            return (
                <div
                    role="alert"
                    style={{
                        padding: '1rem',
                        backgroundColor: '#ffe6e6',
                        color: '#900',
                        borderRadius: '8px',
                        border: '1px solid #900',
                        maxWidth: 600,
                        margin: '2rem auto',
                        textAlign: 'center',
                    }}
                >
                    <h3>Algo deu errado neste componente</h3>
                    <p>{error?.message || 'Erro desconhecido'}</p>
                    <button
                        onClick={this.handleRetry}
                        aria-label="Tentar novamente"
                        style={{
                            cursor: 'pointer',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#900',
                            color: 'white',
                            fontWeight: 'bold',
                            marginTop: '1rem',
                        }}
                    >
                        Tentar novamente
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
