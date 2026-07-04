import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProgressContainer = styled.div`
  position: fixed;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ProgressItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const ProgressDot = styled.div`
  width: ${props => props.active ? '16px' : '12px'};
  height: ${props => props.active ? '16px' : '12px'};
  border-radius: 50%;
  background: ${({ active, theme }) => 
    active ? theme.primary : 'rgba(255, 255, 255, 0.3)'};
  border: 2px solid ${({ active, theme }) => 
    active ? theme.primary : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.3s ease;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.active ? '8px' : '4px'};
    height: ${props => props.active ? '8px' : '4px'};
    border-radius: 50%;
    background: ${({ active, theme }) => 
      active ? 'white' : 'transparent'};
    transition: all 0.3s ease;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.active ? '24px' : '16px'};
    height: ${props => props.active ? '24px' : '16px'};
    border-radius: 50%;
    background: ${({ active, theme }) => 
      active ? theme.primary + '20' : 'transparent'};
    transition: all 0.3s ease;
    z-index: -1;
  }
`;

const ProgressLabel = styled.div`
  position: absolute;
  left: 30px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.primary}30;
  
  &:before {
    content: '';
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid ${({ theme }) => theme.card};
  }
  
  ${ProgressItem}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }
`;

const ConnectingLine = styled.div`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.primary}60,
    ${({ theme }) => theme.primary}20
  );
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const NavigationProgress = () => {
  const [activeSection, setActiveSection] = useState('about');
  
  const sections = [
    { id: 'about', label: 'About Me', icon: '👋' },
    { id: 'skills', label: 'Skills', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🔥' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'recent-updates', label: 'Updates', icon: '📢' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ProgressContainer>
      {sections.map((section, index) => (
        <ProgressItem 
          key={section.id}
          onClick={() => handleSectionClick(section.id)}
        >
          <ProgressDot active={activeSection === section.id}>
            <ConnectingLine 
              show={index < sections.length - 1} 
            />
          </ProgressDot>
          <ProgressLabel>
            {section.icon} {section.label}
          </ProgressLabel>
        </ProgressItem>
      ))}
    </ProgressContainer>
  );
};

export default NavigationProgress;