import { describe, it, expect } from 'vitest'
import {
  validateReview,
  initialsOf,
  formatDate,
  REVIEW_MIN_LENGTH,
} from '../utils/reviewValidation'

describe('validateReview', () => {
  const goodText = 'The building is quiet and well maintained.'

  it('rejects a missing rating', () => {
    const r = validateReview({ rating: 0, text: goodText })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/star rating/i)
  })

  it('rejects a rating outside 1–5', () => {
    expect(validateReview({ rating: 6, text: goodText }).ok).toBe(false)
    expect(validateReview({ rating: -1, text: goodText }).ok).toBe(false)
  })

  it('rejects empty or whitespace-only review text', () => {
    expect(validateReview({ rating: 4, text: '' }).ok).toBe(false)
    expect(validateReview({ rating: 4, text: '    ' }).ok).toBe(false)
  })

  it('rejects review text below the minimum length', () => {
    const short = 'a'.repeat(REVIEW_MIN_LENGTH - 1)
    const r = validateReview({ rating: 4, text: short })
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/at least/i)
  })

  it('accepts a valid rating and review', () => {
    const r = validateReview({ rating: 5, text: goodText })
    expect(r.ok).toBe(true)
    expect(r.error).toBeNull()
  })
})

describe('initialsOf', () => {
  it('returns up to two uppercase initials', () => {
    expect(initialsOf('Alex Mitchell')).toBe('AM')
    expect(initialsOf('madonna')).toBe('M')
  })

  it('handles empty input', () => {
    expect(initialsOf('')).toBe('?')
    expect(initialsOf(undefined)).toBe('?')
  })
})

describe('formatDate', () => {
  it('formats an ISO date into a readable label', () => {
    expect(formatDate('2024-04-03')).toBe('Apr 3, 2024')
  })
})
