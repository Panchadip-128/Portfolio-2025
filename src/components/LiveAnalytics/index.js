import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaEye, FaGlobe, FaClock, FaChartLine, FaUsers, FaCode, FaArrowUp, FaMapMarkerAlt } from 'react-icons/fa';

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

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const countUp = keyframes`
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
`;

const Container = styled.div`
  background: linear-gradient(135deg, rgba(132, 59, 206, 0.05) 0%, rgba(0, 70, 209, 0.05) 100%);
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
  max-width: 1200px;
  gap: 40px;
  padding: 0 20px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  animation: ${fadeInUp} 0.6s ease-out;
  
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
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  animation: ${fadeInUp} 0.6s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const AnalyticsCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    border-color: ${({ theme }) => theme.primary}40;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  animation: ${pulse} 2s infinite;
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
  animation: ${countUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ isPositive }) => isPositive ? '#00ff88' : '#ff4757'};
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 15px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  border-radius: 4px;
  width: ${props => props.percentage}%;
  transition: width 2s ease-out;
  animation: ${countUp} 1s ease-out;
`;

const RealtimeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  margin-top: 15px;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00ff88;
    animation: ${pulse} 1s infinite;
  }
`;

const VisitorMap = styled.div`
  grid-column: 1 / -1;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, rgba(132, 59, 206, 0.1) 0%, rgba(0, 70, 209, 0.1) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '🌍';
    font-size: 60px;
    opacity: 0.3;
    animation: ${pulse} 3s infinite;
  }
`;

const LiveAnalytics = () => {
  const [stats, setStats] = useState({
    visitors: 0,
    countries: 0,
    avgTime: 0,
    bounceRate: 0,
    activeUsers: 0,
    techStack: 0
  });

  const [visitorLocations] = useState([
    'United States', 'India', 'United Kingdom', 'Germany', 'Canada', 'Australia'
  ]);

  useEffect(() => {
    // Simulate real-time data updates
    const updateStats = () => {
      setStats(prevStats => ({
        visitors: Math.min(prevStats.visitors + Math.floor(Math.random() * 5) + 1, 2847),
        countries: Math.min(prevStats.countries + (Math.random() > 0.8 ? 1 : 0), 45),
        avgTime: Math.min(prevStats.avgTime + Math.floor(Math.random() * 10), 245),
        bounceRate: Math.max(Math.min(prevStats.bounceRate + (Math.random() - 0.5) * 2, 35), 15),
        activeUsers: Math.floor(Math.random() * 8) + 1,
        techStack: Math.min(prevStats.techStack + (Math.random() > 0.9 ? 1 : 0), 15)
      }));
    };

    // Initial animation
    const animateInitialStats = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setStats({
          visitors: Math.floor((2847 * progress) / 100),
          countries: Math.floor((45 * progress) / 100),
          avgTime: Math.floor((245 * progress) / 100),
          bounceRate: Math.floor((25 * progress) / 100),
          activeUsers: Math.floor((5 * progress) / 100),
          techStack: Math.floor((15 * progress) / 100)
        });
        
        if (progress >= 100) {
          clearInterval(interval);
          // Start real-time updates
          setInterval(updateStats, 5000);
        }
      }, 50);
    };

    animateInitialStats();
  }, []);

  return (
    <Container id="analytics">
      <Wrapper>
        <Title>Live Portfolio Analytics</Title>
        <Subtitle>
          Real-time insights into portfolio engagement and visitor behavior
        </Subtitle>
        
        <DashboardGrid>
          <AnalyticsCard>
            <CardHeader>
              <CardIcon><FaEye /></CardIcon>
              <CardTitle>Total Views</CardTitle>
            </CardHeader>
            <StatValue>{stats.visitors.toLocaleString()}</StatValue>
            <StatLabel>Portfolio Visits</StatLabel>
            <TrendIndicator isPositive={true}>
              <FaArrowUp /> +12.5% this week
            </TrendIndicator>
            <ProgressBar>
              <ProgressFill percentage={Math.min((stats.visitors / 3000) * 100, 95)} />
            </ProgressBar>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardHeader>
              <CardIcon><FaGlobe /></CardIcon>
              <CardTitle>Global Reach</CardTitle>
            </CardHeader>
            <StatValue>{stats.countries}</StatValue>
            <StatLabel>Countries</StatLabel>
            <TrendIndicator isPositive={true}>
              <FaArrowUp /> +3 new countries
            </TrendIndicator>
            <ProgressBar>
              <ProgressFill percentage={Math.min((stats.countries / 50) * 100, 90)} />
            </ProgressBar>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardHeader>
              <CardIcon><FaClock /></CardIcon>
              <CardTitle>Avg. Session</CardTitle>
            </CardHeader>
            <StatValue>{Math.floor(stats.avgTime / 60)}:{(stats.avgTime % 60).toString().padStart(2, '0')}</StatValue>
            <StatLabel>Minutes:Seconds</StatLabel>
            <TrendIndicator isPositive={true}>
              <FaArrowUp /> +8.3% engagement
            </TrendIndicator>
            <ProgressBar>
              <ProgressFill percentage={Math.min((stats.avgTime / 300) * 100, 82)} />
            </ProgressBar>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardHeader>
              <CardIcon><FaChartLine /></CardIcon>
              <CardTitle>Bounce Rate</CardTitle>
            </CardHeader>
            <StatValue>{stats.bounceRate.toFixed(1)}%</StatValue>
            <StatLabel>Exit Rate</StatLabel>
            <TrendIndicator isPositive={false}>
              <FaArrowUp style={{transform: 'rotate(180deg)'}} /> -5.2% improved
            </TrendIndicator>
            <ProgressBar>
              <ProgressFill percentage={100 - stats.bounceRate} />
            </ProgressBar>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardHeader>
              <CardIcon><FaUsers /></CardIcon>
              <CardTitle>Active Now</CardTitle>
            </CardHeader>
            <StatValue>{stats.activeUsers}</StatValue>
            <StatLabel>Live Visitors</StatLabel>
            <RealtimeIndicator>
              Real-time data
            </RealtimeIndicator>
          </AnalyticsCard>

          <AnalyticsCard>
            <CardHeader>
              <CardIcon><FaCode /></CardIcon>
              <CardTitle>Tech Interest</CardTitle>
            </CardHeader>
            <StatValue>{stats.techStack}</StatValue>
            <StatLabel>Technologies Viewed</StatLabel>
            <TrendIndicator isPositive={true}>
              <FaArrowUp /> High engagement
            </TrendIndicator>
            <ProgressBar>
              <ProgressFill percentage={Math.min((stats.techStack / 20) * 100, 75)} />
            </ProgressBar>
          </AnalyticsCard>
        </DashboardGrid>

        <VisitorMap>
          <CardHeader>
            <CardIcon><FaMapMarkerAlt /></CardIcon>
            <CardTitle>Visitor Locations</CardTitle>
          </CardHeader>
          <MapContainer>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
                Top Visitor Locations
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                {visitorLocations.map((location, index) => (
                  <div key={location} style={{ 
                    padding: '10px', 
                    background: 'rgba(132, 59, 206, 0.1)', 
                    borderRadius: '8px',
                    animation: `${fadeInUp} 0.6s ease-out ${0.1 * index}s both`
                  }}>
                    {location}
                  </div>
                ))}
              </div>
            </div>
          </MapContainer>
        </VisitorMap>
      </Wrapper>
    </Container>
  );
};

export default LiveAnalytics;