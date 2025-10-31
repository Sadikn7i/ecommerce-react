// src/context/OrderContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem } from './CartContext';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, shippingAddress: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (items: CartItem[], total: number, shippingAddress: string) => {
    const newOrder: Order = {
      id: 'ORD-' + Date.now(),
      date: new Date().toISOString(),
      items,
      total,
      status: 'pending',
      shippingAddress,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};
