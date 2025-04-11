import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { certifications } from '../../data/constants';

const scrollLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const CarouselWrapper = styled.div`
  width: 100%;
  padding: 10rem 0 6rem;
  position: relative;
  background: transparent;
`;

const ScrollArea = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: visible;
  scroll-behavior: smooth;
  cursor: grab;
  padding-bottom: 2rem;

  &::-webkit-scrollbar {
    display: none;
  }

  &:active {
    cursor: grabbing;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  width: max-content;
  animation: ${scrollLeft} 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  &.paused {
    animation-play-state: paused;
  }
`;

const Card = styled.div`
  width: 240px;
  min-width: 240px;
  height: ${({ expanded }) => (expanded ? 'auto' : '250px')};
  margin: 1rem;
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: ${({ expanded }) =>
    expanded ? '2px solid #0ff' : '1px solid rgb(232, 252, 12)'};
  box-shadow: ${({ expanded }) =>
    expanded
      ? '0 0 16px #0fe'
      : '0 0 2px rgba(225, 255, 0, 0.88), 0 0 4px rgba(255, 0, 0, 0.2)'};
  padding: 1.9rem;
  color: ${({ theme }) => theme.text || '#f0f0f0'};
  cursor: pointer;
  transition: transform 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: ${({ expanded }) => (expanded ? 'scale(1.05)' : 'scale(1)')};
  z-index: ${({ expanded }) => (expanded ? 10 : 1)};
  position: relative;

  &:hover {
    transform: ${({ expanded }) =>
      expanded ? 'scale(1.05)' : 'scale(1.03)'};
    background-color: rgb(35, 35, 82);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.accent || '#00aaff'};
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.subtext || '#cccccc'};
    margin: 0.3rem 0;
  }

  a {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: white;
    background-color: red;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: inline-block;
    text-align: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darkred;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.text || '#f0f0f0'};
  margin-bottom: 2rem;
`;

const NeonButton = styled.a`
  display: inline-block;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background-color: #111;
  border-radius: 8px;
  position: relative;
  text-decoration: none;
  z-index: 1;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 10px;
    background: linear-gradient(90deg, #ff004f, #ff8c00, #00ffc6, #0077ff, #ff004f);
    background-size: 100% 100%;
    z-index: -1;
    filter: blur(2px);
    opacity: 0.8;
  }

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 6px;
    background-color: #111;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 12px rgba(6, 69, 170, 0.91);
  }
`;


const CertificationCarousel = () => {
  const scrollRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const doubledCerts = [...certifications, ...certifications];

  const handleCardClick = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
    setIsPaused(true);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      scrollContainer.classList.add('active');
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
      setIsPaused(true);
    };

    const handleMouseLeave = () => {
      isDown = false;
      scrollContainer.classList.remove('active');
      setIsPaused(false);
    };

    const handleMouseUp = () => {
      isDown = false;
      scrollContainer.classList.remove('active');
      setIsPaused(false);
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    // Touch events
    let startTouchX = 0;
    let startScrollLeftTouch = 0;

    const handleTouchStart = (e) => {
      startTouchX = e.touches[0].pageX;
      startScrollLeftTouch = scrollContainer.scrollLeft;
      setIsPaused(true);
    };

    const handleTouchMove = (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startTouchX) * 1.5;
      scrollContainer.scrollLeft = startScrollLeftTouch - walk;
    };

    const handleTouchEnd = () => {
      setIsPaused(false);
    };

    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mousemove', handleMouseMove);

    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchmove', handleTouchMove);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <CarouselWrapper>
      <SectionTitle>Certifications</SectionTitle>
      <ScrollArea>
        <ScrollContainer
          ref={scrollRef}
          className={isPaused ? 'paused' : ''}
        >
          {doubledCerts.map((cert, index) => (
            <Card
              key={index}
              expanded={expandedIndex === index}
              onClick={() => handleCardClick(index)}
            >
              <h3>{cert.title}</h3>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p><strong>Date:</strong> {cert.date}</p>
              {expandedIndex === index && (
                <>
                  {cert.description && <p>{cert.description}</p>}
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                </>
              )}
            </Card>
          ))}
        </ScrollContainer>
      </ScrollArea>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <NeonButton href="mailto:panchadip125@gmail.com">Collaborate on a Project?</NeonButton>
      </div>
    </CarouselWrapper>
  );
};

export default CertificationCarousel;
