import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: Math.min(item.qty + 1, 99) } // Max quantity limit
            : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "UPDATE_QTY":
      if (action.payload.qty <= 0) {
        return state.filter(item => item.id !== action.payload.id);
      }
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, qty: Math.min(Math.max(action.payload.qty, 1), 99) }
          : item
      );
    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.payload.id);
    case "CLEAR_CART":
      return [];
    case "INCREASE_QTY":
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, qty: Math.min(item.qty + 1, 99) }
          : item
      );
    case "DECREASE_QTY":
      return state
        .map(item =>
          item.id === action.payload.id
            ? { ...item, qty: Math.max(item.qty - 1, 0) }
            : item
        )
        .filter(item => item.qty > 0);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = product =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const updateQuantity = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });

  const removeItem = id =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });

  const clearCart = () =>
    dispatch({ type: "CLEAR_CART" });

  const increaseQuantity = id =>
    dispatch({ type: "INCREASE_QTY", payload: { id } });

  const decreaseQuantity = id =>
    dispatch({ type: "DECREASE_QTY", payload: { id } });

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.qty, 0);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity, 
      removeItem, 
      clearCart, 
      increaseQuantity, 
      decreaseQuantity,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
