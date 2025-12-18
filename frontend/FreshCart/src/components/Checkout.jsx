import React, { useState } from 'react';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
  min-height: 100vh;
  padding: 3rem 2rem;
  max-width: 700px;
  margin: 0 auto;
  background: #f8f9fa;

  @media (max-width: 1024px) {
    padding: 2.5rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const CheckoutHeading = styled.h1`
  text-align: center;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: 2.5rem;
  color: #2c3e50;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  margin-bottom: 1.25rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.875rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.65rem 0.75rem;
    margin-bottom: 0.875rem;
    font-size: 16px;
  }
`;

const PaymentSection = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }

  h3 {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: #2c3e50;
    margin: 0 0 1rem 0;

    @media (max-width: 480px) {
      margin: 0 0 0.75rem 0;
    }
  }
`;

const PaymentMethod = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const MethodButton = styled.button`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${props => props.active ? '#3498db' : '#e1e8ed'};
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: clamp(0.9rem, 1.5vw, 1rem);

  &:hover {
    border-color: #3498db;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    gap: 0.875rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 0.875rem;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 1.25rem;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(39, 174, 96, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(39, 174, 96, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    margin-top: 1.25rem;
    font-size: 1rem;
  }
`;

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  return (
    <CheckoutContainer>
      <CheckoutHeading>Checkout</CheckoutHeading>
      <Form>
        <Input placeholder="Full Name" required />
        <Input placeholder="Email" type="email" required />
        <Input placeholder="Address" required />
        
        <InputRow>
          <Input placeholder="City" required />
          <Input placeholder="ZIP Code" required />
        </InputRow>
        
        <PaymentSection>
          <h3>Payment Method</h3>
          <PaymentMethod>
            <MethodButton 
              type="button"
              active={paymentMethod === 'card'}
              onClick={() => setPaymentMethod('card')}
            >
              Card
            </MethodButton>
            <MethodButton 
              type="button"
              active={paymentMethod === 'paypal'}
              onClick={() => setPaymentMethod('paypal')}
            >
              PayPal
            </MethodButton>
          </PaymentMethod>
        </PaymentSection>
        
        <Input placeholder="Card Number" maxLength="19" required />
        <InputRow>
          <Input placeholder="MM/YY" maxLength="5" required />
          <Input placeholder="CVV" maxLength="3" required />
        </InputRow>
        
        <ConfirmButton type="submit">Confirm Payment</ConfirmButton>
      </Form>
    </CheckoutContainer>
  );
};

export default Checkout;
