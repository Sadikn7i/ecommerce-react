// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
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
          <Link to="/wishlist" style={styles.link}>❤️ Wishlist</Link>
          <Link to="/cart" style={styles.linkWithBadge}>
            Cart
            {cartCount > 0 && (
              <span style={styles.badge}>{cartCount}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/orders" style={styles.link}>📦 Orders</Link>
              <span style={styles.userName}>Hi, {user?.firstName}!</span>
              <button onClick={logout} style={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/signup" style={styles.signupButton}>Sign Up</Link>
            </>
          )}
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
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,
  linkWithBadge: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    position: 'relative',
    whiteSpace: 'nowrap' as const,
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
  userName: {
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '0 8px',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    textDecoration: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
  } as React.CSSProperties,
};

export default Header;
