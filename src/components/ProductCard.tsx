// src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    if (onAddToCart) onAddToCart();
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div style={styles.card}>
      <button onClick={handleWishlistToggle} style={styles.wishlistBtn}>
        {inWishlist ? '❤️' : '🤍'}
      </button>
      
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.image} alt={product.title} style={styles.image} />
        <h3 style={styles.title}>{product.title}</h3>
        <div style={styles.ratingContainer}>
          {product.rating && (
            <>
              <span style={styles.rating}>⭐ {product.rating.rate.toFixed(1)}</span>
              <span style={styles.reviewCount}>({product.rating.count} reviews)</span>
            </>
          )}
        </div>
        <p style={styles.price}>${product.price.toFixed(2)}</p>
      </Link>
      <button onClick={handleAddToCart} style={styles.button}>
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center' as const,
    width: '280px',
    margin: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    backgroundColor: 'white',
    position: 'relative' as const,
  },
  wishlistBtn: {
    position: 'absolute' as const,
    top: 15,
    right: 15,
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: 40,
    height: 40,
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '220px',
    objectFit: 'contain' as const,
    marginBottom: '15px',
  },
  title: {
    fontSize: '1em',
    height: '48px',
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis',
    marginBottom: '10px',
    fontWeight: '600',
  },
  ratingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '10px',
  },
  rating: {
    fontSize: '0.9em',
    color: '#f39c12',
    fontWeight: 'bold',
  },
  reviewCount: {
    fontSize: '0.85em',
    color: '#7f8c8d',
  },
  price: {
    fontSize: '1.4em',
    fontWeight: 'bold' as const,
    color: '#27ae60',
    marginBottom: '15px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default ProductCard;
