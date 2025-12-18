import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";

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

// ---- ALL PRODUCTS ----
const allProducts = {
  grocery: [
    { id: 1, name: "Rice",   price: 5.99, img: "/rice.jpg" },
    { id: 2, name: "Pasta",  price: 2.49, img: "/pasta.jpg" }
  ],
  dairy: [
    { id: 3, name: "Milk",   price: 2.99, img: "/milk.jpg" },
    { id: 4, name: "Yogurt", price: 1.49, img: "/yogurt.jpg" },
    { id: 5, name: "Cheese", price: 4.99, img: "/cheese.jpg" }
  ],
  fruits: [
    { id: 6, name: "Apple",  price: 2.49, img: "/apple.jpg" },
    { id: 7, name: "Banana", price: 1.29, img: "/banana.jpg" },
    { id: 8, name: "Orange", price: 2.99, img: "/orange.jpg" }
  ],
  vegetables: [
    { id: 9,  name: "Tomato",  price: 1.99, img: "/tomato.jpg" },
    { id: 10, name: "Carrot",  price: 0.99, img: "/carrot.jpg" },
    { id: 11, name: "Lettuce", price: 1.29, img: "/lettuce.jpg" }
  ],
  snacks: [
    { id: 12, name: "Chips",   price: 2.99, img: "/chips.jpg" },
    { id: 13, name: "Cookies", price: 3.49, img: "/cookies.jpg" },
    { id: 14, name: "Nuts",    price: 4.99, img: "/nuts.jpg" }
  ]
};

const categoryNames = {
  grocery: "Grocery Essentials",
  dairy: "Dairy Products",
  fruits: "Fresh Fruits",
  vegetables: "Fresh Vegetables",
  snacks: "Snacks & Treats"
};

const Products = () => {
  const [searchParams] = useSearchParams();           // React Router hook [web:176][web:257]
  const categoryKey = searchParams.get("category");   // e.g. "dairy"

  const products = categoryKey && allProducts[categoryKey]
    ? allProducts[categoryKey]
    : Object.values(allProducts).flat();              // fallback: all products

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
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </ProductsContainer>
    </>
  );
};

export default Products;
