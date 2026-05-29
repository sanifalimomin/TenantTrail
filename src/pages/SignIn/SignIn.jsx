import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useStyles from '../../styles/useStyles'

export default function SignIn() {
  const s = useStyles()
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/dashboard" replace />

  function handleSubmit(evt) {
    evt.preventDefault()
    if (!email.trim()) return setError('Email is required.')
    if (!password) return setError('Password is required.')
    const res = signIn(email.trim(), password)
    if (res.ok) navigate('/dashboard')
    else setError(res.error)
  }

  return (
    <div className={s.authPage}>
      <div className={s.authCard}>
        <div className={s.authLogo}>TenantTrails</div>
        <p className={s.authSubtitle}>See what past tenants had to say, before you sign.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={s.formGroup}>
            <label className={s.formLabel} htmlFor="email">Email</label>
            <input
              className={s.formInput}
              type="email"
              id="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div className={s.formGroup}>
            <label className={s.formLabel} htmlFor="password">Password</label>
            <input
              className={s.formInput}
              type="password"
              id="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          {error && <p className={s.formError}>{error}</p>}

          <button type="submit" className={s.btnPrimary}>Sign In</button>
        </form>

        <p className={s.authSwitch}>Don&apos;t have an account? <Link to="/signup">Create one</Link></p>
        <div className={s.demoBox}>Demo: <strong>alex@dal.ca / password123</strong></div>
      </div>
    </div>
  )
}
