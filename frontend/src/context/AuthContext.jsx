import { createContext, useContext, useState } from 'react'
import { DEMO_USER } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accounts, setAccounts] = useState([DEMO_USER])

  function signIn(email, password) {
    const match = accounts.find(a => a.email === email && a.password === password)
    if (match) {
      setUser({ name: match.name, email: match.email })
      return { ok: true }
    }
    return { ok: false, error: 'Invalid email or password.' }
  }

  function signUp(name, email, password) {
    if (accounts.find(a => a.email === email)) {
      return { ok: false, error: 'Email already in use.' }
    }
    const newUser = { name, email, password }
    setAccounts(prev => [...prev, newUser])
    setUser({ name, email })
    return { ok: true }
  }

  function signOut() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
