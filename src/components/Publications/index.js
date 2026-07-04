import React from 'react';
import styled from 'styled-components';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { publications } from '../../data/constants';
import { EventRounded, BusinessRounded } from '@mui/icons-material';
import { Avatar, AvatarGroup } from '@mui/material';
import hero_img from '../../images/HeroImage.jpg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 40px 0px 80px 0px;
    @media (max-width: 960px) {
        padding: 0px;
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
    padding: 40px 0px 100px 0px;
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

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 32px;
    width: 100%;
    margin-top: 40px;
    padding: 40px 20px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 40px 16px;
    }
`;

const PublicationCard = styled(motion.div)`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 16px;
    padding: 24px;
    height: 100%;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    cursor: pointer;
    
    &:hover {
        transform: translateY(-5px);
        border-color: ${({ theme }) => theme.primary}80;
        box-shadow: 0 0 30px rgba(133, 76, 230, 0.5);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 16px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.1);
`;

const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const Badge = styled.div`
    background-color: ${({ theme }) => theme.primary}20;
    color: ${({ theme }) => theme.primary};
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid ${({ theme }) => theme.primary}50;
`;

const Year = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
`;

const PubTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 12px;
    line-height: 1.4;
    transition: color 0.3s ease;
    
    ${PublicationCard}:hover & {
        color: ${({ theme }) => theme.primary};
    }
`;

const Conference = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 16px;
    line-height: 1.5;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const Authors = styled.div`
    font-size: 13px;
    color: ${({ theme }) => theme.text_secondary + 99};
    line-height: 1.6;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const PubDescription = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.6;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
`;

const ViewButton = styled.a`
    align-self: flex-start;
    padding: 8px 20px;
    background: transparent;
    color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${({ theme }) => theme.primary};
        color: #fff;
        box-shadow: 0 0 15px ${({ theme }) => theme.primary}80;
    }
`;

const Publications = ({ openPubModal, setOpenPubModal }) => {
    return (
        <Container id="publications">
            <Wrapper>
                <Title>Publications</Title>
                <Desc>
                    My research papers and academic publications across various IEEE conferences and journals.
                </Desc>
                <Grid>
                    {publications.map((pub, index) => (
                        <Tilt 
                            key={index}
                            tiltMaxAngleX={5}
                            tiltMaxAngleY={5}
                            perspective={1000}
                            scale={1.02}
                            transitionSpeed={1000}
                            glareEnable={true}
                            glareMaxOpacity={0.15}
                            glareColor="#ffffff"
                            style={{ height: '100%' }}
                        >
                            <PublicationCard
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.1 }}
                                onClick={() => setOpenPubModal({ state: true, pub: pub })}
                            >
                                {pub.image && <Image src={pub.image} alt={pub.title} />}
                                <HeaderSection>
                                    <Badge>{pub.publisher || "IEEE"}</Badge>
                                    <Year>
                                        <EventRounded style={{ fontSize: '14px', marginRight: '4px', verticalAlign: 'middle' }} />
                                        {pub.year}
                                    </Year>
                                </HeaderSection>
                                <PubTitle>{pub.title}</PubTitle>
                                <Conference>
                                    <BusinessRounded style={{ fontSize: '16px' }} />
                                    {pub.conference}
                                </Conference>
                                <Authors>
                                    <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '12px', border: '1px solid #854CE6' } }}>
                                        {pub.authors.split(/;|,(?!\s*et al)/).map(a => a.trim()).map((author, idx) => (
                                            <Avatar key={idx} alt={author} src={author.includes("Panchadip") ? hero_img : (idx % 2 === 0 ? "https://www.w3schools.com/howto/img_avatar.png" : "https://www.w3schools.com/howto/img_avatar2.png")} />
                                        ))}
                                    </AvatarGroup>
                                    <span style={{ marginLeft: '4px' }}>{pub.authors}</span>
                                </Authors>
                                {pub.description && (
                                    <PubDescription>
                                        {pub.description}
                                    </PubDescription>
                                )}
                                {pub.link && (
                                    <ViewButton 
                                        href={pub.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View Paper
                                    </ViewButton>
                                )}
                            </PublicationCard>
                        </Tilt>
                    ))}
                </Grid>
            </Wrapper>
        </Container>
    );
};

export default Publications;
