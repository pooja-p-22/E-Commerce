
// import React from "react";
// import styled from "styled-components";
// import { useCart } from "./CartContext";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";

// const Page = styled.div`
//   min-height: 100vh;
//   background: radial-gradient(circle at top left, #e0f2ff 0, #f8fafc 40%, #ffffff 100%);
// `;

// const Wrapper = styled.div`
//   margin-top: 80px;
//   max-width: 1200px;
//   padding: 3rem 1.5rem 4rem;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const Title = styled.h1`
//   font-size: 2.2rem;
//   font-weight: 800;
//   margin: 0 0 0.75rem;
//   color: #1f2933;
// `;

// const Subtitle = styled.p`
//   margin: 0 0 2.5rem;
//   color: #6b7280;
// `;


// const Layout = styled.div`
//   display: grid;
//   grid-template-columns: minmax(0, 2.4fr) minmax(260px, 1fr);
//   gap: 2rem;
//   align-items: stretch;       

//   @media (max-width: 900px) {
//     grid-template-columns: 1fr;
//   }
// `;


// const ItemsPanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const EmptyState = styled.div`
//   padding: 3rem 2rem;
//   border-radius: 20px;
//   background: rgba(248,250,252,0.9);
//   border: 1px dashed #d0d7e2;
//   text-align: center;
//   color: #6b7280;
// `;

// const CartItem = styled.div`
//   display: grid;
//   grid-template-columns: 96px minmax(0, 1.7fr) auto auto;
//   gap: 1.25rem;
//   align-items: center;
//   padding: 1.2rem 1.3rem;
//   background: #ffffff;
//   border-radius: 18px;
//   box-shadow: 0 10px 30px rgba(15,23,42,0.06);

//   @media (max-width: 720px) {
//     grid-template-columns: 80px minmax(0, 1.4fr);
//     grid-template-rows: auto auto;
//     grid-auto-flow: row;
//     row-gap: 0.75rem;
//   }
// `;

// const ItemImage = styled.img`
//   width: 96px;
//   height: 96px;
//   border-radius: 14px;
//   object-fit: cover;
// `;

// const ItemInfo = styled.div`
//   min-width: 0;
// `;

// const ItemName = styled.h3`
//   margin: 0 0 0.25rem;
//   font-size: 1.05rem;
//   font-weight: 600;
//   color: #111827;
// `;

// const ItemMeta = styled.p`
//   margin: 0;
//   font-size: 0.86rem;
//   color: #9ca3af;
// `;

// const ItemPrice = styled.div`
//   font-size: 1rem;
//   font-weight: 700;
//   color: #10b981;
//   text-align: right;
// `;

// const QuantityControls = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.45rem;
//   border-radius: 999px;
//   padding: 0.25rem 0.6rem;
//   background: #f3f4f6;
// `;

// const QtyButton = styled.button`
//   border: none;
//   width: 24px;
//   height: 24px;
//   border-radius: 999px;
//   background: #ffffff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   font-weight: 700;
//   font-size: 0.9rem;
//   color: #374151;
//   box-shadow: 0 1px 4px rgba(0,0,0,0.08);

//   &:hover {
//     background: #e5e7eb;
//   }
// `;

// const QtyValue = styled.span`
//   min-width: 20px;
//   text-align: center;
//   font-size: 0.9rem;
//   font-weight: 600;
// `;

// const RemoveButton = styled.button`
//   margin-left: 0.75rem;
//   border: none;
//   background: none;
//   color: #ef4444;
//   font-size: 0.85rem;
//   cursor: pointer;
// `;


// const SummaryCard = styled.div`
//   height: 100%;
//   position: sticky;
//   top: 96px; /* below fixed navbar */

//   background: #0b1120;
//   color: #f9fafb;
//   border-radius: 22px;
//   padding: 2.2rem 1.8rem;
//   box-shadow: 0 20px 50px rgba(15,23,42,0.7);

//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;




// const SummaryTitle = styled.h2`
//   font-size: 1.3rem;
//   font-weight: 700;
//   margin: 0 0 1.4rem;
// `;

