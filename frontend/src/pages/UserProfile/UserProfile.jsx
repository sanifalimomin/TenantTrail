import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useReviews } from '../../context/ReviewsContext'
import { APARTMENTS } from '../../data/mockData'
import { initialsOf } from '../../utils/reviewValidation'
import AppHeader from '../../components/AppHeader/AppHeader'
import ReviewModal from '../../components/ReviewModal/ReviewModal'
import useStyles from '../../styles/useStyles'

function stars(count) {
  return '★★★★★'.slice(0, count) + '☆☆☆☆☆'.slice(0, 5 - count)
}

function apartmentName(id) {
  return APARTMENTS.find(a => a.id === id)?.name ?? 'Unknown apartment'
}

export default function UserProfile() {
  const s = useStyles()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { reviewsByUser, commentCountByUser, updateReview, deleteReview } = useReviews()
  const [editing, setEditing] = useState(null)

  if (!user) return <Navigate to="/signin" replace />

  const myReviews = reviewsByUser(user.email)
  const commentCount = commentCountByUser(user.email)

  function handleDelete(review) {
    if (window.confirm('Delete this review? This cannot be undone.')) {
      deleteReview(review.id)
    }
  }

  function handleSaveEdit({ rating, text }) {
    updateReview(editing.id, { rating, text })
    setEditing(null)
  }

  return (
    <div className={s.page}>
      <AppHeader />
      <div className={s.pageContent}>
        <button className={s.backLink} onClick={() => navigate('/dashboard')}>
          ← Back to apartments
        </button>

        <div className={s.profileCard}>
          <div className={s.profileIdentity}>
            <div className={s.profileAvatar}>{initialsOf(user.name)}</div>
            <div>
              <div className={s.profileName}>{user.name}</div>
              <div className={s.profileEmail}>{user.email}</div>
            </div>
          </div>
          <div className={s.profileStats}>
            <div className={s.profileStat}>
              <div className={s.profileStatNum}>{myReviews.length}</div>
              <div className={s.profileStatLabel}>Reviews</div>
            </div>
            <div className={s.profileStat}>
              <div className={s.profileStatNum}>{commentCount}</div>
              <div className={s.profileStatLabel}>Comments</div>
            </div>
          </div>
        </div>

        <h2 className={s.profileSectionTitle}>Your Reviews</h2>

        {myReviews.length === 0 ? (
          <div className={s.profileEmpty}>
            You haven&apos;t written any reviews yet. Browse apartments to add one.
          </div>
        ) : (
          myReviews.map(review => (
            <div key={review.id} className={s.profileReviewCard}>
              <div>
                <div className={s.profileReviewName}>{apartmentName(review.apartmentId)}</div>
                <div className={s.profileReviewStars}>{stars(review.rating)}</div>
                <p className={s.profileReviewText}>{review.text}</p>
              </div>
              <div className={s.profileReviewActions}>
                <button
                  className={s.actionView}
                  onClick={() => navigate(`/apartment/${review.apartmentId}`)}
                >
                  View
                </button>
                <button className={s.actionEdit} onClick={() => setEditing(review)}>Edit</button>
                <button className={s.actionDelete} onClick={() => handleDelete(review)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <ReviewModal
          mode="edit"
          initial={{ rating: editing.rating, text: editing.text }}
          onSubmit={handleSaveEdit}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
