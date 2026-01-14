import React, { useState, useEffect, useMemo } from 'react';
import { 
  Gamepad2, Smartphone, Globe, MessageSquare, ShieldCheck, Zap, ArrowLeft,
  Copy, CheckCircle2, ExternalLink, ChevronRight, Menu, X, Share2, Instagram,
  Facebook, Youtube, Twitter, Music, Send, Ghost, BarChart3, Clock, Ticket,
  Settings, Plus, Trash2, Save, Lock, LayoutDashboard, Image as ImageIcon,
  DollarSign, Edit3, PlusCircle, Key, Gift, Info, AlertTriangle, MousePointer2,
  CheckCircle, ArrowUpRight, User as UserIcon, LogOut, Mail, Loader2, Home, ChevronLeft,
  Rocket, Target, CreditCard, AlertCircle, Link as LinkIcon, FileText, Layout, Sparkles, Coins, Wallet,
  ArrowDownUp, Banknote
} from 'lucide-react';
import { CategoryType, Product, Package, PaymentMethod, User } from './types';
import { 
  DEFAULT_WHATSAPP, DEFAULT_AD_LINK, DEFAULT_HERO_TITLE, DEFAULT_HERO_SUBTITLE,
  DEFAULT_PRODUCTS, DEFAULT_PAYMENT_METHODS, FREE_SERVICES_WHATSAPP, DEFAULT_FREE_LINKS,
  DEFAULT_ADMIN_FOLLOW_LINK, DEFAULT_AD_PRICE_PER_WEEK
} from './constants';

