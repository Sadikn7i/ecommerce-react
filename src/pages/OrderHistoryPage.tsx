// src/pages/OrderHistoryPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const OrderHistoryPage: React.FC = () => {
  const { orders } = useOrders();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={styles.notAuth}>
        <h2>Please log in to view your orders</h2>
        <Link to="/login" style={styles.loginBtn}>Log In</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>📦 No Orders Yet</h2>
        <p>Start shopping to see your order history!</p>
        <Link to="/products" style={styles.shopBtn}>Browse Products</Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return '#27ae60';
      case 'shipped': return '#3498db';
      case 'processing': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order History 📦</h1>
      <p style={styles.subtitle}>{orders.length} order(s)</p>

      <div style={styles.orderList}>
        {orders.map(order => (
          <div key={order.id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              <div>
                <h3 style={styles.orderId}>Order #{order.id}</h3>
                <p style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <span style={{...styles.status, backgroundColor: getStatusColor(order.status)}}>
                {order.status.toUpperCase()}
              </span>
            </div>

            <div style={styles.items}>
              {order.items.map(item => (
                <div key={item.id} style={styles.item}>
                  <img src={item.image} alt={item.title} style={styles.itemImage} />
                  <div style={styles.itemInfo}>
                    <p style={styles.itemTitle}>{item.title}</p>
                    <p style={styles.itemQty}>Qty: {item.quantity}</p>
                  </div>
                  <p style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div style={styles.orderFooter}>
              <p style={styles.address}>📍 {order.shippingAddress}</p>
              <p style={styles.total}>Total: ${order.total.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 1000, margin: '0 auto', padding: 40 },
  title: { fontSize: '2.5rem', marginBottom: 10 },
  subtitle: { fontSize: '1.1rem', color: '#7f8c8d', marginBottom: 30 },
  orderList: { display: 'flex', flexDirection: 'column' as const, gap: 25 },
  orderCard: { background: 'white', border: '1px solid #e0e0e0', borderRadius: 12, padding: 25 },
  orderHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottom: '1px solid #ecf0f1' },
  orderId: { fontSize: '1.3rem', fontWeight: 'bold', marginBottom: 5 },
  orderDate: { fontSize: '0.95rem', color: '#7f8c8d' },
  status: { padding: '6px 15px', borderRadius: 20, color: 'white', fontSize: '0.85rem', fontWeight: 'bold' },
  items: { display: 'flex', flexDirection: 'column' as const, gap: 15, marginBottom: 20 },
  item: { display: 'flex', gap: 15, alignItems: 'center' },
  itemImage: { width: 60, height: 60, objectFit: 'contain' as const, borderRadius: 6 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: '0.95rem', marginBottom: 5 },
  itemQty: { fontSize: '0.85rem', color: '#7f8c8d' },
  itemPrice: { fontSize: '1.1rem', fontWeight: 'bold', color: '#27ae60' },
  orderFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15, borderTop: '1px solid #ecf0f1' },
  address: { fontSize: '0.95rem', color: '#555' },
  total: { fontSize: '1.4rem', fontWeight: 'bold', color: '#2c3e50' },
  empty: { textAlign: 'center' as const, padding: '100px 20px' },
  notAuth: { textAlign: 'center' as const, padding: '100px 20px' },
  shopBtn: { display: 'inline-block', marginTop: 20, padding: '15px 30px', background: '#3498db', color: 'white', textDecoration: 'none', borderRadius: 8, fontWeight: 'bold' },
  loginBtn: { display: 'inline-block', marginTop: 20, padding: '15px 30px', background: '#27ae60', color: 'white', textDecoration: 'none', borderRadius: 8, fontWeight: 'bold' }
};

export default OrderHistoryPage;
