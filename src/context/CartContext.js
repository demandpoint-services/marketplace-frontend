"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "@/lib/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }

    const data = await getCart(token);
    setCart(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (productId, quantity = 1) => {
    const token = getToken();
    if (!token) return;

    const data = await addToCart({ productId, quantity }, token);
    setCart(data.items || []);
  };

  const removeItem = async (productId) => {
    const token = getToken();
    if (!token) return;

    const data = await removeFromCart({ productId }, token);
    setCart(data.items || []);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,
        addItem,
        removeItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
