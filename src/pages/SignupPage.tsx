// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await signup(form.email, form.password, form.firstName, form.lastName);
    setLoading(false);
    if (success) {
      showToast('Signup successful!', 'success');
      navigate('/');
    } else {
      showToast('Signup failed. Try a different email.', 'error');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Sign Up</h1>
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p style={styles.text}>Already have an account? <Link to="/login">Log In</Link></p>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
};

const styles = {
  container: { maxWidth: 400, margin: '60px auto', padding: 24, background: 'white', borderRadius: 12, boxShadow: '0 2px 16px #eee' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  title: { fontSize: '2rem', marginBottom: 10, textAlign: 'center' as const },
  input: { padding: '12px', fontSize: '1rem', borderRadius: 6, border: '1px solid #ccc' },
  button: { padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold', fontSize: '1.15rem', cursor: 'pointer' },
  text: { fontSize: '0.95rem', textAlign: 'center' as const }
};

export default SignupPage;
