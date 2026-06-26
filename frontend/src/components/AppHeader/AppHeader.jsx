import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { initialsOf } from '../../utils/reviewValidation'
import useStyles from '../../styles/useStyles'

export default function AppHeader() {
  const s = useStyles()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  function handleSearch(e) {
    if (e.key === 'Enter') navigate('/dashboard')
  }

  return (
    <nav className={s.dashNav}>
      <a className={s.dashLogo} href="/dashboard" onClick={e => { e.preventDefault(); navigate('/dashboard') }}>
        TenantTrails
      </a>
      <div className={s.dashSearch}>
        <span className={s.dashSearchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search apartments by address or neighbourhood ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className={s.dashNavRight}>
        <button
          className={s.appAvatar}
          onClick={() => navigate('/profile')}
          aria-label="Your profile"
        >
          {initialsOf(user?.name)}
        </button>
        <span className={s.dashUsername}>{user?.name?.split(' ')[0]}</span>
        <button className={s.dashSignout} onClick={handleSignOut}>Sign out</button>
      </div>
    </nav>
  )
}
