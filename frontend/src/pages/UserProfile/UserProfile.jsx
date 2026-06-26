import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../data/api'
import { initialsOf } from '../../utils/reviewValidation'
import AppHeader from '../../components/AppHeader/AppHeader'
import ReviewModal from '../../components/ReviewModal/ReviewModal'
import useStyles from '../../styles/useStyles'

function stars(count) {
  return '★★★★★'.slice(0, count) + '☆☆☆☆☆'.slice(0, 5 - count)
}

export default function UserProfile() {
  const s = useStyles()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)

  const loadProfile = useCallback(() => {
    return apiFetch('/profile')
      .then(data => setReviews(data.reviews))
      .catch(() => setError('Could not load your profile.'))
  }, [])

  useEffect(() => {
    loadProfile().finally(() => setLoading(false))
  }, [loadProfile])

  async function handleDelete(review) {
    if (!window.confirm('Delete this review? This cannot be undone.')) return
    await apiFetch(`/reviews/${review.id}`, { method: 'DELETE' })
    await loadProfile()
  }

  async function handleSaveEdit({ rating, text, imageUrl }) {
    await apiFetch(`/reviews/${editing.id}`, {
      method: 'PUT',
      body: { rating, body: text, imageUrl },
    })
    setEditing(null)
    await loadProfile()
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
            <div className={s.profileAvatar}>{initialsOf(user?.name)}</div>
            <div>
              <div className={s.profileName}>{user?.name}</div>
              <div className={s.profileEmail}>{user?.email}</div>
            </div>
          </div>
          <div className={s.profileStats}>
            <div className={s.profileStat}>
              <div className={s.profileStatNum}>{reviews.length}</div>
              <div className={s.profileStatLabel}>Reviews</div>
            </div>
          </div>
        </div>

        <h2 className={s.profileSectionTitle}>Your Reviews</h2>

        {loading ? (
          <div className={s.profileEmpty}>Loading …</div>
        ) : error ? (
          <div className={s.profileEmpty}>{error}</div>
        ) : reviews.length === 0 ? (
          <div className={s.profileEmpty}>
            You haven&apos;t written any reviews yet. Browse apartments to add one.
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className={s.profileReviewCard}>
              <div>
                <div className={s.profileReviewName}>{review.aptName}</div>
                <div className={s.profileReviewStars}>{stars(review.rating)}</div>
                <p className={s.profileReviewText}>{review.body}</p>
              </div>
              <div className={s.profileReviewActions}>
                <button
                  className={s.actionView}
                  onClick={() => navigate(`/apartment/${review.aptId}`)}
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
          initial={{ rating: editing.rating, text: editing.body, imageUrl: editing.imageUrl }}
          onSubmit={handleSaveEdit}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
