// src/context/ReviewContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Review {
  id: string;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (productId: number, rating: number, comment: string, userName: string) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId: number, rating: number, comment: string, userName: string) => {
    const newReview: Review = {
      id: 'REV-' + Date.now(),
      productId,
      userId: Date.now(),
      userName,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getProductReviews = (productId: number) => {
    return reviews.filter((review) => review.productId === productId);
  };

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / productReviews.length;
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewProvider');
  }
  return context;
};
