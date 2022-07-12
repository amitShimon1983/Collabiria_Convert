import React from 'react';
import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0% { opacity:1 }
  50% { opacity:0.4 }
  100% { opacity: 1 }
`;

const SkeletonWrapper = styled.span`
  display: block;
  background-color: rgba(0, 0, 0, 0.11);
  height: auto;
  margin-top: 0;
  margin-bottom: 0;
  transform-origin: 0 55%;
  transform: scale(1, 0.6);
  border-radius: 4px/6.7px;
  animation: ${fade} 1.5s ease-in-out 0.5s infinite;
  width: 100%;

  &:empty:before {
    content: '\\00a0';
  }
`;

const Skeleton = (props: any) => {
  return <SkeletonWrapper />;
};

export default Skeleton;
