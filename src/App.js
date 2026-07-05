import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { Snackbar, Alert, Slide } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { darkTheme } from './utils/Themes.js';
import './App.css';
import namasteAvatar from './images/namaste_avatar.png';

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import Certification from './components/Certifications';
import PositionsComponent from './components/Positions';
import RecentUpdates from './components/RecentUpdates';
import FloatingActions from './components/FloatingActions';
import PageLoader from './components/PageLoader';
import NavigationProgress from './components/NavigationProgress';
import GitHubActivity from './components/GitHubActivity';
import StatsPage from './components/StatsPage';
import Volunteering from './components/Volunteering';
import Publications from './components/Publications';
import BlogListing from './components/BlogListing';
import BlogPost from './components/BlogPost';
import CustomCursor from './components/CustomCursor';
import PublicationDetails from "./components/PublicationDetails";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
  z-index: 2;
`

const TopWrapper = styled.div`
  background: linear-gradient(180deg, rgba(60, 30, 120, 0.9) 0%, rgba(90, 40, 180, 0.6) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 15% calc(100% - 120px), 0 100%);
  padding-bottom: 120px;
  position: relative;
  margin-top: -500px;
  padding-top: 300px;
  @media (max-width: 960px) {
    padding-top: 350px;
  }
  @media (max-width: 640px) {
    padding-top: 400px;
  }
  z-index: 2;
  filter: drop-shadow(0px 15px 40px rgba(130, 50, 255, 0.6)) drop-shadow(0px 5px 15px rgba(0, 255, 170, 0.4));
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
    background-size: 30px 30px;
    -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 80%);
    mask-image: linear-gradient(to bottom, black 0%, transparent 80%);
    pointer-events: none;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`

const BottomWrapper = styled.div`
  background-image: 
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(180deg, rgba(150, 60, 255, 0.8) 0%, rgba(50, 20, 80, 0.9) 15%, rgba(12, 10, 20, 1) 40%);
  background-size: 40px 40px, 40px 40px, 100% 100%;
  width: 100%;
  clip-path: polygon(0 150px, 30% 110px, 70% 40px, 100% 0, 100% calc(100% - 50px), 30% 100%, 0 calc(100% - 50px));
  padding-top: 150px;
  padding-bottom: 80px;
  margin-top: -150px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0px -15px 40px rgba(140, 50, 255, 0.8)) drop-shadow(0px -5px 15px rgba(0, 255, 170, 0.5));
`

// Scrolls to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [openPubModal, setOpenPubModal] = useState({ state: false, pub: null });
  const [loading, setLoading] = useState(true);
  const [openWelcome, setOpenWelcome] = useState(false);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setOpenWelcome(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleCloseWelcome = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenWelcome(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CustomCursor />
      {loading && <PageLoader onLoadComplete={handleLoadComplete} />}
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Body>
                <HeroSection />
                <TopWrapper>
                  <Skills />
                  <Experience />
                  <Volunteering />
                </TopWrapper>
                <Projects openModal={openModal} setOpenModal={setOpenModal} />
                <BottomWrapper>
                  <Publications openPubModal={openPubModal} setOpenPubModal={setOpenPubModal} />
                  <Education />
                  <PositionsComponent />
                  <Certification />
                  <RecentUpdates />
                  <GitHubActivity username="Panchadip-128" />
                  <Contact />
                </BottomWrapper>
                <Footer />
                <FloatingActions />
                <NavigationProgress />
                {openModal.state &&
                  <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
                }
                {openPubModal.state &&
                  <PublicationDetails openModal={openPubModal} setOpenModal={setOpenPubModal} />
                }
              </Body>
            </>
          } />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/blog" element={
            <>
              <Navbar />
              <Body>
                <BlogListing />
                <Footer />
              </Body>
            </>
          } />
          <Route path="/blog/:id" element={
            <>
              <Navbar />
              <Body>
                <BlogPost />
                <Footer />
              </Body>
            </>
          } />
        </Routes>
      </Router>
      <Snackbar
        open={openWelcome}
        autoHideDuration={6000}
        onClose={handleCloseWelcome}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        style={{ marginTop: '80px' }}
      >
        <Alert
          onClose={handleCloseWelcome}
          icon={<img src={namasteAvatar} alt="namaste" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />}
          sx={{
            width: '100%',
            background: 'linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%)',
            color: 'white',
            boxShadow: '0 0 24px rgba(133, 76, 230, 0.6)',
            fontSize: '15px',
            fontWeight: 500,
            borderRadius: '12px',
            '& .MuiAlert-icon': { color: 'white', display: 'flex', alignItems: 'center' },
            '& .MuiAlert-action': { color: 'white' }
          }}
        >
          Welcome to my portfolio! Feel free to explore my work.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
