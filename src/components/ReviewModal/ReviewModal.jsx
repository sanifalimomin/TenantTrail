import { useEffect, useState } from 'react'
import useStyles from '../../styles/useStyles'
import StarRating from '../StarRating/StarRating'
import { validateReview } from '../../utils/reviewValidation'

const RATING_HINTS = ['Click to rate', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']

// Dialog for writing a new review or editing an existing one.
// `mode` is 'create' | 'edit'. `initial` seeds rating/text on edit.
export default function ReviewModal({ mode = 'create', initial, onSubmit, onClose }) {
  const s = useStyles()
  const [rating, setRating] = useState(initial?.rating ?? 0)
  const [text, setText] = useState(initial?.text ?? '')
  const [error, setError] = useState('')

  const isEdit = mode === 'edit'

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSubmit() {
    const result = validateReview({ rating, text })
    if (!result.ok) {
      setError(result.error)
      return
    }
    onSubmit({ rating, text: text.trim() })
  }

  return (
    <div className={s.overlay} onMouseDown={onClose}>
      <div className={s.modal} role="dialog" aria-modal="true" onMouseDown={e => e.stopPropagation()}>
        <div className={s.modalHead}>
          <h2 className={s.modalTitle}>{isEdit ? 'Edit Review' : 'Write a Review'}</h2>
          <button className={s.modalClose} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={s.modalLabel}>Your rating</div>
        <StarRating value={rating} onChange={r => { setRating(r); setError('') }} />
        <div className={s.starHint}>
          {isEdit ? `${rating || 0} of 5` : RATING_HINTS[rating]}
        </div>

        <div className={s.modalLabel}>Your review</div>
        <textarea
          className={s.modalTextarea}
          value={text}
          onChange={e => { setText(e.target.value); setError('') }}
          placeholder="What was your experience living here? Cover maintenance, responsiveness, noise, pests, deposit handling, and anything future tenants should know."
        />

        {!isEdit && (
          <div className={s.uploadBox}>
            <div style={{ fontSize: 22 }}>📎</div>
            <div>Click to upload</div>
            <div className={s.uploadHint}>JPG, PNG, MP4 up to 10MB</div>
          </div>
        )}

        {error && <p className={s.modalError}>{error}</p>}

        <div className={s.modalActions}>
          <button className={s.modalCancel} onClick={onClose}>Cancel</button>
          <button className={s.modalSubmit} onClick={handleSubmit}>
            {isEdit ? 'Save Changes' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  )
}
