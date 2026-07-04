import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaArrowUp, FaEnvelope, FaGithub, FaLinkedin, FaBell } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { recentUpdates } from '../../data/constants';
import UpdatesPopup from '../UpdatesPopup';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 120px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 768px) {
    bottom: 100px;
    right: 20px;
    gap: 12px;
  }
`;

const FloatingButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: ${({ theme, variant }) => 
    variant === 'primary' ? theme.primary : 
    variant === 'updates' ? `linear-gradient(135deg, ${theme.primary}, ${theme.primary}AA)` :
    'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
    background: ${({ theme }) => theme.primary};
  }
  
  &:active {
    transform: translateY(-1px) scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }
`;

const SocialButton = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    background: ${({ theme, social }) => 
      social === 'github' ? '#333' :
      social === 'linkedin' ? '#0077B5' :
      social === 'email' ? '#EA4335' : theme.primary};
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  right: 70px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:after {
    content: '';
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid ${({ theme }) => theme.card};
  }
  
  ${FloatingButton}:hover + &,
  ${SocialButton}:hover + & {
    opacity: 1;
    visibility: visible;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  animation: ${pulse} 2s infinite;
  
  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    font-size: 10px;
    top: -3px;
    right: -3px;
  }
`;

const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showUpdatesPopup, setShowUpdatesPopup] = useState(false);
  const [hasNewUpdates, setHasNewUpdates] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    // Check for new updates
    const checkForUpdates = () => {
      const hasVisited = localStorage.getItem('portfolioVisited');
      
      if (!hasVisited) {
        setHasNewUpdates(true);
      } else {
        const lastVisit = localStorage.getItem('lastUpdateCheck');
        const latestUpdate = recentUpdates[0]?.date;
        
        if (!lastVisit || new Date(latestUpdate) > new Date(lastVisit)) {
          setHasNewUpdates(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkForUpdates();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdatesClick = () => {
    setShowUpdatesPopup(true);
    setHasNewUpdates(false);
    localStorage.setItem('lastUpdateCheck', new Date().toISOString());
  };

  const closeUpdatesPopup = () => {
    setShowUpdatesPopup(false);
  };

  return (
    <>
      <FloatingContainer>
        {/* Recent Updates Button */}
        <ButtonWrapper>
          <FloatingButton onClick={handleUpdatesClick} variant="updates">
            <FaBell />
            {hasNewUpdates && <NotificationBadge>!</NotificationBadge>}
          </FloatingButton>
          <Tooltip>Recent Updates</Tooltip>
        </ButtonWrapper>

        {/* Quick Contact Button */}
        <ButtonWrapper>
          <FloatingButton onClick={scrollToContact} variant="primary">
            <FaEnvelope />
          </FloatingButton>
          <Tooltip>Contact Me</Tooltip>
        </ButtonWrapper>

        {/* Social Media Links */}
        <ButtonWrapper>
          <SocialButton 
            href={Bio.github} 
            target="_blank" 
            rel="noopener noreferrer"
            social="github"
          >
            <FaGithub />
          </SocialButton>
          <Tooltip>GitHub Profile</Tooltip>
        </ButtonWrapper>

        <ButtonWrapper>
          <SocialButton 
            href={Bio.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            social="linkedin"
          >
            <FaLinkedin />
          </SocialButton>
          <Tooltip>LinkedIn Profile</Tooltip>
        </ButtonWrapper>

        {/* Back to Top Button */}
        {showBackToTop && (
          <ButtonWrapper>
            <FloatingButton onClick={scrollToTop}>
              <FaArrowUp />
            </FloatingButton>
            <Tooltip>Back to Top</Tooltip>
          </ButtonWrapper>
        )}
      </FloatingContainer>

      {/* Updates Popup */}
      <UpdatesPopup 
        isOpen={showUpdatesPopup} 
        onClose={closeUpdatesPopup} 
      />
    </>
  );
};

export default FloatingActions;