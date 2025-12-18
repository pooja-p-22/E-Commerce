import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }

  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

const CategorySection = styled.section`
  padding: 3rem 2rem;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;

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

const CategoryTitle = styled.h2`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin: 0 0 2rem 0;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 0 0 1.5rem 0;
  }

  @media (max-width: 480px) {
    margin: 0 0 1rem 0;
    font-size: clamp(1.25rem, 4vw, 2rem);
  }
`;

const CategoryBg = styled.div`
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), 
              url(${props => props.bg});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const categories = [
  { 
    id: 'dairy', 
    title: 'Dairy', 
    bg: '/DiaryBg.jpg', 
    products: [
      { id: 1, name: 'Fresh Milk', price: 2.99, img: '/milk.jpg' },
      { id: 2, name: 'Yogurt', price: 1.49, img: '/yogurt.jpg' },
      { id: 3, name: 'Cheese', price: 4.99, img: '/cheese.jpg' }
    ]
  },
  { 
    id: 'vegetables', 
    title: 'Vegetables', 
    bg: '/Grocery-Bg2.jpg', 
    products: [
      { id: 4, name: 'Tomatoes', price: 1.99, img: '/tomato.jpg' },
      { id: 5, name: 'Carrots', price: 0.99, img: '/carrot.jpg' },
      { id: 6, name: 'Lettuce', price: 1.29, img: '/lettuce.jpg' }
    ]
  },
  { 
    id: 'fruits', 
    title: 'Fruits', 
    bg: '/Fruits-Bg.jpg', 
    products: [
      { id: 7, name: 'Apples', price: 2.49, img: '/apple.jpg' },
      { id: 8, name: 'Bananas', price: 1.29, img: '/banana.jpg' },
      { id: 9, name: 'Oranges', price: 2.99, img: '/orange.jpg' }
    ]
  },
  { 
    id: 'snacks', 
    title: 'Snacks', 
    bg: '/Snacks-Bg.jpg', 
    products: [
      { id: 10, name: 'Chips', price: 2.99, img: '/chips.jpg' },
      { id: 11, name: 'Cookies', price: 3.49, img: '/cookies.jpg' },
      { id: 12, name: 'Nuts', price: 4.99, img: '/nuts.jpg' }
    ]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <DashboardContainer>
      {categories.map(category => (
        <CategorySection key={category.id}>
          <CategoryTitle>{category.title}</CategoryTitle>
          <CategoryBg bg={category.bg}>
            <Grid>
              {category.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          </CategoryBg>
        </CategorySection>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;
