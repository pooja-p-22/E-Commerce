// Admin API service
const API_BASE_URL = 'http://localhost:21000/api/v1';

const getToken = () => localStorage.getItem('token');

const getHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const adminAPI = {
  // Product Management
  createProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create product');
    return data;
  },

  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update product');
    return data;
  },

  updateProductStock: async (id, stockQuantity) => {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}/stock`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ stockQuantity }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update stock');
    return data;
  },

  // Category Management
  createCategory: async (categoryData) => {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(categoryData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create category');
    return data;
  },

  deleteCategory: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete category');
    return data;
  },

  // Order Management
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');
    return data;
  },

  assignDeliveryAgent: async (orderId, agentId) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/assign`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ agentId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to assign delivery agent');
    return data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update order status');
    return data;
  },

  // Delivery Agent Management
  getDeliveryAgents: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users/delivery`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch delivery agents');
    return data;
  },

  createDeliveryAgent: async (agentData) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/delivery`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(agentData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create delivery agent');
    return data;
  },
};