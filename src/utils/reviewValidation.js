// Shared validation for the review form (Submit + Edit dialogs).
export const REVIEW_MIN_LENGTH = 10
export const REVIEW_MAX_LENGTH = 1000

// Returns { ok: boolean, error: string|null }. Pure — safe to unit test.
export function validateReview({ rating, text }) {
  if (!rating || rating < 1 || rating > 5) {
    return { ok: false, error: 'Please select a star rating.' }
  }
  const trimmed = (text ?? '').trim()
  if (!trimmed) {
    return { ok: false, error: 'Please write your review.' }
  }
  if (trimmed.length < REVIEW_MIN_LENGTH) {
    return { ok: false, error: `Your review must be at least ${REVIEW_MIN_LENGTH} characters.` }
  }
  if (trimmed.length > REVIEW_MAX_LENGTH) {
    return { ok: false, error: `Your review must be under ${REVIEW_MAX_LENGTH} characters.` }
  }
  return { ok: true, error: null }
}

// Initials for an avatar, e.g. "Alex Mitchell" -> "AM".
export function initialsOf(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// "2024-04-03" -> "Apr 3, 2024". Parsed as a local date (no timezone shift).
export function formatDate(iso) {
  const [y, m, d] = String(iso).split('-').map(Number)
  if (!y || !m || !d) return iso
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
