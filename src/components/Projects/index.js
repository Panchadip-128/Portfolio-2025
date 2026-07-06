import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, ToggleButtonGroup, ToggleButton, Divider, CardContainer } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'
import Marquee from 'react-fast-marquee'
import styled from 'styled-components'

const MarqueeWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: visible;
  padding: 20px 0 160px 0;
`;


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  
  const filteredProjects = toggle === 'all' 
    ? projects 
    : projects.filter((item) => item.category === toggle);

  const row1 = filteredProjects.filter((_, index) => index % 3 === 0);
  const row2 = filteredProjects.filter((_, index) => index % 3 === 1);
  const row3 = filteredProjects.filter((_, index) => index % 3 === 2);

  const showMarquee = filteredProjects.length > 3;

  const getRepeatedItems = (items) => {
    if (items.length === 0) return [];
    let repeated = [...items];
    while (repeated.length < 6) {
      repeated = [...repeated, ...items];
    }
    return repeated;
  };

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From Full Stack Webapps to Machine Learning. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
          }
          {/* <Divider />
          {toggle === 'Cyber Security' ?
            <ToggleButton active value="Cyber Security" onClick={() => setToggle('Cyber Security')}>Cyber Security</ToggleButton>
            :
            <ToggleButton value="Cyber Security" onClick={() => setToggle('Cyber Security')}>Cyber Security</ToggleButton>
          } */}
          <Divider />
          {toggle === 'machine learning' ?
            <ToggleButton active value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
            :
            <ToggleButton value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
          }
        </ToggleButtonGroup>
      </Wrapper>
      
      <MarqueeWrapper>
        {filteredProjects.length > 0 && (
          showMarquee ? (
            <>
              {row1.length > 0 && (
                <Marquee speed={80} pauseOnHover={true} gradient={false} direction="left">
                  {getRepeatedItems(row1).map((project, index) => (
                    <div key={`row1-${project.id}-${index}`} style={{ margin: '0 20px', padding: '40px 20px' }}>
                      <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
                    </div>
                  ))}
                </Marquee>
              )}

              {row2.length > 0 && (
                <Marquee speed={80} pauseOnHover={true} gradient={false} direction="right">
                  {getRepeatedItems(row2).map((project, index) => (
                    <div key={`row2-${project.id}-${index}`} style={{ margin: '0 20px', padding: '40px 20px' }}>
                      <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
                    </div>
                  ))}
                </Marquee>
              )}

              {row3.length > 0 && (
                <Marquee speed={80} pauseOnHover={true} gradient={false} direction="left">
                  {getRepeatedItems(row3).map((project, index) => (
                    <div key={`row3-${project.id}-${index}`} style={{ margin: '0 20px', padding: '40px 20px' }}>
                      <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
                    </div>
                  ))}
                </Marquee>
              )}
            </>
          ) : (
            <CardContainer style={{ padding: '0 20px 100px 20px' }}>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} setOpenModal={setOpenModal} />
              ))}
            </CardContainer>
          )
        )}
      </MarqueeWrapper>
    </Container>
  )
}

export default Projects