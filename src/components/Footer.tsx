// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* About Section */}
        <div style={styles.section}>
          <h3 style={styles.title}>🛍️ ShopHub</h3>
          <p style={styles.text}>
            Your one-stop shop for quality products at unbeatable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.subtitle}>Quick Links</h4>
          <ul style={styles.list}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/products" style={styles.link}>Products</a></li>
            <li><a href="/cart" style={styles.link}>Cart</a></li>
            <li><a href="/wishlist" style={styles.link}>Wishlist</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.section}>
          <h4 style={styles.subtitle}>Contact Us</h4>
          <div style={styles.contactInfo}>
            <p style={styles.contactItem}>
              <span style={styles.icon}>📧</span>
              <a href="mailto:spiritx98@gmail.com" style={styles.emailLink}>
                spiritx98@gmail.com
              </a>
            </p>
            <p style={styles.contactItem}>
              <span style={styles.icon}>🌍</span>
              <span>Based in Japan 🇯🇵</span>
            </p>
            <p style={styles.contactItem}>
              <span style={styles.icon}>💼</span>
              <a 
                href="https://www.linkedin.com/in/sadik-aden-a24440385/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.link}
              >
                LinkedIn
              </a>
            </p>
            <p style={styles.contactItem}>
              <span style={styles.icon}>💻</span>
              <a 
                href="https://github.com/Sadikn7i" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.link}
              >
                GitHub
              </a>
            </p>
          </div>
        </div>

        {/* Support */}
        <div style={styles.section}>
          <h4 style={styles.subtitle}>Support</h4>
          <p style={styles.text}>
            Have feedback, complaints, or feature requests?
          </p>
          <a 
            href="mailto:spiritx98@gmail.com?subject=ShopHub Feedback" 
            style={styles.button}
          >
            Send Feedback
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          © {currentYear} ShopHub. Built with ❤️ by{' '}
          <a 
            href="https://github.com/Sadikn7i" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.authorLink}
          >
            Sadik Aden
          </a>
        </p>
        <p style={styles.tagline}>
          <em>Signal detected. Noise canceled.</em> ✨
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    marginTop: '80px',
    padding: '60px 20px 20px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.3rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#3498db',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#ecf0f1',
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    display: 'block',
    marginBottom: '10px',
    transition: 'color 0.3s',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1rem',
    color: '#ecf0f1',
  },
  icon: {
    fontSize: '1.2rem',
  },
  emailLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
  button: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '12px 24px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    transition: 'background-color 0.3s',
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '30px',
    textAlign: 'center' as const,
  },
  copyright: {
    fontSize: '0.95rem',
    color: '#ecf0f1',
    marginBottom: '10px',
  },
  authorLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: '0.9rem',
    color: '#95a5a6',
    fontStyle: 'italic',
  },
};

export default Footer;
