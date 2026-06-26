import { useState } from 'react'
import useStyles from '../../styles/useStyles'

export default function StarRating({ value, onChange }) {
  const s = useStyles()
  const [hover, setHover] = useState(0)
  const active = hover || value

  return (
    <div className={s.starInput} role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={`${s.starBtn} ${n <= active ? s.starBtnActive : ''}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  )
}
