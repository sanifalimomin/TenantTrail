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

// ── Shared app header (detail + profile) ───────────────────
const appAvatar = css`
  width: 32px;
  height: 32px;
  background: #dbeafe;
  color: ${t.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
`

// ── Page shell ─────────────────────────────────────────────
const page = css`
  min-height: 100vh;
  background: ${t.bg};
`

const pageContent = css`
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 32px 56px;
  @media (max-width: 640px) { padding: 18px 16px 40px; }
`

const backLink = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  color: ${t.blue};
  font-size: 13.5px;
  font-weight: 500;
  margin-bottom: 20px;
  &:hover { text-decoration: underline; }
`

// ── Apartment detail ───────────────────────────────────────
const detailGrid = css`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`

const detailMain = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const detailSidebar = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const card = css`
  background: #fff;
  border: 1px solid ${t.border};
  border-radius: 12px;
  padding: 22px 24px;
`

const detailHeaderCard = css`
  background: #fff;
  border: 1px solid ${t.border};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`

const detailName = css`
  font-size: 26px;
  font-weight: 800;
  color: ${t.text};
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`

const detailAddress = css`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13.5px;
  color: ${t.textMuted};
  margin-bottom: 10px;
`

const detailDesc = css`
  font-size: 13.5px;
  color: ${t.textFaint};
  line-height: 1.5;
`

const detailScore = css`
  text-align: right;
  flex-shrink: 0;
`

const detailScoreNum = css`
  font-size: 40px;
  font-weight: 800;
  color: ${t.blue};
  line-height: 1;
`

const detailScoreStars = css`
  color: ${t.amber};
  font-size: 14px;
  margin: 6px 0 4px;
  letter-spacing: 1px;
`

const detailScoreCount = css`
  font-size: 12px;
  color: ${t.textFaint};
`

const aiHeader = css`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
  color: ${t.blue};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 12px;
`

const aiText = css`
  font-size: 14px;
  color: ${t.textSecondary};
  line-height: 1.65;
`

const sectionLabel = css`
  font-size: 13px;
  font-weight: 700;
  color: ${t.text};
  margin-bottom: 10px;
`

const issueTags = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const issueTag = css`
  background: #eff6ff;
  color: ${t.blue};
  font-size: 12.5px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 6px;
`

// ── Reviews list ───────────────────────────────────────────
const reviewsHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`

const reviewsTitle = css`
  font-size: 17px;
  font-weight: 700;
  color: ${t.text};
`

const writeReviewBtn = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #eff6ff;
  color: ${t.blue};
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  transition: background 0.2s;
  &:hover { background: #dbeafe; }
`

const reviewItem = css`
  padding: 18px 0;
  border-top: 1px solid ${t.border};
  &:first-of-type { border-top: none; }
`

const reviewTop = css`
  display: flex;
  align-items: flex-start;
  gap: 11px;
`

const reviewMeta = css`
  flex: 1;
  min-width: 0;
`

const reviewAuthorRow = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

const reviewAuthor = css`
  font-size: 14px;
  font-weight: 600;
  color: ${t.text};
`

const reviewYouTag = css`
  font-size: 11px;
  font-weight: 600;
  color: ${t.blue};
  margin-left: 5px;
`

const reviewDate = css`
  font-size: 12px;
  color: ${t.textFaint};
`

const reviewStars = css`
  color: ${t.amber};
  font-size: 13px;
  letter-spacing: 1px;
  flex-shrink: 0;
`

const reviewText = css`
  font-size: 13.5px;
  color: ${t.textSecondary};
  line-height: 1.6;
  margin-top: 7px;
`

const commentToggle = css`
  font-size: 12.5px;
  color: ${t.textMuted};
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  &:hover { color: ${t.blue}; }
`

const commentBlock = css`
  margin: 10px 0 0 44px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 640px) { margin-left: 16px; }
`

const commentItem = css`
  background: #f9fafb;
  border-radius: 8px;
  padding: 10px 12px;
`

const commentHead = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`

const commentAuthor = css`
  font-size: 12.5px;
  font-weight: 600;
  color: ${t.text};
`

