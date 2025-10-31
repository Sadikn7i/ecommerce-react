// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { addReview, getProductReviews, getAverageRating } = useReviews();
  const { toast, showToast, hideToast } = useToast();

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const productId = parseInt(id || '0');
  const reviews = getProductReviews(productId);
  const avgRating = getAverageRating(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      showToast(`Added ${quantity} item(s) to cart! 🎉`, 'success');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please login to leave a review', 'error');
      return;
    }
    if (!reviewComment.trim()) {
      showToast('Please write a comment', 'error');
      return;
    }
    addReview(productId, reviewRating, reviewComment, user?.firstName + ' ' + user?.lastName || 'Anonymous');
    showToast('Review added! ⭐', 'success');
    setReviewComment('');
    setReviewRating(5);
  };

  if (isLoading) return <div style={styles.loading}>Loading... ⏳</div>;
  if (!product) return <div style={styles.error}>Product not found</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        ← Back
      </button>

      <div style={styles.productLayout}>
        {/* Product Image */}
        <div style={styles.imageContainer}>
          <img src={product.image} alt={product.title} style={styles.image} />
        </div>

        {/* Product Info */}
        <div style={styles.infoContainer}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.title}>{product.title}</h1>
          
          {product.rating && (
            <div style={styles.ratingContainer}>
              <span style={styles.rating}>⭐ {product.rating.rate.toFixed(1)}</span>
              <span style={styles.reviewCount}>({product.rating.count} reviews)</span>
            </div>
          )}

          {reviews.length > 0 && (
            <div style={styles.customRating}>
              <span>User Reviews: ⭐ {avgRating.toFixed(1)} ({reviews.length} reviews)</span>
            </div>
          )}

          <p style={styles.price}>${product.price.toFixed(2)}</p>

          <div style={styles.divider} />

          <h3 style={styles.descTitle}>Description</h3>
          <p style={styles.description}>{product.description}</p>

          <div style={styles.divider} />

          {/* Quantity Selector */}
          <div style={styles.quantityContainer}>
            <label style={styles.quantityLabel}>Quantity:</label>
            <div style={styles.quantityControls}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityButton}
              >
                -
              </button>
              <span style={styles.quantity}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonContainer}>
            <button onClick={handleAddToCart} style={styles.addToCartButton}>
              🛒 Add to Cart
            </button>
            <button onClick={handleBuyNow} style={styles.buyNowButton}>
              ⚡ Buy Now
            </button>
          </div>

          {/* Features */}
          <div style={styles.features}>
            <div style={styles.feature}>✓ Free Shipping</div>
            <div style={styles.feature}>✓ 30-Day Returns</div>
            <div style={styles.feature}>✓ Secure Payment</div>
            <div style={styles.feature}>✓ 1-Year Warranty</div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={styles.reviewsSection}>
        <h2 style={styles.reviewsTitle}>Customer Reviews ⭐</h2>

        {/* Add Review Form */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmitReview} style={styles.reviewForm}>
            <h3>Write a Review</h3>
            <div style={styles.ratingSelect}>
              <label>Rating: </label>
              {[1,2,3,4,5].map(star => (
                <span 
                  key={star}
                  onClick={() => setReviewRating(star)}
                  style={{...styles.star, color: star <= reviewRating ? '#f39c12' : '#ddd'}}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              style={styles.reviewTextarea}
              rows={4}
              required
            />
            <button type="submit" style={styles.submitReviewBtn}>Submit Review</button>
          </form>
        ) : (
          <p style={styles.loginPrompt}>
            Please <a href="/login">login</a> to leave a review
          </p>
        )}

        {/* Display Reviews */}
        <div style={styles.reviewsList}>
          {reviews.length === 0 ? (
            <p style={styles.noReviews}>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <strong>{review.userName}</strong>
                  <span style={styles.reviewRating}>
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                <p style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</p>
                <p style={styles.reviewText}>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#ecf0f1',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '30px',
  },
  productLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '500px',
    objectFit: 'contain' as const,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  category: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#ecf0f1',
    borderRadius: '20px',
    fontSize: '0.9rem',
    color: '#7f8c8d',
    marginBottom: '15px',
    width: 'fit-content',
    textTransform: 'capitalize' as const,
  },
  title: {
    fontSize: '2rem',
    marginBottom: '15px',
    color: '#2c3e50',
    lineHeight: '1.3',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  rating: {
    fontSize: '1.1rem',
    color: '#f39c12',
    fontWeight: 'bold',
  },
  reviewCount: {
    fontSize: '1rem',
    color: '#7f8c8d',
  },
  customRating: {
    fontSize: '1rem',
    color: '#27ae60',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  price: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '20px',
  },
  divider: {
    borderTop: '1px solid #e0e0e0',
    margin: '25px 0',
  },
  descTitle: {
    fontSize: '1.3rem',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#555',
    marginBottom: '20px',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  quantityLabel: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    padding: '8px 15px',
  },
  quantityButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    minWidth: '40px',
    textAlign: 'center' as const,
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
  },
  addToCartButton: {
    flex: 1,
    padding: '18px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buyNowButton: {
    flex: 1,
    padding: '18px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  feature: {
    padding: '12px',
    backgroundColor: '#ecf0f1',
    borderRadius: '6px',
    fontSize: '0.95rem',
    color: '#2c3e50',
  },
  reviewsSection: {
    marginTop: '60px',
    padding: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
  },
  reviewsTitle: {
    fontSize: '2rem',
    marginBottom: '30px',
  },
  reviewForm: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '40px',
  },
  ratingSelect: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    fontSize: '1.5rem',
  },
  star: {
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  reviewTextarea: {
    width: '100%',
    padding: '15px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontFamily: 'inherit',
  },
  submitReviewBtn: {
    padding: '12px 30px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  loginPrompt: {
    textAlign: 'center' as const,
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    marginBottom: '40px',
    fontSize: '1.1rem',
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  noReviews: {
    textAlign: 'center' as const,
    padding: '40px',
    color: '#7f8c8d',
    fontSize: '1.1rem',
  },
  reviewCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  reviewRating: {
    color: '#f39c12',
    fontSize: '1.2rem',
  },
  reviewDate: {
    fontSize: '0.85rem',
    color: '#7f8c8d',
    marginBottom: '15px',
  },
  reviewText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#2c3e50',
  },
  loading: {
    textAlign: 'center' as const,
    fontSize: '1.5rem',
    marginTop: '50px',
    color: '#3498db',
  },
  error: {
    textAlign: 'center' as const,
    fontSize: '1.2rem',
    marginTop: '50px',
    color: '#e74c3c',
  },
};

export default ProductDetailPage;
