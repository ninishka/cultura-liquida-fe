'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingComponentProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  fullScreen = false,
  size = 'medium',
  color = '#F2C94C',
  text = 'Cargando...'
}) => {
  return (
    <Container fullScreen={fullScreen}>
      <Content>
        <SpinnerWrapper>
          <Spinner size={size} color={color} />
        </SpinnerWrapper>
        {text && <LoadingText color={color}>{text}</LoadingText>}
      </Content>
    </Container>
  );
};

export default LoadingComponent;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const Container = styled.div<{ fullScreen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ fullScreen }) => fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  `}
  ${({ fullScreen }) => !fullScreen && `
    min-height: 200px;
    width: 100%;
  `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpinnerWrapper = styled.div`
  margin-bottom: 16px;
`;

const getSpinnerSize = (size: string) => {
  switch(size) {
    case 'small': return '30px';
    case 'large': return '70px';
    default: return '50px';
  }
};

const Spinner = styled.div<{ size: string, color: string }>`
  width: ${props => getSpinnerSize(props.size)};
  height: ${props => getSpinnerSize(props.size)};
  border: 4px solid rgba(242, 201, 76, 0.3);
  border-radius: 50%;
  border-top-color: ${props => props.color};
  animation: ${rotate} 1s ease-in-out infinite;
`;

const LoadingText = styled.div<{ color: string }>`
  color: ${props => props.color};
  font-size: 16px;
  font-weight: 500;
  animation: ${pulse} 1.5s ease-in-out infinite;
`; 