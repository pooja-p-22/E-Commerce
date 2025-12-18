// API service for communicating with backend
const API_BASE_URL = 'http://localhost:21000/api/v1';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper to set authorization header
const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in localStorage');
    }
  }
  return headers;
};

// Auth endpoints
export const authAPI = {
  register: async (name, email, password, role = 'customer') => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get user info');
    return data;
  },
};

// Product endpoints
export const productAPI = {
  getProducts: async (keyword = '') => {
    const url = keyword 
      ? `${API_BASE_URL}/customer/products?keyword=${keyword}`
      : `${API_BASE_URL}/customer/products`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch products');
    return data;
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customer/products/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch product');
    return data;
  },

  getProductsByCategory: async (category) => {
    // Get all products and filter by category
    const response = await fetch(`${API_BASE_URL}/customer/products`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch products');
    
    // Filter by category if provided
    if (category) {
      return data.filter(p => p.category?.slug === category || p.category?.name?.toLowerCase() === category.toLowerCase());
    }
    return data;
  },
};

// Category endpoints
export const categoryAPI = {
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/customer/categories`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch categories');
    return data;
  },
};

// Order endpoints
export const orderAPI = {
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/customer/orders`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create order');
    return data;
  },

  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/customer/orders`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');
    return data;
  },
};
