import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaBell, FaTimes, FaCalendar, FaExternalLinkAlt, FaChevronRight } from 'react-icons/fa';
import { recentUpdates } from '../../data/constants';
import { useNavigate } from 'react-router-dom';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// Bell button styling for integration with FloatingActions
const BellButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}AA);
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
  
  .bell-icon {
    position: relative;
  }
  
  .notification-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff4757;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    animation: ${pulse} 2s infinite;
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 18px;
    
    .notification-badge {
      width: 16px;
      height: 16px;
      font-size: 9px;
      top: -6px;
      right: -6px;
    }
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1001;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: ${({ theme }) => theme.card};
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.4s ease-out;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  border-left: 2px solid ${({ theme }) => theme.primary}30;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PopupHeader = styled.div`
  padding: 25px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary}20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}10, transparent);
`;

const PopupTitle = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.text_secondary}20;
    color: ${({ theme }) => theme.text_primary};
    transform: rotate(90deg);
  }
`;

const PopupContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.text_secondary}10;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary}60;
    border-radius: 3px;
  }
`;

const UpdateItem = styled.div`
  padding: 20px 25px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary}15;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: ${({ theme }) => theme.primary}08;
    transform: translateX(5px);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const UpdateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 15px;
`;

const UpdateDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  font-weight: 500;
`;

const UpdateBadge = styled.div`
  background: ${({ type, theme }) => 
    type === 'project' ? 'linear-gradient(135deg, #854CE6, #DA22FF)' :
    type === 'certification' ? 'linear-gradient(135deg, #13ADC7, #6978D1)' :
    'linear-gradient(135deg, #FF6B6B, #4ECDC4)'};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

const UpdateTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const UpdateDescription = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const UpdateFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UpdateTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 500;
`;

const ViewMoreButton = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: all 0.3s ease;
  
  ${UpdateItem}:hover & {
    opacity: 1;
  }
`;

const NewIndicator = styled.div`
  position: absolute;
  top: 15px;
  right: 25px;
  width: 8px;
  height: 8px;
  background: #ff4757;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 25px;
  color: ${({ theme }) => theme.text_secondary};
  
  .icon {
    font-size: 48px;
    margin-bottom: 20px;
    opacity: 0.5;
  }
  
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text_primary};
  }
  
  p {
    font-size: 14px;
    line-height: 1.5;
  }
`;

// Export the bell button component for FloatingActions
export const UpdatesBellButton = ({ onClick, hasNewUpdates }) => (
  <BellButton onClick={onClick}>
    <div className="bell-icon">
      <FaBell />
      {hasNewUpdates && <div className="notification-badge">!</div>}
    </div>
  </BellButton>
);

const UpdatesPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const newUpdatesCount = recentUpdates.filter(update => update.isNew).length;

  const handleUpdateClick = (update) => {
    onClose();
    if (update.link === '#') {
      if (update.type === 'blog') {
        navigate('/blog');
        window.scrollTo(0, 0);
      }
      return;
    }
    
    if (update.link.startsWith('http')) {
      window.open(update.link, '_blank');
      return;
    }

    if (update.link.startsWith('/')) {
      navigate(update.link);
      window.scrollTo(0, 0);
      return;
    }
    
    try {
      const element = document.querySelector(update.link);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } catch (e) {
      console.warn("Invalid selector for scroll:", update.link);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      <PopupOverlay isOpen={isOpen} onClick={onClose} />
      
      <PopupContainer isOpen={isOpen}>
        <PopupHeader>
          <PopupTitle>
            <FaBell />
            Recent Updates
          </PopupTitle>
          <CloseButton onClick={onClose}>
            <FaTimes size={18} />
          </CloseButton>
        </PopupHeader>
        
        <PopupContent>
          {recentUpdates.length > 0 ? (
            recentUpdates.map((update) => (
              <UpdateItem 
                key={update.id} 
                onClick={() => handleUpdateClick(update)}
              >
                {update.isNew && <NewIndicator />}
                
                <UpdateHeader>
                  <UpdateDate>
                    <FaCalendar />
                    {formatDate(update.date)}
                  </UpdateDate>
                  <UpdateBadge type={update.type}>
                    {update.type}
                  </UpdateBadge>
                </UpdateHeader>
                
                <UpdateTitle>{update.title}</UpdateTitle>
                <UpdateDescription>{update.description}</UpdateDescription>
                
                <UpdateFooter>
                  <UpdateTags>
                    {update.tags.slice(0, 2).map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                    {update.tags.length > 2 && (
                      <Tag>+{update.tags.length - 2}</Tag>
                    )}
                  </UpdateTags>
                  
                  <ViewMoreButton>
                    <FaExternalLinkAlt />
                    View
                    <FaChevronRight />
                  </ViewMoreButton>
                </UpdateFooter>
              </UpdateItem>
            ))
          ) : (
            <EmptyState>
              <div className="icon">
                <FaBell />
              </div>
              <h3>No Updates Yet</h3>
              <p>Stay tuned for exciting updates about projects, achievements, and more!</p>
            </EmptyState>
          )}
        </PopupContent>
      </PopupContainer>
    </>
  );
};

// Hook for managing updates state
export const useUpdatesState = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasNewUpdates, setHasNewUpdates] = useState(false);
  const [showAutoPopup, setShowAutoPopup] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('portfolioVisited');
    
    if (!hasVisited) {
      // Show popup after 3 seconds for first-time visitors
      const timer = setTimeout(() => {
        setShowAutoPopup(true);
        setHasNewUpdates(true);
        localStorage.setItem('portfolioVisited', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      // For returning visitors, show badge if there are new updates
      const lastVisit = localStorage.getItem('lastUpdateCheck');
      const latestUpdate = recentUpdates[0]?.date;
      
      if (!lastVisit || new Date(latestUpdate) > new Date(lastVisit)) {
        setHasNewUpdates(true);
      }
    }
  }, []);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
    setHasNewUpdates(false);
    setShowAutoPopup(false);
    localStorage.setItem('lastUpdateCheck', new Date().toISOString());
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setShowAutoPopup(false);
  };

  return {
    isPopupOpen,
    hasNewUpdates,
    showAutoPopup,
    handleButtonClick,
    handleClosePopup
  };
};

export default UpdatesPopup;