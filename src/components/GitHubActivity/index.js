import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(133, 76, 230, 0.4),
                0 0 40px rgba(133, 76, 230, 0.2),
                0 0 60px rgba(133, 76, 230, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(133, 76, 230, 0.6),
                0 0 60px rgba(133, 76, 230, 0.3),
                0 0 80px rgba(133, 76, 230, 0.2);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const moveGrid = keyframes`
  0% {
    background-position: 0 0, 0 0, 0 0;
  }
  100% {
    background-position: 50px 50px, -50px -50px, 100px 100px;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px 120px 20px;
  position: relative;
  background-color: ${({ theme }) => theme.bg};
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 98%, 0 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(133, 76, 230, 0.08) 1px, transparent 1px),
      linear-gradient(0deg, rgba(133, 76, 230, 0.08) 1px, transparent 1px),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 10px,
        rgba(76, 110, 245, 0.04) 10px,
        rgba(76, 110, 245, 0.04) 11px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 10px,
        rgba(76, 110, 245, 0.04) 10px,
        rgba(76, 110, 245, 0.04) 11px
      );
    background-size: 20px 20px, 20px 20px, 100% 100%, 100% 100%;
    animation: ${moveGrid} 20s linear infinite;
    opacity: 0.6;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(38.73deg, rgba(204, 0, 187, 0.1) 0%, rgba(201, 32, 184, 0) 50%), 
      linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.1) 100%);
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, #854CE6 0%, #4C6EF5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 50px;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const StatsButton = styled(Link)`
  position: relative;
  padding: 20px 60px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #854CE6 0%, #4C6EF5 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #4C6EF5 0%, #854CE6 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    animation: ${glow} 2s ease-in-out infinite;
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
  }
  
  span {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  @media (max-width: 768px) {
    padding: 16px 40px;
    font-size: 18px;
  }
`;

const IconWrapper = styled.span`
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  ${StatsButton}:hover & {
    transform: rotate(360deg);
  }
`;

const floatLogo = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(-2deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
`;

const PlatformLogos = styled.div`
  display: flex;
  gap: 35px;
  margin-top: 50px;
  transform: perspective(500px) rotateX(5deg);
  transform-style: preserve-3d;
  
  @media (max-width: 768px) {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    transform: none;
  }
`;

const Logo = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  padding: 12px 20px;
  background: rgba(133, 76, 230, 0.1);
  border: 1px solid rgba(133, 76, 230, 0.3);
  border-radius: 25px;
  transition: all 0.3s ease;
  animation: ${floatLogo} ${props => 3 + props.delay * 0.5}s ease-in-out infinite;
  animation-delay: ${props => props.delay * 0.2}s;
  cursor: pointer;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px) scale(1.1);
    border-color: rgba(133, 76, 230, 0.8);
    background: rgba(133, 76, 230, 0.2);
    box-shadow: 0 5px 20px rgba(133, 76, 230, 0.4);
  }
  
  &::before {
    content: '${props => props.icon}';
    font-size: 28px;
    filter: drop-shadow(0 0 8px rgba(133, 76, 230, 0.6));
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px 16px;
    
    &::before {
      font-size: 24px;
    }
  }
`;

const GitHubActivity = () => {
  return (
    <Container>
      <Title>Coding Statistics & Achievements</Title>
      <Subtitle>
        View my comprehensive coding statistics across multiple platforms including GitHub, LeetCode, GeeksforGeeks, and more. Track my progress, contributions, and problem-solving journey.
      </Subtitle>
      
      <StatsButton to="/stats">
        <span>
          <IconWrapper>📊</IconWrapper>
          View All My Stats
        </span>
      </StatsButton>
      
      <PlatformLogos>
        <Logo icon="⚡" delay={0}>GitHub</Logo>
        <Logo icon="💡" delay={1}>LeetCode</Logo>
        <Logo icon="🎯" delay={2}>GeeksforGeeks</Logo>
        <Logo icon="🏆" delay={3}>CodeChef</Logo>
        <Logo icon="🚀" delay={4}>Codeforces</Logo>
      </PlatformLogos>
    </Container>
  );
};

export default GitHubActivity;
