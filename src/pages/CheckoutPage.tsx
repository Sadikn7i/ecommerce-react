// src/pages/CheckoutPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} style={styles.shopButton}>
          Go Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Valid phone number is required';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Valid 16-digit card number is required';
    }
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date (MM/YY) is required';
    }
    if (!formData.cvv.trim() || !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Valid CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate order placement
      showToast('Order placed successfully! 🎉', 'success');
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 2000);
    } else {
      showToast('Please fix the errors in the form', 'error');
    }
  };

  const subtotal = getCartTotal();
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.layout}>
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Shipping Information */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>📦 Shipping Information</h2>
            
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={errors.firstName ? styles.inputError : styles.input}
                />
                {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={errors.lastName ? styles.inputError : styles.input}
                />
                {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={errors.email ? styles.inputError : styles.input}
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={errors.phone ? styles.inputError : styles.input}
                />
                {errors.phone && <span style={styles.error}>{errors.phone}</span>}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={errors.address ? styles.inputError : styles.input}
              />
              {errors.address && <span style={styles.error}>{errors.address}</span>}
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={errors.city ? styles.inputError : styles.input}
                />
                {errors.city && <span style={styles.error}>{errors.city}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  style={errors.zipCode ? styles.inputError : styles.input}
                />
                {errors.zipCode && <span style={styles.error}>{errors.zipCode}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={errors.country ? styles.inputError : styles.input}
                />
                {errors.country && <span style={styles.error}>{errors.country}</span>}
              </div>
            </div>
          </section>

          {/* Payment Information */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>💳 Payment Information</h2>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                style={errors.cardNumber ? styles.inputError : styles.input}
              />
              {errors.cardNumber && <span style={styles.error}>{errors.cardNumber}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Cardholder Name *</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                style={errors.cardName ? styles.inputError : styles.input}
              />
              {errors.cardName && <span style={styles.error}>{errors.cardName}</span>}
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Expiry Date (MM/YY) *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="12/25"
                  maxLength={5}
                  style={errors.expiryDate ? styles.inputError : styles.input}
                />
                {errors.expiryDate && <span style={styles.error}>{errors.expiryDate}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={4}
                  style={errors.cvv ? styles.inputError : styles.input}
                />
                {errors.cvv && <span style={styles.error}>{errors.cvv}</span>}
              </div>
            </div>
          </section>

          <button type="submit" style={styles.submitButton}>
            Place Order - ${total.toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>

          <div style={styles.summaryItems}>
            {cart.map(item => (
              <div key={item.id} style={styles.summaryItem}>
                <img src={item.image} alt={item.title} style={styles.summaryImage} />
                <div style={styles.summaryItemInfo}>
                  <p style={styles.summaryItemTitle}>{item.title}</p>
                  <p style={styles.summaryItemQty}>Qty: {item.quantity}</p>
                </div>
                <p style={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div style={styles.summaryTotals}>
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <hr style={styles.divider} />
            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '40px',
    color: '#2c3e50',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 450px',
    gap: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px',
  },
  section: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '25px',
    color: '#2c3e50',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    marginBottom: '20px',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#2c3e50',
  },
  input: {
    padding: '12px 15px',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputError: {
    padding: '12px 15px',
    fontSize: '1rem',
    border: '2px solid #e74c3c',
    borderRadius: '8px',
    outline: 'none',
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginTop: '5px',
  },
  submitButton: {
    padding: '18px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  summary: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    height: 'fit-content',
    position: 'sticky' as const,
    top: '20px',
  },
  summaryTitle: {
    fontSize: '1.5rem',
    marginBottom: '25px',
    color: '#2c3e50',
  },
  summaryItems: {
    maxHeight: '400px',
    overflowY: 'auto' as const,
    marginBottom: '25px',
  },
  summaryItem: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #ecf0f1',
  },
  summaryImage: {
    width: '60px',
    height: '60px',
    objectFit: 'contain' as const,
    borderRadius: '6px',
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryItemTitle: {
    fontSize: '0.9rem',
    marginBottom: '5px',
    color: '#2c3e50',
  },
  summaryItemQty: {
    fontSize: '0.85rem',
    color: '#7f8c8d',
  },
  summaryItemPrice: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#27ae60',
  },
  summaryTotals: {
    paddingTop: '15px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '1rem',
    color: '#555',
  },
  divider: {
    border: 'none',
    borderTop: '2px solid #e0e0e0',
    margin: '15px 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  emptyContainer: {
    textAlign: 'center' as const,
    padding: '100px 20px',
  },
  shopButton: {
    marginTop: '20px',
    padding: '15px 30px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
};

export default CheckoutPage;
