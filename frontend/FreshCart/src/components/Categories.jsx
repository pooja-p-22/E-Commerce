// Categories.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// const PageContainer = styled.div`
//   margin-top: 80px;                 
//   min-height: 100vh;
//   background: #000;                 
//   overflow-y: auto;                 
// `;

const PageContainer = styled.div`
  margin-top: 80px;
  min-height: 100vh;
  background: #fff;
  overflow-y: hidden;   /* remove vertical scrollbar */

  /* hide scrollbar (extra safety) */
  scrollbar-width: none;        /* Firefox */
  -ms-overflow-style: none;     /* IE/Edge */

  &::-webkit-scrollbar {
    display: none;              /* Chrome/Safari */
  }
`;


const CategorySection = styled.section`
  width: 100%;                      /* take full horizontal width */
  min-height: 90vh;                /* each section = 1 full viewport height */
  display: flex;
  align-items: stretch;
  padding: 1.5rem; 
`;


// const CategoryBg = styled.div`
//   flex: 1;                          /* fill whole width of section */
//   background: linear-gradient(
//       rgba(0,0,0,0.4),
//       rgba(0,0,0,0.6)
//     ),
//     url(${props => props.bg});
//   background-size: cover;
//   background-position: center;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   padding: 2rem;
// `;

const CategoryBg = styled.div`
  flex: 1;
  background: linear-gradient(
      rgba(0,0,0,0.4),
      rgba(0,0,0,0.6)
    ),
    url(${props => props.bg});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
  padding: 2rem;

  border-radius: 20px;          /* rounded edges */
  cursor: pointer;

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);     /* optional premium effect */
  }
`;


const CategoryTitle = styled.h3`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 900;
  margin-bottom: 0.5rem;
`;

const CategorySubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const categories = [
  { id: "grocery",    title: "Grocery",    bg: "/Grocery-Bg2.jpg", path: "/products?category=grocery" },
  { id: "dairy",      title: "Dairy",      bg: "/DiaryBg.jpg",     path: "/products?category=dairy" },
  { id: "fruits",     title: "Fruits",     bg: "/Fruits-Bg.jpg",   path: "/products?category=fruits" },
  { id: "vegetables", title: "Vegetables", bg: "/Grocery-Bg.jpg",  path: "/products?category=vegetables" },
  { id: "snacks",     title: "Snacks",     bg: "/Snacks-Bg.jpg",   path: "/products?category=snacks" }
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Navbar />
      {categories.map(cat => (
        <CategorySection key={cat.id} onClick={() => navigate(cat.path)}>
          <CategoryBg bg={cat.bg}>
            <CategoryTitle>{cat.title}</CategoryTitle>
            <CategorySubtitle>Shop fresh & delicious</CategorySubtitle>
          </CategoryBg>
        </CategorySection>
      ))}
    </PageContainer>
  );
};

export default Categories;
