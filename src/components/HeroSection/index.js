import React, { useState } from 'react'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, Title, SubTitle, ResumeButton, RolesContainer, RoleBadge, TextLoop, Span } from './HeroStyle'
import HeroImg from '../../images/HeroImage.jpg'
import { Bio } from '../../data/constants';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import HeroBgAnimation from '../HeroBgAnimation';
import { Snackbar, Alert } from '@mui/material';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const HeroWrapper = styled.div`
  position: relative;
  padding-bottom: 80px;
  filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.7));
  z-index: 5;
  @media (max-width: 960px) {
    padding-bottom: 60px;
  }
`;

const HeroSection = () => {
    const [openAlert, setOpenAlert] = useState(false);

    const handleResumeClick = (e) => {
        e.preventDefault();
        setOpenAlert(true);
    };

    return (
        <HeroWrapper id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer>
                    <HeroLeftContainer id="Left"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <Title variants={fadeUp}>Panchadip<br/>Bhattacharjee</Title>
                        <motion.div variants={fadeUp}>
                            <TextLoop>
                                I am a
                                <Span>
                                    <Typewriter
                                        options={{
                                            strings: Bio.roles,
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                </Span>
                            </TextLoop>
                        </motion.div>
                        <RolesContainer variants={fadeUp}>
                            {Bio.roles.slice(0, 4).map((role, idx) => (
                                <RoleBadge key={idx}>{role}</RoleBadge>
                            ))}
                        </RolesContainer>
                        <SubTitle variants={fadeUp}>{Bio.description}</SubTitle>
                        <motion.div variants={fadeUp}>
                            <ResumeButton as="button" onClick={handleResumeClick}>View Resume</ResumeButton>
                        </motion.div>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Img 
                            src={HeroImg} 
                            alt="Panchadip Bhattacharjee" 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        />
                    </HeroRightContainer>
                </HeroInnerContainer>
            </HeroContainer>

            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenAlert(false)} severity="warning" sx={{ width: '100%', fontSize: '15px' }}>
                    Access Restricted: Oh no! The resume is currently undergoing a fruitful restructuring. Please check back in a few days!
                </Alert>
            </Snackbar>
        </HeroWrapper>
    )
}

export default HeroSection