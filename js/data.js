// Partner brand data — Growth Originator's D2C portfolio
// https://digitalsmartdesk-cmyk.github.io/d2cbrands/
const PARTNERS = [
  { id: 'tropico', name: 'Tropico Nuts', cat: 'Nuts & Snacks', accent: '#C2185B', bg: '#FCE4EC', lbg: '#FFF5F9', coupon: '20% OFF', code: 'TROPIBPB20', min: '₹499', validity: '31 Aug 2026', desc: 'Premium cashews & nuts in 24 bold flavours — roasted, not fried. Clean-label indulgence for the modern Indian snacker.', url: 'https://tropiconuts.vercel.app/' },
  { id: 'cabana', name: 'Organic Cabana', cat: 'Organic Staples', accent: '#2E7D32', bg: '#E8F5E9', lbg: '#F4FDF4', coupon: '15% OFF', code: 'CABANABPB15', min: '₹699', validity: '31 Aug 2026', desc: '100% pure organic grains, flours & dals. USDA & Jaivik Bharat certified, with 9+ years of farm-to-kitchen trust.', url: 'https://organiccabana.growthoriginator.com/' },
  { id: 'medhavat', name: 'Medhavat', cat: 'Flours & Mixes', accent: '#E65100', bg: '#FFF3E0', lbg: '#FFFBF5', coupon: '₹100 OFF', code: 'MEDHABPB100', min: '₹399', validity: '15 Sep 2026', desc: 'Wise flours & baking mixes for the health-conscious home cook — premium wheat, multigrain and speciality blends.', url: 'https://medhavat.growthoriginator.com/' },
  { id: 'mijo', name: 'Healthy Mijo', cat: 'Health Foods', accent: '#1565C0', bg: '#E3F2FD', lbg: '#F0F8FF', coupon: '18% OFF', code: 'MIJOBPB18', min: '₹799', validity: '30 Sep 2026', desc: "Foods for modern lifestyles — nutritious, convenient, and designed for urban Indians who won't compromise on taste.", url: 'https://healthymijo.growthoriginator.com/' },
  { id: 'firo', name: 'Cafe Firo', cat: 'Ready to Cook', accent: '#6A1B9A', bg: '#F3E5F5', lbg: '#FAF5FF', coupon: '25% OFF', code: 'FIROBPB25', min: '₹349', validity: '31 Aug 2026', desc: 'Easy to cook, delicious to share. Restaurant-quality meals brought home with minimal effort, maximum flavour.', url: 'https://cafefiro.tenskywholesale.com/CafeFiro.html' },
  { id: 'farmpuro', name: 'Farm Puro', cat: 'Farm Fresh', accent: '#B71C1C', bg: '#FFEBEE', lbg: '#FFF5F5', coupon: '12% OFF', code: 'PUROBPB12', min: '₹599', validity: '31 Oct 2026', desc: "India's food, pure and simple. Purity-assured produce delivered straight from Indian farms — traceable and honest.", url: 'https://farmpuro.tenskywholesale.com/' },
];

const MOBILE_OPERATORS = ['Airtel', 'Jio', 'Vi (Vodafone Idea)', 'BSNL', 'MTNL'];
const BROADBAND_OPERATORS = ['Jio Fiber', 'Airtel Xstream Fiber', 'ACT Fibernet', 'BSNL Broadband', 'Hathway'];

const FEE_THRESHOLD = 299;
const STANDARD_FEE = 5.9;

const RECENT_PAYMENTS = [
  { type: 'mobile', label: 'Airtel Postpaid', sub: '5 Jul 2026 · 9876543210', amount: 799, feeLabel: 'Zero fee', feeOk: true },
  { type: 'broadband', label: 'Jio Fiber', sub: '28 Jun 2026', amount: 999, feeLabel: 'Zero fee', feeOk: true },
  { type: 'mobile', label: 'Vi Postpaid', sub: '15 Jun 2026', amount: 249, feeLabel: '₹5.90 fee', feeOk: false },
];

const ACTIVE_COUPONS = [
  { initial: 'GL', name: 'GlowLab', accent: '#C2185B', discount: '20% OFF', code: 'GLOWBPB20', expires: '31 Aug' },
  { initial: 'NP', name: 'NutriPeak', accent: '#2E7D32', discount: '15% OFF', code: 'NUTRIBPB15', expires: '31 Aug' },
];
