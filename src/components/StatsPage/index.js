import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(133, 76, 230, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(133, 76, 230, 0.6);
  }
`;

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  padding: 80px 20px 40px 20px;
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 50px auto;
  text-align: center;
`;

const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #854CE6 0%, #4C6EF5 100%);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateX(-5px);
    box-shadow: 0 5px 20px rgba(133, 76, 230, 0.4);
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #854CE6 0%, #4C6EF5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
`;

const StatsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 0 20px;
  margin-bottom: 60px;
`;

const StatCard = styled.div`
  background: rgba(133, 76, 230, 0.05);
  border: 1px solid rgba(133, 76, 230, 0.3);
  border-radius: 16px;
  padding: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    border-color: rgba(133, 76, 230, 0.6);
    box-shadow: 0 10px 40px rgba(133, 76, 230, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const PlatformIcon = styled.div`
  font-size: 40px;
  animation: ${glow} 2s ease-in-out infinite;
`;

const PlatformName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(133, 76, 230, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
`;

const StatValue = styled.span`
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, #854CE6 0%, #4C6EF5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProfileLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #854CE6 0%, #4C6EF5 100%);
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(133, 76, 230, 0.4);
  }
`;

const ContributionSection = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  border: 1px solid rgba(133, 76, 230, 0.3);
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 30px;
  text-align: center;
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 20px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(53, 12px);
  grid-template-rows: repeat(7, 12px);
  gap: 4px;
`;

const CalendarSquare = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${props => props.level === 0 ? '#161b22' : 
               props.level === 1 ? '#0e4429' :
               props.level === 2 ? '#006d32' :
               props.level === 3 ? '#26a641' : '#39d353'};
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.3);
    box-shadow: 0 0 10px ${props => props.level === 0 ? '#161b22' : '#39d353'};
  }
`;

const AchievementsSection = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  margin-bottom: 60px;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const AchievementCard = styled.div`
  background: linear-gradient(135deg, rgba(133, 76, 230, 0.1) 0%, rgba(76, 110, 245, 0.1) 100%);
  border: 1px solid rgba(133, 76, 230, 0.3);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(133, 76, 230, 0.3);
  }
`;

const AchievementIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const AchievementTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const AchievementDesc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const TickerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  margin: 60px 0;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 150px;
    height: 100%;
    z-index: 2;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, ${({ theme }) => theme.bg}, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, ${({ theme }) => theme.bg}, transparent);
  }
`;

const TickerContent = styled.div`
  display: flex;
  animation: ${scroll} 40s linear infinite;
  width: fit-content;
`;

const TickerItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 50px;
  white-space: nowrap;
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  
  &::before {
    content: '${props => props.icon}';
    margin-right: 10px;
    font-size: 20px;
  }
`;

