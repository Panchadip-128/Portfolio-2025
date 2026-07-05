import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { recentUpdates } from '../../data/constants';
import { useNavigate } from 'react-router-dom';

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmerSweep = keyframes`
  0% { left: -100%; }
  100% { left: 200%; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  background: linear-gradient(-45deg, rgba(132, 59, 206, 0.15), rgba(218, 34, 255, 0.15), rgba(19, 173, 199, 0.15), rgba(255, 107, 107, 0.15));
  background-size: 400% 400%;
  animation: ${gradientMove} 15s ease infinite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 160px 0px 160px 0px;
  clip-path: polygon(0 0, 50% 10vw, 100% 0, 100% 100%, 50% calc(100% - 10vw), 0 100%);
  @media (max-width: 960px) {
    padding: 120px 0px;
    clip-path: polygon(0 0, 50% 12vw, 100% 0, 100% 100%, 50% calc(100% - 12vw), 0 100%);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 80px 0;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const UpdatesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 25px;
  justify-content: center;
  padding: 0 20px;
`;

const UpdateCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgba(23, 23, 33, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.4s ease-in-out;
  animation: ${fadeInUp} 0.6s ease-out;
  animation-delay: ${props => props.index * 0.1}s;
  animation-fill-mode: both;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: all 0.75s ease;
    z-index: 2;
    pointer-events: none;
  }

  &:hover::before {
    animation: ${shimmerSweep} 1s forwards;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.03) perspective(1000px) rotateX(2deg) rotateY(-2deg);
    box-shadow: 
      0 20px 50px -10px rgba(132, 59, 206, 0.5),
      0 0 20px 0 rgba(218, 34, 255, 0.15) inset;
    border: 1px solid rgba(218, 34, 255, 0.6);
    background: rgba(30, 30, 45, 0.8);
  }

  @media (max-width: 768px) {
    max-width: 350px;
    padding: 16px 14px;
  }
`;

const UpdateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const UpdateImage = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
  object-fit: cover;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const UpdateDate = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  animation: ${slideIn} 0.5s ease-out;
`;

const UpdateType = styled.div`
  background: ${({ type, theme }) => 
    type === 'project' ? 'linear-gradient(225deg, #854CE6 0%, #DA22FF 100%)' :
    type === 'certification' ? 'linear-gradient(225deg, #13ADC7 0%, #6978D1 100%)' :
    type === 'blog' ? 'linear-gradient(225deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)' :
    'linear-gradient(225deg, #FF6B6B 0%, #4ECDC4 100%)'};
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 10px;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NewBadge = styled.div`
  background: linear-gradient(225deg, #FF4757 0%, #FF3838 100%);
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 9px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const UpdateTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const UpdateDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  text-align: justify;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Tag = styled.div`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 4px 12px rgba(132, 59, 206, 0.4);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled.button`
  background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.text_secondary};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: capitalize;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const RecentUpdates = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  
  const filteredUpdates = filter === 'all' 
    ? recentUpdates 
    : recentUpdates.filter(update => update.type === filter);

  const handleCardClick = (link, type) => {
    if (link === '#') {
      if (type === 'blog') {
        navigate('/blog');
        window.scrollTo(0, 0);
      }
      return;
    }
    
    if (link.startsWith('http')) {
      window.open(link, '_blank');
      return;
    }

    if (link.startsWith('/')) {
      navigate(link);
      window.scrollTo(0, 0);
      return;
    }
    
    try {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.warn("Invalid selector for scroll:", link);
    }
  };

  return (
    <Container id="recent-updates">
      <Wrapper>
        <Title>Featured</Title>
        <Desc>
          Highlighting my latest achievements, awards, and professional milestones.
        </Desc>
        
        <FilterContainer>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'project'} 
            onClick={() => setFilter('project')}
          >
            Projects
          </FilterButton>
          <FilterButton 
            active={filter === 'blog'} 
            onClick={() => setFilter('blog')}
          >
            Blogs
          </FilterButton>
          <FilterButton 
            active={filter === 'certification'} 
            onClick={() => setFilter('certification')}
          >
            Certifications
          </FilterButton>
          <FilterButton 
            active={filter === 'experience'} 
            onClick={() => setFilter('experience')}
          >
            Experience
          </FilterButton>
        </FilterContainer>

        <UpdatesContainer>
          {filteredUpdates.map((update, index) => (
            <UpdateCard 
              key={update.id} 
              index={index}
              onClick={() => handleCardClick(update.link, update.type)}
            >
              {update.image && <UpdateImage src={update.image} alt={update.title} />}
              <UpdateHeader>
                <UpdateDate>{new Date(update.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</UpdateDate>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <UpdateType type={update.type}>{update.type}</UpdateType>
                  {update.isNew && <NewBadge>New</NewBadge>}
                </div>
              </UpdateHeader>
              
              <UpdateTitle>{update.title}</UpdateTitle>
              <UpdateDescription>{update.description}</UpdateDescription>
              
              <TagsContainer>
                {update.tags.map((tag, tagIndex) => (
                  <Tag key={tagIndex}>{tag}</Tag>
                ))}
              </TagsContainer>
            </UpdateCard>
          ))}
        </UpdatesContainer>
      </Wrapper>
    </Container>
  );
};

export default RecentUpdates;