import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StarRating from '../components/StarRating/StarRating'

describe('StarRating', () => {
  it('renders five star buttons', () => {
    render(<StarRating value={0} onChange={() => {}} />)
    expect(screen.getAllByRole('radio')).toHaveLength(5)
  })

  it('calls onChange with the clicked star value', async () => {
    const onChange = vi.fn()
    render(<StarRating value={0} onChange={onChange} />)
    await userEvent.click(screen.getByLabelText('4 stars'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('marks the selected star as checked', () => {
    render(<StarRating value={3} onChange={() => {}} />)
    expect(screen.getByLabelText('3 stars')).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByLabelText('5 stars')).toHaveAttribute('aria-checked', 'false')
  })
})
