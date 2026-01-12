import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { orderAPI } from '../services/api';
import Navbar from './NavBar';

const OrderContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  min-height: calc(100vh - 80px);
  background: #f8f9fa;
`;

const OrderCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const OrderId = styled.h3`
  margin: 0;
  color: #2c3e50;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'Pending': return '#f39c12';
      case 'Processing': return '#3498db';
      case 'Packed': return '#9b59b6';
      case 'Out for Delivery': return '#e67e22';
      case 'Delivered': return '#27ae60';
      case 'Cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  }};
  color: white;
`;

const OrderDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  p {
    margin: 0.25rem 0;
    color: #666;
  }
  
  strong {
    color: #2c3e50;
  }
`;

const ItemsList = styled.div`
  margin-top: 1rem;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;

  &:last-child {
    border-bottom: none;
  }
`;

const OrderHistory = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const ordersData = await orderAPI.getOrders();
      setOrders(ordersData);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <OrderContainer>
          <h2>Please Login</h2>
          <p>You need to be logged in to view your order history.</p>
        </OrderContainer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <OrderContainer>
        <h1>Order History</h1>
        
        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: '#e74c3c' }}>{error}</p>}
        
        {orders.length === 0 && !loading && !error && (
          <p>You haven't placed any orders yet.</p>
        )}

        {orders.map(order => (
          <OrderCard key={order._id}>
            <OrderHeader>
              <OrderId>Order #{order._id.slice(-8)}</OrderId>
              <StatusBadge status={order.status}>{order.status}</StatusBadge>
            </OrderHeader>
            
            <OrderDetails>
              <DetailItem>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalPrice}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              </DetailItem>
              <DetailItem>
                <p><strong>Delivery Address:</strong></p>
                <p>{order.shippingAddress?.address}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                {order.deliverySlot && (
                  <p><strong>Delivery Slot:</strong> {new Date(order.deliverySlot).toLocaleString()}</p>
                )}
              </DetailItem>
            </OrderDetails>

            <ItemsList>
              <h4>Items Ordered:</h4>
              {order.orderItems?.map((item, index) => (
                <ItemRow key={index}>
                  <span>{item.name} x {item.purchasedQuantity}</span>
                  <span>₹{(item.priceAtPurchase * item.purchasedQuantity).toFixed(2)}</span>
                </ItemRow>
              ))}
            </ItemsList>
          </OrderCard>
        ))}
      </OrderContainer>
    </>
  );
};

export default OrderHistory;