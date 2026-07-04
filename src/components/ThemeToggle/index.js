import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ThemeToggleContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    top: 90px;
    right: 20px;
  }
`;

const ToggleButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.card};
    
    svg {
      animation: ${rotate} 0.5s ease-in-out;
    }
  }
  
  &:active {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
`;

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <ThemeToggleContainer>
      <ToggleButton onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </ToggleButton>
    </ThemeToggleContainer>
  );
};

export default ThemeToggle;