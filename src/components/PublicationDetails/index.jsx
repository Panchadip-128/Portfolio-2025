import { CloseRounded, EventRounded, BusinessRounded } from '@mui/icons-material';
import { Modal, Avatar, AvatarGroup, IconButton } from '@mui/material';
import hero_img from '../../images/HeroImage.jpg';
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: center;
justify-content: center;
overflow-y: auto;
padding: 20px 0;
transition: all 0.5s ease;
`;

const Wrapper = styled.div`
max-width: 800px;
width: 100%;
border-radius: 16px;
margin: auto 12px;
height: min-content;
max-height: 90vh;
overflow-y: auto;
background-color: ${({ theme }) => theme.card};
color: ${({ theme }) => theme.text_primary};
padding: 20px;
display: flex;
flex-direction: column;
position: relative;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px 0px 6px;
  @media only screen and (max-width: 600px) {
      font-size: 24px;
      margin: 6px 6px 0px 6px;
  }
`;

const Date = styled.div`
    font-size: 16px;
    margin: 4px 6px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    display: flex;
    align-items: center;
    gap: 6px;
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`;

const Conference = styled.div`
    font-size: 16px;
    margin: 4px 6px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    display: flex;
    align-items: center;
    gap: 6px;
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`;

const Desc = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary};
    margin: 16px 6px;
    line-height: 1.5;
    @media only screen and (max-width: 600px) {
        font-size: 14px;
        margin: 12px 6px;
    }
`;

const Authors = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    margin: 8px 6px;
    display: flex;
    align-items: center;
    gap: 6px;
    @media only screen and (max-width: 600px) {
        font-size: 12px;
        margin: 6px 6px;
    }
`;

const Image = styled.img`
    width: 100%;
    max-height: 220px;
    object-fit: contain;
    border-radius: 12px;
    margin-top: 30px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    @media only screen and (max-width: 600px) {
        max-height: 200px;
        margin-top: 20px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 12px 0px;
    gap: 12px;
`;

const Button = styled.a`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  padding: 12px 16px;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary}99;
    color: ${({ theme }) => theme.white};
  }

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const PublicationDetails = ({ openModal, setOpenModal }) => {
    const pub = openModal?.pub;
    return (
        <Modal open={true} onClose={() => setOpenModal({ state: false, pub: null })}>
            <Container onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setOpenModal({ state: false, pub: null });
                }
            }}>
                <Wrapper>
                    <IconButton 
                        sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 1000, color: "inherit", backgroundColor: "rgba(0,0,0,0.2)" }}
                        onClick={() => setOpenModal({ state: false, pub: null })}
                    >
                        <CloseRounded />
                    </IconButton>
                    {pub?.image && <Image src={pub?.image} />}
                    <Title>{pub?.title}</Title>
                    <Date>
                        <EventRounded style={{ fontSize: '18px' }} />
                        {pub?.year}
                    </Date>
                    <Conference>
                        <BusinessRounded style={{ fontSize: '18px' }} />
                        {pub?.conference}
                    </Conference>
                    <Authors>
                        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '14px', border: '1px solid #854CE6' } }}>
                            {pub?.authors?.split(/;|,(?!\s*et al)/).map(a => a.trim()).map((author, idx) => (
                                <Avatar key={idx} alt={author} src={author.includes("Panchadip") ? hero_img : (idx % 2 === 0 ? "https://www.w3schools.com/howto/img_avatar.png" : "https://www.w3schools.com/howto/img_avatar2.png")} />
                            ))}
                        </AvatarGroup>
                        <span style={{ marginLeft: '6px', fontSize: '16px' }}>{pub?.authors}</span>
                    </Authors>
                    <Desc>{pub?.description}</Desc>
                    <ButtonGroup>
                        <Button href={pub?.link} target='_blank'>View Paper</Button>
                    </ButtonGroup>
                </Wrapper>
            </Container>

        </Modal>
    )
}

export default PublicationDetails
