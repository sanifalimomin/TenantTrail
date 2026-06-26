import { useEffect, useRef, useState } from 'react'
import useStyles from '../../styles/useStyles'
import StarRating from '../StarRating/StarRating'
import { validateReview } from '../../utils/reviewValidation'
import { uploadImage } from '../../data/api'
import { optimizedImage } from '../../utils/image'

const RATING_HINTS = ['Click to rate', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']
const MAX_BYTES = 10 * 1024 * 1024

export default function ReviewModal({ mode = 'create', initial, onSubmit, onClose }) {
  const s = useStyles()
  const fileInput = useRef(null)
  const [rating, setRating] = useState(initial?.rating ?? 0)
  const [text, setText] = useState(initial?.text ?? '')
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isEdit = mode === 'edit'

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('Image must be under 10MB.')
      return
    }
    setError('')
    setUploading(true)
    try {
      const url = await uploadImage(file)
      setImageUrl(url)
    } catch (err) {
      setError(err.message || 'Upload failed.')
    } finally {
      setUploading(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  async function handleSubmit() {
    const result = validateReview({ rating, text })
    if (!result.ok) {
      setError(result.error)
      return
    }
    if (uploading) {
      setError('Please wait for the image to finish uploading.')
      return
    }
    setSubmitting(true)
    try {
      await onSubmit({ rating, text: text.trim(), imageUrl })
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setSubmitting(false)
    }
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

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />

        {imageUrl ? (
          <div style={{ marginTop: 16, position: 'relative' }}>
            <img
              src={optimizedImage(imageUrl, 800)}
              alt="Review attachment"
              style={{ width: '100%', borderRadius: 10, display: 'block', maxHeight: 240, objectFit: 'cover' }}
            />
            <button
              type="button"
              onClick={() => setImageUrl(null)}
              style={{
                position: 'absolute', top: 8, right: 8, background: 'rgba(17,24,39,0.75)',
                color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 600,
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div
            className={s.uploadBox}
            role="button"
            tabIndex={0}
            onClick={() => !uploading && fileInput.current?.click()}
            onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !uploading) fileInput.current?.click() }}
            style={{ cursor: uploading ? 'wait' : 'pointer' }}
          >
            <div style={{ fontSize: 22 }}>📎</div>
            <div>{uploading ? 'Uploading…' : 'Click to upload a photo'}</div>
            <div className={s.uploadHint}>JPG, PNG up to 10MB</div>
          </div>
        )}

        {error && <p className={s.modalError}>{error}</p>}

        <div className={s.modalActions}>
          <button className={s.modalCancel} onClick={onClose}>Cancel</button>
          <button className={s.modalSubmit} onClick={handleSubmit} disabled={submitting || uploading}>
            {submitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  )
}
