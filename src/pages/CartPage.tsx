// src/pages/CartPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <h2>🛒 Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/products" style={styles.shopButton}>
          Start Shopping
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>
      
      <div style={styles.cartLayout}>
        {/* Cart Items */}
        <div style={styles.itemsContainer}>
          {cart.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.title} style={styles.itemImage} />
              
              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  🗑️ Remove
                </button>
              </div>

              <div style={styles.quantityControls}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={styles.quantityButton}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  +
                </button>
              </div>

              <div style={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <button onClick={clearCart} style={styles.clearButton}>
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div style={styles.summaryContainer}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          
          <div style={styles.summaryRow}>
            <span>Tax (10%)</span>
            <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
          </div>
          
          <hr style={styles.divider} />
          
          <div style={styles.summaryTotal}>
            <span>Total</span>
            <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
          </div>

          <button onClick={handleCheckout} style={styles.checkoutButton}>
            Proceed to Checkout
          </button>

          <Link to="/products" style={styles.continueShopping}>
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#2c3e50',
  },
  cartLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '30px',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  cartItem: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    alignItems: 'center',
  },
  itemImage: {
    width: '120px',
    height: '120px',
    objectFit: 'contain' as const,
    borderRadius: '8px',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '1.1rem',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  itemPrice: {
    fontSize: '1.2rem',
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#e74c3c',
    cursor: 'pointer',
    fontSize: '0.95rem',
    padding: '5px 0',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '5px 10px',
  },
  quantityButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    minWidth: '30px',
    textAlign: 'center' as const,
  },
  itemTotal: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: '100px',
    textAlign: 'right' as const,
  },
  clearButton: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    height: 'fit-content',
    position: 'sticky' as const,
    top: '20px',
  },
  summaryTitle: {
    fontSize: '1.8rem',
    marginBottom: '25px',
    color: '#2c3e50',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '1.1rem',
    color: '#555',
  },
  divider: {
    border: 'none',
    borderTop: '2px solid #e0e0e0',
    margin: '20px 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '25px',
  },
  checkoutButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  continueShopping: {
    display: 'block',
    textAlign: 'center' as const,
    color: '#3498db',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  emptyCart: {
    textAlign: 'center' as const,
    padding: '100px 20px',
  },
  shopButton: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '15px 30px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
};

export default CartPage;
