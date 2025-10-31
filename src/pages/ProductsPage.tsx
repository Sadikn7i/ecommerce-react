// src/pages/ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../components/ProductCard';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [categories, setCategories] = useState<string[]>([]);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(p => p.category).filter(Boolean)));
        setCategories(uniqueCategories as string[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortBy, products]);

  const handleAddToCart = () => {
    showToast('Product added to cart! 🎉', 'success');
  };

  if (isLoading) return <div style={styles.loading}>Loading products... ⏳</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Products</h1>

      {/* Filters */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <p style={styles.resultCount}>Showing {filteredProducts.length} products</p>

      {/* Products Grid */}
      <div style={styles.grid}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={styles.noResults}>No products found. Try different filters.</div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    textAlign: 'center' as const,
    marginBottom: '30px',
    color: '#2c3e50',
  },
  filterContainer: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  searchInput: {
    flex: '1',
    minWidth: '250px',
    maxWidth: '400px',
    padding: '12px 20px',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
  },
  select: {
    padding: '12px 20px',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
  },
  resultCount: {
    textAlign: 'center' as const,
    color: '#7f8c8d',
    marginBottom: '20px',
    fontSize: '1.1rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '20px',
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
  noResults: {
    textAlign: 'center' as const,
    fontSize: '1.3rem',
    marginTop: '50px',
    color: '#95a5a6',
  },
};

export default ProductsPage;
