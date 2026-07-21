import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCommentAlt, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px); /* Adjusting for navbar */
  padding: 40px 20px;
  position: relative;
  z-index: 1;
  
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
    opacity: 0.7;
    z-index: -1;
    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  }
`;

const BackButton = styled.button`
  align-self: flex-start;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    transform: translateX(-5px);
  }
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.card};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid ${({ theme }) => theme.primary}30;
  animation: ${fadeIn} 0.5s ease;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 16px;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  font-weight: 500;
`;

const Input = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary}60;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 14px 16px;
  transition: all 0.2s ease;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}80;
  }
`;

const Select = styled.select`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary}60;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 14px 16px;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 18px;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
  }
  
  option {
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const TextArea = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary}60;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 14px 16px;
  resize: vertical;
  min-height: 140px;
  transition: all 0.2s ease;
  
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}30;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}80;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  
  &:hover {
    transform: ${(props) => (props.disabled ? 'none' : 'translateY(-3px)')};
    box-shadow: ${(props) => (props.disabled ? 'none' : '0 6px 20px rgba(133, 76, 230, 0.4)')};
  }
`;

const AlertMessage = styled.div`
  margin-top: 24px;
  padding: 16px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
  background-color: ${(props) => (props.success ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 71, 87, 0.15)')};
  color: ${(props) => (props.success ? '#2ed573' : '#ff4757')};
  border: 1px solid ${(props) => (props.success ? 'rgba(46, 213, 115, 0.3)' : 'rgba(255, 71, 87, 0.3)')};
`;

const FeedbackPage = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    const formData = new FormData(formRef.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const org = formData.get('organization');
    const role = formData.get('role');
    const testimonial = formData.get('testimonial');

    if (!name || !email || !role || !testimonial) {
      setAlert({ success: false, message: 'Please fill in all required fields.' });
      setLoading(false);
      return;
    }

    const lastFeedbackSubmission = localStorage.getItem('lastFeedbackSubmission');
    if (lastFeedbackSubmission) {
      const now = new Date().getTime();
      const lastTime = parseInt(lastFeedbackSubmission, 10);
      if (now - lastTime < 60000) { // 60 seconds
        setAlert({ success: false, message: 'Rate limit exceeded. Please wait 60 seconds before sending another feedback.' });
        setLoading(false);
        return;
      }
    }

    const emailData = {
      to: 'panchadip125@gmail.com',
      subject: `New Feedback from ${name} (${role})`,
      body: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #333;">New Feedback Received!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Organization:</strong> ${org || 'Not provided'}</p>
          <p><strong>Role:</strong> ${role}</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <h3 style="color: #555;">Message / Testimonial:</h3>
          <p style="white-space: pre-wrap; color: #444; line-height: 1.5;">${testimonial}</p>
        </div>
      `,
    };

    try {
      const response = await fetch('https://api.useplunk.com/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_PLUNK_API_KEY}`,
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        localStorage.setItem('lastFeedbackSubmission', new Date().getTime().toString());
        setAlert({ success: true, message: 'Thank you! Your feedback has been sent successfully.' });
        formRef.current.reset();
      } else {
        setAlert({ success: false, message: 'Failed to send feedback. Please try again later.' });
      }
    } catch (error) {
      setAlert({ success: false, message: 'An error occurred. Please try again.' });
    }

    setLoading(false);
    // Keep success message visible
    if (!alert || !alert.success) {
      setTimeout(() => setAlert(null), 6000);
    }
  };

  return (
    <PageContainer>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </BackButton>
      </div>
      
      <FormCard>
        <Title>
          <FaCommentAlt color="#DA22FF" /> Share Feedback
        </Title>
        <Description>
          I'd love to hear your thoughts, feedback, or a testimonial. Whether you're a mentee, coworker, or friend!
        </Description>
        
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Name *</Label>
            <Input type="text" name="name" placeholder="John Doe" required />
          </InputGroup>
          
          <InputGroup>
            <Label>Email *</Label>
            <Input type="email" name="email" placeholder="john@example.com" required />
          </InputGroup>

          <InputGroup>
            <Label>Organization (Optional)</Label>
            <Input type="text" name="organization" placeholder="Company or University" />
          </InputGroup>

          <InputGroup>
            <Label>Your Role *</Label>
            <Select name="role" required defaultValue="">
              <option value="" disabled hidden>Select your role...</option>
              <option value="Student / Mentee">Student / Mentee</option>
              <option value="Coworker / Colleague">Coworker / Colleague</option>
              <option value="Client / Employer">Client / Employer</option>
              <option value="Friend / Other">Friend / Other</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Message / Testimonial *</Label>
            <TextArea 
              name="testimonial" 
              placeholder="Share your experience working or interacting with me..." 
              required 
            />
          </InputGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <><FaSpinner className="fa-spin" style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
            ) : (
              'Submit Feedback'
            )}
          </SubmitButton>
          
          <style>
            {`
              @keyframes spin { 100% { transform: rotate(360deg); } }
            `}
          </style>
        </Form>

        {alert && (
          <AlertMessage success={alert.success}>
            {alert.message}
          </AlertMessage>
        )}
      </FormCard>
    </PageContainer>
  );
};

export default FeedbackPage;
