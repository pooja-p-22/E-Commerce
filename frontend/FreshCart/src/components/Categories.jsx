// Categories.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { categoryAPI } from "../services/api";

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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #7f8c8d;
  width: 100%;
`;

const ErrorMessage = styled.div`
  padding: 1.5rem 2rem;
  border-radius: 12px;
  background-color: #fee;
  color: #c00;
  border: 1px solid #fcc;
  font-size: 1rem;
  margin: 2rem;
`;

// Fallback categories in case API fails
const defaultCategories = [
  { id: "grocery", title: "Grocery", bg: "/Grocery-Bg2.jpg", path: "/products?category=grocery" },
  { id: "dairy", title: "Dairy", bg: "/DiaryBg.jpg", path: "/products?category=dairy" },
  { id: "fruits", title: "Fruits", bg: "/Fruits-Bg.jpg", path: "/products?category=fruits" },
  { id: "vegetables", title: "Vegetables", bg: "/Grocery-Bg.jpg", path: "/products?category=vegetables" },
  { id: "snacks", title: "Snacks", bg: "/Snacks-Bg.jpg", path: "/products?category=snacks" }
];

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryAPI.getCategories();
        if (data && data.length > 0) {
          // Map backend categories to display format
          const mappedCategories = data.map(cat => ({
            id: cat._id,
            title: cat.name,
            bg: cat.image || "/Grocery-Bg.jpg",
            path: `/products?category=${cat.slug || cat.name.toLowerCase()}`
          }));
          setCategories(mappedCategories);
        } else {
          setCategories(defaultCategories);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        // Use default categories as fallback
        setCategories(defaultCategories);
        setError("Using default categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <PageContainer>
      <Navbar />
      {loading && <LoadingMessage>Loading categories...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && categories.map(cat => (
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
