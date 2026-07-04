import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { WorkRounded, BusinessRounded, EventRounded } from '@mui/icons-material';

const Document = styled.img`
    display: none;
    height: 70px;
    width: fit-content;
    background-color: #000;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

const ReportButton = styled.a`
    display: none;
    height: 40px;
    background-color: transparent;
    border: 1.5px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    padding: 8px 16px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(133, 76, 230, 0.2);
    
    &:hover {
        background-color: ${({ theme }) => theme.primary};
        color: #fff;
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(133, 76, 230, 0.5);
    }
`;

const DocumentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
`;

const Description = styled.div`
    width: 100%;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 10px;
    @media only screen and (max-width: 768px) {
        font-size: 13px;
    }
`;

const Span = styled.span`
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    transition: all 0.3s ease;
`;

const Card = styled(motion.div)`
    width: 650px;
    border-radius: 16px;
    position: relative;
    transition: all 0.3s ease-in-out;
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    backdrop-filter: blur(10px);
    
    &:hover {
        border-color: ${({ theme }) => theme.primary}50;
        box-shadow: 0 10px 50px -10px rgba(133,76,230,0.5);
    }
    @media only screen and (max-width: 768px) {
        width: 320px;
    }

    &:hover ${Document} {
        display: flex;
    }
    &:hover ${ReportButton} {
        display: flex;
    }
    &:hover ${Span} {
        overflow: visible;
        -webkit-line-clamp: unset;
    }
`;

const TiltWrapper = styled(Tilt)`
    width: 100%;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    @media only screen and (max-width: 768px) {
        padding: 16px;
        gap: 12px;
    }
`;

const Top = styled.div`
    width: 100%;
    display: flex;
    gap: 16px;
    align-items: center;
`;

const Image = styled.img`
    height: 56px;
    width: 56px;
    object-fit: contain;
    background-color: #fff;
    border-radius: 12px;
    padding: 4px;
    @media only screen and (max-width: 768px) {
        height: 48px;
        width: 48px;
    }
`;

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Role = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    align-items: center;
    gap: 6px;
    @media only screen and (max-width: 768px) {
        font-size: 16px;
    }
`;

const Company = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
    @media only screen and (max-width: 768px) {
        font-size: 13px;
    }
`;

const Date = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
    @media only screen and (max-width: 768px) {
        font-size: 11px;
    }
`;

const Skills = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const Skill = styled.div`
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.bgLight};
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.border};
    @media only screen and (max-width: 768px) {
        font-size: 11px;
    }
`;

const ExperienceCard = ({ experience }) => {
    return (
        <Card
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <TiltWrapper
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#854CE6"
                glarePosition="all"
                glareBorderRadius="16px"
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.02}
                transitionSpeed={2000}
            >
                <Top>
                    <Image src={experience.img} />
                    <Body>
                        <Role>
                            <WorkRounded style={{ fontSize: '18px' }} />
                            {experience.role}
                        </Role>
                        <Company>
                            <BusinessRounded style={{ fontSize: '16px' }} />
                            {experience.company}
                        </Company>
                        <Date>
                            <EventRounded style={{ fontSize: '14px' }} />
                            {experience.date}
                        </Date>
                    </Body>
                </Top>
                <Description>
                    {experience?.desc && <Span>{experience?.desc}</Span>}
                    {experience?.skills && (
                        <Skills>
                            <ItemWrapper>
                                {experience?.skills?.map((skill, index) => (
                                    <Skill key={index}>{skill}</Skill>
                                ))}
                            </ItemWrapper>
                        </Skills>
                    )}
                </Description>
                {(experience.doc || experience.report_link) && (
                    <DocumentWrapper>
                        {experience.doc && (
                            <a href={experience.doc} target="_blank" rel="noopener noreferrer">
                                <Document src={experience.doc} />
                            </a>
                        )}
                        {experience.report_link && (
                            <ReportButton href={experience.report_link} target="_blank" rel="noopener noreferrer">
                                {experience.report_button_text || "View Report"}
                            </ReportButton>
                        )}
                    </DocumentWrapper>
                )}
            </TiltWrapper>
        </Card>
    );
};

export default ExperienceCard;