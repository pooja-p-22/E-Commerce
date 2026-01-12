// src/components/ProductCard.jsx
import React from "react";
import styled from "styled-components";
import { useCart } from "./CartContext";

const Card = styled.div`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.16);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const Info = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Name = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
  color: #27ae60;
`;

const Tag = styled.span`
  font-size: 0.85rem;
  color: #95a5a6;
`;

const AddButton = styled.button`
  margin-top: 0.75rem;
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: #ffffff;
  transition: background 0.25s ease, transform 0.1s ease;

  &:hover {
    background: linear-gradient(45deg, #2980b9, #3498db);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

 
  const productId = product._id || product.id;
  const productName = product.name;
  const productPrice = product.unitPrice || product.price;
  // Handle backend images array or fallback to old format or default
  const productImage = (product.images && product.images.length > 0) 
    ? product.images[0] 
    : product.image || product.img || "/rice.jpg"; // fallback image
  const inStock = product.stockQuantity > 0;

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      img: productImage,
      qty: 1,
    });
  };

  return (
    <Card>
      <ProductImage src={productImage} alt={productName} />
      <Info>
        <Name>{productName}</Name>
        <PriceRow>
          <Price>₹{productPrice?.toFixed(2) || "0.00"}</Price>
          <Tag>{inStock ? "In stock" : "Out of stock"}</Tag>
        </PriceRow>
        <AddButton 
          onClick={handleAddToCart}
          disabled={!inStock}
          style={{ opacity: inStock ? 1 : 0.5, cursor: inStock ? 'pointer' : 'not-allowed' }}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </AddButton>
      </Info>
    </Card>
  );
};

export default ProductCard;
