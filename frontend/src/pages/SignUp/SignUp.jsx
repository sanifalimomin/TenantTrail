import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useStyles from '../../styles/useStyles'

export default function SignUp() {
  const s = useStyles()
  const { user, signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})

  if (user) return <Navigate to="/dashboard" replace />

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '', general: '' }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.password) e.password = 'Password is required.'
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.'
    if (!form.confirm) e.confirm = 'Please confirm your password.'
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    return e
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)
    const res = await signUp(form.name.trim(), form.email.trim(), form.password)
    if (res.ok) navigate('/dashboard')
    else setErrors({ general: res.error })
  }

  return (
    <div className={s.authPage}>
      <div className={s.authCard}>
        <div className={s.authLogo}>TenantTrails</div>
        <p className={s.authSubtitle}>Create your free account to read tenant reviews.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={s.formGroup}>
            <label className={s.formLabel} htmlFor="name">Full Name</label>
            <input
              className={s.formInput}
              type="text"
              id="name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              autoComplete="name"
              placeholder="Alex Smith"
            />
            {errors.name && <p className={s.formError}>{errors.name}</p>}
          </div>

          <div className={s.formGroup}>
            <label className={s.formLabel} htmlFor="email">Email</label>
            <input
              className={s.formInput}
              type="email"
              id="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
            {errors.email && <p className={s.formError}>{errors.email}</p>}
          </div>

          <div className={s.formGroup}>
            <label className={s.formLabel} htmlFor="password">Password</label>
            <input
              className={s.formInput}
              type="password"
              id="password"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              autoComplete="new-password"
              placeholder="Min. 6 characters"
            />
            {errors.password && <p className={s.formError}>{errors.password}</p>}
          </div>

          <div className={s.formGroup}>
            <label className={s.formLabel} htmlFor="confirm">Confirm Password</label>
            <input
              className={s.formInput}
              type="password"
              id="confirm"
              value={form.confirm}
              onChange={e => set('confirm', e.target.value)}
              autoComplete="new-password"
              placeholder="••••••••"
            />
            {errors.confirm && <p className={s.formError}>{errors.confirm}</p>}
          </div>

          {errors.general && <p className={s.formError}>{errors.general}</p>}

          <button type="submit" className={s.btnPrimary}>Create Account</button>
        </form>

        <p className={s.authSwitchLast}>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  )
}
