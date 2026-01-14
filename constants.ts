import { CategoryType, Product, PaymentMethod } from './types';

// Default Hardcoded Data
export const DEFAULT_WHATSAPP = "249125626615";
export const FREE_SERVICES_WHATSAPP = "249963921715";
export const DEFAULT_AD_LINK = "https://skip4link.com/95OG";
export const DEFAULT_AD_PRICE_PER_WEEK = "$5";
export const DEFAULT_HERO_TITLE = "خدمات رقمية متكاملة في مكان واحد";
export const DEFAULT_HERO_SUBTITLE = "شحن الألعاب، اشتراكات التطبيقات، ودعم حسابات التواصل الاجتماعي بأعلى جودة.";

export const DEFAULT_FREE_LINKS = [
  "https://skip4link.com/i1653aaW",
  "https://ouo.io/sHqBHyE",
  "https://skip4link.com/J0kx"
];

export const DEFAULT_ADMIN_FOLLOW_LINK = "https://instagram.com/admin_account";

export const DEFAULT_PRODUCTS: Product[] = [
  // --- GAMES (شحن بالـ ID) ---
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'p1', label: '60 UC', price: '$1.00' },
      { id: 'p2', label: '325 UC', price: '$5.00' },
      { id: 'p3', label: '660 UC', price: '$10.00' },
      { id: 'p4', label: '1800 UC', price: '$25.00' },
    ]
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1552824236-0776712ff210?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'f1', label: '100 Diamond', price: '$1.00' },
      { id: 'f2', label: '210 Diamond', price: '$2.00' },
      { id: 'f3', label: '530 Diamond', price: '$5.00' },
      { id: 'f4', label: '1080 Diamond', price: '$10.00' },
    ]
  },
  {
    id: 'codm',
    name: 'Call of Duty Mobile',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'c1', label: '80 CP', price: '$1.00' },
      { id: 'c2', label: '420 CP', price: '$5.00' },
      { id: 'c3', label: '880 CP', price: '$10.00' },
    ]
  },
  {
    id: 'mlbb',
    name: 'Mobile Legends',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'ml1', label: '11 Diamonds', price: '$0.50' },
      { id: 'ml2', label: '250 Diamonds', price: '$5.00' },
    ]
  },
  {
    id: 'coc',
    name: 'Clash of Clans',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1533230689914-72b225d309e4?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'coc1', label: '80 Gems', price: '$1.00' },
      { id: 'coc2', label: '500 Gems', price: '$5.00' },
      { id: 'coc3', label: 'Gold Pass', price: '$7.00' },
    ]
  },
  {
    id: 'cr',
    name: 'Clash Royale',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'cr1', label: '80 Gems', price: '$1.00' },
      { id: 'cr2', label: 'Pass Royale', price: '$6.00' },
    ]
  },
  {
    id: 'brawl',
    name: 'Brawl Stars',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'bs1', label: '30 Gems', price: '$2.00' },
      { id: 'bs2', label: 'Brawl Pass', price: '$10.00' },
    ]
  },
  {
    id: 'efootball',
    name: 'eFootball',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1552318415-cc99d970220a?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'ef1', label: '100 Coins', price: '$1.00' },
      { id: 'ef2', label: '1050 Coins', price: '$10.00' },
    ]
  },
  {
    id: 'fifa',
    name: 'FIFA Mobile',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1628148902517-8e62939b4b0e?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'fm1', label: '1000 FC Points', price: '$10.00' },
    ]
  },
  {
    id: 'roblox',
    name: 'Roblox',
    category: CategoryType.GAMES,
    image: 'https://images.unsplash.com/photo-1628236171928-874558550186?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'rb1', label: '800 Robux', price: '$10.00' },
      { id: 'rb2', label: '400 Robux', price: '$5.00' },
    ]
  },

  // --- APPS & DIGITAL SERVICES ---
  {
    id: 'spotify',
    name: 'Spotify Premium',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'sp1', label: 'اشتراك فردي 1 شهر', price: '$3.00' },
      { id: 'sp2', label: 'اشتراك عائلي 1 شهر', price: '$5.00' },
    ]
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'sc1', label: 'Pro Unlimited', price: '$6.00' },
    ]
  },
  {
    id: 'discord',
    name: 'Discord Nitro',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'dn1', label: 'Nitro Basic', price: '$3.00' },
      { id: 'dn2', label: 'Nitro Full', price: '$10.00' },
    ]
  },
  {
    id: 'telegram',
    name: 'Telegram Premium',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'tg1', label: 'اشتراك 3 أشهر', price: '$12.00' },
      { id: 'tg2', label: 'اشتراك 6 أشهر', price: '$20.00' },
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'n1', label: 'اشتراك 1 شهر (4K)', price: '$5.00' },
    ]
  },
  {
    id: 'shahid',
    name: 'Shahid VIP',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1522869635100-1f4d061dd70f?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'sh1', label: 'اشتراك رياضة', price: '$10.00' },
      { id: 'sh2', label: 'اشتراك مسلسلات', price: '$8.00' },
    ]
  },
  {
    id: 'osn',
    name: 'OSN+',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1578357078586-4917d48215de?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'osn1', label: 'اشتراك 1 شهر', price: '$9.00' },
    ]
  },
  {
    id: 'googleplay',
    name: 'Google Play Gift Card',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1551061921-2554743b174b?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'gp1', label: '$5 Gift Card', price: '$5.50' },
      { id: 'gp2', label: '$10 Gift Card', price: '$11.00' },
    ]
  },
  {
    id: 'appleid',
    name: 'Apple Gift Card',
    category: CategoryType.APPS,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'ap1', label: '$5 iTunes', price: '$5.50' },
      { id: 'ap2', label: '$10 iTunes', price: '$11.00' },
    ]
  },

  // --- WALLETS & FINANCIAL (SERVICES) ---
  {
    id: 'payeer',
    name: 'شحن رصيد Payeer',
    category: CategoryType.SERVICES,
    image: 'https://images.unsplash.com/photo-1593672715438-d88a70629afd?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'pyr1', label: '$10 Transfer', price: '$11.00' },
      { id: 'pyr2', label: '$50 Transfer', price: '$53.00' },
    ]
  },
  {
    id: 'perfectmoney',
    name: 'Perfect Money',
    category: CategoryType.SERVICES,
    image: 'https://images.unsplash.com/photo-1621504450162-e152914d774a?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'pm1', label: '$10 USD', price: '$11.00' },
    ]
  },
  {
    id: 'usdt_service',
    name: 'شحن USDT (TRC20)',
    category: CategoryType.SERVICES,
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'usdt1', label: '10 USDT', price: '$11.50' },
      { id: 'usdt2', label: '100 USDT', price: '$105.00' },
    ]
  },
  {
    id: 'binance',
    name: 'رصيد Binance Pay',
    category: CategoryType.SERVICES,
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696fab05?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'bin1', label: '10 USDT Topup', price: '$11.00' },
    ]
  },
  {
    id: 'faucetpay',
    name: 'FaucetPay',
    category: CategoryType.SERVICES,
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'fp1', label: '$10 Worth Crypto', price: '$11.00' },
    ]
  },

  // --- ADDITIONAL SERVICES (SOCIAL & MISC) ---
  {
    id: 'social_followers',
    name: 'متابعين سوشيال ميديا',
    category: CategoryType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'sf1', label: '1000 Instagram Followers', price: '$3.00' },
      { id: 'sf2', label: '1000 TikTok Followers', price: '$4.00' },
      { id: 'sf3', label: '1000 Facebook Followers', price: '$3.50' },
    ]
  },
  {
    id: 'social_likes',
    name: 'لايكات ومشاهدات',
    category: CategoryType.SOCIAL,
    image: 'https://images.unsplash.com/photo-1516251193000-18e65860f802?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'sl1', label: '5000 Instagram Views', price: '$1.00' },
      { id: 'sl2', label: '1000 Instagram Likes', price: '$1.50' },
      { id: 'sl3', label: '1000 TikTok Likes', price: '$2.00' },
    ]
  },
  {
    id: 'site_visits',
    name: 'زيارات حقيقية للمواقع',
    category: CategoryType.SERVICES,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'sv1', label: '1000 زيارة عربية', price: '$5.00' },
      { id: 'sv2', label: '5000 زيارة عالمية', price: '$10.00' },
    ]
  },
  {
    id: 'vpn_sub',
    name: 'اشتراكات VPN',
    category: CategoryType.SERVICES,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'vpn1', label: 'ExpressVPN 1 Month', price: '$8.00' },
      { id: 'vpn2', label: 'NordVPN 1 Year', price: '$30.00' },
    ]
  },
  {
    id: 'ads_service',
    name: 'خدمات إعلانية',
    category: CategoryType.SERVICES,
    image: 'https://images.unsplash.com/photo-1557838433-28562d250393?q=80&w=400&h=300&auto=format&fit=crop',
    packages: [
      { id: 'ad1', label: 'حملة إعلانية فيسبوك', price: '$50.00' },
      { id: 'ad2', label: 'إعلان مثبت بالتطبيق', price: '$20.00' },
    ]
  }
];

