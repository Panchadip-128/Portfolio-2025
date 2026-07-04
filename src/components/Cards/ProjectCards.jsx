import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { EventRounded } from '@mui/icons-material';


const Button = styled.button`
    display: none;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_black};
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.8s ease-in-out;
`
const Card = styled(motion.div)`
    width: 330px;
    height: 490px;
    background-color: ${({ theme }) => theme.card};
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    transition: all 0.5s ease-in-out;
    &:hover {
        box-shadow: 0 0 50px 4px rgba(133, 76, 230, 0.4);
        filter: brightness(1.1);
        border-color: rgba(133, 76, 230, 0.5);
    }
    &:hover ${Button} {
        display: block;
    }
`

const TiltWrapper = styled(Tilt)`
    width: 100%;
    height: 100%;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
`

const Image = styled.img`
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
`

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Description = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`

const Members = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
`
const Avatar = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-left: -10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 3px solid ${({ theme }) => theme.card};
`

const ProjectCards = ({project,setOpenModal}) => {
    return (
        <Card 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpenModal({state: true, project: project})}
        >
            <TiltWrapper
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#854CE6"
                glarePosition="all"
                glareBorderRadius="10px"
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                scale={1.03}
                transitionSpeed={2000}
            >
                {project.image && <Image src={project.image}/>}
                <Tags>
                    {project.tags?.map((tag, index) => (
                    <Tag>{tag}</Tag>
                    ))}
                </Tags>
                <Details>
                    <Title>{project.title}</Title>
                    <Date>
                        <EventRounded style={{ fontSize: '14px' }} />
                        {project.date}
                    </Date>
                    <Description>{project.description}</Description>
                </Details>
                <Members>
                    {project.member?.map((member) => (
                        <Avatar src={member.img}/>
                    ))}
                </Members>
                {/* <Button>View Project</Button> */}
            </TiltWrapper>
        </Card>
    )
}

export default ProjectCards