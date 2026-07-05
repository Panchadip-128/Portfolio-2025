import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.div`
    background-color: ${({theme}) => theme.card_light};
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    @media (max-width: 960px) {
        trastion: 0.8s all ease;
    }
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
    width: auto;    
    padding: 0 6px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
    @media (max-width: 640px) {
      padding: 0 0px;
  }
`;
export const Span = styled.div`
    padding: 0 4px;
    font-weight: bold;
    font-size: 18px;
`;
export const NavItems = styled.div`
    width: auto;
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 16px;
    padding: 0 6px;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
      display: none;
    }
`;

export const NavLink = styled.a`
    color: ${({ theme, active }) => active ? theme.primary : theme.text_primary};
    font-weight: ${({ active }) => active ? 600 : 500};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    position: relative;
    
    :hover {
      color: ${({ theme }) => theme.primary};
    }

    ${({ active, theme }) => active && `
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -5px;
        left: 0;
        background: ${theme.primary};
        animation: slideIn 0.3s ease-in-out;
      }
      
      @keyframes slideIn {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }
    `}
`;


export const GitHubButton = styled.a`
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.6s ease-in-out;
  position: relative;
  z-index: 1;
  background-color: transparent;
  border: none;

  &:before {
    content: '';
    position: absolute;
    inset: -1.5px;
    border-radius: 22px;
    background: linear-gradient(90deg, #ff004f, #ff8c00, #00ffc6, #0077ff, #ff004f);
    background-size: 200% 200%;
    animation: rainbowMove 3s linear infinite;
    z-index: -2;
    filter: blur(2px);
    opacity: 0.8;
  }

  &:after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 19px;
    background-color: ${({ theme }) => theme.card_light};
    z-index: -1;
    transition: all 0.6s ease-in-out;
  }

  @keyframes rainbowMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  &:hover {
    color: ${({ theme }) => theme.white};
    transform: scale(1.05);
    &:before {
      filter: blur(4px);
      opacity: 1;
    }
    &:after {
      background-color: ${({ theme }) => theme.primary};
    }
  }

  @media screen and (max-width: 768px) { 
    font-size: 14px;
  }
`;

export const BlogButton = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 18px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  background: linear-gradient(135deg, #854CE6 0%, #DA22FF 100%);
  color: #fff;
  border: none;
  box-shadow: 0 0 14px rgba(133, 76, 230, 0.45);
  transition: all 0.3s ease;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: linear-gradient(135deg, #854CE6, #DA22FF);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: 0 0 28px rgba(133, 76, 230, 0.75);
    transform: translateY(-1px);
  }

  &:hover::before {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const BlogDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  display: inline-block;
  animation: pulse-dot 2s ease-in-out infinite;

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }
`;

export const BlogButtonMobile = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 22px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  background: linear-gradient(135deg, #854CE6 0%, #DA22FF 100%);
  color: #fff;
  border: none;
  box-shadow: 0 0 14px rgba(133, 76, 230, 0.45);
  transition: all 0.3s ease;
  width: fit-content;
`;

export const ButtonContainer = styled.div`
  width: auto;  
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 6px;
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  gap: 12px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;


export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
`

export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    position: absolute;
    top: 80px;
    right: 0;
    width: 100%;
    padding: 12px 40px 24px 40px;
    background: ${({ theme }) => theme.card_light+ "F2"};
    transition: all 0.6s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    border-radius: 0 0 20px 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    z-index: ${({ isOpen }) => (isOpen ? '1000' : '-1000')};

`

export const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  width: 100%;
  height: 100%;
`

export const MobileMenuLink = styled(LinkR)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileMenuButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.6s ease-in-out;

  :hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

export  const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileNavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  @media (max-width: 640px) {
    padding: 0 0px;
  }
`;