export const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'btc',
    name: 'Bitcoin (BTC)',
    details: 'أرسل المبلغ إلى عنوان البيتكوين أدناه',
    icon: '₿',
    address: '3B1JZMTwe1GWb9CRKmui3T9K8GrJuHk5BH'
  },
  {
    id: 'eth',
    name: 'Ethereum (ETH)',
    details: 'شبكة ERC20 الأساسية',
    icon: 'Ξ',
    address: '0xefa14bd2b7c79159a6a1e5b5f77bd64673e69bd5'
  },
  {
    id: 'usdt',
    name: 'Binance (USDT - BSC)',
    details: 'أرسل المبلغ عبر شبكة BSC / BEP20',
    icon: '₮',
    address: '0x3bcb81ed7b5b283a6fbc423f58d387acd4a1afb3'
  },
  {
    id: 'ltc',
    name: 'Litecoin (LTC)',
    details: 'تحويل سريع بعمولة منخفضة',
    icon: 'Ł',
    address: 'LYpg7ANSgRiYS1L6i9SsoKQHhyS2RRkKLh'
  },
  {
    id: 'trx',
    name: 'TRON (TRX)',
    details: 'أرسل عبر شبكة TRC20',
    icon: '💎',
    address: 'TDxsyYfsmVPMK1QAs697EDThLoFseYYb3K'
  },
  {
    id: 'doge',
    name: 'Dogecoin (DOGE)',
    details: 'عملة الدوج كوين الرسمية',
    icon: '🐕',
    address: 'DEubhtPh8Q7nrWfDHiiSeZkK5jNiSuHSn4'
  },
  {
    id: 'xrp',
    name: 'Ripple (XRP)',
    details: 'تحويل ريبل سريع',
    icon: '✕',
    address: 'r9Jhfi8ep9eJ2k1CMemTbCq8anZfTzJLFr'
  },
  {
    id: 'sol',
    name: 'Solana (SOL)',
    details: 'شبكة سولانا الفائقة',
    icon: '◎',
    address: 'EDQGBrSvio8RUWbZEMs3L212tFQmuvjXXHP2Umyu1DBP'
  },
  {
    id: 'ton',
    name: 'TON Network',
    details: 'عملة تليجرام الرسمية',
    icon: '💎',
    address: 'UQAb-3RV_B0CU0Ix2Pp85pJA7CNMoEj9SYS8GujtXGYjzju0'
  },
  {
    id: 'avax',
    name: 'Avalanche (AVAX)',
    details: 'شبكة أفالانش الأساسية',
    icon: '❄️',
    address: '0xa4781db782b94e22989d84f2639dd22545322732'
  },
  {
    id: 'bch',
    name: 'Bitcoin Cash (BCH)',
    details: 'بتكوين كاش السريع',
    icon: '₿',
    address: 'bitcoincash:qzjexvemuhva58aay59ahak8d27qpxxwfugz5utxs8'
  },
  {
    id: 'bank',
    name: 'بنك أمدرمان الوطني',
    details: 'التحويل المحلي داخل السودان',
    icon: '🏦',
    address: 'رقم الحساب: 24069186100001'
  }
];
