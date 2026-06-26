import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../data/api'
import { normalizeApartment } from '../../utils/apartment'
import useStyles from '../../styles/useStyles'

const SORT_OPTIONS = ['Highest Rated', 'Most Reviews', 'Lowest Rated']

export default function Dashboard() {
  const s = useStyles()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [apartments, setApartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [neighbourhood, setNeighbourhood] = useState('All Neighbourhoods')
  const [sort, setSort] = useState(SORT_OPTIONS[0])

  useEffect(() => {
    apiFetch('/apartments')
      .then(data => setApartments(data.map(normalizeApartment)))
      .catch(() => setError('Could not load apartments.'))
      .finally(() => setLoading(false))
  }, [])

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const neighbourhoodOptions = useMemo(
    () => ['All Neighbourhoods', ...new Set(apartments.map(a => a.neighbourhood).filter(Boolean))],
    [apartments],
  )

  const totalReviews = useMemo(
    () => apartments.reduce((sum, a) => sum + a.reviews, 0),
    [apartments],
  )
  const uniqueHoods = neighbourhoodOptions.length - 1

  const filtered = useMemo(() => {
    let list = [...apartments]
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(a =>
        a.name?.toLowerCase().includes(q) ||
        a.address?.toLowerCase().includes(q) ||
        a.neighbourhood?.toLowerCase().includes(q)
      )
    }
    if (neighbourhood !== 'All Neighbourhoods') {
      list = list.filter(a => a.neighbourhood === neighbourhood)
    }
    if (sort === 'Highest Rated') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'Lowest Rated') list.sort((a, b) => a.rating - b.rating)
    else if (sort === 'Most Reviews') list.sort((a, b) => b.reviews - a.reviews)
    return list
  }, [apartments, search, neighbourhood, sort])

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
          <button className={s.dashAvatar} onClick={() => navigate('/profile')} aria-label="Your profile">
            {initials}
          </button>
          <button className={s.dashUsername} onClick={() => navigate('/profile')}>
            {user?.name?.split(' ')[0]}
          </button>
          <button className={s.dashSignout} onClick={handleSignOut}>Sign out</button>
        </div>
      </nav>

      <div className={s.dashContent}>
        <h1 className={s.dashTitle}>Apartments in Halifax</h1>
        <p className={s.dashSubtitle}>Honest reviews from real tenants. Read before you rent.</p>

        <div className={s.filterPills}>
          <div className={s.pill}>{apartments.length} apartments</div>
          <div className={s.pill}>{totalReviews} reviews</div>
          <div className={s.pill}>{uniqueHoods} neighbourhoods</div>
        </div>

        <div className={s.filterDropdowns}>
          <div className={s.filterSelectWrap}>
            <select
              className={s.filterSelect}
              value={neighbourhood}
              onChange={e => setNeighbourhood(e.target.value)}
            >
              {neighbourhoodOptions.map(n => <option key={n}>{n}</option>)}
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

        {loading ? (
          <div className={s.noResults}>Loading apartments …</div>
        ) : error ? (
          <div className={s.noResults}>{error}</div>
        ) : filtered.length === 0 ? (
          <div className={s.noResults}>No apartments match your search.</div>
        ) : (
          <div className={s.aptGrid}>
            {filtered.map(apt => (
              <div key={apt.id} className={s.aptCard} onClick={() => navigate(`/apartment/${apt.id}`)}>
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
                      ? apt.tags.map(tg => <span key={tg} className={s.tag}>{tg}</span>)
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
