'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface AnimatedMushroomProps {
  type?: 'reishi' | 'cola-pavo' | 'melena';
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateReverse = keyframes`
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 30px;
  padding: 20px;
  contain: layout style;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const Spinner = styled.div<{ $size: string, $color: string }>`
  width: ${props => getSpinnerSize(props.$size)};
  height: ${props => getSpinnerSize(props.$size)};
  border: 4px solid rgba(242, 201, 76, 0.3);
  border-radius: 50%;
  border-top-color: ${props => props.$color};
  animation: ${rotate} 1s ease-in-out infinite;
`;

const SpiralLine = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 90px;
  height: 90px;
  border: 2px solid transparent;
  border-top: 2px solid #F2C94C;
  border-radius: 50%;
  animation: ${rotateReverse} 2s linear infinite;
`;

const InnerSpiral = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 58px;
  height: 58px;
  border: 1.5px solid transparent;
  border-bottom: 1.5px solid #4FDB40;
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite;
`;

const OuterRing = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  width: 110px;
  height: 110px;
  border: 1px solid rgba(242, 201, 76, 0.4);
  border-radius: 50%;
  animation: ${rotate} 3s linear infinite;
`;

const LoadingText = styled.div<{ $color: string }>`
  color: ${props => props.$color};
  font-size: 18px;
  font-weight: 500;
  animation: ${pulse} 1.5s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(242, 201, 76, 0.8);
  contain: layout style;
`;

const getSpinnerSize = (size: string) => {
  switch(size) {
    case 'small': return '30px';
    case 'large': return '70px';
    default: return '50px';
  }
};

const AnimatedMushroom: React.FC<AnimatedMushroomProps> = ({ type = 'melena' }) => {
  return (
    <Container>
      <SpinnerWrapper>
        <OuterRing />
        <SpiralLine />
        <InnerSpiral />
        <Spinner $size="large" $color="#F2C94C" />
      </SpinnerWrapper>
      
      <LoadingText $color="#F2C94C">
        Cargando productos...
      </LoadingText>
    </Container>
  );
};

export default AnimatedMushroom; 