const commentDate = css`
  font-size: 11px;
  color: ${t.textFaint};
`

const commentText = css`
  font-size: 12.5px;
  color: ${t.textSecondary};
  line-height: 1.5;
`

const commentForm = css`
  display: flex;
  gap: 8px;
  align-items: center;
`

const commentInput = css`
  flex: 1;
  padding: 9px 12px;
  border: 1.5px solid ${t.border};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: ${t.blue}; }
`

const replyBtn = css`
  background: ${t.blue};
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: 8px;
  transition: background 0.2s;
  &:hover { background: ${t.blueDark}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const emptyReviews = css`
  text-align: center;
  font-size: 13.5px;
  color: ${t.textMuted};
  padding: 28px 12px;
`

// ── Sidebar: property info + rating breakdown ──────────────
const infoRow = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  padding: 7px 0;
  & + & { border-top: 1px solid #f3f4f6; }
`

const infoKey = css`
  color: ${t.textMuted};
`

const infoVal = css`
  color: ${t.text};
  font-weight: 600;
`

const breakdownRow = css`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 8px;
  font-size: 12.5px;
  color: ${t.textMuted};
`

const breakdownStar = css`
  width: 26px;
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${t.textSecondary};
`

const breakdownBar = css`
  flex: 1;
  height: 7px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`

const breakdownFill = css`
  height: 100%;
  background: ${t.amber};
  border-radius: 4px;
`

const breakdownCount = css`
  width: 16px;
  text-align: right;
  color: ${t.textFaint};
`

const sidebarCta = css`
  display: block;
  width: 100%;
  background: ${t.blue};
  color: #fff;
  padding: 13px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  transition: background 0.2s;
  &:hover { background: ${t.blueDark}; }
`

// ── Review modal ───────────────────────────────────────────
const overlay = css`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`

const modal = css`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.22);
  width: 100%;
  max-width: 480px;
  padding: 24px 26px 22px;
`

const modalHead = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`

const modalTitle = css`
  font-size: 19px;
  font-weight: 800;
  color: ${t.text};
`

const modalClose = css`
  font-size: 22px;
  line-height: 1;
  color: ${t.textFaint};
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  &:hover { color: ${t.text}; background: #f3f4f6; }
`

const modalLabel = css`
  font-size: 13px;
  font-weight: 600;
  color: ${t.textSecondary};
  margin-bottom: 7px;
`

const starInput = css`
  display: flex;
  gap: 4px;
`

const starBtn = css`
  font-size: 30px;
  line-height: 1;
  color: #d1d5db;
  background: none;
  transition: color 0.12s, transform 0.12s;
  &:hover { transform: scale(1.1); }
`

const starBtnActive = css`
  color: ${t.amber};
`

const starHint = css`
  font-size: 12.5px;
  color: ${t.textFaint};
  margin: 6px 0 16px;
`

const modalTextarea = css`
  width: 100%;
  min-height: 96px;
  padding: 11px 13px;
  border: 1.5px solid ${t.border};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  color: ${t.text};
  line-height: 1.55;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: ${t.blue}; }
  &::placeholder { color: ${t.textFaint}; }
`

const uploadBox = css`
  margin-top: 16px;
  border: 1.5px dashed ${t.borderLight};
  border-radius: 10px;
  padding: 26px;
  text-align: center;
  color: ${t.textMuted};
  font-size: 13px;
`

const uploadHint = css`
  font-size: 11.5px;
  color: ${t.textFaint};
  margin-top: 3px;
`

const modalActions = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
`

const modalCancel = css`
  font-size: 14px;
  font-weight: 500;
  color: ${t.textMuted};
  padding: 10px 14px;
  &:hover { color: ${t.text}; }
`

const modalSubmit = css`
  background: ${t.blue};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background 0.2s;
  &:hover { background: ${t.blueDark}; }
`

const modalError = css`
  font-size: 13px;
  color: ${t.red};
  margin-top: 12px;
`

// ── User profile ───────────────────────────────────────────
const profileCard = css`
  background: #fff;
  border: 1px solid ${t.border};
  border-radius: 12px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 26px;
`

