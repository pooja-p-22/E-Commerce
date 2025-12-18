import React from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartContainer = styled.div`
  min-height: 100vh;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fa;

  @media (max-width: 1024px) {
    padding: 2.5rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const CartHeading = styled.h1`
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

const EmptyMessage = styled.p`
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #7f8c8d;
  padding: 2rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
    font-size: 1rem;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 150px 80px;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: 90px 1fr 130px 70px;
    gap: 1rem;
    padding: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 1rem;
    gap: 0.75rem;
  }
`;

const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 1024px) {
    width: 90px;
    height: 90px;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: clamp(0.95rem, 2vw, 1.25rem);
    margin: 0 0 0.5rem 0;
    color: #2c3e50;

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  p {
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    margin: 0;
    color: #27ae60;
    font-weight: bold;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  span {
    font-weight: bold;
    color: #2c3e50;
    min-width: 30px;
    text-align: center;
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  background: ${props => props.danger ? '#e74c3c' : '#3498db'};
  color: white;
  border: none;
  padding: 0.5rem 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: clamp(0.8rem, 1vw, 0.95rem);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
`;

const Total = styled.div`
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: bold;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const CheckoutButton = styled.button`
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 1.25rem 2rem;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
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
    padding: 1rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1.25rem;
    font-size: 1rem;
  }
`;

const Cart = () => {
  const { cartItems, updateQuantity } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContainer>
      <CartHeading>Shopping Cart</CartHeading>
      {cartItems.length === 0 ? (
        <EmptyMessage>
          Your cart is empty
        </EmptyMessage>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <CartItemImage src={item.img} alt={item.name} />
              <CartItemInfo>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </CartItemInfo>
              <QuantityControls>
                <Button onClick={() => updateQuantity(item.id, item.qty - 1)}>−</Button>
                <span>{item.qty}</span>
                <Button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</Button>
              </QuantityControls>
              <Button danger onClick={() => updateQuantity(item.id, 0)}>Remove</Button>
            </CartItem>
          ))}
          <Total>Total: ${total.toFixed(2)}</Total>
          <CheckoutButton onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </CheckoutButton>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
