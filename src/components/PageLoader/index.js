import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${props => props.fadeOut ? fadeOut : 'none'} 0.5s ease-out forwards;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.text_secondary + '30'};
  border-top: 3px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoaderText = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const LoaderSubtext = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  text-align: center;
`;

const progressBar = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const ProgressContainer = styled.div`
  width: 300px;
  height: 4px;
  background: ${({ theme }) => theme.text_secondary + '20'};
  border-radius: 2px;
  margin-top: 20px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary + 'AA'});
  border-radius: 2px;
  animation: ${progressBar} 2s ease-out forwards;
`;

const PageLoader = ({ onLoadComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onLoadComplete();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  const isFeedback = window.location.pathname.includes('/feedback');
  
  const loadingTitle = isFeedback 
    ? "Warming up the feedback engine..." 
    : "Loading Portfolio";
    
  const loadingSubtitle = isFeedback 
    ? "Getting everything ready to hear your amazing thoughts 🚀" 
    : "Preparing an amazing experience for you...";

  return (
    <LoaderContainer fadeOut={fadeOut}>
      <LoaderSpinner />
      <LoaderText>{loadingTitle}</LoaderText>
      <LoaderSubtext>{loadingSubtitle}</LoaderSubtext>
      <ProgressContainer>
        <ProgressBar />
      </ProgressContainer>
    </LoaderContainer>
  );
};

export default PageLoader;