const App: React.FC = () => {
  // --- Admin States ---
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState("");
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('admin_pwd') || "admin123");
  const [logoClicks, setLogoClicks] = useState(0);
  
  // --- Auth States ---
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // --- Ad Submission State ---
  const [showAdSubmitModal, setShowAdSubmitModal] = useState(false);
  const [adForm, setAdForm] = useState({
    title: '',
    url: '',
    description: '',
    duration: 'week'
  });

  // --- App Content States ---
  const [whatsappNumber, setWhatsappNumber] = useState(localStorage.getItem('wa_num') || DEFAULT_WHATSAPP);
  const [freeWhatsapp, setFreeWhatsapp] = useState(localStorage.getItem('free_wa') || FREE_SERVICES_WHATSAPP);
  const [adLink, setAdLink] = useState(localStorage.getItem('ad_link') || DEFAULT_AD_LINK);
  const [heroTitle, setHeroTitle] = useState(localStorage.getItem('hero_title') || DEFAULT_HERO_TITLE);
  const [heroSubtitle, setHeroSubtitle] = useState(localStorage.getItem('hero_subtitle') || DEFAULT_HERO_SUBTITLE);
  const [freeLinks, setFreeLinks] = useState<string[]>(() => {
    const saved = localStorage.getItem('free_links');
    return saved ? JSON.parse(saved) : DEFAULT_FREE_LINKS;
  });
  const [adminFollowLink, setAdminFollowLink] = useState(localStorage.getItem('admin_follow') || DEFAULT_ADMIN_FOLLOW_LINK);
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const saved = localStorage.getItem('payments');
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_METHODS;
  });

  // --- Navigation States ---
  const [view, setView] = useState<'HOME' | 'CATEGORY' | 'PRODUCT' | 'FREE'>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [playerID, setPlayerID] = useState<string>('');
  const [serviceID, setServiceID] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Free Service Progress States
  const [clickCount, setClickCount] = useState(Number(localStorage.getItem('user_clicks') || 0));
  const [isFollowing, setIsFollowing] = useState(localStorage.getItem('is_following') === 'true');

  // --- Effects ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedCategory, selectedProduct]);

  // --- Navigation Helpers ---
  const goHome = () => {
    setView('HOME');
    setSelectedCategory(null);
    setSelectedProduct(null);
    resetSelection();
    setIsMenuOpen(false);
  };

  const goToCategory = (cat: CategoryType) => {
    if (cat === CategoryType.FREE) {
      setView('FREE');
    } else {
      setSelectedCategory(cat);
      setView('CATEGORY');
    }
    setSelectedProduct(null);
    setIsMenuOpen(false);
  };

  const goToProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setView('PRODUCT');
  };

  const resetSelection = () => {
    setSelectedPackage(null);
    setPlayerID('');
    setServiceID('');
    setShowPayment(false);
  };

  // --- Logic ---
  const filteredProducts = useMemo(() => {
    if (view === 'HOME') return products.filter(p => p.category === CategoryType.GAMES || p.category === CategoryType.APPS).slice(0, 8);
    if (view === 'CATEGORY' && selectedCategory) return products.filter(p => p.category === selectedCategory);
    return products;
  }, [view, selectedCategory, products]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAdFormSubmit = () => {
    if (!adForm.title || !adForm.url) {
      alert("الرجاء إدخال عنوان الإعلان والرابط على الأقل.");
      return;
    }
    const message = `🚀 طلب إعلان جديد 📢\n----------------------------\n📝 العنوان: ${adForm.title}\n🌐 الرابط: ${adForm.url}\n📄 الوصف: ${adForm.description || 'لا يوجد'}\n⏳ المدة: ${adForm.duration}\n💰 السعر المتفق عليه: ${DEFAULT_AD_PRICE_PER_WEEK} / أسبوع\n----------------------------\nأود تفعيل هذا الإعلان، سأقوم بإرسال إيصال الدفع فوراً.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowAdSubmitModal(false);
  };

  const notifyAdminLogin = (user: User, type: 'login' | 'register' | 'google') => {
    const timestamp = new Date().toLocaleString('ar-EG');
    let title = "";
    switch(type) {
        case 'register': title = "🎉 إنشاء حساب جديد"; break;
        case 'login': title = "👋 تسجيل دخول عضو"; break;
        case 'google': title = "🌐 دخول عبر Google"; break;
    }
    const message = `تنبيه أمني: دخول مستخدم 🔐\n${title}\n----------------------------\n👤 الاسم: ${user.name}\n📧 الايميل: ${user.email}\n🆔 المعرف: ${user.id}\n⏰ الوقت: ${timestamp}\n----------------------------`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppAction = () => {
    if (!selectedProduct || !selectedPackage || !playerID) {
      alert('الرجاء إكمال البيانات المطلوبة أولاً');
      return;
    }
    const orderId = `ORD-${Math.floor(Math.random() * 900000) + 100000}`;
    const timestamp = new Date().toLocaleString('ar-EG');
    const userPart = currentUser ? `\n👤 العميل: ${currentUser.name}\n📧 الايميل: ${currentUser.email}` : '\n👤 العميل: زائر';
    
    const message = `مرحباً فريق تطبيق الشحن الذكي 👋\nأود تأكيد طلبي الجديد:${userPart}\n----------------------------\n📝 رقم الطلب: ${orderId}\n📦 المنتج: ${selectedProduct.name}\n💎 الحزمة: ${selectedPackage.label}\n👤 المعرف/الرابط: ${playerID}\n💰 السعر: ${selectedPackage.price}\n⏰ وقت الطلب: ${timestamp}\n----------------------------\nلقد أتممت عملية الدفع وأرفق لكم صورة الإيصال طيه.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleFreeRequest = () => {
    if (!playerID || !serviceID) {
      alert('الرجاء إدخال الـ ID الخاص باللعبة والخدمة المطلوبة بدقة');
      return;
    }
    if (clickCount < 1000) {
      alert('⚠️ عذراً، يجب إكمال 1000 نقرة إجمالية أولاً لاعتماد طلبك المجاني!');
      return;
    }
    if (!isFollowing) {
      alert('⚠️ شرط أساسي: يجب متابعة حساب الأدمن أولاً ليتم قبول طلبك!');
      return;
    }
    const userPart = currentUser ? `\n👤 العميل: ${currentUser.name} (عضو مسجل)` : '\n👤 العميل: زائر';
    const message = `🚀 طلب خدمة مجانية (100% Free) 🎁\n${userPart}\n----------------------------\n👤 معرف اللعبة (Game ID): ${playerID}\n🎮 الخدمة المطلوبة (Service ID): ${serviceID}\n🖱️ إجمالي النقرات: ${clickCount}\n✅ متابعة الأدمن: تم التحقق\n----------------------------\nلقد نفذت جميع الشروط بدقة، أرجو مراجعة طلبي وشحنه مجاناً. شكرًا لكم!`;
    const url = `https://wa.me/${freeWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // --- Auth Logic ---
  const handleAuth = () => {
    setAuthLoading(true);
    setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users_db') || '[]');
        if (authMode === 'register') {
            if (!authName || !authEmail || !authPassword) {
                alert("جميع الحقول مطلوبة");
                setAuthLoading(false);
                return;
            }
            if (storedUsers.find((u: User) => u.email === authEmail)) {
                alert("البريد الإلكتروني مسجل مسبقاً");
                setAuthLoading(false);
                return;
            }
            const newUser: User = {
                id: `user-${Date.now()}`,
                name: authName,
                email: authEmail,
                password: authPassword,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authName}`,
                joinDate: new Date().toLocaleDateString('ar-EG')
            };
            const updatedUsers = [...storedUsers, newUser];
            localStorage.setItem('users_db', JSON.stringify(updatedUsers));
            localStorage.setItem('current_user', JSON.stringify(newUser));
            setCurrentUser(newUser);
            setShowAuthModal(false);
            notifyAdminLogin(newUser, 'register');
        } else {
            const user = storedUsers.find((u: User) => u.email === authEmail && u.password === authPassword);
            if (user) {
                localStorage.setItem('current_user', JSON.stringify(user));
                setCurrentUser(user);
                setShowAuthModal(false);
                notifyAdminLogin(user, 'login');
            } else {
                alert("بيانات الدخول غير صحيحة");
            }
        }
        setAuthLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
      setAuthLoading(true);
      setTimeout(() => {
          const googleUser: User = {
              id: `g-user-${Date.now()}`,
              name: "مستخدم Google",
              email: "google.user@example.com",
              avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
              joinDate: new Date().toLocaleDateString('ar-EG')
          };
          const storedUsers = JSON.parse(localStorage.getItem('users_db') || '[]');
          if (!storedUsers.find((u: User) => u.email === googleUser.email)) {
              localStorage.setItem('users_db', JSON.stringify([...storedUsers, googleUser]));
          }
          localStorage.setItem('current_user', JSON.stringify(googleUser));
          setCurrentUser(googleUser);
          setShowAuthModal(false);
          setAuthLoading(false);
          notifyAdminLogin(googleUser, 'google');
      }, 2000);
  };

  const handleLogout = () => {
      localStorage.removeItem('current_user');
      setCurrentUser(null);
      setIsMenuOpen(false);
  };

  // --- Admin Logic ---
  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount === 5) {
      setIsAdminOpen(true);
      setLogoClicks(0);
    }
    setTimeout(() => setLogoClicks(0), 2000);
  };

  const saveAdminData = () => {
    localStorage.setItem('wa_num', whatsappNumber);
    localStorage.setItem('free_wa', freeWhatsapp);
    localStorage.setItem('ad_link', adLink);
    localStorage.setItem('hero_title', heroTitle);
    localStorage.setItem('hero_subtitle', heroSubtitle);
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('payments', JSON.stringify(paymentMethods));
    localStorage.setItem('admin_pwd', adminPassword);
    localStorage.setItem('free_links', JSON.stringify(freeLinks));
    localStorage.setItem('admin_follow', adminFollowLink);
    alert("✅ تم تحديث بيانات النظام والخدمات بنجاح!");
  };

  const handleAdminLogin = () => {
    if (adminPassInput === adminPassword) {
      setIsAdminAuthenticated(true);
    } else {
      alert("❌ كلمة المرور غير صحيحة!");
    }
  };

  const incrementClicks = (link: string) => {
    const incrementAmount = 20; 
    const newCount = clickCount + incrementAmount;
    setClickCount(newCount);
    localStorage.setItem('user_clicks', newCount.toString());
    window.open(link, '_blank');
  };

  // Admin View
  if (isAdminOpen) {
     return (
       <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans" dir="rtl">
         {!isAdminAuthenticated ? (
           <div className="max-w-md mx-auto mt-24 p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800">
             <div className="flex justify-center mb-6"><div className="bg-blue-600/20 p-5 rounded-full ring-8 ring-blue-500/5"><Lock className="text-blue-500 w-10 h-10" /></div></div>
             <h2 className="text-2xl font-black text-center mb-8">تسجيل دخول المسؤول</h2>
             <input type="password" placeholder="أدخل كلمة المرور السرية" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl mb-4 text-center tracking-widest text-white font-bold" value={adminPassInput} onChange={(e) => setAdminPassInput(e.target.value)} />
             <button onClick={handleAdminLogin} className="w-full bg-blue-600 p-4 rounded-2xl font-black text-lg">دخول</button>
             <button onClick={() => setIsAdminOpen(false)} className="w-full mt-6 text-slate-500 text-sm font-bold">إلغاء والعودة</button>
           </div>
         ) : (
           <div className="max-w-7xl mx-auto pb-20">
             <header className="flex justify-between items-center mb-12 bg-slate-900 p-6 rounded-3xl border border-slate-800">
               <h1 className="text-2xl font-black">لوحة التحكم</h1>
               <div className="flex gap-2">
                 <button onClick={saveAdminData} className="bg-emerald-600 px-6 py-2 rounded-xl font-bold">حفظ</button>
                 <button onClick={() => setIsAdminOpen(false)} className="bg-slate-800 px-6 py-2 rounded-xl font-bold">خروج</button>
               </div>
             </header>
             <div className="grid gap-8">
               <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                 <h3 className="font-bold mb-4">أرقام الواتساب</h3>
                 <input value={whatsappNumber} onChange={(e)=>setWhatsappNumber(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl mb-2 text-white" placeholder="رقم الشحن" />
                 <input value={freeWhatsapp} onChange={(e)=>setFreeWhatsapp(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl text-white" placeholder="رقم المجاني" />
               </div>
             </div>
           </div>
         )}
       </div>
     );
  }

  // --- Render Components ---
  const CategoryNav = () => (
    <div className="hidden lg:flex items-center gap-2">
      {[
        { id: CategoryType.GAMES, label: 'الألعاب' },
        { id: CategoryType.SOCIAL, label: 'السوشيال ميديا' },
        { id: CategoryType.APPS, label: 'التطبيقات' },
        { id: CategoryType.SERVICES, label: 'الخدمات العامة' },
        { id: CategoryType.FREE, label: 'شحن مجاني 🎁', special: true }
      ].map(tab => (
        <button 
          key={tab.id}
          onClick={() => goToCategory(tab.id as CategoryType)} 
          className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all duration-300 ${view === 'CATEGORY' && selectedCategory === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105' : tab.special ? 'text-pink-600 hover:bg-pink-50' : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/50'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Ad Submission Modal */}
      {showAdSubmitModal && (
         <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAdSubmitModal(false)}></div>
             <div className="bg-white w-full max-w-2xl rounded-[3rem] p-8 md:p-12 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
                 <button onClick={() => setShowAdSubmitModal(false)} className="absolute top-8 left-8 p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition"><X size={24} className="text-slate-500"/></button>
                 <div className="text-center mb-10">
                    <div className="inline-block bg-blue-50 p-5 rounded-3xl mb-4 text-blue-600"><Rocket size={40} /></div>
                    <h3 className="text-3xl font-black">أرسل بيانات إعلانك</h3>
                    <p className="text-slate-500 font-bold mt-2">يرجى ملء البيانات التالية لنقوم بتجهيز إعلانك فوراً</p>
                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-6 py-2 rounded-full text-sm font-black mt-4 shadow-sm border border-amber-200">
                      <Sparkles size={16} /> الإعلان بـ {DEFAULT_AD_PRICE_PER_WEEK} فقط أسبوعياً!
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className="flex items-center gap-2 text-sm font-black text-slate-700 mr-2"><Layout size={18} className="text-blue-500" /> عنوان الإعلان أو اسم الموقع:</label>
                       <input type="text" value={adForm.title} onChange={(e) => setAdForm({...adForm, title: e.target.value})} placeholder="مثال: موقع شحن مجاني" className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-500 outline-none transition font-bold shadow-inner" />
                    </div>
                    <div className="space-y-3">
                       <label className="flex items-center gap-2 text-sm font-black text-slate-700 mr-2"><LinkIcon size={18} className="text-blue-500" /> الرابط المستهدف (Link):</label>
                       <input type="text" value={adForm.url} onChange={(e) => setAdForm({...adForm, url: e.target.value})} placeholder="https://..." className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-500 outline-none transition font-bold shadow-inner" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                       <label className="flex items-center gap-2 text-sm font-black text-slate-700 mr-2"><FileText size={18} className="text-blue-500" /> وصف قصير للإعلان:</label>
                       <textarea rows={3} value={adForm.description} onChange={(e) => setAdForm({...adForm, description: e.target.value})} placeholder="اكتب هنا تفاصيل الخدمة التي تريد الإعلان عنها..." className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-500 outline-none transition font-bold shadow-inner resize-none"></textarea>
                    </div>
                    <div className="space-y-3 md:col-span-2">
                       <label className="flex items-center gap-2 text-sm font-black text-slate-700 mr-2"><Clock size={18} className="text-blue-500" /> مدة الإعلان المطلوبة:</label>
                       <select value={adForm.duration} onChange={(e) => setAdForm({...adForm, duration: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-500 outline-none transition font-bold shadow-inner appearance-none cursor-pointer">
                          <option value="1 week">أسبوع واحد - ({DEFAULT_AD_PRICE_PER_WEEK})</option>
                          <option value="2 weeks">أسبوعين - ($10)</option>
                          <option value="1 month">شهر كامل - ($20)</option>
                          <option value="VIP">خطة VIP (تثبيت دائم + دعم)</option>
                       </select>
                    </div>
                 </div>
                 <div className="mt-10 flex flex-col md:flex-row gap-4">
                    <button onClick={handleAdFormSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 transform active:scale-95 transition-all"><Send size={24} /> تأكيد وإرسال البيانات</button>
                    <button onClick={() => setShowAdSubmitModal(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-10 py-5 rounded-[2rem] font-black text-xl transform active:scale-95 transition-all">إلغاء</button>
                 </div>
                 <p className="text-center text-xs text-slate-400 font-bold mt-6 flex items-center justify-center gap-2"><ShieldCheck size={14} /> يتم مراجعة الإعلان خلال ساعات قليلة من الدفع.</p>
             </div>
         </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAuthModal(false)}></div>
             <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                 <button onClick={() => setShowAuthModal(false)} className="absolute top-6 left-6 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition"><X size={20} className="text-slate-500"/></button>
                 <div className="text-center mb-8">
                     <div className="inline-block bg-blue-50 p-4 rounded-full mb-4"><UserIcon size={32} className="text-blue-600" /></div>
                     <h3 className="text-2xl font-black text-slate-900">{authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h3>
                 </div>
                 <div className="space-y-4">
                     {authMode === 'register' && (
                         <div className="relative"><UserIcon className="absolute right-4 top-4 text-slate-400" size={20} /><input type="text" placeholder="الاسم الكامل" className="w-full bg-slate-50 border border-slate-200 p-4 pr-12 rounded-2xl font-bold" value={authName} onChange={(e) => setAuthName(e.target.value)} /></div>
                     )}
                     <div className="relative"><Mail className="absolute right-4 top-4 text-slate-400" size={20} /><input type="email" placeholder="البريد الإلكتروني" className="w-full bg-slate-50 border border-slate-200 p-4 pr-12 rounded-2xl font-bold" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} /></div>
                     <div className="relative"><Key className="absolute right-4 top-4 text-slate-400" size={20} /><input type="password" placeholder="كلمة المرور" className="w-full bg-slate-50 border border-slate-200 p-4 pr-12 rounded-2xl font-bold" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} /></div>
                     <button onClick={handleAuth} disabled={authLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-2">{authLoading ? <Loader2 className="animate-spin" /> : (authMode === 'login' ? 'دخول للحساب' : 'إنشاء الحساب')}</button>
                     <div className="relative flex py-2 items-center"><div className="flex-grow border-t border-slate-200"></div><span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold">أو الاستمرار بواسطة</span><div className="flex-grow border-t border-slate-200"></div></div>
                     <button onClick={handleGoogleLogin} disabled={authLoading} className="w-full bg-white border border-slate-200 text-slate-700 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50"><Globe size={20} className="text-blue-500" /> Google</button>
                 </div>
                 <div className="text-center mt-6">
                     <p className="text-slate-500 text-sm font-bold">{authMode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}<button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-blue-600 hover:text-blue-700 mx-2 underline">{authMode === 'login' ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}</button></p>
                 </div>
             </div>
         </div>
      )}

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-[100] px-4 md:px-8 py-5 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={goHome}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-2xl group-hover:rotate-12 transition-all shadow-lg shadow-blue-500/20"><Zap className="text-white w-6 h-6" /></div>
            <h1 className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight">تطبيق الشحن الذكي</h1>
          </div>
          <CategoryNav />
          <div className="flex items-center gap-3">
             <a href={adLink} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-6 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all animate-pulse"><Ticket size={18} /> هدايا اليوم</a>
             {currentUser ? (
                <div className="relative group">
                    <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 pl-4 pr-2 py-1.5 rounded-full transition border border-slate-200">
                        <span className="text-sm font-black text-slate-700 hidden md:block">{currentUser.name}</span>
                        <img src={currentUser.avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-white shadow-sm" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                        <div className="p-4 border-b border-slate-50"><p className="text-xs text-slate-400 font-bold">عضو منذ</p><p className="text-xs font-black text-slate-800">{currentUser.joinDate}</p></div>
                        <button onClick={handleLogout} className="w-full text-right p-4 text-red-500 font-bold text-sm hover:bg-red-50 flex items-center gap-2"><LogOut size={16} /> تسجيل الخروج</button>
                    </div>
                </div>
             ) : (
                <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-sm font-black hover:bg-slate-800 transition shadow-lg"><UserIcon size={18} /> <span className="hidden sm:inline">دخول / تسجيل</span></button>
             )}
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">{isMenuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[90] bg-white pt-24 px-8 animate-in slide-in-from-top-full duration-500 ease-out">
          {currentUser && (
              <div className="mb-8 p-6 bg-slate-50 rounded-[2rem] flex items-center gap-4">
                  <img src={currentUser.avatar} alt="" className="w-14 h-14 rounded-full bg-white shadow-md" />
                  <div><h4 className="font-black text-lg">{currentUser.name}</h4><p className="text-xs text-slate-500 font-bold">{currentUser.email}</p></div>
              </div>
          )}
          <div className="flex flex-col gap-4 text-xl font-black">
             <button onClick={() => goToCategory(CategoryType.GAMES)} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl group">الألعاب <Gamepad2 className="text-blue-600"/></button>
             <button onClick={() => goToCategory(CategoryType.SOCIAL)} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl group">السوشيال ميديا <Share2 className="text-pink-600"/></button>
             <button onClick={() => goToCategory(CategoryType.FREE)} className="flex items-center justify-between p-5 bg-pink-50 text-pink-600 rounded-3xl group shadow-lg shadow-pink-100/50">خدمات مجانية 🎁 <Gift /></button>
             <button onClick={() => { setIsMenuOpen(false); setShowAuthModal(true); }} className="bg-slate-900 text-white p-5 rounded-3xl text-center shadow-xl mt-4">تسجيل الدخول / حساب جديد</button>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 left-8 p-3 bg-slate-100 rounded-full shadow-inner"><X/></button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        
        {/* --- HOME PAGE VIEW --- */}
        {view === 'HOME' && (
           <div className="animate-in fade-in duration-700">
             {/* Hero Section */}
             <div className="text-center mb-20 space-y-6">
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">{heroTitle}</h2>
               <p className="text-slate-500 font-bold text-lg md:text-xl max-w-3xl mx-auto">{heroSubtitle}</p>
             </div>

             {/* Features Section */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition duration-500">
                   <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"><Zap size={32}/></div>
                   <h3 className="text-xl font-black text-center mb-2">سرعة الاستجابة</h3>
                   <p className="text-slate-500 text-center text-sm font-bold">تنفيذ فوري لجميع طلبات الشحن على مدار الساعة.</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition duration-500">
                   <div className="bg-emerald-50 text-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"><ShieldCheck size={32}/></div>
                   <h3 className="text-xl font-black text-center mb-2">ثقة وأمان 100%</h3>
                   <p className="text-slate-500 text-center text-sm font-bold">نظام محمي ومشفر بالكامل لضمان حقوقك وخصوصيتك.</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition duration-500">
                   <div className="bg-pink-50 text-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"><MessageSquare size={32}/></div>
                   <h3 className="text-xl font-black text-center mb-2">متابعة دقيقة</h3>
                   <p className="text-slate-500 text-center text-sm font-bold">تحديثات فورية لحالة طلبك عبر الواتساب لحظة بلحظة.</p>
                </div>
             </div>

             {/* Categories Grid */}
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-black text-slate-800 border-r-8 border-indigo-600 pr-6">تصفح الأقسام</h3>
             </div>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
               {[
                 { id: CategoryType.GAMES, label: 'الألعاب', icon: <Gamepad2 />, color: 'from-blue-500 to-blue-700', shadow: 'shadow-blue-500/20' },
                 { id: CategoryType.SOCIAL, label: 'التواصل الاجتماعي', icon: <Share2 />, color: 'from-pink-500 to-rose-700', shadow: 'shadow-pink-500/20' },
                 { id: CategoryType.APPS, label: 'التطبيقات بلس', icon: <Smartphone />, color: 'from-indigo-500 to-violet-700', shadow: 'shadow-indigo-500/20' },
                 { id: CategoryType.SERVICES, label: 'خدمات منوعة', icon: <Globe />, color: 'from-emerald-500 to-teal-700', shadow: 'shadow-emerald-500/20' },
               ].map(cat => (
                 <button 
                   key={cat.id} 
                   onClick={() => goToCategory(cat.id as CategoryType)} 
                   className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 flex flex-col items-center gap-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                 >
                   <div className={`bg-gradient-to-br ${cat.color} text-white p-5 rounded-3xl ${cat.shadow} group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                     {cat.icon}
                   </div>
                   <span className="font-black text-slate-800 text-lg">{cat.label}</span>
                 </button>
               ))}
             </div>

             {/* Popular Products */}
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-black text-slate-800 border-r-8 border-blue-600 pr-6">الأكثر طلباً</h3>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 mb-24">
               {filteredProducts.map(product => (
                 <div 
                   key={product.id} 
                   onClick={() => goToProduct(product)} 
                   className="group cursor-pointer bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 border border-slate-50 transform hover:-translate-y-2"
                 >
                   <div className="relative h-56 md:h-64 overflow-hidden">
                     <img src={product.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                        <span className="text-white font-black text-xl mb-1">{product.name}</span>
                     </div>
                   </div>
                   <div className="p-6 flex justify-between items-center">
                      <h4 className="font-black text-slate-800 text-lg line-clamp-1">{product.name}</h4>
                      <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform"><ChevronRight size={20} /></div>
                   </div>
                 </div>
               ))}
             </div>

             {/* --- ADVERTISING SECTION --- */}
             <section className="bg-white rounded-[4rem] p-8 md:p-16 shadow-2xl border border-blue-50 relative overflow-hidden mb-24">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-x-16 -translate-y-16"></div>
                
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                   <div className="inline-block bg-blue-600 text-white p-4 rounded-3xl shadow-xl shadow-blue-500/30 mb-4 animate-bounce">
                      <Rocket size={40} />
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">🚀 أعلن عن خدمتك ووصل لعملاء حقيقيين</h2>
                   <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full text-xl font-black shadow-lg animate-pulse mb-6">
                      <Sparkles /> فقط بـ {DEFAULT_AD_PRICE_PER_WEEK} أسبوعياً!
                   </div>
                   <p className="text-slate-500 font-bold text-lg md:text-xl">
                      هل عندك موقع 🌐 تطبيق 📱 خدمة رقمية 💻 أو رابط أفلييت وتبحث عن نتائج حقيقية؟ موقعنا يوفّر لك أفضل حل إعلاني بأقل التكاليف.
                   </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                   <div className="space-y-8">
                      <h3 className="text-2xl font-black flex items-center gap-3 text-blue-700"><Target /> مميزات الإعلان معنا:</h3>
                      <div className="grid gap-4">
                         {[
                            "ظهور إعلانك أمام مستخدمين حقيقيين ومهتمين بالخدمات الرقمية.",
                            "مناسب لأصحاب المواقع، التطبيقات، والخدمات الرقمية المختلفة.",
                            `نتائج واضحة وتفاعل فعلي بأسعار تبدأ من ${DEFAULT_AD_PRICE_PER_WEEK} فقط.`,
                            "دعم فني سريع وتفعيل مباشر للإعلان بعد تأكيد الدفع."
                         ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-4 bg-blue-50/50 p-5 rounded-3xl border border-blue-100">
                               <div className="bg-blue-600 text-white p-1.5 rounded-lg shrink-0"><CheckCircle size={18} /></div>
                               <p className="font-bold text-slate-700 text-sm md:text-base leading-relaxed">{feature}</p>
                            </div>
                         ))}
                      </div>

                      <div className="bg-amber-50 border-2 border-dashed border-amber-200 p-6 rounded-[2.5rem] flex items-start gap-4">
                         <AlertCircle className="text-amber-600 shrink-0" size={28} />
                         <div>
                            <h4 className="font-black text-amber-800 mb-1">تنبيه هام جداً:</h4>
                            <p className="text-sm text-amber-900 font-bold leading-relaxed">
                               بعد إتمام عملية الدفع، يجب إرسال <b>إشعار الدفع أو لقطة شاشة للإيصال</b> عبر الواتساب ليتم تفعيل إعلانك فوراً.
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-8 bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-inner">
                      <div className="flex items-center justify-between">
                         <h3 className="text-2xl font-black flex items-center gap-3 text-slate-800"><CreditCard /> طرق دفع الإعلانات:</h3>
                         <div className="text-[10px] bg-slate-200 px-3 py-1 rounded-full font-black text-slate-500">عمولة المحفظة: 0.00000100</div>
                      </div>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                         {paymentMethods.map((method, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-[1.5rem] shadow-sm flex items-center justify-between gap-4 border border-slate-100 group">
                               <div className="flex items-center gap-3">
                                  <span className="text-2xl w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">{method.icon}</span>
                                  <div className="overflow-hidden"><p className="text-[10px] font-black text-slate-400 mb-0.5">{method.name}</p><p className="text-xs font-mono font-bold text-slate-800 truncate max-w-[140px] md:max-w-[200px]">{method.address}</p></div>
                               </div>
                               <button onClick={() => copyToClipboard(method.address || '', `ad-pay-${idx}`)} className="p-2.5 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-xl transition shadow-inner">
                                  {copiedId === `ad-pay-${idx}` ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                               </button>
                            </div>
                         ))}
                      </div>

                      <div className="flex flex-col gap-3">
                        <button onClick={() => setShowAdSubmitModal(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 shadow-xl shadow-blue-500/20 transform active:scale-95 transition-all">
                           <Layout size={28} /> ارفع إعلانك بـ {DEFAULT_AD_PRICE_PER_WEEK} فقط
                        </button>
                        <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن تفاصيل إضافية للإعلانات.')}`} target="_blank" rel="noopener noreferrer" className="w-full bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors">
                           <MessageSquare size={20} className="text-emerald-500" /> تواصل للاستفسار
                        </a>
                      </div>
                   </div>
                </div>
             </section>

             {/* --- CRYPTO TO SDG WALLET SECTION (MOVED TO BOTTOM) --- */}
             <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-[4rem] p-8 md:p-16 shadow-2xl border border-white/5 relative overflow-hidden mb-24 group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-5 space-y-8">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="bg-emerald-600 p-4 rounded-3xl shadow-xl shadow-emerald-500/30 text-white"><ArrowDownUp size={40} /></div>
                        <h2 className="text-4xl md:text-5xl font-black text-white">خدمة تحويل العملات</h2>
                      </div>
                      <p className="text-slate-300 font-bold text-lg md:text-xl leading-relaxed">
                         حوّل أرباحك وعملاتك الرقمية إلى <span className="text-emerald-400">جنيه سوداني</span> فوراً عبر تطبيق (بنكك / فوري) بأفضل سعر صرف متاح.
                      </p>
                      
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2.5rem] space-y-4 shadow-inner">
                         <div className="flex items-center justify-between text-slate-300 font-black">
                            <span className="flex items-center gap-2 text-emerald-400"><Banknote size={20} /> استلام فوري في السودان:</span>
                            <span className="text-emerald-400 tracking-wider">بنكك / فوري</span>
                         </div>
                         <div className="h-px bg-white/10 w-full"></div>
                         <div className="space-y-3">
                            <h4 className="text-white font-black flex items-center gap-2 text-sm"><AlertCircle className="text-rose-500" size={16}/> شروط عملية التحويل:</h4>
                            <ul className="text-slate-400 text-xs font-bold space-y-2 pr-4">
                               <li className="list-disc">يجب إرسال المبلغ لأحد العناوين الموضحة وإرسال صورة المعاملة.</li>
                               <li className="list-disc">يرجى تزويدنا بـ <b className="text-white">رقم حساب بنكك واسم المستلم</b> بدقة.</li>
                               <li className="list-disc">عمولة المحفظة ثابتة عند: <span className="text-emerald-500 font-mono">0.00000100</span>.</li>
                               <li className="list-disc text-emerald-400">أي معاملة تتم مراجعتها وتنفيذها خلال أقل من 15 دقيقة.</li>
                            </ul>
                         </div>
                      </div>

                      <button onClick={() => {
                        const message = `مرحباً، أود تحويل عملات رقمية إلى جنيه سوداني (بنكك).\nأرجو تزويدي بأسعار الصرف الحالية.`;
                        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
                      }} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 shadow-xl shadow-blue-500/20 transform active:scale-95 transition-all">
                        <MessageSquare size={28} /> اطلب التحويل الآن
                      </button>
                   </div>

                   <div className="lg:col-span-7">
                      <div className="bg-white/5 backdrop-blur-xl rounded-[3.5rem] p-6 md:p-10 border border-white/10 shadow-2xl h-full">
                         <h3 className="text-white font-black text-xl mb-8 flex items-center justify-between">
                            <span>عناوين التحويل (Crypto)</span>
                            <div className="flex gap-2">
                               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                               <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Ready to Receive</span>
                            </div>
                         </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar pl-2">
                            {paymentMethods.map((method, idx) => (
                               <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-[1.8rem] hover:bg-white/10 transition group/item">
                                  <div className="flex items-center justify-between mb-4">
                                     <div className="flex items-center gap-3">
                                        <span className="text-2xl bg-white/10 w-12 h-12 flex items-center justify-center rounded-2xl text-white group-hover/item:scale-110 transition-transform">{method.icon}</span>
                                        <span className="text-white font-black text-sm">{method.name}</span>
                                     </div>
                                     <button onClick={() => copyToClipboard(method.address || '', `wallet-pay-${idx}`)} className="p-2.5 bg-white/5 hover:bg-emerald-600 text-white rounded-xl transition">
                                        {copiedId === `wallet-pay-${idx}` ? <CheckCircle2 size={16} className="text-blue-400" /> : <Copy size={16} />}
                                     </button>
                                  </div>
                                  <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                                     <p className="text-[10px] font-mono font-bold text-slate-500 break-all select-all">{method.address}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                         <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 font-black text-[10px] bg-black/20 py-3 rounded-2xl">
                            <ShieldCheck size={14} className="text-emerald-500" /> خدمة تبادل آمنة وموثوقة لجميع المستخدمين في السودان.
                         </div>
                      </div>
                   </div>
                </div>
             </section>
           </div>
        )}

        {/* --- CATEGORY VIEW --- */}
        {view === 'CATEGORY' && (
           <div className="animate-in slide-in-from-bottom-8 duration-700">
              <button onClick={goHome} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition"><ChevronRight className="rotate-180" size={20}/> العودة للرئيسية</button>
              <div className="flex items-center justify-between mb-12">
                 <h2 className="text-4xl font-black text-slate-900">قسم {selectedCategory === CategoryType.GAMES ? 'الألعاب' : selectedCategory === CategoryType.SOCIAL ? 'السوشيال ميديا' : 'الخدمات'}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
               {filteredProducts.map(product => (
                 <div key={product.id} onClick={() => goToProduct(product)} className="group cursor-pointer bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-50 transform hover:-translate-y-2">
                   <div className="relative h-56 md:h-64 overflow-hidden">
                     <img src={product.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                        <span className="text-white font-black text-xl mb-1">{product.name}</span>
                     </div>
                   </div>
                   <div className="p-6 flex justify-between items-center">
                      <h4 className="font-black text-slate-800 text-lg">{product.name}</h4>
                      <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform"><ChevronRight size={20} /></div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        )}

        {/* --- PRODUCT PAGE VIEW --- */}
        {view === 'PRODUCT' && selectedProduct && (
           <div className="max-w-6xl mx-auto animate-in zoom-in-95 duration-500">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
                 <button onClick={goHome} className="hover:text-blue-600 transition flex items-center gap-1"><Home size={16}/> الرئيسية</button>
                 <ChevronLeft size={14} />
                 <button onClick={() => goToCategory(selectedProduct.category)} className="hover:text-blue-600 transition">{selectedProduct.category}</button>
                 <ChevronLeft size={14} />
                 <span className="text-slate-800">{selectedProduct.name}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[4rem] -z-0"></div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-12 relative z-10">
                    <img src={selectedProduct.image} className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] object-cover shadow-2xl border-4 border-slate-50" alt="" />
                    <div className="text-center md:text-right">
                      <h3 className="text-3xl md:text-5xl font-black mb-3">{selectedProduct.name}</h3>
                      <div className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full font-black text-sm inline-block">{selectedProduct.category}</div>
                    </div>
                  </div>

                  <div className="space-y-10 relative z-10">
                    <div className="space-y-4">
                      <label className="block text-lg font-black text-slate-800 mr-4">المعلومات المطلوبة (ID/Link):</label>
                      <input type="text" placeholder={selectedProduct.category === CategoryType.SOCIAL ? "https://..." : "أدخل الـ ID هنا..."} value={playerID} onChange={(e) => setPlayerID(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 focus:border-blue-500 outline-none transition-all font-black text-xl shadow-inner" />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-lg font-black text-slate-800 mr-4">اختر الباقة المناسبة:</label>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedProduct.packages.map(pkg => (
                          <button key={pkg.id} onClick={() => setSelectedPackage(pkg)} className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all duration-300 ${selectedPackage?.id === pkg.id ? 'border-blue-600 bg-blue-50 shadow-lg scale-[1.02]' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white'}`}>
                            <span className="font-black text-xl">{pkg.label}</span>
                            <span className="text-blue-600 font-black text-2xl tracking-tighter">{pkg.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button disabled={!selectedPackage || !playerID} onClick={() => setShowPayment(true)} className={`w-full mt-12 py-8 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 transition-all transform active:scale-95 ${!selectedPackage || !playerID ? 'bg-slate-200 text-slate-400' : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/40'}`}>إتمام الطلب والدفع <ChevronRight size={32} /></button>
                </div>

                {showPayment && (
                  <div className="lg:col-span-5 space-y-8 animate-in slide-in-from-left-12 duration-700">
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                      <Zap className="absolute -top-10 -right-10 w-48 h-48 opacity-5 group-hover:rotate-12 transition-transform duration-1000" />
                      <h5 className="font-black text-2xl mb-8 flex items-center gap-3 border-b border-white/10 pb-5"><Ticket size={32} className="text-amber-400" /> ملخص الفاتورة</h5>
                      <div className="space-y-5 font-bold text-lg">
                        <div className="flex justify-between opacity-70"><span>المنتج:</span><span>{selectedProduct.name}</span></div>
                        <div className="flex justify-between opacity-70"><span>الحزمة:</span><span>{selectedPackage?.label}</span></div>
                        <div className="flex justify-between items-center pt-6 border-t border-white/10"><span className="text-xl">الإجمالي:</span><span className="text-5xl font-black text-amber-400 drop-shadow-lg">{selectedPackage?.price}</span></div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-4">
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">اختر وسيلة التحويل:</p>
                        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-black text-slate-400">عمولة: 0.00000100</span>
                      </div>
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {paymentMethods.map(method => (
                          <div key={method.id} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 group">
                            <div className="flex items-center gap-5 mb-6">
                              <span className="text-3xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform shadow-inner">{method.icon}</span>
                              <div><h5 className="font-black text-xl">{method.name}</h5><p className="text-xs text-slate-500 font-bold">{method.details}</p></div>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200"><code className="flex-1 text-sm font-mono truncate text-slate-600 font-black">{method.address}</code><button onClick={() => copyToClipboard(method.address || '', method.id)} className="bg-white p-3 hover:bg-blue-600 hover:text-white rounded-xl transition shadow-md">{copiedId === method.id ? <CheckCircle2 className="text-emerald-500" size={24} /> : <Copy size={24} />}</button></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start gap-4 shadow-sm">
                      <AlertCircle className="text-amber-600 shrink-0" size={24} />
                      <p className="text-xs text-amber-900 font-bold leading-relaxed">أي تحويل بدون إرسال إشعار الدفع عبر الواتساب لن يتم اعتماده. يرجى إرفاق صورة واضحة للإيصال.</p>
                    </div>
                    <button onClick={handleWhatsAppAction} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-8 rounded-[3rem] font-black text-2xl flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(16,185,129,0.3)] transform active:scale-95 transition-all"><MessageSquare size={36} /> أرسل إيصال الدفع</button>
                  </div>
                )}
              </div>
           </div>
        )}

        {/* --- FREE SERVICES VIEW --- */}
        {view === 'FREE' && (
           <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
             <button onClick={goHome} className="mb-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition"><ChevronRight className="rotate-180" size={20}/> العودة للرئيسية</button>
             <header className="text-center space-y-6">
                <div className="inline-block bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-[2.5rem] mb-6 shadow-2xl shadow-pink-500/40 relative"><Gift size={64} /><div className="absolute -top-4 -right-4 bg-white text-pink-600 p-2 rounded-full shadow-lg border-4 border-pink-50"><CheckCircle size={24} /></div></div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">احصل على خدمات مجانية 100%</h2>
                <p className="text-slate-500 font-bold text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">هل تحلم بشحن خدماتك المفضلة بدون دفع أموال؟ الآن الفرصة بين يديك... كل المطلوب هو <span className="text-pink-600 underline">التفاعل فقط</span>.</p>
             </header>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 space-y-8">
                   <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-pink-100 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000"></div>
                      <h3 className="text-2xl font-black mb-8 flex items-center gap-3"><Info className="text-pink-500" /> خطوات التنفيذ بدقة:</h3>
                      <div className="space-y-6">
                        {[{ step: "1", text: "قم بالنقر على الروابط الإعلانية أدناه لزيادة العداد." }, { step: "2", text: "أكمل 1000 نقرة إجمالية لاعتماد طلبك." }, { step: "3", text: "نفذ 100 نقرة مؤكدة (يتم التحقق منها يدويًا)." }, { step: "4", text: "متابعة حساب الأدمن هو شرط أساسي لقبول الطلب." }, { step: "5", text: "إدخال معرف اللعبة (Game ID) والخدمة بدقة." }].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4"><span className="bg-pink-100 text-pink-600 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black shadow-sm">{item.step}</span><p className="font-bold text-slate-700 leading-relaxed text-lg">{item.text}</p></div>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-7 space-y-8">
                   <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px]"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8"><div><span className="text-xs font-black uppercase tracking-widest text-pink-400 block mb-1">معدل الإنجاز</span><h4 className="text-2xl font-black">عداد النقرات الذكي</h4></div><div className="bg-white/10 px-6 py-2 rounded-2xl text-sm font-black flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div> مباشر الآن</div></div>
                        <div className="flex items-end justify-between mb-4"><div className="text-7xl font-black tracking-tighter">{clickCount} <span className="text-lg opacity-30 font-medium">/ 1000</span></div><div className="text-right pb-2"><span className="text-pink-400 font-black text-xl">{Math.min((clickCount / 1000) * 100, 100).toFixed(0)}%</span></div></div>
                        <div className="w-full bg-white/5 h-5 rounded-full mb-10 overflow-hidden border border-white/5 p-1 shadow-inner"><div className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(236,72,153,0.5)]" style={{ width: `${Math.min((clickCount / 1000) * 100, 100)}%` }}></div></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{freeLinks.map((link, i) => (<button key={i} onClick={() => incrementClicks(link)} className="bg-white/5 hover:bg-white text-white hover:text-slate-900 p-6 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all duration-300 group/btn border border-white/5 hover:scale-105"><div className="bg-pink-500 group-hover/btn:bg-slate-900 text-white p-3 rounded-xl transition-colors"><MousePointer2 size={24} /></div><span className="font-black text-sm">نقر الرابط {i + 1}</span></button>))}</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button onClick={() => { setIsFollowing(true); localStorage.setItem('is_following', 'true'); window.open(adminFollowLink, '_blank'); }} className={`group p-8 rounded-[2.5rem] font-black text-xl flex flex-col items-center justify-center gap-4 transition-all duration-500 border-2 ${isFollowing ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-xl shadow-emerald-100/50' : 'bg-white text-slate-900 border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2'}`}><div className={`p-4 rounded-3xl transition-colors ${isFollowing ? 'bg-emerald-600 text-white' : 'bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white'}`}><Instagram size={32} /></div><span>{isFollowing ? 'تم تأكيد المتابعة ✅' : 'متابعة حساب الأدمن'}</span></button>
                      <div className="bg-gradient-to-br from-indigo-600 to-blue-800 p-8 rounded-[2.5rem] text-white flex flex-col items-center justify-center text-center shadow-2xl"><Globe className="mb-4 opacity-50" size={40} /><h5 className="font-black mb-2">الدعم الفني للمجاني</h5><p className="text-xs opacity-70 mb-4 font-bold">للاستفسارات حول المهام المجانية</p><a href={`https://wa.me/${freeWhatsapp}`} className="bg-white text-indigo-700 px-6 py-2 rounded-xl font-black text-sm shadow-lg">{freeWhatsapp}</a></div>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100 max-w-4xl mx-auto relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full translate-x-32 translate-y-32"></div>
                <div className="text-center mb-12"><h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">أدخل بيانات الطلب المجاني</h3><p className="text-slate-400 font-bold">تأكد من إدخال المعلومات بدقة لتجنب رفض الطلب</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                   <div className="space-y-3"><label className="block text-sm font-black text-slate-700 mr-4">معرّف اللعبة (Game ID):</label><input type="text" value={playerID} onChange={(e) => setPlayerID(e.target.value)} placeholder="أدخل الـ ID هنا..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-5 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-black text-lg shadow-inner" /></div>
                   <div className="space-y-3"><label className="block text-sm font-black text-slate-700 mr-4">اسم الخدمة (Service ID):</label><input type="text" value={serviceID} onChange={(e) => setServiceID(e.target.value)} placeholder="مثال: PUBG Mobile / Free Fire" className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-5 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-black text-lg shadow-inner" /></div>
                </div>
                <button onClick={handleFreeRequest} className="w-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 text-white py-8 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl shadow-pink-500/40 transition-all transform hover:scale-[1.02] active:scale-95 group"><Send size={32} className="group-hover:translate-x-1 transition-transform" /> إرسال طلب الشحن المجاني</button>
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 mt-auto rounded-t-[5rem] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-30"></div>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
          <div className="md:col-span-6 space-y-8">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
              <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20 group-hover:rotate-12 transition-transform"><Zap className="text-white w-8 h-8" /></div>
              <h1 className="text-3xl font-black tracking-tight">تطبيق الشحن الذكي</h1>
            </div>
            <p className="text-slate-400 font-bold text-lg leading-relaxed max-w-md">المنصة الرائدة في الشرق الأوسط لتزويد الخدمات الرقمية وشحن الألعاب بضمان 100% وأسرع تنفيذ.</p>
            <div className="flex gap-5">
               <a href={`https://wa.me/${whatsappNumber}`} className="bg-white/5 p-5 rounded-3xl hover:bg-emerald-600 transition-all transform hover:-translate-y-1 shadow-xl"><MessageSquare size={28}/></a>
               <a href="#" className="bg-white/5 p-5 rounded-3xl hover:bg-pink-600 transition-all transform hover:-translate-y-1 shadow-xl"><Instagram size={28}/></a>
               <a href="#" className="bg-white/5 p-5 rounded-3xl hover:bg-blue-600 transition-all transform hover:-translate-y-1 shadow-xl"><Facebook size={28}/></a>
            </div>
          </div>
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-xl font-black flex items-center gap-3 border-r-4 border-blue-600 pr-5">الروابط</h4>
            <ul className="space-y-4 text-slate-400 font-black">
              <li><button onClick={() => goToCategory(CategoryType.GAMES)} className="hover:text-blue-400 transition-colors">شحن الألعاب</button></li>
              <li><button onClick={() => goToCategory(CategoryType.FREE)} className="hover:text-pink-400 transition-colors">خدمات مجانية 🔥</button></li>
              <li><a href={adLink} target="_blank" className="text-amber-500 hover:underline underline-offset-8">هدايا مميزة</a></li>
            </ul>
          </div>
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-xl font-black flex items-center gap-3 border-r-4 border-emerald-600 pr-5">تواصل معنا</h4>
            <ul className="space-y-5 text-slate-400 font-black">
              <li className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl hover:bg-white/10 transition-colors"><MessageSquare className="text-blue-400" size={24} /><div className="flex flex-col"><span className="text-[10px] uppercase opacity-40">واتساب الدعم</span><span className="text-sm">{whatsappNumber}</span></div></li>
              <li className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl"><ShieldCheck className="text-emerald-400" size={24} /><div className="flex flex-col"><span className="text-[10px] uppercase opacity-40">الأمان</span><span className="text-sm">دفع مشفر 100%</span></div></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-10 border-t border-white/5 text-center flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs font-black uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لـ الشحن الذكي.</p>
          <div className="flex gap-8"><a href="#" className="hover:text-white transition-colors">الخصوصية</a><a href="#" className="hover:text-white transition-colors">الشروط</a></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
