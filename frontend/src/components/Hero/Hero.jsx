import { useNavigate } from 'react-router-dom'
import { HERO_FEATURES } from '../../data/mockData'
import useStyles from '../../styles/useStyles'

export default function Hero() {
  const s = useStyles()
  const navigate = useNavigate()
  return (
    <section className={s.hero}>
      <div className={s.heroBadge}>Launching in Halifax, Nova Scotia</div>
      <h1 className={s.heroH1}>Know what you&apos;re signing before you sign it.</h1>
      <p className={s.heroSub}>
        Read honest reviews from past tenants. See AI-generated summaries.
        Make informed decisions about where you live.
      </p>
      <div className={s.heroButtons}>
        <button className={s.btnCreate} onClick={() => navigate('/signup')}>Create Free Account</button>
        <button className={s.btnSigninOutline} onClick={() => navigate('/signin')}>Sign In</button>
      </div>
      <div className={s.heroFeatures}>
        {HERO_FEATURES.map(f => (
          <div key={f.title} className={s.featureItem}>
            <span className={s.featureIcon}>{f.icon}</span>
            <h4 className={s.featureTitle}>{f.title}</h4>
            <p className={s.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
