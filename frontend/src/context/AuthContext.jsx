import { createContext, useContext, useEffect, useState } from 'react'
import { apiFetch } from '../data/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/auth/me')
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function signIn(email, password) {
    try {
      const { user } = await apiFetch('/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      setUser(user)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  async function signUp(name, email, password) {
    try {
      const { user } = await apiFetch('/auth/signup', {
        method: 'POST',
        body: { name, email, password },
      })
      setUser(user)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  async function signOut() {
    await apiFetch('/auth/logout', { method: 'POST' }).catch(() => {})
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
