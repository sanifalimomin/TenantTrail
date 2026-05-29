import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { APARTMENTS, NEIGHBOURHOOD_OPTIONS, SORT_OPTIONS } from '../../data/mockData'
import useStyles from '../../styles/useStyles'

const TOTAL_REVIEWS = APARTMENTS.reduce((sum, a) => sum + a.reviews, 0)
const UNIQUE_HOODS = new Set(APARTMENTS.map(a => a.neighbourhood)).size

export default function Dashboard() {
  const s = useStyles()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [neighbourhood, setNeighbourhood] = useState(NEIGHBOURHOOD_OPTIONS[0])
  const [sort, setSort] = useState(SORT_OPTIONS[0])

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  const filtered = useMemo(() => {
    let list = [...APARTMENTS]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.address.toLowerCase().includes(q) ||
        a.neighbourhood.toLowerCase().includes(q)
      )
    }
    if (neighbourhood !== NEIGHBOURHOOD_OPTIONS[0]) {
      list = list.filter(a => a.neighbourhood === neighbourhood)
    }
    if (sort === 'Highest Rated') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'Lowest Rated') list.sort((a, b) => a.rating - b.rating)
    else if (sort === 'Most Reviews') list.sort((a, b) => b.reviews - a.reviews)
    return list
  }, [search, neighbourhood, sort])

  return (
    <div className={s.dashboard}>
      <nav className={s.dashNav}>
        <a className={s.dashLogo} href="/" onClick={e => { e.preventDefault(); navigate('/') }}>
          TenantTrails
        </a>
        <div className={s.dashSearch}>
          <span className={s.dashSearchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search apartments by address or neighbourhood ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={s.dashNavRight}>
          <div className={s.dashAvatar}>{initials}</div>
          <span className={s.dashUsername}>{user?.name?.split(' ')[0]}</span>
          <button className={s.dashSignout} onClick={handleSignOut}>Sign out</button>
        </div>
      </nav>

      <div className={s.dashContent}>
        <h1 className={s.dashTitle}>Apartments in Halifax</h1>
        <p className={s.dashSubtitle}>Honest reviews from real tenants. Read before you rent.</p>

        <div className={s.filterPills}>
          <div className={s.pill}>{APARTMENTS.length} apartments</div>
          <div className={s.pill}>{TOTAL_REVIEWS} reviews</div>
          <div className={s.pill}>{UNIQUE_HOODS} neighbourhoods</div>
        </div>

        <div className={s.filterDropdowns}>
          <div className={s.filterSelectWrap}>
            <select
              className={s.filterSelect}
              value={neighbourhood}
              onChange={e => setNeighbourhood(e.target.value)}
            >
              {NEIGHBOURHOOD_OPTIONS.map(n => <option key={n}>{n}</option>)}
            </select>
            <svg className={s.selectArrow} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={s.filterSelectWrap}>
            <select
              className={s.filterSelect}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <svg className={s.selectArrow} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={s.noResults}>No apartments match your search.</div>
        ) : (
          <div className={s.aptGrid}>
            {filtered.map(apt => (
              <div key={apt.id} className={s.aptCard}>
                <div className={s.aptImg} style={{ background: apt.gradient }}>
                  <div className={s.aptRatingBadge}>
                    <span className={s.badgeStar}>★</span> {apt.rating.toFixed(1)}
                  </div>
                </div>
                <div className={s.aptBody}>
                  <div className={s.aptName}>{apt.name}</div>
                  <div className={s.aptAddress}>
                    <span className={s.pin}>📍</span>
                    {apt.address} · {apt.neighbourhood}
                  </div>
                  <div className={s.aptTags}>
                    {apt.tags.length > 0
                      ? apt.tags.map(t => <span key={t} className={s.tag}>{t}</span>)
                      : <span className={s.tagEmpty}>No AI summary yet</span>
                    }
                  </div>
                  <div className={s.aptFooter}>
                    <span className={s.reviewCount}>
                      {apt.reviews} {apt.reviews === 1 ? 'review' : 'reviews'}
                    </span>
                    <div className={s.starsRow}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < apt.stars ? s.starFilled : s.starEmpty}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