const profileIdentity = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

const profileAvatar = css`
  width: 56px;
  height: 56px;
  background: #dbeafe;
  color: ${t.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
`

const profileName = css`
  font-size: 22px;
  font-weight: 800;
  color: ${t.text};
  letter-spacing: -0.4px;
`

const profileEmail = css`
  font-size: 13px;
  color: ${t.textMuted};
  margin-top: 2px;
`

const profileStats = css`
  display: flex;
  gap: 32px;
`

const profileStat = css`
  text-align: center;
`

const profileStatNum = css`
  font-size: 22px;
  font-weight: 800;
  color: ${t.blue};
`

const profileStatLabel = css`
  font-size: 11px;
  font-weight: 600;
  color: ${t.textFaint};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`

const profileSectionTitle = css`
  font-size: 18px;
  font-weight: 800;
  color: ${t.text};
  margin-bottom: 14px;
`

const profileReviewCard = css`
  background: #fff;
  border: 1px solid ${t.border};
  border-radius: 12px;
  padding: 18px 22px;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`

const profileReviewName = css`
  font-size: 15px;
  font-weight: 700;
  color: ${t.text};
  margin-bottom: 5px;
`

const profileReviewStars = css`
  color: ${t.amber};
  font-size: 13px;
  letter-spacing: 1px;
  margin-bottom: 8px;
`

const profileReviewText = css`
  font-size: 13px;
  color: ${t.textMuted};
  line-height: 1.55;
  max-width: 560px;
`

const profileReviewActions = css`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`

const actionView = css`
  font-size: 13px;
  color: ${t.textMuted};
  &:hover { color: ${t.blue}; }
`

const actionEdit = css`
  font-size: 13px;
  font-weight: 600;
  color: ${t.blue};
  border: 1px solid #bfdbfe;
  background: #fff;
  padding: 6px 14px;
  border-radius: 7px;
  &:hover { background: #eff6ff; }
`

const actionDelete = css`
  font-size: 13px;
  font-weight: 600;
  color: ${t.red};
  border: 1px solid #fecaca;
  background: #fff;
  padding: 6px 14px;
  border-radius: 7px;
  &:hover { background: #fef2f2; }
`

const profileEmpty = css`
  text-align: center;
  color: ${t.textMuted};
  font-size: 14px;
  padding: 48px 20px;
  background: #fff;
  border: 1px solid ${t.border};
  border-radius: 12px;
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
  // Shared header + page shell
  appAvatar, page, pageContent, backLink,
  // Apartment detail
  detailGrid, detailMain, detailSidebar, card, detailHeaderCard,
  detailName, detailAddress, detailDesc,
  detailScore, detailScoreNum, detailScoreStars, detailScoreCount,
  aiHeader, aiText, sectionLabel, issueTags, issueTag,
  // Reviews
  reviewsHeader, reviewsTitle, writeReviewBtn,
  reviewItem, reviewTop, reviewMeta, reviewAuthorRow,
  reviewAuthor, reviewYouTag, reviewDate, reviewStars, reviewText,
  commentToggle, commentBlock, commentItem, commentHead,
  commentAuthor, commentDate, commentText,
  commentForm, commentInput, replyBtn, emptyReviews,
  // Sidebar
  infoRow, infoKey, infoVal,
  breakdownRow, breakdownStar, breakdownBar, breakdownFill, breakdownCount,
  sidebarCta,
  // Modal
  overlay, modal, modalHead, modalTitle, modalClose, modalLabel,
  starInput, starBtn, starBtnActive, starHint,
  modalTextarea, uploadBox, uploadHint,
  modalActions, modalCancel, modalSubmit, modalError,
  // Profile
  profileCard, profileIdentity, profileAvatar, profileName, profileEmail,
  profileStats, profileStat, profileStatNum, profileStatLabel,
  profileSectionTitle, profileReviewCard, profileReviewName,
  profileReviewStars, profileReviewText, profileReviewActions,
  actionView, actionEdit, actionDelete, profileEmpty,
}

export default function useStyles() {
  return styles
}
