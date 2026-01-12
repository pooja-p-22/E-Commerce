// Navbar.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "../contexts/AuthContext";


const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(16px);
  z-index: 1000;
  padding: 0.9rem 2rem;
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 1.9rem;
  font-weight: 900;
  margin: 0;
  cursor: pointer;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.98rem;
  font-weight: 500;
  color: ${p => (p.$active ? "#1d6fd6" : "#7f8c8d")};
  transition: background 0.25s ease, color 0.25s ease, transform 0.08s ease;

  &:hover {
    background: rgba(0,0,0,0.03);
    color: #1d6fd6;
  }

  &:active {
    transform: scale(0.96);
  }
`;

const CartButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 999px;
  border: none;
  padding: 0.4rem 0.9rem;
  background: #111827;
  cursor: pointer;
  color: #f9fafb;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background 0.2s ease, transform 0.08s ease;

  &:hover {
    background: #020617;
  }

  &:active {
    transform: scale(0.97);
  }
`;

const CartIcon = styled.span`
  font-size: 1.1rem;   /* cart symbol size */
`;

const CartBadge = styled.span`
  min-width: 18px;
  padding: 0 0.25rem;
  height: 18px;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, getTotalItems } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const count = getTotalItems();

  const isActive = path => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo onClick={() => navigate("/dashboard")}>FreshCart</Logo>
        <NavLinks>
          <NavLink $active={isActive("/categories")} onClick={() => navigate("/categories")}>
            Categories
          </NavLink>
          <NavLink $active={isActive("/products")} onClick={() => navigate("/products")}>
            Products
          </NavLink>
          
          {isAdmin && (
            <NavLink $active={isActive("/admin")} onClick={() => navigate("/admin")}>
              Admin
            </NavLink>
          )}

          {isAuthenticated ? (
            <>
              <NavLink $active={isActive("/orders")} onClick={() => navigate("/orders")}>
                Orders
              </NavLink>
              <NavLink title={user?.email}>{user?.name || "User"}</NavLink>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink $active={isActive("/register")} onClick={() => navigate("/register")}>
                Register
              </NavLink>
              <NavLink $active={isActive("/login")} onClick={() => navigate("/login")}>
                Login
              </NavLink>
            </>
          )}

          {/* Cart icon only */}
          <CartButton onClick={() => navigate("/cart")}>
            <CartIcon>🛒</CartIcon>
            {count > 0 && <CartBadge>{count}</CartBadge>}
          </CartButton>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;







// import React from 'react';
// import styled from 'styled-components';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useCart } from './CartContext';

// const NavbarContainer = styled.nav`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   background: rgba(255,255,255,0.95);
//   backdrop-filter: blur(10px);
//   z-index: 1000;
//   padding: 1rem 2rem;
//   box-shadow: 0 2px 20px rgba(0,0,0,0.1);
// `;

// const NavContent = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Logo = styled.h1`
//   font-size: 2rem;
//   font-weight: 900;
//   background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   margin: 0;
// `;

// const NavLinks = styled.div`
//   display: flex;
//   gap: 2rem;
//   align-items: center;
// `;

// const NavLink = styled.button`
//   background: none;
//   border: none;
//   font-size: 1.1rem;
//   font-weight: 500;
//   color: ${props => props.active ? '#db5034ff' : '#7f8c8d'};
//   cursor: pointer;
//   padding: 0.5rem 1rem;
//   border-radius: 25px;
//   transition: all 0.3s ease;
//   &:hover { background: #f8f9fa; color: #3498db; }
// `;

// const CartIcon = styled.div`
//   position: relative;
//   cursor: pointer;
// `;

// const CartCount = styled.span`
//   position: absolute;
//   top: -8px;
//   right: -8px;
//   background: #e74c3c;
//   color: white;
//   border-radius: 50%;
//   width: 24px;
//   height: 24px;
//   font-size: 0.8rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cartItems } = useCart();
  
//   const isActive = (path) => location.pathname === path;
  
//   return (
//     <NavbarContainer>
//       <NavContent>
//         <Logo onClick={() => navigate('/dashboard')}>FreshCart</Logo>
//         <NavLinks>
//           <NavLink active={isActive('/categories')} onClick={() => navigate('/categories')}>
//             Categories
//           </NavLink>
//           <NavLink active={isActive('/products')} onClick={() => navigate('/products')}>
//             Products
//           </NavLink>
//           <NavLink active={isActive('/cart')} onClick={() => navigate('/cart')}>
//             Cart
//           </NavLink>
//           <NavLink onClick={() => navigate('/register')}>Register</NavLink>
//           <NavLink onClick={() => navigate('/login')}>Login</NavLink>
//           <CartIcon onClick={() => navigate('/cart')}>
//             🛒
//             {cartItems.length > 0 && <CartCount>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</CartCount>}
//           </CartIcon>
//         </NavLinks>
//       </NavContent>
//     </NavbarContainer>
//   );
// };

// export default Navbar;
