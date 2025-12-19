import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { adminAPI } from '../services/adminApi';
import { productAPI, categoryAPI } from '../services/api';
import Navbar from './NavBar';

const AdminContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  min-height: calc(100vh - 80px);
  background: #f8f9fa;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.$active ? '#3498db' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#333'};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: fit-content;

  &:hover {
    background: ${props => props.$active ? '#2980b9' : '#e9ecef'};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

const ContentArea = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  overflow-x: auto;
  display: block;
  white-space: nowrap;

  thead, tbody, tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 0.5rem 0.25rem;
      font-size: 0.875rem;
    }
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: #3498db;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  margin: 0 0.25rem;

  &:hover {
    background: #2980b9;
  }

  &.danger {
    background: #e74c3c;
    &:hover {
      background: #c0392b;
    }
  }

  &.success {
    background: #27ae60;
    &:hover {
      background: #229954;
    }
  }
`;

const Form = styled.form`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  grid-column: 1 / -1;
  min-height: 80px;
`;

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    description: '',
    unitPrice: '',
    unitType: 'unit',
    stockQuantity: '',
    categoryId: '',
    isOrganic: false
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: '',
    brand: '',
    description: '',
    unitPrice: '',
    unitType: 'unit',
    stockQuantity: '',
    categoryId: '',
    isOrganic: false
  });


  useEffect(() => {
    if (isAdmin) {
      loadData();
      // Always load categories for product form
      if (activeTab === 'products') {
        loadCategories();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isAdmin]);

  const loadCategories = async () => {
    try {
      const categoriesData = await categoryAPI.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'products':
          const productsData = await productAPI.getProducts();
          setProducts(productsData);
          break;
        case 'categories':
          const categoriesData = await categoryAPI.getCategories();
          setCategories(categoriesData);
          break;
        case 'orders':
          const ordersData = await adminAPI.getAllOrders();
          setOrders(ordersData);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (productId, newStock) => {
    try {
      await adminAPI.updateProductStock(productId, newStock);
      loadData();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminAPI.createProduct({
        ...newProduct,
        unitPrice: parseFloat(newProduct.unitPrice),
        stockQuantity: parseInt(newProduct.stockQuantity)
      });
      setNewProduct({
        name: '',
        brand: '',
        description: '',
        unitPrice: '',
        unitType: 'unit',
        stockQuantity: '',
        categoryId: '',
        isOrganic: false
      });
      setShowAddProduct(false);
      setMessage('Product added successfully!');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
      loadData();
    } catch (error) {
      setMessage(error.message || 'Failed to add product');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.createCategory(newCategory);
      setNewCategory({ name: '', slug: '' });
      setShowAddCategory(false);
      loadData();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await adminAPI.deleteCategory(categoryId);
        loadData();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);
      loadData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product._id);
    setEditProduct({
      name: product.name,
      brand: product.brand,
      description: product.description,
      unitPrice: product.unitPrice,
      unitType: product.unitType,
      stockQuantity: product.stockQuantity,
      categoryId: product.category._id || product.category,
      isOrganic: product.isOrganic
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminAPI.updateProduct(editingProduct, {
        ...editProduct,
        unitPrice: parseFloat(editProduct.unitPrice),
        stockQuantity: parseInt(editProduct.stockQuantity)
      });
      setEditingProduct(null);
      setEditProduct({
        name: '',
        brand: '',
        description: '',
        unitPrice: '',
        unitType: 'unit',
        stockQuantity: '',
        categoryId: '',
        isOrganic: false
      });
      setMessage('Product updated successfully!');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
      loadData();
    } catch (error) {
      setMessage(error.message || 'Failed to update product');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditProduct({
      name: '',
      brand: '',
      description: '',
      unitPrice: '',
      unitType: 'unit',
      stockQuantity: '',
      categoryId: '',
      isOrganic: false
    });
  };



  if (!isAdmin) {
    return (
      <AdminContainer>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
      </AdminContainer>
    );
  }

  return (
    <>
      <Navbar />
      <AdminContainer>
      <h1>Admin Panel</h1>
      
      <TabContainer>
        <Tab $active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
          Products
        </Tab>
        <Tab $active={activeTab === 'categories'} onClick={() => setActiveTab('categories')}>
          Categories
        </Tab>
        <Tab $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
          Orders
        </Tab>

      </TabContainer>

      <ContentArea>
        {message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            background: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            fontWeight: '600'
          }}>
            {message}
          </div>
        )}
        {loading && <p>Loading...</p>}
        
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Product Management</h3>
              <Button className="success" onClick={() => setShowAddProduct(!showAddProduct)}>
                {showAddProduct ? 'Cancel' : 'Add Product'}
              </Button>
            </div>
            
            {showAddProduct && (
              <Form onSubmit={handleAddProduct}>
                <Input
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
                <Input
                  placeholder="Brand"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                  required
                />
                <Input
                  placeholder="Price"
                  type="number"
                  step="0.01"
                  value={newProduct.unitPrice}
                  onChange={(e) => setNewProduct({...newProduct, unitPrice: e.target.value})}
                  required
                />
                <Select
                  value={newProduct.unitType}
                  onChange={(e) => setNewProduct({...newProduct, unitType: e.target.value})}
                >
                  <option value="unit">Unit</option>
                  <option value="kg">Kg</option>
                  <option value="liter">Liter</option>
                  <option value="pack">Pack</option>
                </Select>
                <Input
                  placeholder="Stock Quantity"
                  type="number"
                  value={newProduct.stockQuantity}
                  onChange={(e) => setNewProduct({...newProduct, stockQuantity: e.target.value})}
                  required
                />
                <Select
                  value={newProduct.categoryId}
                  onChange={(e) => setNewProduct({...newProduct, categoryId: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </Select>
                <TextArea
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  required
                />
                <Button type="submit" className="success">Add Product</Button>
              </Form>
            )}
            
            {editingProduct && (
              <Form onSubmit={handleUpdateProduct}>
                <h4>Edit Product</h4>
                <Input
                  placeholder="Product Name"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
                  required
                />
                <Input
                  placeholder="Brand"
                  value={editProduct.brand}
                  onChange={(e) => setEditProduct({...editProduct, brand: e.target.value})}
                  required
                />
                <Input
                  placeholder="Price"
                  type="number"
                  step="0.01"
                  value={editProduct.unitPrice}
                  onChange={(e) => setEditProduct({...editProduct, unitPrice: e.target.value})}
                  required
                />
                <Select
                  value={editProduct.unitType}
                  onChange={(e) => setEditProduct({...editProduct, unitType: e.target.value})}
                >
                  <option value="unit">Unit</option>
                  <option value="kg">Kg</option>
                  <option value="liter">Liter</option>
                  <option value="pack">Pack</option>
                </Select>
                <Input
                  placeholder="Stock Quantity"
                  type="number"
                  value={editProduct.stockQuantity}
                  onChange={(e) => setEditProduct({...editProduct, stockQuantity: e.target.value})}
                  required
                />
                <Select
                  value={editProduct.categoryId}
                  onChange={(e) => setEditProduct({...editProduct, categoryId: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </Select>
                <TextArea
                  placeholder="Product Description"
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({...editProduct, description: e.target.value})}
                  required
                />
                <div>
                  <Button type="submit" className="success">Update Product</Button>
                  <Button type="button" onClick={cancelEdit}>Cancel</Button>
                </div>
              </Form>
            )}
            
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>₹{product.unitPrice}</td>
                      <td>
                        <input
                          type="number"
                          defaultValue={product.stockQuantity}
                          onBlur={(e) => updateStock(product._id, parseInt(e.target.value) || 0)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              updateStock(product._id, parseInt(e.target.value) || 0);
                            }
                          }}
                          style={{ width: '80px', padding: '0.25rem' }}
                        />
                      </td>
                      <td>
                        <Button onClick={() => handleEditProduct(product)}>Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h3>Order Management</h3>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-8)}</td>
                      <td>{order.user?.name}</td>
                      <td>₹{order.totalPrice}</td>
                      <td>
                        <Select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          style={{ fontSize: '0.75rem', padding: '0.25rem' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Packed">Packed</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </Select>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button 
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                          onClick={() => {
                            alert(`Order Details:\nItems: ${order.orderItems?.length || 0}\nAddress: ${order.shippingAddress?.address}\nPayment: ${order.paymentMethod}`);
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Category Management</h3>
              <Button className="success" onClick={() => setShowAddCategory(!showAddCategory)}>
                {showAddCategory ? 'Cancel' : 'Add Category'}
              </Button>
            </div>
            
            {showAddCategory && (
              <Form onSubmit={handleAddCategory}>
                <Input
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    setNewCategory({ name, slug });
                  }}
                  required
                />
                <Input
                  placeholder="Slug (auto-generated)"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  required
                />
                <Button type="submit" className="success">Add Category</Button>
              </Form>
            )}
            
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td>
                      <Button className="danger" onClick={() => handleDeleteCategory(category._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}


      </ContentArea>
      </AdminContainer>
    </>
  );
};

export default AdminPanel;