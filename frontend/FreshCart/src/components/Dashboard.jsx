import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Categories from './Categories';

const DashboardContainer = styled.div`
  margin-top: 80px;
  min-height: calc(100vh - 80px);
`;

const WelcomeSection = styled.div`
  //background: linear-gradient(135deg, #66e6eaff 0%, #764ba2 100%);
  padding: 6rem 2rem;
  text-align: center;
  color: white;
  border-radius: 30px
`;

const WelcomeTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Navbar />
      <WelcomeSection>
        <WelcomeTitle>Welcome to FreshCart</WelcomeTitle>
        <p style={{fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto'}}>
          Discover the freshest groceries at your fingertips. Shop by category below.
        </p>
      </WelcomeSection>
      <Categories />
    </DashboardContainer>
  );
};

export default Dashboard;
