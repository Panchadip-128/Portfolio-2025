import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCube, FaExpand, FaCompress, FaPlay, FaPause, FaRedo, FaEye, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-20px) rotateY(180deg); }
`;

const rotate3D = keyframes`
  from { transform: rotateY(0deg) rotateX(0deg); }
  to { transform: rotateY(360deg) rotateX(360deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(132, 59, 206, 0.3); }
  50% { box-shadow: 0 0 40px rgba(132, 59, 206, 0.6); }
`;

const Container = styled.div`
  background: linear-gradient(135deg, rgba(0, 70, 209, 0.05) 0%, rgba(132, 59, 206, 0.05) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  gap: 40px;
  padding: 0 20px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ViewerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
`;

const ViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(135deg, rgba(132, 59, 206, 0.1), rgba(0, 70, 209, 0.1));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectTabs = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 5px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ProjectTab = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: ${({ active, theme }) => 
    active ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ active, theme }) => active ? 'white' : theme.text_secondary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${({ active, theme }) => 
      active ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
`;

const ViewerControls = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${({ theme }) => theme.primary}40;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ViewerContent = styled.div`
  height: 600px;
  position: relative;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const Scene3D = styled.div`
  width: 100%;
  height: 100%;
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProjectCube = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  animation: ${({ isRotating }) => isRotating ? rotate3D : 'none'} 10s linear infinite;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const CubeFace = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: ${({ theme, index }) => {
    const colors = [
      `linear-gradient(135deg, ${theme.primary}80, ${theme.secondary}80)`,
      `linear-gradient(135deg, ${theme.secondary}80, ${theme.primary}80)`,
      `linear-gradient(135deg, #ff6b6b80, #ee5a5280)`,
      `linear-gradient(135deg, #4ecdc480, #45b78780)`,
      `linear-gradient(135deg, #95e1d380, #fce38a80)`,
      `linear-gradient(135deg, #fa709a80, #fee14080)`
    ];
    return colors[index % colors.length];
  }};
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
  animation: ${glow} 3s ease-in-out infinite;
  
  ${({ index }) => {
    switch(index) {
      case 0: return `transform: rotateY(0deg) translateZ(150px);`;
      case 1: return `transform: rotateY(90deg) translateZ(150px);`;
      case 2: return `transform: rotateY(180deg) translateZ(150px);`;
      case 3: return `transform: rotateY(-90deg) translateZ(150px);`;
      case 4: return `transform: rotateX(90deg) translateZ(150px);`;
      case 5: return `transform: rotateX(-90deg) translateZ(150px);`;
      default: return '';
    }
  }}
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    padding: 15px;
    
    ${({ index }) => {
      switch(index) {
        case 0: return `transform: rotateY(0deg) translateZ(100px);`;
        case 1: return `transform: rotateY(90deg) translateZ(100px);`;
        case 2: return `transform: rotateY(180deg) translateZ(100px);`;
        case 3: return `transform: rotateY(-90deg) translateZ(100px);`;
        case 4: return `transform: rotateX(90deg) translateZ(100px);`;
        case 5: return `transform: rotateX(-90deg) translateZ(100px);`;
        default: return '';
      }
    }}
  }
`;

const FaceTitle = styled.h3`
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const FaceContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const FaceIcon = styled.div`
  font-size: 40px;
  margin-bottom: 15px;
  animation: ${float} 4s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const ProjectInfo = styled.div`
  padding: 30px;
  background: linear-gradient(135deg, rgba(132, 59, 206, 0.05), rgba(0, 70, 209, 0.05));
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 20px;
`;

const InfoCard = styled.div`
  text-align: center;
`;

const InfoValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 5px;
`;

const InfoLabel = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background: ${({ variant, theme }) => 
    variant === 'primary' ? 
    `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` : 
    'rgba(255, 255, 255, 0.1)'};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const Project3DViewer = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cubeRef = useRef(null);

  const projects = [
    {
      name: "AI Deepfake Detector",
      tech: "TensorFlow, React",
      faces: [
        { title: "Frontend", content: "React & Modern UI", icon: "💻" },
        { title: "AI Model", content: "TensorFlow Detection", icon: "🤖" },
        { title: "Backend", content: "Python FastAPI", icon: "⚡" },
        { title: "Database", content: "MongoDB Storage", icon: "🗄️" },
        { title: "Security", content: "JWT Authentication", icon: "🔒" },
        { title: "Analytics", content: "Performance Metrics", icon: "📊" }
      ],
      stats: { complexity: "95%", performance: "92%", innovation: "98%" }
    },
    {
      name: "VQA System",
      tech: "Deep Learning, NLP",
      faces: [
        { title: "Vision", content: "Image Understanding", icon: "👁️" },
        { title: "Language", content: "NLP Processing", icon: "🗣️" },
        { title: "Neural Net", content: "Deep Learning", icon: "🧠" },
        { title: "API", content: "RESTful Services", icon: "🔗" },
        { title: "Training", content: "Model Optimization", icon: "⚙️" },
        { title: "Results", content: "Accurate Answers", icon: "✅" }
      ],
      stats: { complexity: "92%", performance: "89%", innovation: "94%" }
    },
    {
      name: "Portfolio Website",
      tech: "React, Styled Components",
      faces: [
        { title: "Design", content: "Modern UI/UX", icon: "🎨" },
        { title: "React", content: "Component Based", icon: "⚛️" },
        { title: "Responsive", content: "Mobile First", icon: "📱" },
        { title: "Animations", content: "Smooth Transitions", icon: "✨" },
        { title: "Performance", content: "Optimized Speed", icon: "🚀" },
        { title: "SEO", content: "Search Friendly", icon: "🔍" }
      ],
      stats: { complexity: "78%", performance: "96%", innovation: "85%" }
    }
  ];

  const currentProject = projects[selectedProject];

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  const resetRotation = () => {
    if (cubeRef.current) {
      cubeRef.current.style.animation = 'none';
      setTimeout(() => {
        cubeRef.current.style.animation = '';
        setIsRotating(true);
      }, 100);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Container id="3d-showcase">
      <Wrapper>
        <Title>3D Project Showcase</Title>
        <Subtitle>
          Interactive 3D visualization of my projects with immersive exploration
        </Subtitle>
        
        <ViewerContainer>
          <ViewerHeader>
            <ProjectTabs>
              {projects.map((project, index) => (
                <ProjectTab
                  key={index}
                  active={selectedProject === index}
                  onClick={() => setSelectedProject(index)}
                >
                  {project.name}
                </ProjectTab>
              ))}
            </ProjectTabs>
            
            <ViewerControls>
              <ControlButton onClick={toggleRotation} title={isRotating ? "Pause Rotation" : "Resume Rotation"}>
                {isRotating ? <FaPause /> : <FaPlay />}
              </ControlButton>
              <ControlButton onClick={resetRotation} title="Reset View">
                <FaRedo />
              </ControlButton>
              <ControlButton onClick={toggleFullscreen} title="Toggle Fullscreen">
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </ControlButton>
            </ViewerControls>
          </ViewerHeader>
          
          <ViewerContent>
            <Scene3D>
              <ProjectCube ref={cubeRef} isRotating={isRotating}>
                {currentProject.faces.map((face, index) => (
                  <CubeFace key={index} index={index}>
                    <FaceIcon>{face.icon}</FaceIcon>
                    <FaceTitle>{face.title}</FaceTitle>
                    <FaceContent>{face.content}</FaceContent>
                  </CubeFace>
                ))}
              </ProjectCube>
            </Scene3D>
          </ViewerContent>
          
          <ProjectInfo>
            <InfoGrid>
              <InfoCard>
                <InfoValue>{currentProject.stats.complexity}</InfoValue>
                <InfoLabel>Complexity</InfoLabel>
              </InfoCard>
              <InfoCard>
                <InfoValue>{currentProject.stats.performance}</InfoValue>
                <InfoLabel>Performance</InfoLabel>
              </InfoCard>
              <InfoCard>
                <InfoValue>{currentProject.stats.innovation}</InfoValue>
                <InfoLabel>Innovation</InfoLabel>
              </InfoCard>
            </InfoGrid>
            
            <ActionButtons>
              <ActionButton variant="primary">
                <FaEye /> Live Demo
              </ActionButton>
              <ActionButton>
                <FaCode /> View Code
              </ActionButton>
              <ActionButton>
                <FaExternalLinkAlt /> Learn More
              </ActionButton>
            </ActionButtons>
          </ProjectInfo>
        </ViewerContainer>
      </Wrapper>
    </Container>
  );
};

export default Project3DViewer;