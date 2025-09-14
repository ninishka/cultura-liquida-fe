'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #fff;
  background-color: #2D2D2D;
  border-radius: 8px;
  margin: 1rem;
`;

const ErrorTitle = styled.h2`
  color: #F2C94C;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #ccc;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background-color: #F2C94C;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #E6B800;
  }
`;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // You can send error to your error tracking service here
      // Example: Sentry.captureException(error);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Algo salió mal</ErrorTitle>
          <ErrorMessage>
            Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Intentar de nuevo
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
