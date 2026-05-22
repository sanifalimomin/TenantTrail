import './Hero.css'

const features = [
  { icon: '⭐', title: 'Verified Reviews', desc: 'Real ratings with photos and videos from past tenants.' },
  { icon: '👑', title: 'AI Summaries', desc: 'Key issues and sentiment extracted from every review.' },
  { icon: '💬', title: 'Ask Questions', desc: 'Comment on reviews and get answers from past tenants.' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-badge">Launching in Halifax, Nova Scotia</div>
      <h1>Know what you&apos;re signing before you sign it.</h1>
      <p className="hero-sub">
        Read honest reviews from past tenants. See AI-generated summaries.
        Make informed decisions about where you live.
      </p>
      <div className="hero-buttons">
        <button className="btn-create">Create Free Account</button>
        <button className="btn-signin-outline">Sign In</button>
      </div>
      <div className="hero-features">
        {features.map(f => (
          <div key={f.title} className="feature-item">
            <span className="feature-icon">{f.icon}</span>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
