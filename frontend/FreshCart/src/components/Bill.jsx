import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';

const BillContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background: #f8f9fa;
`;

const BillCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const BillHeader = styled.div`
  text-align: center;
  border-bottom: 2px solid #27ae60;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  
  h1 {
    color: #27ae60;
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }
  
  p {
    color: #666;
    margin: 0;
  }
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InfoSection = styled.div`
  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0.25rem 0;
    color: #666;
  }
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }
  
  tr:hover {
    background: #f8f9fa;
  }
`;

const TotalSection = styled.div`
  border-top: 2px solid #2c3e50;
  padding-top: 1rem;
  text-align: right;
  
  .total-row {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    font-size: 1.1rem;
    font-weight: bold;
    color: #27ae60;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background: #27ae60;
    color: white;
    
    &:hover {
      background: #219a52;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: #3498db;
    color: white;
    
    &:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: #fee;
  color: #c00;
  border: 1px solid #fcc;
  border-radius: 8px;
  margin: 2rem 0;
`;

const Bill = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await orderAPI.getOrderById(orderId);
        setOrder(orderData);
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  const handleContinueShopping = () => {
    navigate('/categories');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  if (loading) {
    return (
      <BillContainer>
        <LoadingMessage>Loading order details...</LoadingMessage>
      </BillContainer>
    );
  }

  if (error || !order) {
    return (
      <BillContainer>
        <ErrorMessage>
          {error || 'Order not found'}
          <br />
          <Button className="primary" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
            Go Home
          </Button>
        </ErrorMessage>
      </BillContainer>
    );
  }

  return (
    <BillContainer>
      <BillCard>
        <BillHeader>
          <h1>Order Confirmation</h1>
          <p>Thank you for your order!</p>
          <p>Order ID: #{order._id}</p>
        </BillHeader>

        <OrderInfo>
          <InfoSection>
            <h3>Order Details</h3>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {order.isPaid ? 'Paid' : 'Pending'}</p>
          </InfoSection>

          <InfoSection>
            <h3>Delivery Information</h3>
            <p><strong>Address:</strong> {order.shippingAddress.address}</p>
            <p><strong>City:</strong> {order.shippingAddress.city}</p>
            <p><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
            <p><strong>Expected Delivery:</strong> {new Date(order.deliverySlot).toLocaleDateString()}</p>
          </InfoSection>
        </OrderInfo>

        <ItemsTable>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.purchasedQuantity}</td>
                <td>₹{item.priceAtPurchase.toFixed(2)}</td>
                <td>₹{(item.priceAtPurchase * item.purchasedQuantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </ItemsTable>

        <TotalSection>
          <div className="total-row">
            <span>Total Amount:</span>
            <span>₹{order.totalPrice.toFixed(2)}</span>
          </div>
        </TotalSection>

        <ActionButtons>
          <Button className="secondary" onClick={handlePrint}>
            Print Bill
          </Button>
          <Button className="primary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
          <Button className="secondary" onClick={handleViewOrders}>
            View All Orders
          </Button>
        </ActionButtons>
      </BillCard>
    </BillContainer>
  );
};

export default Bill;