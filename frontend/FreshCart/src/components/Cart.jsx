import React from "react";
import styled from "styled-components";
import { useCart } from "./CartContext";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

/* ===================== PAGE ===================== */

const Page = styled.div`
  min-height: 100vh;
  background: #f9fafb;
`;

const Wrapper = styled.div`
  margin-top: 88px;
  max-width: 1200px;
  padding: 2.5rem 1.5rem 4rem;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #111827;
`;

const Subtitle = styled.p`
  margin-bottom: 2.5rem;
  color: #6b7280;
`;

/* ===================== LAYOUT ===================== */

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(320px, 1fr);
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ===================== CART ITEMS ===================== */

const ItemsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const EmptyState = styled.div`
  padding: 3rem 2rem;
  border-radius: 16px;
  background: #ffffff;
  border: 1px dashed #d1d5db;
  text-align: center;
  color: #6b7280;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) auto;
  gap: 1.2rem;
  align-items: center;

  padding: 1.2rem 1.4rem;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;

  @media (max-width: 720px) {
    grid-template-columns: 72px 1fr;
    row-gap: 0.75rem;
  }
`;

const ItemImage = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 12px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  min-width: 0;
`;

const ItemName = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const ItemMeta = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #9ca3af;
`;

const ItemRight = styled.div`
  text-align: right;
`;

const ItemPrice = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #16a34a;
  margin-bottom: 0.4rem;
`;

/* ===================== QUANTITY ===================== */

const QuantityControls = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
`;

const QtyButton = styled.button`
  border: 1px solid #d1d5db;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #f9fafb;
  color: #374151;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }

  &:disabled {
    background: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

const QtyValue = styled.span`
  min-width: 18px;
  text-align: center;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  margin-top: 0.35rem;
  border: none;
  background: none;
  color: #ef4444;
  font-size: 0.8rem;
  cursor: pointer;
`;

/* ===================== SUMMARY ===================== */

const SummaryCard = styled.div`
  position: sticky;
  top: 96px;

  background: #ffffff;
  border-radius: 18px;
  padding: 1.8rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
`;

const SummaryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.4rem;
  color: #111827;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: #374151;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;

  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
`;

const CheckoutButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;

  font-weight: 700;
  font-size: 1rem;
  background: #16a34a;
  color: #ffffff;

  &:hover {
    background: #15803d;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const Note = styled.p`
  margin-top: 0.8rem;
  font-size: 0.75rem;
  color: #9ca3af;
`;

/* ===================== COMPONENT ===================== */

const Cart = () => {
  const { cartItems, updateQuantity, increaseQuantity, decreaseQuantity, removeItem, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const delivery = cartItems.length ? 40 : 0;
  const total = subtotal + delivery;

  return (
    <Page>
      <Navbar />
      <Wrapper>
        <Title>Your Cart</Title>
        <Subtitle>Review your items before checkout.</Subtitle>

        <Layout>
          <ItemsPanel>
            {cartItems.length === 0 ? (
              <EmptyState>Your cart is empty.</EmptyState>
            ) : (
              cartItems.map(item => (
                <CartItem key={item.id}>
                  <ItemImage src={item.img} alt={item.name} />

                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    <ItemMeta>Fresh • Next-day delivery</ItemMeta>
                  </ItemInfo>

                  <ItemRight>
                    <ItemPrice>
                      ₹{(item.price * item.qty).toFixed(2)}
                    </ItemPrice>

                    <QuantityControls>
                      <QtyButton 
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.qty <= 1}
                        title="Decrease quantity"
                      >
                        −
                      </QtyButton>
                      <QtyValue>{item.qty}</QtyValue>
                      <QtyButton 
                        onClick={() => increaseQuantity(item.id)}
                        disabled={item.qty >= 99}
                        title="Increase quantity"
                      >
                        +
                      </QtyButton>
                    </QuantityControls>

                    <RemoveButton onClick={() => removeItem(item.id)}>
                      Remove
                    </RemoveButton>
                  </ItemRight>
                </CartItem>
              ))
            )}
          </ItemsPanel>

          <SummaryCard>
            <SummaryTitle>Order Summary</SummaryTitle>

            <SummaryRow>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </SummaryRow>

            <SummaryRow>
              <span>Delivery</span>
              <span>{delivery ? `₹${delivery}` : "Free"}</span>
            </SummaryRow>

            <SummaryTotal>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </SummaryTotal>

            <CheckoutButton
              disabled={!cartItems.length}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </CheckoutButton>

            <Note>All prices include applicable taxes.</Note>
          </SummaryCard>
        </Layout>
      </Wrapper>
    </Page>
  );
};

export default Cart;
