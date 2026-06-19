import { createContext, useContext, useState } from 'react'
import { REVIEWS } from '../data/mockData'
import { useAuth } from './AuthContext'

const ReviewsContext = createContext(null)

let nextId = Math.max(0, ...REVIEWS.map(r => r.id)) + 1

export function ReviewsProvider({ children }) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState(REVIEWS)

  function reviewsFor(apartmentId) {
    return reviews
      .filter(r => r.apartmentId === apartmentId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  function reviewsByUser(email) {
    return reviews
      .filter(r => r.author.email === email)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // Total comments authored by a given user, across all reviews.
  function commentCountByUser(email) {
    return reviews.reduce(
      (sum, r) => sum + r.comments.filter(c => c.author.email === email).length,
      0,
    )
  }

  function addReview({ apartmentId, rating, text }) {
    if (!user) return
    const review = {
      id: nextId++,
      apartmentId,
      author: { name: user.name, email: user.email },
      date: new Date().toISOString().slice(0, 10),
      rating,
      text: text.trim(),
      comments: [],
    }
    setReviews(prev => [review, ...prev])
    return review
  }

  function updateReview(id, { rating, text }) {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, rating, text: text.trim() } : r)),
    )
  }

  function deleteReview(id) {
    setReviews(prev => prev.filter(r => r.id !== id))
  }

  function addComment(reviewId, text) {
    if (!user || !text.trim()) return
    const comment = {
      author: { name: user.name, email: user.email },
      date: new Date().toISOString().slice(0, 10),
      text: text.trim(),
    }
    setReviews(prev =>
      prev.map(r =>
        r.id === reviewId ? { ...r, comments: [...r.comments, comment] } : r,
      ),
    )
  }

  const value = {
    reviews,
    reviewsFor,
    reviewsByUser,
    commentCountByUser,
    addReview,
    updateReview,
    deleteReview,
    addComment,
  }

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}

export function useReviews() {
  return useContext(ReviewsContext)
}
