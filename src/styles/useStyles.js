import { css, injectGlobal } from '@emotion/css'

injectGlobal`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: 'Inter', sans-serif;
    color: #111827;
    background: #f5f7fa;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  button {
    font: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }
`

// ── Design tokens ──────────────────────────────────────────
const t = {
  blue:          '#2563eb',
  blueDark:      '#1d4ed8',
  text:          '#111827',
  textSecondary: '#374151',
  textMuted:     '#6b7280',
  textFaint:     '#9ca3af',
  bg:            '#f5f7fa',
  border:        '#e5e7eb',
  borderLight:   '#d1d5db',
  amber:         '#f59e0b',
  red:           '#ef4444',
}

// ── Navbar ─────────────────────────────────────────────────
const navbar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
`

const navLogo = css`
  font-size: 18px;
  font-weight: 800;
  color: ${t.blue};
  letter-spacing: -0.3px;
  text-decoration: none;
`

const navCta = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

const navSignin = css`
  font-size: 14px;
  font-weight: 500;
  color: ${t.textSecondary};
  transition: color 0.2s;
  &:hover { color: ${t.blue}; }
`

const navBtn = css`
  background: ${t.blue};
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;
  &:hover { background: ${t.blueDark}; }
`

// ── Hero ───────────────────────────────────────────────────
const hero = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
`

const heroBadge = css`
  display: inline-block;
  background: #fff;
  border: 1px solid ${t.border};
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 500;
  color: ${t.textSecondary};
  margin-bottom: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`

const heroH1 = css`
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.5px;
  max-width: 600px;
  margin: 0 0 20px;
  @media (max-width: 640px) {
    font-size: 36px;
    letter-spacing: -1px;
  }
`

const heroSub = css`
  font-size: 16px;
  color: ${t.textMuted};
  line-height: 1.7;
  max-width: 420px;
  margin-bottom: 36px;
`

const heroButtons = css`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 64px;
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`

const btnCreate = css`
  background: ${t.blue};
  color: #fff;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  transition: background 0.2s;
  &:hover { background: ${t.blueDark}; }
`

const btnSigninOutline = css`
  background: #fff;
  color: ${t.textSecondary};
  border: 1.5px solid ${t.borderLight};
  padding: 13px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  transition: border-color 0.2s;
  &:hover { border-color: ${t.textFaint}; }
`

const heroFeatures = css`
  display: flex;
  justify-content: center;
  gap: 60px;
  @media (max-width: 640px) {
    gap: 32px;
    flex-wrap: wrap;
  }
`

const featureItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 160px;
`

const featureIcon = css`
  font-size: 28px;
  margin-bottom: 4px;
`

const featureTitle = css`
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`

const featureDesc = css`
  font-size: 13px;
  color: ${t.textFaint};
  line-height: 1.5;
  margin: 0;
`

// ── Auth (shared by SignIn + SignUp) ───────────────────────
const authPage = css`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #dce8fb 0%, #eef2fb 30%, #f5f7fc 55%, #ffffff 100%);
  padding: 24px 16px;
`

const authCard = css`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.10), 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: 40px 40px 36px;
  width: 100%;
  max-width: 400px;
`

const authLogo = css`
  font-size: 22px;
  font-weight: 800;
  color: ${t.blue};
  letter-spacing: -0.3px;
  margin-bottom: 8px;
`

const authSubtitle = css`
  font-size: 13.5px;
  color: ${t.textMuted};
  margin-bottom: 28px;
  line-height: 1.5;
`

const formGroup = css`
  margin-bottom: 16px;
`

const formLabel = css`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${t.textSecondary};
  margin-bottom: 6px;
`

const formInput = css`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid ${t.border};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: ${t.text};
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: ${t.blue};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`

const formError = css`
  font-size: 13px;
  color: ${t.red};
  margin-top: 5px;
`

const btnPrimary = css`
  display: block;
  width: 100%;
  background: ${t.blue};
  color: #fff;
  padding: 13px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
  margin-bottom: 16px;
  &:hover { background: ${t.blueDark}; }
