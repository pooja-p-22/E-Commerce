import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), 
              url("/Grocery-Bg.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.5rem;
    background-attachment: scroll;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const Title = styled.h1`

  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  letter-spacing: 1px;

color: #b9fff3;
text-shadow:
  0 0 6px rgba(185, 255, 243, 0.9),
  0 0 14px rgba(78, 205, 196, 0.7);
  background: linear-gradient(45deg, #cb7777ff, #4cc9c1ff, #45B7D1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
  letter-spacing: 1px;

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 6vw, 3rem);
  }
`;

const EnterButton = styled.button`
  background: linear-gradient(45deg, #cb7777ff, #4cc9c1ff, #45B7D1);
  
  border: none;
  padding: 1rem 2.5rem;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  min-width: 200px;

  &:hover { 
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(0,0,0,0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 2rem;
    min-width: 160px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    min-width: 140px;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <LandingContainer>
      <Title>FreshCart</Title>
      <EnterButton onClick={() => navigate('/dashboard')}>
        Shop Now
      </EnterButton>
    </LandingContainer>
  );
};

export default LandingPage;
