import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  
  @media (max-width: 768px) {
    top: 90px;
    right: 20px;
    left: 20px;
    max-width: none;
  }
`;

const NotificationCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-left: 4px solid ${({ type, theme }) => 
    type === 'success' ? '#4CAF50' :
    type === 'error' ? '#F44336' :
    type === 'warning' ? '#FF9800' :
    theme.primary};
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: ${({ isClosing }) => isClosing ? slideOut : slideIn} 0.3s ease-out forwards;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const IconContainer = styled.div`
  color: ${({ type, theme }) => 
    type === 'success' ? '#4CAF50' :
    type === 'error' ? '#F44336' :
    type === 'warning' ? '#FF9800' :
    theme.primary};
  font-size: 20px;
  margin-top: 2px;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const NotificationMessage = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.text_secondary + '20'};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <FaCheckCircle />;
    case 'error':
      return <FaExclamationTriangle />;
    case 'warning':
      return <FaExclamationTriangle />;
    default:
      return <FaInfoCircle />;
  }
};

const NotificationItem = ({ notification, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  return (
    <NotificationCard 
      type={notification.type} 
      isClosing={isClosing}
      onClick={handleClose}
    >
      <IconContainer type={notification.type}>
        {getIcon(notification.type)}
      </IconContainer>
      <ContentContainer>
        <NotificationTitle>{notification.title}</NotificationTitle>
        <NotificationMessage>{notification.message}</NotificationMessage>
      </ContentContainer>
      <CloseButton onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}>
        <FaTimes size={12} />
      </CloseButton>
    </NotificationCard>
  );
};

const NotificationSystem = ({ notifications, removeNotification }) => {
  return (
    <NotificationContainer>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </NotificationContainer>
  );
};

export default NotificationSystem;