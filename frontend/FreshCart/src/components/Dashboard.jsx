import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CustomerDashboard from './CustomerDashboard';

const Dashboard = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAdmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (isAdmin) {
    return null; 
  }

  return <CustomerDashboard />;
};

export default Dashboard;