`

const authSwitch = css`
  text-align: center;
  font-size: 13px;
  color: ${t.textMuted};
  margin-bottom: 18px;
  a {
    color: ${t.blue};
    font-weight: 600;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`

const authSwitchLast = css`
  text-align: center;
  font-size: 13px;
  color: ${t.textMuted};
  a {
    color: ${t.blue};
    font-weight: 600;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`

const demoBox = css`
  background: #eff6ff;
  border-radius: 8px;
  padding: 11px 14px;
  font-size: 13px;
  color: ${t.textSecondary};
  text-align: center;
  strong {
    color: ${t.blue};
    font-weight: 600;
  }
`

// ── Dashboard ──────────────────────────────────────────────
const dashboard = css`
  min-height: 100vh;
  background: ${t.bg};
`

const dashNav = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 32px;
  background: #fff;
  border-bottom: 1px solid ${t.border};
  position: sticky;
  top: 0;
  z-index: 10;
  @media (max-width: 640px) { padding: 12px 16px; }
`

const dashLogo = css`
  font-size: 17px;
  font-weight: 800;
  color: ${t.blue};
  text-decoration: none;
  white-space: nowrap;
`

const dashSearch = css`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f9fafb;
  border: 1.5px solid ${t.border};
  border-radius: 8px;
  padding: 8px 14px;
  flex: 1;
  max-width: 400px;
  input {
    border: none;
    background: none;
    outline: none;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    color: ${t.textMuted};
    width: 100%;
  }
  @media (max-width: 640px) { max-width: none; }
`

const dashSearchIcon = css`
  font-size: 14px;
  flex-shrink: 0;
`

const dashNavRight = css`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`

const dashAvatar = css`
  width: 32px;
  height: 32px;
  background: ${t.blue};
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
`

const dashUsername = css`
  font-size: 14px;
  font-weight: 500;
  color: ${t.text};
`

const dashSignout = css`
  font-size: 14px;
  color: ${t.textMuted};
  transition: color 0.2s;
  &:hover { color: ${t.text}; }
`

const dashContent = css`
  padding: 32px 32px 48px;
  @media (max-width: 640px) { padding: 20px 16px 32px; }
`

const dashTitle = css`
  font-size: 28px;
  font-weight: 800;
  color: ${t.text};
  letter-spacing: -0.5px;
  margin-bottom: 5px;
`

const dashSubtitle = css`
  font-size: 13.5px;
  color: ${t.textFaint};
  margin-bottom: 22px;
`

const filterPills = css`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`

const pill = css`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 100px;
  border: 1.5px solid ${t.border};
  background: #fff;
  font-size: 13px;
  font-weight: 500;
  color: ${t.textSecondary};
  white-space: nowrap;
`

const filterDropdowns = css`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`

const filterSelectWrap = css`
  position: relative;
  display: flex;
  align-items: center;
`

const filterSelect = css`
  appearance: none;
  background: #fff;
  border: 1.5px solid ${t.border};
  border-radius: 8px;
  padding: 8px 36px 8px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  color: ${t.textSecondary};
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: ${t.blue}; }
`

const selectArrow = css`
  position: absolute;
  right: 12px;
  pointer-events: none;
`

const aptGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
`

const aptCard = css`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${t.border};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10);
    transform: translateY(-2px);
  }
`

const aptImg = css`
  position: relative;
  height: 160px;
  flex-shrink: 0;
`

const aptRatingBadge = css`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 8px;
  padding: 5px 9px;
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 13px;
  font-weight: 700;
  color: ${t.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.14);
  line-height: 1;
`

const badgeStar = css`
  color: ${t.amber};
  font-size: 12px;
`

const aptBody = css`
  padding: 15px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const aptName = css`
  font-size: 15px;
  font-weight: 700;
  color: ${t.text};
  margin-bottom: 4px;
`

const aptAddress = css`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12.5px;
  color: ${t.textFaint};
  margin-bottom: 11px;
`

const pin = css`
  font-size: 11px;
  color: ${t.amber};
`

const aptTags = css`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  min-height: 26px;
  align-items: flex-start;
  margin-bottom: 12px;
`

const tag = css`
  background: #f3f4f6;
  color: ${t.textSecondary};
  font-size: 11.5px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
  white-space: nowrap;
`

const tagEmpty = css`
  background: #f9fafb;
  color: #d1d5db;
  font-size: 11.5px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px dashed ${t.border};
  white-space: nowrap;
`

const aptFooter = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`

const reviewCount = css`
  font-size: 12px;
  color: ${t.textFaint};
`

const starsRow = css`
  display: flex;
  gap: 1px;
`

const starFilled = css`
  color: ${t.amber};
  font-size: 13px;
`

const starEmpty = css`
  color: #d1d5db;
  font-size: 13px;
`

const noResults = css`
  text-align: center;
  color: ${t.textMuted};
  font-size: 14px;
  padding: 60px 20px;
`

// ── Exported hook ──────────────────────────────────────────
const styles = {
  // Navbar
  navbar, navLogo, navCta, navSignin, navBtn,
  // Hero
  hero, heroBadge, heroH1, heroSub, heroButtons,
  btnCreate, btnSigninOutline,
  heroFeatures, featureItem, featureIcon, featureTitle, featureDesc,
  // Auth
  authPage, authCard, authLogo, authSubtitle,
  formGroup, formLabel, formInput, formError,
  btnPrimary, authSwitch, authSwitchLast, demoBox,
  // Dashboard
  dashboard, dashNav, dashLogo, dashSearch, dashSearchIcon,
  dashNavRight, dashAvatar, dashUsername, dashSignout,
  dashContent, dashTitle, dashSubtitle,
  filterPills, pill, filterDropdowns,
  filterSelectWrap, filterSelect, selectArrow,
  aptGrid, aptCard, aptImg, aptRatingBadge, badgeStar,
  aptBody, aptName, aptAddress, pin,
  aptTags, tag, tagEmpty,
  aptFooter, reviewCount, starsRow, starFilled, starEmpty,
  noResults,
}

export default function useStyles() {
  return styles
}
