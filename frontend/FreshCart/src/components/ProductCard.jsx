import React from 'react';
import styled from 'styled-components';
import { useCart } from './CartContext';

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }

  @media (max-width: 768px) {
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 25px rgba(0,0,0,0.12);
    }
  }

  @media (max-width: 480px) {
    border-radius: 10px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 160px;
  }

  @media (max-width: 480px) {
    height: 140px;
  }
`;

const ProductInfo = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

const ProductName = styled.h3`
  font-size: clamp(0.875rem, 2vw, 1.1rem);
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;

  @media (max-width: 480px) {
    margin: 0 0 0.35rem 0;
    font-size: 0.95rem;
  }
`;

const Price = styled.span`
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 0.75rem;

  @media (max-width: 480px) {
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
  }
`;

const AddButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover { 
    background: linear-gradient(45deg, #2980b9, #3498db);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.75rem;
    font-size: 0.875rem;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <Card>
      <ProductImage src={product.img} alt={product.name} />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <Price>${product.price}</Price>
        <AddButton onClick={() => addToCart(product)}>
          Add to Cart
        </AddButton>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;
