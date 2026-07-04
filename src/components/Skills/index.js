import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { skills } from '../../data/constants'

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1100px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

export const Title = styled.div`
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

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`

const Skill = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px 36px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primary}80;
    box-shadow: 0 0 30px 5px rgba(133,76,230,0.5);
  }
  
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 16px 24px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 16px 20px;
  }
`

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  ${Skill}:hover & {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
  }
`

const SkillList = styled.div`
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${({ theme }) => theme.card};
  
  &:hover {
    transform: translateY(-5px) scale(1.1);
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 20px 2px rgba(133,76,230,0.4);
    animation: ${float} 2s ease-in-out infinite;
  }
  
  &:hover img {
    transform: scale(1.2) rotate(5deg);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  filter: ${props => props.hovered ? 'brightness(1.2)' : 'brightness(1)'};
`

const SkillProgress = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.text_secondary}20;
  border-radius: 2px;
  margin-top: 15px;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  
  ${Skill}:hover & {
    opacity: 1;
  }
`

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary}80);
  border-radius: 2px;
  width: 0%;
  transition: width 1s ease-in-out;
  
  ${Skill}:hover & {
    width: ${props => props.progress || 85}%;
  }
`

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const skillProgress = {
    'Frontend': 90,
    'Backend': 85,
    'AI/ML/LLM Development': 88,
    'Mobile App Development': 75,
    'Others': 80
  };
  
  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>Here are some of my skills on which I have been working on for the past 2 years.
        </Desc>
        <SkillsContainer>
          {skills.map((skill, index) => (
            <Skill 
              key={skill.title}
              index={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              onMouseEnter={() => setHoveredSkill(skill.title)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
                {skill.skills.map((item, itemIndex) => (
                  <SkillItem key={itemIndex}>
                    <SkillImage 
                      src={item.image}
                      hovered={hoveredSkill === skill.title}
                    />
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
              <SkillProgress>
                <ProgressBar progress={skillProgress[skill.title]} />
              </SkillProgress>
            </Skill>
          ))}

        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills