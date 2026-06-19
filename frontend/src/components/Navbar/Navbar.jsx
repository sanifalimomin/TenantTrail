import { useNavigate } from 'react-router-dom'
import useStyles from '../../styles/useStyles'

export default function Navbar() {
  const s = useStyles()
  const navigate = useNavigate()
  return (
    <nav className={s.navbar}>
      <a className={s.navLogo} href="/" onClick={e => { e.preventDefault(); navigate('/') }}>
        TenantTrails
      </a>
      <div className={s.navCta}>
        <button className={s.navSignin} onClick={() => navigate('/signin')}>Sign In</button>
        <button className={s.navBtn} onClick={() => navigate('/signup')}>Get Started</button>
      </div>
    </nav>
  )
}
