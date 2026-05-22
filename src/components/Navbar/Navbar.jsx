import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <a className="nav-logo" href="#">TenantTrails</a>
      <div className="nav-cta">
        <button className="nav-signin">Sign In</button>
        <button className="nav-btn">Get Started</button>
      </div>
    </nav>
  )
}
