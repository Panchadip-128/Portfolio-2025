import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink, BlogButton, BlogDot, BlogButtonMobile, MobileBlogButtonContainer } from './NavbarStyledComponent'
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';
import CreateIcon from '@mui/icons-material/Create';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'education', 'recent-updates'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleBlogClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/blog');
    window.scrollTo(0, 0);
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/' style={{ display: "flex", alignItems: "center", color: "white", cursor: 'pointer' }}>
          <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
        </NavLogo>

        <MobileBlogButtonContainer>
          <BlogButtonMobile onClick={handleBlogClick} role="button" tabIndex={0} style={{ padding: '6px 14px', fontSize: '13px' }}>
            <CreateIcon style={{ fontSize: '13px' }} />
            Blog
            <BlogDot />
          </BlogButtonMobile>
        </MobileBlogButtonContainer>

        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>

        {/* Desktop nav links */}
        <NavItems>
          <NavLink href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }} active={activeSection === 'about'}>About</NavLink>
          <NavLink href='#skills' onClick={(e) => { e.preventDefault(); handleNavClick('#skills'); }} active={activeSection === 'skills'}>Skills</NavLink>
          <NavLink href='#experience' onClick={(e) => { e.preventDefault(); handleNavClick('#experience'); }} active={activeSection === 'experience'}>Experience</NavLink>
          <NavLink href='#volunteering' onClick={(e) => { e.preventDefault(); handleNavClick('#volunteering'); }} active={activeSection === 'volunteering'}>Volunteering</NavLink>
          <NavLink href='#projects' onClick={(e) => { e.preventDefault(); handleNavClick('#projects'); }} active={activeSection === 'projects'}>Projects</NavLink>
          <NavLink href='#publications' onClick={(e) => { e.preventDefault(); handleNavClick('#publications'); }} active={activeSection === 'publications'}>Publications</NavLink>
          <NavLink href='#education' onClick={(e) => { e.preventDefault(); handleNavClick('#education'); }} active={activeSection === 'education' && location.pathname === '/'}>Education</NavLink>
        </NavItems>

        {/* Desktop right-side buttons */}
        <ButtonContainer>
          <BlogButton onClick={handleBlogClick} role="button" tabIndex={0}>
            <CreateIcon style={{ fontSize: '15px' }} />
            Blog
            <BlogDot />
          </BlogButton>
          <GitHubButton href={Bio.github} target="_blank">Github Profile</GitHubButton>
        </ButtonContainer>

        {/* Mobile menu */}
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" onClick={() => handleNavClick('#about')}>About</MobileLink>
            <MobileLink href='#skills' onClick={() => handleNavClick('#skills')}>Skills</MobileLink>
            <MobileLink href='#experience' onClick={() => handleNavClick('#experience')}>Experience</MobileLink>
            <MobileLink href='#volunteering' onClick={() => handleNavClick('#volunteering')}>Volunteering</MobileLink>
            <MobileLink href='#projects' onClick={() => handleNavClick('#projects')}>Projects</MobileLink>
            <MobileLink href='#publications' onClick={() => handleNavClick('#publications')}>Publications</MobileLink>
            <MobileLink href='#education' onClick={() => handleNavClick('#education')}>Education</MobileLink>

            <BlogButtonMobile onClick={handleBlogClick} role="button" tabIndex={0}>
              <CreateIcon style={{ fontSize: '16px' }} />
              Blog
              <BlogDot />
            </BlogButtonMobile>

            <GitHubButton
              style={{ padding: '10px 16px', background: `${theme.primary}`, color: 'white', width: 'max-content' }}
              href={Bio.github}
              target="_blank"
            >
              Github Profile
            </GitHubButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar