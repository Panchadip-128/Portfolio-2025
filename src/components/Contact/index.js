import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const moveGrid = keyframes`
  0% {
    background-position: 0 0, 0 0;
  }
  100% {
    background-position: 60px 60px, -60px -60px;
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding-bottom: 60px;
  /* Removed hard background color to blend with Wrapper */
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle, rgba(133, 76, 230, 0.15) 1px, transparent 1px),
      radial-gradient(circle, rgba(76, 110, 245, 0.1) 1px, transparent 1px);
    background-size: 20px 20px, 40px 40px;
    background-position: 0 0, 10px 10px;
    animation: ${moveGrid} 25s linear infinite;
    opacity: 0.7;
    z-index: 0;
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 150px, black calc(100% - 150px), transparent);
    mask-image: linear-gradient(to bottom, transparent, black 150px, black calc(100% - 150px), transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(38.73deg, rgba(204, 0, 187, 0.08) 0%, rgba(201, 32, 184, 0) 50%), 
      linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.08) 100%);
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 960px) {
    padding: 0px;
    padding-bottom: 40px;
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
  padding: 0px 0px 80px 0px;
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

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const AlertBox = styled.div`
  margin-top: 20px;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: ${({ success }) => (success ? "green" : "red")};
  text-align: center;
`;

const Contact = () => {
  const [alert, setAlert] = useState(null); // State for success/error message
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const fromEmail = formData.get("from_email");
    const fromName = formData.get("from_name");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!fromEmail || !fromName || !subject || !message) {
      setAlert({ message: "All fields are required.", success: false });
      return;
    }

    const lastContactSubmission = localStorage.getItem('lastContactSubmission');
    if (lastContactSubmission) {
      const now = new Date().getTime();
      const lastTime = parseInt(lastContactSubmission, 10);
      if (now - lastTime < 60000) {
        setAlert({ message: "Rate limit exceeded. Please wait 60 seconds before sending another message.", success: false });
        return;
      }
    }

    const emailData = {
      to: "panchadip125@gmail.com",
      subject: subject,
      body: `
        <p><strong>Name:</strong> ${fromName}</p>
        <p><strong>Email:</strong> ${fromEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    try {
      const response = await fetch("https://api.useplunk.com/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_PLUNK_API_KEY}`,
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        localStorage.setItem('lastContactSubmission', new Date().getTime().toString());
        setAlert({ message: "Email sent successfully!", success: true });
        form.current.reset();
      } else {
        setAlert({ message: "Failed to send email. Please try again.", success: false });
      }
    } catch (error) {
      setAlert({ message: "An error occurred while sending the email.", success: false });
    }

    // Clear the alert after 6 seconds
    setTimeout(() => setAlert(null), 6000);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Reach out to me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" required />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage placeholder="Message" rows="4" name="message" required />
          <ContactButton type="submit" value="Send" />
        </ContactForm>

        {/* Alert Box */}
        {alert && <AlertBox success={alert.success}>{alert.message}</AlertBox>}
      </Wrapper>
    </Container>
  );
};

export default Contact;