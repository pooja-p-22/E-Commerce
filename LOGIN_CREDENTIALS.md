# FreshCart E-Commerce - Login Credentials

## 🔐 Test Accounts

### Admin Account
- **Email**: `admin@freshcart.com`
- **Password**: `admin123`
- **Access**: Admin Panel, Product Management, Order Management, Delivery Agent Management

### Customer Accounts
1. **Rajesh Kumar**
   - **Email**: `john@example.com`
   - **Password**: `password123`
   - **Address**: 15, Anna Nagar, Coimbatore 641002

2. **Priya Sharma**
   - **Email**: `jane@example.com`
   - **Password**: `password123`
   - **Address**: 23, RS Puram, Coimbatore 641001

### Delivery Agent Accounts
1. **Arjun Patel**
   - **Email**: `arun@example.com`
   - **Password**: `password123`
   - **Status**: Available
   - **Has Orders**: Yes (1 order - Out for Delivery)

2. **Kavya Reddy**
   - **Email**: `sarah@example.com`
   - **Password**: `password123`
   - **Status**: Available
   - **Has Orders**: Yes (1 order - Delivered)

3. **Ravi Kumar**
   - **Email**: `ravi@delivery.com`
   - **Password**: `password123`
   - **Status**: Available
   - **Has Orders**: Yes (1 order - Out for Delivery)

4. **Suresh Babu**
   - **Email**: `suresh@delivery.com`
   - **Password**: `password123`
   - **Status**: Busy
   - **Has Orders**: No

5. **Karthik Raja**
   - **Email**: `karthik@delivery.com`
   - **Password**: `password123`
   - **Status**: Available
   - **Has Orders**: No

## 📦 Current Orders in System

- **Total Orders**: 5
- **Pending Orders**: 2 (waiting for delivery agent assignment)
- **Processing Orders**: 0
- **Out for Delivery**: 2 (assigned to Arjun Patel and Ravi Kumar)
- **Delivered Orders**: 1 (completed by Kavya Reddy)
- **Packed Orders**: 0

## 🧪 Testing Scenarios

### Test Delivery Dashboard
1. Login as: `arun@example.com` / `password123`
2. Navigate to Delivery Dashboard
3. You should see 1 order "Out for Delivery"
4. Click "Mark as Delivered" to complete the order

### Test Admin Panel
1. Login as: `admin@freshcart.com` / `admin123`
2. Navigate to Admin Panel
3. View all orders, products, categories, and delivery agents
4. Assign pending orders to available delivery agents

### Test Customer Dashboard
1. Login as: `john@example.com` / `password123`
2. View your order history
3. Browse products and add to cart
4. Complete checkout process

## 🚀 Quick Start

1. **Start Backend**: `cd backend && npm start` (Port: 21000)
2. **Start Frontend**: `cd frontend/FreshCart && npm run dev` (Port: 5173)
3. **Access App**: http://localhost:5173
4. **Login**: Use any credentials above based on role

## 📝 Notes

- All passwords are hashed in the database using bcrypt
- JWT tokens expire after 30 days
- Orders are automatically assigned Coimbatore addresses
- Delivery agents can only see orders assigned to them
