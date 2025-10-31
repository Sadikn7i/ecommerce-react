// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(form.email, form.password);
    setLoading(false);
    if (success) {
      showToast('Login successful!', 'success');
      navigate('/');
    } else {
      showToast('Invalid email or password', 'error');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Log In</h1>
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
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        <p style={styles.text}>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
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

export default LoginPage;
