import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { productAPI } from "../services/api";

const ProductsContainer = styled.div`
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  background: #f8f9fa;
  padding: 4rem 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #7f8c8d;
`;

const ErrorMessage = styled.div`
  padding: 1.5rem 2rem;
  border-radius: 12px;
  background-color: #fee;
  color: #c00;
  border: 1px solid #fcc;
  font-size: 1rem;
  margin: 2rem auto;
  max-width: 1400px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  font-size: 1.1rem;
  color: #7f8c8d;
`;

// Fallback data for categories
const categoryNames = {
  grocery: "Grocery Essentials",
  dairy: "Dairy Products",
  fruits: "Fresh Fruits",
  vegetables: "Fresh Vegetables",
  snacks: "Snacks & Treats",
  beverages: "Fresh Beverages"
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const categoryKey = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        if (categoryKey) {
          // Fetch all products and filter by category
          const allProducts = await productAPI.getProductsByCategory(categoryKey);
          setProducts(allProducts);
        } else {
          // Fetch all products
          const allProducts = await productAPI.getProducts();
          setProducts(allProducts);
        }
      } catch (err) {
        setError(err.message || "Failed to load products. Please try again.");
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryKey]);

  const title = categoryKey
    ? categoryNames[categoryKey] || "Products"
    : "All Products";

  return (
    <>
      <Navbar />
      <ProductsContainer>
        <Header>
          <Title>{title}</Title>
          <Subtitle>
            {categoryKey
              ? `Showing items in ${categoryKey} category.`
              : "Browse every item from all categories in one place."}
          </Subtitle>
        </Header>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <LoadingMessage>Loading products...</LoadingMessage>}
        {!loading && products.length === 0 && (
          <EmptyMessage>No products found in this category.</EmptyMessage>
        )}
        {!loading && products.length > 0 && (
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ProductGrid>
        )}
      </ProductsContainer>
    </>
  );
};

export default Products;
