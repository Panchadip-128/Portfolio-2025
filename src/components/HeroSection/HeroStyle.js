import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";


export const HeroContainer = styled.div`
  background: 
    radial-gradient(circle at 15% 10%, rgba(120, 30, 200, 0.45) 0%, transparent 45%),
    radial-gradient(circle at 85% 20%, rgba(0, 150, 255, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 50% 85%, rgba(255, 0, 150, 0.15) 0%, transparent 55%),
    linear-gradient(135deg, rgba(15, 10, 35, 1) 0%, rgba(9, 9, 14, 1) 100%);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px 250px 30px;
  @media (max-width: 960px) {
    padding: 66px 16px 200px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px 150px 16px;
  }
  z-index: 2;
  filter: drop-shadow(0px 15px 25px rgba(0, 0, 0, 0.9));

  clip-path: polygon(0 0, 100% 0, 100% 85%, 70% 75%, 0 100%);
  @media (max-width: 960px) {
    clip-path: polygon(0 0, 100% 0, 100% 90%, 70% 85%, 0 100%);
  }
  @media (max-width: 640px) {
    clip-path: polygon(0 0, 100% 0, 100% 94%, 70% 90%, 0 100%);
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
export const HeroLeftContainer = styled(motion.div)`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const HeroRightContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 12px;
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

export const Img = styled(motion.img)`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    max-width: 400px;
    max-height: 400px;
  }

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const textGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Title = styled(motion.div)`
  font-weight: 800;
  font-size: 68px;
  line-height: 80px;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 50%, #22d3ee 100%);
  background-size: 200% auto;
  animation: ${textGradient} 4s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.8)) drop-shadow(0px 6px 14px rgba(0, 0, 0, 0.8));
  
  @media (max-width: 960px) {
    text-align: center;
    font-size: 56px;
    line-height: 68px;
  }

  @media (max-width: 640px) {
    font-size: 42px;
    line-height: 52px;
    margin-bottom: 8px;
  }
`;

export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

export const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export const RolesContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const RoleBadge = styled.span`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #a960ff);
  color: ${({ theme }) => theme.white};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 6px 20px ${({ theme }) => theme.primary + '60'};
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  @media (max-width: 640px) {
    font-size: 14px;
    padding: 6px 14px;
  }
`;

export const SubTitle = styled(motion.div)`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

export const ResumeButton = styled.a`
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    text-decoration: none;
    width: 95%;
    max-width: 300px;
    text-align: center;
    padding: 16px 0;
    color:${({ theme }) => theme.white};
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.2s ease-in-out !important;
    position: relative;
    z-index: 1;
    background-color: transparent;
    border: none;
    box-shadow: 20px 20px 60px #1F2634, -20px -20px 60px #1F2634;

    &:before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 22px;
      background: linear-gradient(90deg, #ff004f, #ff8c00, #00ffc6, #0077ff, #ff004f);
      background-size: 200% 200%;
      animation: rainbowMove 3s linear infinite;
      z-index: -2;
      filter: blur(2px);
      opacity: 0.9;
    }

    &:after {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 18px;
      background-color: #111;
      z-index: -1;
      transition: all 0.4s ease-in-out;
    }

    @keyframes rainbowMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    &:hover {
        transform: scale(1.05) translateY(-2px);
        transition: all 0.4s ease-in-out;
        color: ${({ theme }) => theme.white};
        &:before {
          filter: blur(5px);
          opacity: 1;
        }
        &:after {
          background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
        }
    }    
    
    @media (max-width: 640px) {
        padding: 12px 0;
        font-size: 18px;
    } 
`;
