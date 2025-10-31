// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to ShopHub 🛍️</h1>
        <p style={styles.heroSubtitle}>
          Discover amazing products at unbeatable prices
        </p>
        <Link to="/products" style={styles.heroButton}>
          Shop Now
        </Link>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>🚚</div>
          <h3 style={styles.featureTitle}>Free Shipping</h3>
          <p style={styles.featureText}>On all orders over $50</p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>🔒</div>
          <h3 style={styles.featureTitle}>Secure Payment</h3>
          <p style={styles.featureText}>100% secure transactions</p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>↩️</div>
          <h3 style={styles.featureTitle}>Easy Returns</h3>
          <p style={styles.featureText}>30-day return policy</p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>⭐</div>
          <h3 style={styles.featureTitle}>Quality Products</h3>
          <p style={styles.featureText}>Top-rated items only</p>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.categories}>
        <h2 style={styles.categoriesTitle}>Shop by Category</h2>
        <div style={styles.categoryGrid}>
          <Link to="/products" style={styles.categoryCard}>
            <div style={styles.categoryIcon}>👕</div>
            <h3>Clothing</h3>
          </Link>

          <Link to="/products" style={styles.categoryCard}>
            <div style={styles.categoryIcon}>💎</div>
            <h3>Jewelry</h3>
          </Link>

          <Link to="/products" style={styles.categoryCard}>
            <div style={styles.categoryIcon}>💻</div>
            <h3>Electronics</h3>
          </Link>

          <Link to="/products" style={styles.categoryCard}>
            <div style={styles.categoryIcon}>📚</div>
            <h3>Books</h3>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to start shopping?</h2>
        <p style={styles.ctaText}>Join thousands of happy customers today!</p>
        <Link to="/products" style={styles.ctaButton}>
          Browse All Products →
        </Link>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '100%',
  },
  hero: {
    textAlign: 'center' as const,
    padding: '100px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '40px',
    opacity: 0.95,
  },
  heroButton: {
    display: 'inline-block',
    padding: '18px 40px',
    backgroundColor: 'white',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '80px auto',
    padding: '0 20px',
  },
  feature: {
    textAlign: 'center' as const,
    padding: '30px',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '15px',
  },
  featureTitle: {
    fontSize: '1.3rem',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  featureText: {
    fontSize: '1rem',
    color: '#7f8c8d',
  },
  categories: {
    maxWidth: '1200px',
    margin: '80px auto',
    padding: '0 20px',
  },
  categoriesTitle: {
    fontSize: '2.5rem',
    textAlign: 'center' as const,
    marginBottom: '50px',
    color: '#2c3e50',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
  },
  categoryCard: {
    textAlign: 'center' as const,
    padding: '40px',
    backgroundColor: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#2c3e50',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  categoryIcon: {
    fontSize: '3rem',
    marginBottom: '15px',
  },
  cta: {
    textAlign: 'center' as const,
    padding: '100px 20px',
    backgroundColor: '#ecf0f1',
    marginTop: '80px',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  ctaText: {
    fontSize: '1.2rem',
    marginBottom: '40px',
    color: '#7f8c8d',
  },
  ctaButton: {
    display: 'inline-block',
    padding: '18px 40px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
};

export default HomePage;
