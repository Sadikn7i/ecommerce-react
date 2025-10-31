// src/pages/WishlistPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast, showToast, hideToast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast('Added to cart! 🎉', 'success');
  };

  if (wishlist.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>❤️ Your Wishlist is Empty</h2>
        <p>Save your favorite products here!</p>
        <Link to="/products" style={styles.shopButton}>Browse Products</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Wishlist ❤️</h1>
      <p style={styles.count}>{wishlist.length} items saved</p>
      
      <div style={styles.grid}>
        {wishlist.map(product => (
          <div key={product.id} style={styles.card}>
            <button 
              onClick={() => removeFromWishlist(product.id)}
              style={styles.removeBtn}
            >
              ✕
            </button>
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} style={styles.image} />
            </Link>
            <h3 style={styles.productTitle}>{product.title}</h3>
            <p style={styles.price}>${product.price.toFixed(2)}</p>
            <div style={styles.actions}>
              <button onClick={() => handleAddToCart(product)} style={styles.cartBtn}>
                Add to Cart
              </button>
              <Link to={`/products/${product.id}`} style={styles.viewBtn}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
};

const styles = {
  container: { maxWidth: 1200, margin: '0 auto', padding: 40 },
  title: { fontSize: '2.5rem', marginBottom: 10 },
  count: { fontSize: '1.1rem', color: '#7f8c8d', marginBottom: 30 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 30 },
  card: { background: 'white', border: '1px solid #e0e0e0', borderRadius: 12, padding: 20, position: 'relative' as const, textAlign: 'center' as const },
  removeBtn: { position: 'absolute' as const, top: 10, right: 10, background: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', fontWeight: 'bold' },
  image: { width: '100%', height: 200, objectFit: 'contain' as const, marginBottom: 15 },
  productTitle: { fontSize: '1rem', height: 45, overflow: 'hidden' as const, marginBottom: 10 },
  price: { fontSize: '1.4rem', fontWeight: 'bold', color: '#27ae60', marginBottom: 15 },
  actions: { display: 'flex', flexDirection: 'column' as const, gap: 10 },
  cartBtn: { padding: 12, background: '#3498db', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' },
  viewBtn: { padding: 12, background: '#ecf0f1', color: '#2c3e50', textDecoration: 'none', borderRadius: 6, fontWeight: 'bold' },
  empty: { textAlign: 'center' as const, padding: '100px 20px' },
  shopButton: { display: 'inline-block', marginTop: 20, padding: '15px 30px', background: '#3498db', color: 'white', textDecoration: 'none', borderRadius: 8, fontWeight: 'bold' }
};

export default WishlistPage;
