// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          <h1 style={styles.logoText}>🛍️ ShopHub</h1>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/products" style={styles.link}>Products</Link>
          <Link to="/cart" style={styles.linkWithBadge}>
            Cart
            {cartCount > 0 && (
              <span style={styles.badge}>{cartCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  logo: {
    textDecoration: 'none',
    color: 'white',
  },
  logoText: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '8px 15px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  } as React.CSSProperties,
  linkWithBadge: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '8px 15px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    position: 'relative',
  } as React.CSSProperties,
  badge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  } as React.CSSProperties,
};

export default Header;
