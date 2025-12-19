import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from '../contexts/AuthContext';
import { orderAPI } from '../services/api';

const CheckoutContainer = styled.div`
  min-height: 100vh;
  padding: 3rem 2rem;
  max-width: 700px;
  margin: 0 auto;
  background: #f8f9fa;

  @media (max-width: 1024px) {
    padding: 2.5rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const CheckoutHeading = styled.h1`
  text-align: center;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: 2.5rem;
  color: #2c3e50;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  margin-bottom: 1.25rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.875rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.65rem 0.75rem;
    margin-bottom: 0.875rem;
    font-size: 16px;
  }
`;

const PaymentSection = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }

  h3 {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: #2c3e50;
    margin: 0 0 1rem 0;

    @media (max-width: 480px) {
      margin: 0 0 0.75rem 0;
    }
  }
`;

const PaymentMethod = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const MethodButton = styled.button`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${props => props.$active ? '#3498db' : '#e1e8ed'};
  background: ${props => props.$active ? '#3498db' : 'white'};
  color: ${props => props.$active ? 'white' : '#2c3e50'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: clamp(0.9rem, 1.5vw, 1rem);

  &:hover {
    border-color: #3498db;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    gap: 0.875rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 0.875rem;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 1.25rem;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(39, 174, 96, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(39, 174, 96, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    margin-top: 1.25rem;
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background-color: #fee;
  color: #c00;
  border: 1px solid #fcc;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background-color: #efe;
  color: #060;
  border: 1px solid #cfc;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`;

const OrderSummary = styled.div`
  background: #f0f8ff;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  
  h3 {
    margin-top: 0;
    color: #2c3e50;
  }
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ddd;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 2px solid #2c3e50;
  font-weight: bold;
  font-size: 1.1rem;
  color: #27ae60;
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (cartItems.length === 0) {
        setError("Your cart is empty");
        setLoading(false);
        return;
      }

      // Prepare order data
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          purchasedQuantity: item.qty,
          priceAtPurchase: item.price,
          unitType: 'unit',
          product: item.id
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.zipCode,
        },
        paymentMethod: paymentMethod === 'card' ? 'Card' : paymentMethod === 'paypal' ? 'PayPal' : 'COD',
        totalPrice: calculateTotal(),
        deliverySlot: new Date(Date.now() + 24 * 60 * 60 * 1000)
      };

      // Submit order to backend
      const result = await orderAPI.createOrder(orderData);
      setSuccess("Order placed successfully! Redirecting to your bill...");
      
      setTimeout(() => {
        navigate(`/bill/${result._id}`);
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = calculateTotal();

  return (
    <CheckoutContainer>
      <CheckoutHeading>Checkout</CheckoutHeading>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      
      <OrderSummary>
        <h3>Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <a href="/categories">Continue shopping</a></p>
        ) : (
          <>
            {cartItems.map(item => (
              <OrderItem key={item.id}>
                <span>{item.name} x {item.qty}</span>
                <span>₹{(item.price * item.qty).toFixed(2)}</span>
              </OrderItem>
            ))}
            <OrderTotal>
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </OrderTotal>
          </>
        )}
      </OrderSummary>

      <Form onSubmit={handleSubmit}>
        <Input 
          placeholder="Full Name" 
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required 
        />
        <Input 
          placeholder="Email" 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required 
        />
        <Input 
          placeholder="Address" 
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required 
        />
        
        <InputRow>
          <Input 
            placeholder="City" 
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required 
          />
          <Input 
            placeholder="ZIP Code" 
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required 
          />
        </InputRow>
        
        <PaymentSection>
          <h3>Payment Method</h3>
          <PaymentMethod>
            <MethodButton 
              type="button"
              $active={paymentMethod === 'card'}
              onClick={() => setPaymentMethod('card')}
            >
              Card
            </MethodButton>
            <MethodButton 
              type="button"
              $active={paymentMethod === 'paypal'}
              onClick={() => setPaymentMethod('paypal')}
            >
              PayPal
            </MethodButton>
            <MethodButton 
              type="button"
              $active={paymentMethod === 'cod'}
              onClick={() => setPaymentMethod('cod')}
            >
              COD
            </MethodButton>
          </PaymentMethod>
        </PaymentSection>
        
        {paymentMethod !== 'cod' && (
          <>
            <Input 
              placeholder="Card Number" 
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength="19" 
              required 
            />
            <InputRow>
              <Input 
                placeholder="MM/YY" 
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                maxLength="5" 
                required 
              />
              <Input 
                placeholder="CVV" 
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                maxLength="3" 
                required 
              />
            </InputRow>
          </>
        )}
        
        <ConfirmButton type="submit" disabled={loading || cartItems.length === 0}>
          {loading ? "Processing..." : `Confirm Payment (₹${total.toFixed(2)})`}
        </ConfirmButton>
      </Form>
    </CheckoutContainer>
  );
};

export default Checkout;
