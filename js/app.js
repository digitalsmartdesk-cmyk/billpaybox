// ===== Utilities =====
function pad2(n) { return String(n).padStart(2, '0'); }
function money(n) { return `₹${Number(n).toFixed(2)}`; }
function initials(name) { return name.slice(0, 2).toUpperCase(); }
function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ===== Icons =====
function icon(pathsHtml, { size = 20, stroke = 'currentColor', strokeWidth = 2, fill = 'none' } = {}) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${pathsHtml}</svg>`;
}
const ICON_BACK = (color = '#16204D') => icon('<path d="M19 12H5M12 5l-7 7 7 7"></path>', { size: 18, stroke: color, strokeWidth: 2.5 });
const ICON_PHONE = (color, size = 18) => icon('<rect x="5" y="2" width="14" height="20" rx="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', { size, stroke: color, strokeWidth: 2.5 });
const ICON_WIFI = (color, size = 18) => icon('<path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>', { size, stroke: color, strokeWidth: 2.5 });
const ICON_SHIELD = (color, size = 20) => icon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>', { size, stroke: color, strokeWidth: 2 });
const ICON_LOCK = (color, size = 20) => icon('<rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>', { size, stroke: color, strokeWidth: 2 });
const ICON_CHECKSHIELD = (color, size = 20) => icon('<polyline points="22 11.08 12 2.01 1.99 11.07"></polyline><polyline points="22 4 12 14.01 9 11.01"></polyline>', { size, stroke: color, strokeWidth: 2 });
const ICON_BOX = (color, size = 20) => icon('<rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line>', { size, stroke: color, strokeWidth: 2 });
const ICON_STAR = (color, size = 20) => icon('<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.87L12 17.77l-6.18 3.24L7 14.14 2 9.27l6.91-1.01L12 2z"></path>', { size, stroke: color, strokeWidth: 2 });
const ICON_GIFT = (color, size = 20) => icon('<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>', { size, stroke: color, strokeWidth: 2 });
const ICON_CHEVRON_RIGHT = (color = '#94A3B8', size = 20) => icon('<polyline points="9 18 15 12 9 6"></polyline>', { size, stroke: color });
const ICON_CHECK = (color = '#fff', size = 40, sw = 3) => icon('<polyline points="20 6 9 17 4 12"></polyline>', { size, stroke: color, strokeWidth: sw });
const ICON_STAR_FILLED = (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.87L12 17.77l-6.18 3.24L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
const ICON_NAV_HOME = icon('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>', { size: 20 });
const ICON_NAV_PAY = ICON_BOX('currentColor', 20);
const ICON_NAV_OFFERS = ICON_GIFT('currentColor', 20);
const ICON_NAV_DASH = icon('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', { size: 20 });

// ===== State =====
const TOP_LEVEL_SCREENS = ['home', 'offers', 'dashboard'];
const PAY_SCREENS = ['pay-type', 'pay-form', 'pay-confirm', 'pay-processing', 'pay-reward'];

const state = {
  screen: 'home',
  prevScreen: null,
  billType: 'mobile',
  operator: '',
  mobile: '',
  billAmount: '',
  carouselIdx: 0,
  countdown: { d: 4, h: 11, m: 23, s: 45 },
  campaignVisible: true,
  offersCampVisible: true,
  activePartnerId: null,
  procStep: 0,
  rewardPartnerId: null,
  copied: false,
};

function getActivePartner() { return PARTNERS.find(p => p.id === state.activePartnerId) || null; }
function getRewardPartner() { return PARTNERS.find(p => p.id === state.rewardPartnerId) || null; }

// ===== Navigation & actions =====
function go(screen) { state.prevScreen = state.screen; state.screen = screen; render(); }
function back() { go(state.prevScreen || 'home'); }
function selectMobile() { state.billType = 'mobile'; state.operator = ''; go('pay-form'); }
function selectBB() { state.billType = 'broadband'; state.operator = ''; go('pay-form'); }

function submitForm() {
  if (state.mobile.length >= 10 && state.operator && state.billAmount) go('pay-confirm');
}

let procTimer = null;
function confirmPay() { startProcessing(); }
function startProcessing() {
  if (procTimer) clearInterval(procTimer);
  go('pay-processing');
  state.procStep = 0;
  let step = 0;
  procTimer = setInterval(() => {
    step++;
    state.procStep = step;
    render();
    if (step >= 4) {
      clearInterval(procTimer);
      const rp = PARTNERS[Math.floor(Math.random() * PARTNERS.length)];
      setTimeout(() => {
        state.rewardPartnerId = rp.id;
        state.screen = 'pay-reward';
        render();
      }, 500);
    }
  }, 850);
}
function goHomeFromReward() {
  state.procStep = 0; state.mobile = ''; state.operator = ''; state.billAmount = '';
  go('home');
}
function openPartnerDetail(id) {
  state.activePartnerId = id;
  go('partner-detail');
}
function shopUrl(url) { if (url) window.open(url, '_blank', 'noopener'); }
function copyCode(code) {
  if (!code) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  state.copied = true;
  render();
  setTimeout(() => { state.copied = false; render(); }, 2000);
}

// ===== Shared fee logic =====
function feeInfo(amountStr) {
  const amt = parseFloat(amountStr) || 0;
  const waived = amt >= FEE_THRESHOLD;
  const noteClass = amt === 0 ? 'neutral' : waived ? 'ok' : 'pending';
  const noteText = amt === 0
    ? `Bills ₹${FEE_THRESHOLD}+ pay zero convenience fee`
    : waived
      ? `✓ Zero fee applied — bill ≥ ₹${FEE_THRESHOLD}`
      : `Add ₹${(FEE_THRESHOLD - amt).toFixed(0)} more to unlock zero fee`;
  return { amt, waived, fee: waived ? 0 : STANDARD_FEE, noteClass, noteText };
}

// ===== Header =====
function screenTitle() {
  switch (state.screen) {
    case 'pay-type': return 'Pay a Bill';
    case 'pay-form': return state.billType === 'mobile' ? 'Postpaid Mobile' : 'Broadband Postpaid';
    case 'pay-confirm': return 'Confirm Payment';
    case 'partner-detail': { const p = getActivePartner(); return p ? p.name : ''; }
    default: return '';
  }
}

function renderTopBar() {
  const showTopBar = !['pay-processing', 'pay-reward'].includes(state.screen);
  if (!showTopBar) return '';
  const showBack = !TOP_LEVEL_SCREENS.includes(state.screen);
  const showLogo = TOP_LEVEL_SCREENS.includes(state.screen) || state.screen === 'partner-detail';
  const isHome = state.screen === 'home';
  return `
    <div class="top-bar">
      ${showBack ? `<button class="top-bar-back" data-action="goBack">${ICON_BACK()}</button>` : ''}
      ${showLogo ? `<div class="top-bar-logo" data-action="goHome"><img class="mark" src="assets/logo-mark.png" alt="BillPayBox"><img class="wordmark" src="assets/logo-wordmark.png" alt="BillPayBox"></div>` : ''}
      ${showBack ? `<span class="top-bar-title">${escapeHtml(screenTitle())}</span>` : ''}
      <div class="top-bar-spacer"></div>
      ${isHome ? `<button class="top-bar-signin" data-action="goDash">Sign In</button>` : ''}
    </div>
  `;
}

function renderTopNav() {
  const isActive = (key) => {
    if (key === 'home') return state.screen === 'home';
    if (key === 'pay') return PAY_SCREENS.includes(state.screen);
    if (key === 'offers') return state.screen === 'offers';
    return state.screen === 'dashboard';
  };
  const cls = (key) => {
    if (!isActive(key)) return 'top-nav-link';
    return key === 'pay' ? 'top-nav-link is-active-crimson' : 'top-nav-link is-active-navy';
  };
  return `
    <div class="top-nav">
      <div class="top-nav-logo" data-action="goHome">
        <img class="mark" src="assets/logo-mark.png" alt="BillPayBox">
        <img class="wordmark" src="assets/logo-wordmark.png" alt="BillPayBox">
      </div>
      <nav class="top-nav-links">
        <button class="${cls('home')}" data-action="goHome">Home</button>
        <button class="${cls('pay')}" data-action="goPay">Pay Bill</button>
        <button class="${cls('offers')}" data-action="goOffers">Rewards</button>
        <button class="${cls('dashboard')}" data-action="goDash">Account</button>
      </nav>
      <div class="top-nav-right">
        <div class="top-nav-fee-pill">
          <div class="dot"></div>
          <span>₹0 FEE ON ₹${FEE_THRESHOLD}+</span>
        </div>
        <button class="top-nav-signin" data-action="goDash">Sign In</button>
      </div>
    </div>
  `;
}

function renderBottomNav() {
  function item(key, action, iconHtml, label, colorClass) {
    const active =
      key === 'home' ? state.screen === 'home' :
      key === 'pay' ? PAY_SCREENS.includes(state.screen) :
      key === 'offers' ? state.screen === 'offers' :
      state.screen === 'dashboard';
    return `<button class="${colorClass}${active ? ' is-active' : ''}" data-action="${action}">${iconHtml}<span>${label}</span><div class="nav-dot"></div></button>`;
  }
  return item('home', 'goHome', ICON_NAV_HOME, 'Home', 'nav-navy')
    + item('pay', 'goPay', ICON_NAV_PAY, 'Pay Bill', 'nav-crimson')
    + item('offers', 'goOffers', ICON_NAV_OFFERS, 'Rewards', 'nav-navy')
    + item('dashboard', 'goDash', ICON_NAV_DASH, 'Account', 'nav-navy');
}

// ===== Shared partials =====
function renderCampaignBanner(variant) {
  const visible = variant === 'home' ? state.campaignVisible : state.offersCampVisible;
  if (!visible) return '';
  const closeAction = variant === 'home' ? 'closeCampaign' : 'closeOffersCamp';
  const headline = variant === 'home'
    ? '2× brand coupons on every qualifying bill payment this week!'
    : 'Earn 2× coupons on every qualifying payment this week!';
  const badgeText = variant === 'home' ? 'DIWALI SPECIAL · LIMITED TIME' : 'DIWALI SPECIAL';
  const cd = state.countdown;
  const units = variant === 'home'
    ? [['DAYS', cd.d], ['HRS', cd.h], ['MIN', cd.m], ['SEC', cd.s]]
    : [['D', cd.d], ['H', cd.h], ['M', cd.m], ['S', cd.s]];
  return `
    <div class="campaign-banner">
      <div class="campaign-sponsored-tag"><span>SPONSORED</span></div>
      <button class="campaign-close" data-action="${closeAction}">×</button>
      <div class="campaign-inner">
        <div>
          <span class="campaign-badge">${badgeText}</span>
          <p class="campaign-headline">${headline}</p>
        </div>
        <div class="campaign-countdown">
          ${units.map(([label, val]) => `<div class="cell"><div class="digit">${pad2(val)}</div><div class="unit">${label}</div></div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function partnerTileHtml(p, opts = {}) {
  const { showPartnerTag = false, showCode = false, extraClass = '' } = opts;
  const cls = `partner-tile${showPartnerTag ? ' is-grid' : ''}${extraClass ? ' ' + extraClass : ''}`;
  return `
    <div class="${cls}" style="--accent:${p.accent};--lbg:${p.lbg};--accent-soft:${hexToRgba(p.accent, 0.13)}" data-action="openPartner" data-id="${p.id}">
      <div class="partner-tile-bar">
        <div class="partner-tile-avatar">${initials(p.name)}</div>
        <div><p>${p.name}</p><p class="cat">${p.cat}</p></div>
      </div>
      <div class="partner-tile-body">
        ${showPartnerTag ? `
          <div class="offers-tile-body-row">
            <div class="partner-tile-coupon">${p.coupon}</div>
            <span class="offers-tile-partner-tag">PARTNER</span>
          </div>` : `<div class="partner-tile-coupon">${p.coupon}</div>`}
        <p class="partner-tile-min">Min. ${p.min}</p>
        ${showCode ? `<p class="offers-tile-code">${p.code}</p>` : ''}
      </div>
    </div>
  `;
}

function renderTrustStrip() {
  return `
    <div class="trust-strip">
      <div class="trust-grid">
        <div class="trust-item"><div class="trust-icon bg-navy">${ICON_SHIELD('#16204D')}</div><div><p class="title">RBI Licensed</p><p class="sub">Regulated payment gateway</p></div></div>
        <div class="trust-item"><div class="trust-icon bg-green">${ICON_LOCK('#059669')}</div><div><p class="title">256-bit SSL</p><p class="sub">End-to-end encrypted</p></div></div>
        <div class="trust-item"><div class="trust-icon bg-crimson">${ICON_CHECKSHIELD('#D91456')}</div><div><p class="title">PCI DSS</p><p class="sub">Payment card compliant</p></div></div>
      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <div class="site-footer">
      <div class="footer-grid">
        <div>
          <img class="footer-logo" src="assets/logo-lockup.png" alt="BillPayBox">
          <p class="footer-blurb">Pay postpaid mobile &amp; broadband bills. Zero fee on qualifying payments. Earn brand rewards every time.</p>
        </div>
        <div>
          <p class="footer-col-title">QUICK LINKS</p>
          <div class="footer-links">
            <span data-action="goHome">Home</span>
            <span data-action="goPay">Pay a Bill</span>
            <span data-action="goOffers">Rewards &amp; Offers</span>
            <span data-action="goDash">My Account</span>
          </div>
        </div>
        <div>
          <p class="footer-col-title">PARTNER BRANDS</p>
          <div class="footer-brands-grid">
            ${PARTNERS.map(p => `<div class="footer-brand" data-action="openPartner" data-id="${p.id}"><div class="footer-brand-avatar" style="background:${p.accent}">${initials(p.name)}</div><span>${p.name}</span></div>`).join('')}
          </div>
        </div>
        <div>
          <p class="footer-col-title">LEGAL &amp; COMPLIANCE</p>
          <div class="footer-links">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>DPDP Data Notice</span>
            <span>Grievance Officer</span>
          </div>
        </div>
      </div>
      <div class="footer-divider"></div>
      <p class="footer-copy">© 2026 BillPayBox Technologies Pvt. Ltd. All rights reserved. | Payments processed by RBI-licensed gateway.</p>
    </div>
  `;
}

function renderPayWidget() {
  const ops = state.billType === 'mobile' ? MOBILE_OPERATORS : BROADBAND_OPERATORS;
  const { noteClass, noteText } = feeInfo(state.billAmount);
  const ready = state.mobile.length >= 10 && state.operator && state.billAmount;
  return `
    <div class="pay-widget">
      <h3>Pay a Bill</h3>
      <div class="type-toggle">
        <button class="${state.billType === 'mobile' ? 'is-active-mobile' : ''}" data-action="selectMobile">Postpaid Mobile</button>
        <button class="${state.billType === 'broadband' ? 'is-active-bb' : ''}" data-action="selectBB">Broadband</button>
      </div>
      <div class="field">
        <label>${state.billType === 'mobile' ? 'Mobile Number' : 'Account / Mobile Number'}</label>
        <input type="tel" data-bind="mobile" placeholder="${state.billType === 'mobile' ? '10-digit mobile number' : 'Account or registered number'}" value="${escapeHtml(state.mobile)}">
      </div>
      <div class="field field-amount">
        <label>Bill Amount (₹)</label>
        <div style="position:relative">
          <span class="rupee">₹</span>
          <input type="number" data-bind="billAmount" placeholder="0" value="${escapeHtml(state.billAmount)}">
        </div>
        <p class="fee-note ${noteClass}">${noteText}</p>
      </div>
      <div class="field" style="margin-bottom:20px">
        <label style="margin-bottom:8px">Operator</label>
        <div class="op-pills">
          ${ops.map(op => `<button class="op-pill${op === state.operator ? ' is-selected' : ''}" data-action="selectOperator" data-op="${escapeHtml(op)}">${op}</button>`).join('')}
        </div>
      </div>
      <button class="proceed-btn${ready ? ' is-ready' : ''}" data-action="submitForm">Continue to Pay →</button>
    </div>
  `;
}

// ===== Screens =====
function renderHome() {
  const partner = PARTNERS[state.carouselIdx];
  return `
    <div class="screen-enter">
      <div class="hero-desktop desktop-only">
        <div class="hero-desktop-inner">
          <div>
            <div class="hero-badge hero-badge-lg"><div class="dot"></div><span>₹0 CONVENIENCE FEE ON BILLS ₹${FEE_THRESHOLD}+</span></div>
            <h1>One Place.<br>All Your Bills.</h1>
            <p class="hero-desktop-sub">Pay postpaid mobile &amp; broadband bills — zero convenience fee on qualifying amounts. Earn exclusive brand rewards every time.</p>
            <div class="hero-desktop-ctas">
              <button class="hero-cta-lg cta-white" data-action="selectMobile">${ICON_PHONE('#16204D')} Pay Mobile Bill</button>
              <button class="hero-cta-lg cta-crimson" data-action="selectBB">${ICON_WIFI('#fff')} Pay Broadband Bill</button>
            </div>
            <div class="hero-trust-row">
              <div class="hero-trust-item"><div class="hero-trust-icon">${ICON_SHIELD('#fff', 14)}</div><span>RBI Licensed</span></div>
              <div class="hero-trust-item"><div class="hero-trust-icon">${ICON_LOCK('#fff', 14)}</div><span>256-bit SSL</span></div>
              <div class="hero-trust-item"><div class="hero-trust-icon">${ICON_CHECKSHIELD('#fff', 14)}</div><span>PCI DSS</span></div>
            </div>
          </div>
          ${renderPayWidget()}
        </div>
      </div>

      <div class="hero-mobile mobile-only">
        <div class="hero-badge"><div class="dot"></div><span>₹0 CONVENIENCE FEE ON BILLS ₹${FEE_THRESHOLD}+</span></div>
        <h1>One Place.<br>All Your Bills.</h1>
        <p>Pay postpaid mobile &amp; broadband bills.<br>Save the fee. Earn brand rewards instantly.</p>
        <div class="hero-mobile-ctas">
          <button class="hero-cta cta-white" data-action="selectMobile">${ICON_PHONE('#16204D', 16)} Mobile</button>
          <button class="hero-cta cta-crimson" data-action="selectBB">${ICON_WIFI('#fff', 16)} Broadband</button>
        </div>
      </div>

      ${renderCampaignBanner('home')}

      <div class="section-wrap">
        <h2 class="section-head">How it works</h2>
        <div class="how-grid">
          <div class="how-card">
            <div class="how-icon bg-navy">${ICON_BOX('#16204D')}</div>
            <p class="how-title">Pay your bill</p>
            <p class="how-sub">Postpaid mobile or broadband — all major operators supported</p>
          </div>
          <div class="how-card">
            <div class="how-icon bg-crimson">${ICON_STAR('#D91456')}</div>
            <p class="how-title">Save the fee</p>
            <p class="how-sub">Bills ₹${FEE_THRESHOLD} and above pay zero convenience fee — automatically applied</p>
          </div>
          <div class="how-card">
            <div class="how-icon bg-green">${ICON_GIFT('#059669')}</div>
            <p class="how-title">Earn a reward</p>
            <p class="how-sub">Get exclusive brand coupons from our 6 D2C partner brands instantly</p>
          </div>
        </div>
      </div>

      <div class="section-wrap">
        <div class="section-head-row">
          <h2 class="section-head">Partner Offers</h2>
          <span class="partner-offer-tag">PARTNER OFFER</span>
        </div>
        <div class="carousel-card" style="--accent:${partner.accent};--lbg:${partner.lbg};--accent-soft:${hexToRgba(partner.accent, 0.13)}" data-action="goOffers">
          <div class="carousel-card-inner">
            <div class="carousel-avatar">${initials(partner.name)}</div>
            <div style="flex:1">
              <p class="carousel-name">${partner.name}</p>
              <p class="carousel-cat">${partner.cat}</p>
              <p class="carousel-desc">${partner.desc}</p>
            </div>
            <div class="carousel-side">
              <div class="carousel-coupon">${partner.coupon}</div>
              <p class="use-code">Use code</p>
              <p class="code">${partner.code}</p>
              <span class="view-all">View all offers →</span>
            </div>
          </div>
        </div>
        <div class="carousel-dots">
          ${PARTNERS.map((p, i) => `<div class="dot${i === state.carouselIdx ? ' is-active' : ''}"></div>`).join('')}
        </div>
      </div>

      <div class="section-wrap">
        <div class="section-head-row">
          <h2 class="section-head">Brand Partners</h2>
          <button data-action="goOffers" style="font-size:14px;font-weight:600;color:#D91456;background:none;border:none">View all offers →</button>
        </div>
        <div class="partner-grid">
          ${PARTNERS.map((p, i) => partnerTileHtml(p, { extraClass: i >= 4 ? 'desktop-only' : '' })).join('')}
        </div>
      </div>

      ${renderTrustStrip()}
      ${renderFooter()}
    </div>
  `;
}

function renderPayType() {
  return `
    <div class="pay-card-wrap">
      <p class="pay-type-intro">Select the type of postpaid bill to pay.</p>
      <div class="pay-type-option" data-action="selectMobile">
        <div class="pay-type-option-row">
          <div class="pay-type-icon bg-navy">${ICON_PHONE('#16204D', 24)}</div>
          <div class="grow">
            <p class="pay-type-title">Postpaid Mobile</p>
            <p class="pay-type-sub">Airtel · Jio · Vi · BSNL · MTNL</p>
          </div>
          ${ICON_CHEVRON_RIGHT()}
        </div>
        <div class="pay-type-features">
          <div class="pay-type-feature"><div class="bullet green"></div><span>₹0 fee on bills ≥ ₹${FEE_THRESHOLD}</span></div>
          <div class="pay-type-feature"><div class="bullet crimson"></div><span>Earn brand reward</span></div>
        </div>
      </div>
      <div class="pay-type-option" data-action="selectBB">
        <div class="pay-type-option-row">
          <div class="pay-type-icon bg-crimson">${ICON_WIFI('#D91456', 24)}</div>
          <div class="grow">
            <p class="pay-type-title">Broadband Postpaid</p>
            <p class="pay-type-sub">Jio Fiber · Airtel · ACT · BSNL</p>
          </div>
          ${ICON_CHEVRON_RIGHT()}
        </div>
        <div class="pay-type-features">
          <div class="pay-type-feature"><div class="bullet green"></div><span>₹0 fee on bills ≥ ₹${FEE_THRESHOLD}</span></div>
          <div class="pay-type-feature"><div class="bullet crimson"></div><span>Earn brand reward</span></div>
        </div>
      </div>
    </div>
  `;
}

function renderPayForm() {
  const ops = state.billType === 'mobile' ? MOBILE_OPERATORS : BROADBAND_OPERATORS;
  const { noteClass, noteText } = feeInfo(state.billAmount);
  const ready = state.mobile.length >= 10 && state.operator && state.billAmount;
  return `
    <div class="pay-card-wrap pay-form">
      <div class="type-toggle">
        <button class="${state.billType === 'mobile' ? 'is-active-mobile' : ''}" data-action="selectMobile">Mobile</button>
        <button class="${state.billType === 'broadband' ? 'is-active-bb' : ''}" data-action="selectBB">Broadband</button>
      </div>
      <div class="field">
        <label>${state.billType === 'mobile' ? 'Mobile Number' : 'Account / Mobile Number'}</label>
        <input type="tel" data-bind="mobile" placeholder="${state.billType === 'mobile' ? '10-digit mobile number' : 'Account or registered number'}" value="${escapeHtml(state.mobile)}">
      </div>
      <div class="field field-amount">
        <label>Bill Amount (₹)</label>
        <div style="position:relative">
          <span class="rupee">₹</span>
          <input type="number" data-bind="billAmount" placeholder="0" value="${escapeHtml(state.billAmount)}">
        </div>
        <p class="fee-note ${noteClass}">${noteText}</p>
      </div>
      <div class="pay-form-fieldset">
        <label>Select Operator</label>
        <div class="op-pills">
          ${ops.map(op => `<button class="op-pill${op === state.operator ? ' is-selected' : ''}" data-action="selectOperator" data-op="${escapeHtml(op)}">${op}</button>`).join('')}
        </div>
      </div>
      <button class="proceed-btn${ready ? ' is-ready' : ''}" data-action="submitForm">Proceed to Pay →</button>
    </div>
  `;
}

function renderPayConfirm() {
  const { amt, waived, fee, noteClass, noteText } = feeInfo(state.billAmount);
  const total = amt + fee;
  return `
    <div class="pay-card-wrap">
      <div class="confirm-card">
        <div class="confirm-card-head">
          <div class="confirm-card-icon">${ICON_PHONE('#fff')}</div>
          <div class="grow">
            <p class="label">${state.billType === 'mobile' ? 'Postpaid Mobile' : 'Broadband Postpaid'}</p>
            <p class="value">${escapeHtml(state.mobile)}</p>
          </div>
          <div class="right">
            <p class="label">Operator</p>
            <p class="value">${escapeHtml(state.operator)}</p>
          </div>
        </div>
        <div class="confirm-card-body">
          <div class="confirm-row"><span>Bill Amount</span><span>${money(amt)}</span></div>
          <div class="confirm-fee-row"><span>Convenience Fee</span><span class="confirm-fee-value${waived ? ' waived' : ''}">${waived ? '₹0.00' : '₹5.90'}</span></div>
          <p class="fee-note ${noteClass}">${noteText}</p>
          <div class="confirm-total-row"><span class="label">Total Payable</span><span class="value">${money(total)}</span></div>
        </div>
      </div>
      <div class="confirm-reward-note">
        <div class="icon">${ICON_GIFT('#fff')}</div>
        <div>
          <p class="title">You'll earn a brand reward!</p>
          <p class="sub">Coupon from one of our 6 partner brands — revealed after payment.</p>
        </div>
      </div>
      <button class="confirm-pay-btn" data-action="confirmPay">Confirm &amp; Pay ${money(total)}</button>
      <p class="confirm-secure-note">Secured · RBI-licensed gateway · 256-bit SSL encryption</p>
    </div>
  `;
}

function renderPayProcessing() {
  const steps = ['Contacting operator', 'Verifying details', 'Processing payment', 'Confirming transaction'];
  return `
    <div class="processing-screen screen-enter">
      <div class="processing-spinner-wrap">
        <div class="processing-spinner"></div>
        <div class="processing-spinner-icon">${ICON_BOX('#16204D', 32)}</div>
      </div>
      <h2>Processing Payment</h2>
      <p>Please keep this screen open. This will only take a moment.</p>
      <div class="processing-steps">
        ${steps.map((label, i) => {
          const st = i < state.procStep ? 'done' : (i === state.procStep - 1 ? 'current' : '');
          return `<div class="processing-step ${st}"><div class="dot ${st}"></div><span>${label}</span></div>`;
        }).join('')}
      </div>
    </div>
  `;
}

function renderPayReward() {
  const rp = getRewardPartner();
  if (!rp) return '';
  const pieces = [
    { left: '18%', size: 10, color: '#D91456', radius: 2, dur: 2, delay: 0 },
    { left: '38%', size: 8, color: '#FFD700', radius: 50, dur: 2.3, delay: 0.4 },
    { left: '58%', size: 10, color: '#16204D', radius: 2, dur: 1.9, delay: 0.8 },
    { left: '75%', size: 8, color: '#059669', radius: 50, dur: 2.5, delay: 1.1 },
    { left: '28%', size: 6, color: '#7C3AED', radius: 2, dur: 2.1, delay: 1.4 },
    { left: '82%', size: 8, color: '#D97706', radius: 50, dur: 2.4, delay: 1.7 },
  ];
  return `
    <div class="reward-screen screen-enter">
      <div class="confetti-field">
        ${pieces.map(p => `<div class="confetti-piece" style="left:${p.left};width:${p.size}px;height:${p.size}px;background:${p.color};border-radius:${p.radius}%;animation:fall ${p.dur}s ease infinite ${p.delay}s"></div>`).join('')}
      </div>
      <div class="reward-inner">
        <div class="reward-success">
          <div class="reward-check">${ICON_CHECK('#fff', 40, 3)}</div>
          <h1>Payment Successful!</h1>
          <p>Your bill is paid. Here's your brand reward.</p>
        </div>
        <div class="reward-card" style="--accent:${rp.accent};--lbg:${rp.lbg};--accent-soft:${hexToRgba(rp.accent, 0.2)}">
          <div class="reward-card-head">
            <div class="reward-card-brand">
              <div class="reward-avatar">${initials(rp.name)}</div>
              <div><p class="name">${rp.name}</p><p class="cat">${rp.cat}</p></div>
            </div>
            <span class="partner-offer-tag" style="background:#fff">PARTNER OFFER</span>
          </div>
          <p class="reward-desc">${rp.desc}</p>
          <div class="reward-coupon-wrap">
            <p class="reward-coupon-label">YOUR EXCLUSIVE REWARD</p>
            <div class="reward-coupon-big">${rp.coupon}</div>
          </div>
          <div class="reward-code-box" data-action="copyCode" data-code="${escapeHtml(rp.code)}">
            <span class="code">${rp.code}</span>
            <span class="copy-hint${state.copied ? ' copied' : ''}">${state.copied ? '✓ Copied!' : 'Tap to copy'}</span>
          </div>
          <p class="reward-terms">Min. order ${rp.min} · Valid till ${rp.validity}</p>
          <button class="reward-shop-btn" data-action="shopUrl" data-url="${escapeHtml(rp.url)}">Shop at ${rp.name} →</button>
        </div>
        <button class="reward-home-btn" data-action="goHomeFromReward">Back to Home</button>
      </div>
    </div>
  `;
}

function renderOffers() {
  const featured = PARTNERS[0];
  const rest = PARTNERS.slice(1);
  return `
    <div class="screen-enter">
      ${renderCampaignBanner('offers')}
      <div class="section-wrap">
        <div class="section-head-row">
          <h2 class="section-head">All Partner Offers</h2>
          <span class="partner-offer-tag">PARTNER OFFER</span>
        </div>
        <div class="featured-tile" style="--accent:${featured.accent};--lbg:${featured.lbg};--accent-soft:${hexToRgba(featured.accent, 0.2)}" data-action="openPartner" data-id="${featured.id}">
          <div class="featured-badge-wrap"><span class="featured-badge">FEATURED PARTNER</span></div>
          <div class="featured-bar">
            <div class="featured-avatar">${initials(featured.name)}</div>
            <div><p class="featured-name">${featured.name}</p><p class="featured-cat">${featured.cat}</p></div>
          </div>
          <div class="featured-body">
            <p class="featured-body-desc">${featured.desc}</p>
            <div class="featured-body-row">
              <div>
                <p class="featured-coupon-label">EXCLUSIVE COUPON</p>
                <div class="featured-coupon">${featured.coupon}</div>
              </div>
              <div class="featured-code-side">
                <p class="use-code">Use code</p>
                <p class="code">${featured.code}</p>
              </div>
            </div>
            <p class="featured-meta">Min. order ${featured.min} · Valid till ${featured.validity}</p>
          </div>
        </div>
        <div class="offers-grid">
          ${rest.map(p => partnerTileHtml(p, { showPartnerTag: true, showCode: true })).join('')}
        </div>
        <p class="offers-footnote">Coupons earned after qualifying bill payment (≥ ₹${FEE_THRESHOLD}). Partner brands are independent service providers.</p>
      </div>
    </div>
  `;
}

function renderPartnerDetail() {
  const ap = getActivePartner();
  if (!ap) return '';
  return `
    <div class="screen-enter">
      <div class="detail-header" style="--accent:${ap.accent};background:${ap.accent}">
        <div class="detail-header-inner">
          <div class="detail-avatar">${initials(ap.name)}</div>
          <div>
            <h1 class="detail-name">${ap.name}</h1>
            <p class="detail-cat">${ap.cat}</p>
            <div class="detail-partner-tag"><span>PARTNER OFFER</span></div>
          </div>
        </div>
      </div>
      <div class="detail-body">
        <div class="detail-left">
          <p class="detail-desc">${ap.desc}</p>
          <div class="detail-cta-note">
            <div class="grow">
              <p class="title">Haven't earned this yet?</p>
              <p class="sub">Pay a bill ≥ ₹${FEE_THRESHOLD} to unlock it instantly.</p>
            </div>
            <button data-action="goPay">Pay Bill →</button>
          </div>
        </div>
        <div class="detail-right">
          <div class="detail-reward-card">
            <p class="detail-reward-label">YOUR BILLPAYBOX REWARD</p>
            <div class="detail-coupon-wrap"><div class="detail-coupon-big" style="background:${ap.accent}">${ap.coupon}</div></div>
            <div class="detail-code-box" style="--accent-soft:${hexToRgba(ap.accent, 0.06)};--accent-border:${hexToRgba(ap.accent, 0.3)};background:${hexToRgba(ap.accent, 0.06)};border-color:${hexToRgba(ap.accent, 0.3)}" data-action="copyCode" data-code="${escapeHtml(ap.code)}">
              <div><p class="label">Coupon Code</p><p class="code">${ap.code}</p></div>
              <span class="copy-hint${state.copied ? ' copied' : ''}" style="color:${state.copied ? '#059669' : ap.accent}">${state.copied ? '✓ Copied!' : 'Tap to copy'}</span>
            </div>
            <div class="detail-meta-grid">
              <div class="detail-meta-cell"><p class="label">Min. Order</p><p class="value">${ap.min}</p></div>
              <div class="detail-meta-cell"><p class="label">Valid Until</p><p class="value">${ap.validity}</p></div>
            </div>
            <button class="detail-shop-btn" style="background:${ap.accent}" data-action="shopUrl" data-url="${escapeHtml(ap.url)}">Shop &amp; Redeem at ${ap.name} →</button>
            <p class="detail-disclaimer">BillPayBox is not responsible for partner terms &amp; conditions.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDashboard() {
  return `
    <div class="screen-enter">
      <div class="dash-hero">
        <div class="dash-hero-inner">
          <div>
            <p class="dash-welcome">Welcome back</p>
            <h1 class="dash-name">Rahul Sharma</h1>
          </div>
          <div class="prime-badge">
            <div class="prime-badge-head">
              <div class="prime-badge-icon">${ICON_STAR_FILLED(14)}</div>
              <span class="title">Prime Status</span>
              <span class="prime-badge-status">ACTIVE</span>
            </div>
            <div class="prime-progress-row"><span>4 of 6 qualifying payments this month</span><span>67%</span></div>
            <div class="prime-progress-track"><div class="prime-progress-fill" style="width:67%"></div></div>
            <p class="prime-progress-note">2 more qualifying payments to maintain Prime next month</p>
          </div>
        </div>
      </div>
      <div class="dash-body">
        <div class="dash-left">
          <div class="dash-ad-slot">
            <div class="dash-ad-tag"><span>PARTNER OFFER</span></div>
            <div class="dash-ad-row">
              <div class="dash-ad-avatar" style="background:#C2185B">GL</div>
              <div>
                <p class="title">Your GlowLab reward is ready!</p>
                <p class="sub">Code GLOWBPB20 · 20% OFF · Expires 31 Aug</p>
              </div>
            </div>
            <button class="dash-ad-redeem" style="color:#C2185B" data-action="goOffers">Redeem →</button>
          </div>
          <h2 class="dash-col-title">Active Coupons</h2>
          <div class="coupon-list">
            ${ACTIVE_COUPONS.map(c => `
              <div class="coupon-item">
                <div class="coupon-item-stripe" style="background:${c.accent}"></div>
                <div class="coupon-item-body">
                  <div class="coupon-item-avatar" style="background:${c.accent}">${c.initial}</div>
                  <div class="coupon-item-info"><p class="name">${c.name} · ${c.discount}</p><p class="code">${c.code}</p></div>
                  <div class="coupon-item-expiry"><p class="label">Expires</p><p class="value">${c.expires}</p></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="dash-right">
          <h2 class="dash-col-title">Recent Payments</h2>
          <div class="payment-list">
            ${RECENT_PAYMENTS.map(p => `
              <div class="payment-item">
                <div class="payment-item-icon ${p.type === 'mobile' ? 'bg-navy' : 'bg-crimson'}">${p.type === 'mobile' ? ICON_PHONE('#16204D', 17) : ICON_WIFI('#D91456', 17)}</div>
                <div class="payment-item-info"><p class="name">${p.label}</p><p class="sub">${p.sub}</p></div>
                <div class="payment-item-amount"><p class="value">₹${p.amount}</p><p class="fee ${p.feeOk ? 'ok' : 'pending'}">${p.feeLabel}</p></div>
              </div>
            `).join('')}
          </div>
          <button class="dash-pay-another" data-action="goPay">Pay Another Bill →</button>
        </div>
      </div>
    </div>
  `;
}

function renderMain() {
  switch (state.screen) {
    case 'home': return renderHome();
    case 'pay-type': return renderPayType();
    case 'pay-form': return renderPayForm();
    case 'pay-confirm': return renderPayConfirm();
    case 'pay-processing': return renderPayProcessing();
    case 'pay-reward': return renderPayReward();
    case 'offers': return renderOffers();
    case 'partner-detail': return renderPartnerDetail();
    case 'dashboard': return renderDashboard();
    default: return '';
  }
}

// ===== Render loop (with focus preservation for text inputs) =====
function render() {
  const active = document.activeElement;
  let bindKey = null, selStart = null, selEnd = null;
  if (active && active.tagName === 'INPUT' && active.hasAttribute('data-bind') && document.body.contains(active)) {
    bindKey = active.getAttribute('data-bind');
    selStart = active.selectionStart;
    selEnd = active.selectionEnd;
  }
  document.getElementById('app-header').innerHTML = renderTopBar() + renderTopNav();
  document.getElementById('app-main').innerHTML = renderMain();
  document.getElementById('mobile-bottom-nav').innerHTML = renderBottomNav();
  if (bindKey) {
    const el = document.querySelector(`input[data-bind="${bindKey}"]`);
    if (el) {
      el.focus();
      try { el.setSelectionRange(selStart, selEnd); } catch (e) {}
    }
  }
}

// ===== Event delegation =====
document.body.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.getAttribute('data-action');
  switch (action) {
    case 'goHome': go('home'); break;
    case 'goPay': go('pay-type'); break;
    case 'goOffers': go('offers'); break;
    case 'goDash': go('dashboard'); break;
    case 'goBack': back(); break;
    case 'selectMobile': selectMobile(); break;
    case 'selectBB': selectBB(); break;
    case 'submitForm': submitForm(); break;
    case 'confirmPay': confirmPay(); break;
    case 'copyCode': copyCode(el.getAttribute('data-code')); break;
    case 'shopUrl': shopUrl(el.getAttribute('data-url')); break;
    case 'goHomeFromReward': goHomeFromReward(); break;
    case 'openPartner': openPartnerDetail(el.getAttribute('data-id')); break;
    case 'selectOperator': state.operator = el.getAttribute('data-op'); render(); break;
    case 'closeCampaign': state.campaignVisible = false; render(); break;
    case 'closeOffersCamp': state.offersCampVisible = false; render(); break;
  }
});

document.body.addEventListener('input', (e) => {
  const el = e.target;
  if (!(el.tagName === 'INPUT' && el.hasAttribute('data-bind'))) return;
  const key = el.getAttribute('data-bind');
  if (key === 'mobile') state.mobile = el.value;
  if (key === 'billAmount') state.billAmount = el.value;
  render();
});

// ===== Timers =====
function tickCarousel() {
  state.carouselIdx = (state.carouselIdx + 1) % PARTNERS.length;
  render();
}
function tickCountdown() {
  let { d, h, m, s } = state.countdown;
  s--;
  if (s < 0) { s = 59; m--; }
  if (m < 0) { m = 59; h--; }
  if (h < 0) { h = 23; d--; }
  state.countdown = d < 0 ? { d: 0, h: 0, m: 0, s: 0 } : { d, h, m, s };
  render();
}

// ===== Boot =====
document.addEventListener('DOMContentLoaded', () => {
  render();
  setInterval(tickCarousel, 3500);
  setInterval(tickCountdown, 1000);
});
