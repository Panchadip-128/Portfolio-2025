import React from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import { testimonials } from '../../data/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 0px 80px 0px;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px;
  gap: 12px;
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
  max-width: 800px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  @media (max-width: 768px) {
      font-size: 16px;
      margin-bottom: 30px;
  }
`;

const MarqueeWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TestimonialCard = styled.div`
  width: 380px;
  height: 200px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 24px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primary}50;
    box-shadow: 0 0 20px rgba(133, 76, 230, 0.2);
  }

  @media (max-width: 768px) {
    width: 320px;
    padding: 16px;
    height: 180px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${props => props.color || '#854CE6'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Role = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ReadMore = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-top: auto;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Testimonials = () => {
  // Split testimonials into 3 arrays for the 3 rows
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);
  const row3 = testimonials.slice(6, 9);

  return (
    <Container id="testimonials">
      <Wrapper>
        <Title>What Others Are Saying</Title>
        <Desc>Real stories from people who've experienced the journey firsthand — their wins, growth, and transformations speak louder than we ever could</Desc>
        
        <MarqueeWrapper>
          <Marquee speed={40} pauseOnHover={true} gradient={false} direction="left">
            {row1.map((item, index) => (
              <TestimonialCard key={`row1-${index}`}>
                <Header>
                  <Avatar color={item.color}>{item.initials}</Avatar>
                  <UserInfo>
                    <Name>{item.name}</Name>
                    <Role>{item.role}</Role>
                  </UserInfo>
                </Header>
                <Text>{item.text}</Text>
                <ReadMore>Read more</ReadMore>
              </TestimonialCard>
            ))}
          </Marquee>

          <Marquee speed={40} pauseOnHover={true} gradient={false} direction="right">
            {row2.map((item, index) => (
              <TestimonialCard key={`row2-${index}`}>
                <Header>
                  <Avatar color={item.color}>{item.initials}</Avatar>
                  <UserInfo>
                    <Name>{item.name}</Name>
                    <Role>{item.role}</Role>
                  </UserInfo>
                </Header>
                <Text>{item.text}</Text>
                <ReadMore>Read more</ReadMore>
              </TestimonialCard>
            ))}
          </Marquee>

          <Marquee speed={40} pauseOnHover={true} gradient={false} direction="left">
            {row3.map((item, index) => (
              <TestimonialCard key={`row3-${index}`}>
                <Header>
                  <Avatar color={item.color}>{item.initials}</Avatar>
                  <UserInfo>
                    <Name>{item.name}</Name>
                    <Role>{item.role}</Role>
                  </UserInfo>
                </Header>
                <Text>{item.text}</Text>
                <ReadMore>Read more</ReadMore>
              </TestimonialCard>
            ))}
          </Marquee>
        </MarqueeWrapper>
      </Wrapper>
    </Container>
  );
};

export default Testimonials;
