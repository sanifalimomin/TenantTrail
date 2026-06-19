import { useMemo, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useReviews } from '../../context/ReviewsContext'
import { APARTMENTS } from '../../data/mockData'
import { initialsOf, formatDate } from '../../utils/reviewValidation'
import AppHeader from '../../components/AppHeader/AppHeader'
import ReviewModal from '../../components/ReviewModal/ReviewModal'
import useStyles from '../../styles/useStyles'

function Stars({ count }) {
  return '★★★★★'.slice(0, count) + '☆☆☆☆☆'.slice(0, 5 - count)
}

function ReviewCard({ review }) {
  const s = useStyles()
  const { user } = useAuth()
  const { addComment } = useReviews()
  const [open, setOpen] = useState(review.comments.length > 0)
  const [comment, setComment] = useState('')

  const isMine = user?.email === review.author.email

  function submitComment() {
    if (!comment.trim()) return
    addComment(review.id, comment)
    setComment('')
    setOpen(true)
  }

  return (
    <div className={s.reviewItem}>
      <div className={s.reviewTop}>
        <div className={s.appAvatar}>{initialsOf(review.author.name)}</div>
        <div className={s.reviewMeta}>
          <div className={s.reviewAuthorRow}>
            <span>
              <span className={s.reviewAuthor}>{review.author.name}</span>
              {isMine && <span className={s.reviewYouTag}>(you)</span>}
              <span className={s.reviewDate}> · {formatDate(review.date)}</span>
            </span>
            <span className={s.reviewStars}><Stars count={review.rating} /></span>
          </div>
          <p className={s.reviewText}>{review.text}</p>

          <button className={s.commentToggle} onClick={() => setOpen(o => !o)}>
            💬 {review.comments.length} {review.comments.length === 1 ? 'comment' : 'comments'}
          </button>

          {open && (
            <div className={s.commentBlock}>
              {review.comments.map((c, i) => (
                <div key={i} className={s.commentItem}>
                  <div className={s.commentHead}>
                    <span className={s.commentAuthor}>{c.author.name}</span>
                    <span className={s.commentDate}>{formatDate(c.date)}</span>
                  </div>
                  <div className={s.commentText}>{c.text}</div>
                </div>
              ))}
              <div className={s.commentForm}>
                <input
                  className={s.commentInput}
                  placeholder="Write a comment ..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') submitComment() }}
                />
                <button className={s.replyBtn} onClick={submitComment} disabled={!comment.trim()}>
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ApartmentDetail() {
  const s = useStyles()
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { reviewsFor, addReview } = useReviews()
  const [showModal, setShowModal] = useState(false)

  const apartment = APARTMENTS.find(a => a.id === Number(id))
  const reviews = reviewsFor(Number(id))

  // Live rating + breakdown derived from the current reviews.
  const { average, breakdown } = useMemo(() => {
    const counts = [0, 0, 0, 0, 0] // index 0 -> 1 star ... index 4 -> 5 stars
    let sum = 0
    reviews.forEach(r => {
      counts[r.rating - 1] += 1
      sum += r.rating
    })
    return {
      average: reviews.length ? sum / reviews.length : 0,
      breakdown: counts,
    }
  }, [reviews])

  if (!user) return <Navigate to="/signin" replace />
  if (!apartment) {
    return (
      <div className={s.page}>
        <AppHeader />
        <div className={s.pageContent}>
          <button className={s.backLink} onClick={() => navigate('/dashboard')}>← Back to all apartments</button>
          <div className={s.profileEmpty}>That apartment could not be found.</div>
        </div>
      </div>
    )
  }

  const maxCount = Math.max(1, ...breakdown)
  const roundedStars = Math.round(average)

  function handleSubmit({ rating, text }) {
    addReview({ apartmentId: apartment.id, rating, text })
    setShowModal(false)
  }

  return (
    <div className={s.page}>
      <AppHeader />
      <div className={s.pageContent}>
        <button className={s.backLink} onClick={() => navigate('/dashboard')}>
          ← Back to all apartments
        </button>

        <div className={s.detailGrid}>
          <div className={s.detailMain}>
            {/* Header */}
            <div className={s.detailHeaderCard}>
              <div>
                <div className={s.detailName}>{apartment.name}</div>
                <div className={s.detailAddress}>
                  <span className={s.pin}>📍</span>
                  {apartment.address} · {apartment.neighbourhood}
                </div>
                <div className={s.detailDesc}>{apartment.description}</div>
              </div>
              <div className={s.detailScore}>
                <div className={s.detailScoreNum}>{average.toFixed(1)}</div>
                <div className={s.detailScoreStars}><Stars count={roundedStars} /></div>
                <div className={s.detailScoreCount}>
                  {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>

            {/* AI summary */}
            <div className={s.card}>
              <div className={s.aiHeader}>✦ AI-Generated Summary</div>
              <p className={s.aiText}>
                {apartment.aiSummary ||
                  'Not enough reviews yet to generate a summary. Be the first to share your experience.'}
              </p>
              {apartment.tags.length > 0 && (
                <>
                  <div className={s.sectionLabel} style={{ marginTop: 18 }}>Key Issues</div>
                  <div className={s.issueTags}>
                    {apartment.tags.map(tag => (
                      <span key={tag} className={s.issueTag}>{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Reviews */}
            <div className={s.card}>
              <div className={s.reviewsHeader}>
                <div className={s.reviewsTitle}>Reviews ({reviews.length})</div>
                <button className={s.writeReviewBtn} onClick={() => setShowModal(true)}>
                  ＋ Write a Review
                </button>
              </div>
              {reviews.length === 0 ? (
                <div className={s.emptyReviews}>No reviews yet. Be the first to write one.</div>
              ) : (
                reviews.map(r => <ReviewCard key={r.id} review={r} />)
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className={s.detailSidebar}>
            <div className={s.card}>
              <div className={s.sectionLabel}>Property Info</div>
              <div className={s.infoRow}>
                <span className={s.infoKey}>Landlord</span>
                <span className={s.infoVal}>{apartment.landlord}</span>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoKey}>Units</span>
                <span className={s.infoVal}>{apartment.units}</span>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoKey}>Year built</span>
                <span className={s.infoVal}>{apartment.yearBuilt}</span>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoKey}>Neighbourhood</span>
                <span className={s.infoVal}>{apartment.neighbourhood}</span>
              </div>
            </div>

            <div className={s.card}>
              <div className={s.sectionLabel}>Rating Breakdown</div>
              {[5, 4, 3, 2, 1].map(star => {
                const count = breakdown[star - 1]
                return (
                  <div key={star} className={s.breakdownRow}>
                    <span className={s.breakdownStar}>{star} <span className={s.badgeStar}>★</span></span>
                    <span className={s.breakdownBar}>
                      <span
                        className={s.breakdownFill}
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </span>
                    <span className={s.breakdownCount}>{count}</span>
                  </div>
                )
              })}
              <button className={s.sidebarCta} style={{ marginTop: 14 }} onClick={() => setShowModal(true)}>
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ReviewModal
          mode="create"
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