const StatsPage = () => {
  const navigate = useNavigate();

  const generateContributionData = () => {
    const data = [];
    for (let week = 0; week < 53; week++) {
      for (let day = 0; day < 7; day++) {
        const random = Math.random();
        let level = 0;
        if (random > 0.7) level = Math.floor(Math.random() * 4) + 1;
        data.push(level);
      }
    }
    return data;
  };

  const contributionData = generateContributionData();

  const platformStats = [
    {
      name: 'GitHub',
      icon: '⚡',
      stats: {
        'Total Repositories': '45+',
        'Total Stars': '180+',
        'Total Commits': '1,200+',
        'Contributions (2024)': '850+',
        'Longest Streak': '47 days',
        'Current Streak': '15 days'
      },
      link: 'https://github.com/Panchadip-128'
    },
    {
      name: 'LeetCode',
      icon: '💡',
      stats: {
        'Problems Solved': '250+',
        'Contest Rating': '1650',
        'Global Ranking': 'Top 15%',
        'Easy': '120',
        'Medium': '95',
        'Hard': '35'
      },
      link: 'https://leetcode.com/Panchadip-128'
    },
    {
      name: 'GeeksforGeeks',
      icon: '🎯',
      stats: {
        'Problems Solved': '300+',
        'Coding Score': '1850',
        'Institute Rank': '25',
        'Contest Participated': '15+',
        'Articles Written': '8',
        'Monthly Rank': 'Top 5%'
      },
      link: 'https://auth.geeksforgeeks.org/user/Panchadip-128'
    },
    {
      name: 'CodeChef',
      icon: '🏆',
      stats: {
        'Current Rating': '1742 (3⭐)',
        'Highest Rating': '1820',
        'Problems Solved': '180+',
        'Global Rank': '15,450',
        'Country Rank': '3,200',
        'Contests': '25+'
      },
      link: 'https://www.codechef.com/users/panchadip_128'
    },
    {
      name: 'Codeforces',
      icon: '🚀',
      stats: {
        'Current Rating': '1450',
        'Max Rating': '1550',
        'Problems Solved': '150+',
        'Contests': '20+',
        'Rank': 'Specialist',
        'Contribution': '+15'
      },
      link: 'https://codeforces.com/profile/Panchadip-128'
    },
    {
      name: 'HackerRank',
      icon: '💻',
      stats: {
        'Problem Solving': '⭐⭐⭐⭐⭐',
        'Python': '⭐⭐⭐⭐⭐',
        'C++': '⭐⭐⭐⭐',
        'SQL': '⭐⭐⭐⭐⭐',
        'Badges': '45+',
        'Certificates': '12'
      },
      link: 'https://www.hackerrank.com/Panchadip_128'
    }
  ];

  const achievements = [
    { icon: '🏆', title: 'Top Contributor', desc: 'GSSoC 2024 - Ranked in Top 100' },
    { icon: '⭐', title: 'Star Coder', desc: '1000+ commits in 2024' },
    { icon: '🎖️', title: 'Problem Solver', desc: '1000+ problems across platforms' },
    { icon: '🔥', title: 'Streak Master', desc: '47 days longest coding streak' },
    { icon: '🌟', title: 'Open Source', desc: '30+ PRs merged in 2024' },
    { icon: '📚', title: 'Knowledge Sharer', desc: '15+ technical articles published' },
    { icon: '🎯', title: 'Contest Expert', desc: '85+ coding contests participated' },
    { icon: '💎', title: 'Code Quality', desc: 'Maintained 95%+ code quality' }
  ];

  const tickerItems = [
    { text: 'Full Stack Development', icon: '💻' },
    { text: 'Machine Learning', icon: '🤖' },
    { text: 'Competitive Programming', icon: '🏆' },
    { text: 'Open Source Contributor', icon: '🌟' },
    { text: 'Problem Solving Expert', icon: '🎯' },
    { text: 'Data Structures & Algorithms', icon: '📊' },
    { text: 'System Design', icon: '🏗️' },
    { text: 'Web3 & Blockchain', icon: '⛓️' }
  ];

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        ← Back to Portfolio
      </BackButton>
      
      <Header>
        <Title>Coding Statistics & Achievements</Title>
        <Subtitle>
          Comprehensive overview of my coding journey across multiple platforms
        </Subtitle>
      </Header>

      <TickerContainer>
        <TickerContent>
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <TickerItem key={index} icon={item.icon}>
              {item.text}
            </TickerItem>
          ))}
        </TickerContent>
      </TickerContainer>

      <StatsGrid>
        {platformStats.map((platform, index) => (
          <StatCard key={index}>
            <CardHeader>
              <PlatformIcon>{platform.icon}</PlatformIcon>
              <PlatformName>{platform.name}</PlatformName>
            </CardHeader>
            
            {Object.entries(platform.stats).map(([label, value], idx) => (
              <StatsRow key={idx}>
                <StatLabel>{label}</StatLabel>
                <StatValue>{value}</StatValue>
              </StatsRow>
            ))}
            
            <ProfileLink href={platform.link} target="_blank" rel="noopener noreferrer">
              View Profile →
            </ProfileLink>
          </StatCard>
        ))}
      </StatsGrid>

      <ContributionSection>
        <SectionTitle>GitHub Contribution Graph</SectionTitle>
        <CalendarWrapper>
          <CalendarGrid>
            {contributionData.map((level, index) => (
              <CalendarSquare key={index} level={level} />
            ))}
          </CalendarGrid>
        </CalendarWrapper>
      </ContributionSection>

      <AchievementsSection>
        <SectionTitle>Achievements & Milestones</SectionTitle>
        <AchievementGrid>
          {achievements.map((achievement, index) => (
            <AchievementCard key={index}>
              <AchievementIcon>{achievement.icon}</AchievementIcon>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementDesc>{achievement.desc}</AchievementDesc>
            </AchievementCard>
          ))}
        </AchievementGrid>
      </AchievementsSection>
    </Container>
  );
};

export default StatsPage;