// const SummaryRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 0.95rem;
//   margin-bottom: 0.5rem;
//   color: #e5e7eb;
// `;

// const SummaryTotal = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 1.2rem 0 1.6rem;
//   font-size: 1.2rem;
//   font-weight: 800;
// `;

// const CheckoutButton = styled.button`
//   width: 100%;
//   border-radius: 14px;
//   padding: 0.9rem 1rem;
//   border: none;
//   cursor: pointer;
//   font-weight: 700;
//   font-size: 0.98rem;
//   background: linear-gradient(135deg, #22c55e, #16a34a);
//   color: #ffffff;
//   box-shadow: 0 12px 30px rgba(34,197,94,0.35);
//   transition: transform 0.08s ease, box-shadow 0.08s ease;

//   &:hover {
//     box-shadow: 0 16px 38px rgba(34,197,94,0.45);
//   }

//   &:active {
//     transform: scale(0.97);
//   }
// `;

// const Note = styled.p`
//   margin-top: 0.9rem;
//   font-size: 0.75rem;
//   color: #9ca3af;
// `;

// const Cart = () => {
//   const { cartItems, updateQuantity } = useCart();
//   const navigate = useNavigate();

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );
//   const delivery = cartItems.length ? 40 : 0; // sample fee
//   const total = subtotal + delivery;

//   return (
//     <Page>
//       <Navbar />
//       <Wrapper>
//         <Title>Your Cart</Title>
//         <Subtitle>Review your items before proceeding to checkout.</Subtitle>

//         <Layout>
//           <ItemsPanel>
//             {cartItems.length === 0 ? (
//               <EmptyState>
//                 Your cart is empty. Add some fresh groceries from the products
//                 page.
//               </EmptyState>
//             ) : (
//               cartItems.map(item => (
//                 <CartItem key={item.id}>
//                   <ItemImage src={item.img} alt={item.name} />
//                   <ItemInfo>
//                     <ItemName>{item.name}</ItemName>
//                     <ItemMeta>Fresh • Next‑day delivery</ItemMeta>
//                   </ItemInfo>

//                   <ItemPrice>₹{(item.price * item.qty).toFixed(2)}</ItemPrice>

//                   <div style={{ textAlign: "right" }}>
//                     <QuantityControls>
//                       <QtyButton onClick={() => updateQuantity(item.id, item.qty - 1)}>-</QtyButton>
//                       <QtyValue>{item.qty}</QtyValue>
//                       <QtyButton onClick={() => updateQuantity(item.id, item.qty + 1)}>+</QtyButton>
//                     </QuantityControls>
//                     <RemoveButton onClick={() => updateQuantity(item.id, 0)}>
//                       Remove
//                     </RemoveButton>
//                   </div>
//                 </CartItem>
//               ))
//             )}
//           </ItemsPanel>

//           <SummaryCard>
//             <SummaryTitle>Order summary</SummaryTitle>
//             <SummaryRow>
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </SummaryRow>
//             <SummaryRow>
//               <span>Delivery</span>
//               <span>{delivery ? `₹${delivery.toFixed(2)}` : "Free"}</span>
//             </SummaryRow>
//             <SummaryTotal>
//               <span>Total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </SummaryTotal>
//             <CheckoutButton
//               disabled={!cartItems.length}
//               onClick={() => cartItems.length && navigate("/checkout")}
//             >
//               Proceed to checkout
//             </CheckoutButton>
//             <Note>Prices include all applicable taxes. You can review this on the checkout page.</Note>
//           </SummaryCard>
//         </Layout>
//       </Wrapper>
//     </Page>
//   );
// };

// export default Cart;



// Cart.jsx
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
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #ffffff;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  &:hover {
    background: #e5e7eb;
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
  const { cartItems, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
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
                      <QtyButton onClick={() => updateQuantity(item.id, item.qty - 1)}>-</QtyButton>
                      <QtyValue>{item.qty}</QtyValue>
                      <QtyButton onClick={() => updateQuantity(item.id, item.qty + 1)}>+</QtyButton>
                    </QuantityControls>

                    <RemoveButton onClick={() => updateQuantity(item.id, 0)}>
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
