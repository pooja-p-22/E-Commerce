import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import Categories from './Categories';

const DashboardContainer = styled.div`
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/Grocery-Bg.jpg') center/cover;
    opacity: 0.1;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;



const CustomerDashboard = () => {
  const { user } = useAuth();


  return (
    <DashboardContainer>
      <Navbar />
      
      <HeroSection>
        <WelcomeTitle>Welcome back, {user?.name || 'Valued Customer'}!</WelcomeTitle>
        <WelcomeSubtitle>
          Discover fresh groceries, organic produce, and daily essentials delivered right to your doorstep in Coimbatore.
        </WelcomeSubtitle>
      </HeroSection>



      <Categories />
    </DashboardContainer>
  );
};

export default CustomerDashboard;