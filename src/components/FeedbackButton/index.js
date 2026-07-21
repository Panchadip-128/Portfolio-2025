import React from 'react';
import styled from 'styled-components';
import { FaCommentAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const StyledButton = styled.button`
  position: fixed;
  right: -55px;
  top: 25%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px 12px 0 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  letter-spacing: 1px;

  &:hover {
    right: -50px;
    background: linear-gradient(225deg, hsla(271, 100%, 60%, 1) 0%, hsla(294, 100%, 60%, 1) 100%);
    box-shadow: 0 -6px 20px rgba(133, 76, 230, 0.5);
  }

  @media (max-width: 768px) {
    right: -45px;
    padding: 10px 20px;
    font-size: 14px;
    &:hover {
      right: -40px;
    }
  }
`;

const FeedbackButton = () => {
  const location = useLocation();

  // Hide the button if we are already on the feedback page
  if (location.pathname === '/feedback') {
    return null;
  }

  const handleClick = () => {
    window.open('/feedback', '_blank');
  };

  return (
    <StyledButton onClick={handleClick}>
      <FaCommentAlt style={{ transform: 'rotate(90deg)' }} /> Feedback
    </StyledButton>
  );
};

export default FeedbackButton;
