import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const typewriter = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blink = keyframes`
  0%, 50% {
    border-color: transparent;
  }
  51%, 100% {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TypewriterContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const TypewriterText = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid ${({ theme }) => theme.primary};
  animation: 
    ${typewriter} ${props => props.duration}s steps(${props => props.steps}) 1s forwards,
    ${blink} 1s infinite;
  width: 0;
  
  &.typing-complete {
    border-right: none;
  }
`;

const TypingEffect = ({ 
  text, 
  speed = 100, 
  startDelay = 0, 
  className = '',
  onComplete = () => {} 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    let index = 0;

    const startTyping = () => {
      setIsTyping(true);
      
      const typeNextChar = () => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
          timeout = setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          onComplete();
        }
      };

      typeNextChar();
    };

    timeout = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay, onComplete]);

  const duration = (text.length * speed) / 1000;
  
  return (
    <TypewriterContainer className={className}>
      <TypewriterText 
        duration={duration}
        steps={text.length}
        className={isComplete ? 'typing-complete' : ''}
      >
        {displayText}
      </TypewriterText>
    </TypewriterContainer>
  );
};

export default TypingEffect;