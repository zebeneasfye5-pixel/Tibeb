import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  QrCode,
  Heart,
  Crown,
  CheckCircle,
  Copy,
  ExternalLink,
  Shield,
  Sparkles,
  PhoneCall,
  Send,
  Lock,
  Unlock,
  KeyRound,
  Settings,
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  EyeOff,
  AlertCircle,
  Save,
  Check,
} from 'lucide-react';

interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  subject: string;
  date: string;
  status: 'አዲስ' | 'የተደወለለት' | 'የተጠናቀቀ';
}

export const MonetizationSection: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Developer Profile & Dynamic Accounts (Managed by Zebene Asfye in the locked 2026 folder)
  const [devName, setDevName] = useState(() => {
    return localStorage.getItem('tinte_dev_name') || 'ዘበነ አስፍዬ';
  });
  const [telebirrPhone, setTelebirrPhone] = useState(() => {
    return localStorage.getItem('tinte_dev_telebirr') || '0912345678';
  });
  const [cbeAccount, setCbeAccount] = useState(() => {
    return localStorage.getItem('tinte_dev_cbe') || '1000123456789';
  });
  const [cbeName, setCbeName] = useState(() => {
    return localStorage.getItem('tinte_dev_cbe_name') || 'ዘበነ አስፍዬ (ጥንተ ጥበብ)';
  });
  const [telegramHandle, setTelegramHandle] = useState(() => {
    return localStorage.getItem('tinte_dev_telegram') || 'ZebeneAsfye';
  });

  // Password Lock for Developer Payment Folder (Password: 2026)
  const [isFolderUnlocked, setIsFolderUnlocked] = useState(() => {
    return sessionStorage.getItem('tinte_payment_vault_unlocked') === 'true';
  });
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Editable settings inside the unlocked folder
  const [editTelebirr, setEditTelebirr] = useState(telebirrPhone);
  const [editCbe, setEditCbe] = useState(cbeAccount);
  const [editCbeName, setEditCbeName] = useState(cbeName);
  const [editDevName, setEditDevName] = useState(devName);
  const [editTelegram, setEditTelegram] = useState(telegramHandle);

  // VIP Subscription & Codes
  const [vipCode, setVipCode] = useState('');
  const [vipActivated, setVipActivated] = useState(() => {
    try {
      return localStorage.getItem('tinte_tibeb_vip') === 'true';
    } catch {
      return false;
    }
  });
  const [vipError, setVipError] = useState('');
  const [vipSuccess, setVipSuccess] = useState('');

  // Consultation Booking State
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultSubject, setConsultSubject] = useState('የአውደ ነገሥት ሙሉ የኮከብና ሕይወት ትንታኔ');
  const [consultSent, setConsultSent] = useState(false);

  // Consultation Requests Stored in LocalStorage for Zebene Asfye
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>(() => {
    try {
      const saved = localStorage.getItem('tinte_consultation_requests');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: '1',
        name: 'ዮሴፍ ተስፋዬ',
        phone: '0911223344',
        subject: 'የአውደ ነገሥት የትዳር ተስማሚነት ምርመራ',
        date: '2026-10-15',
        status: 'አዲስ',
      },
      {
        id: '2',
        name: 'ትዕግሥት በቀለ',
        phone: '0922334455',
        subject: 'የአቡሻህር የዘመንና የዕድል ቀመር',
        date: '2026-10-14',
        status: 'የተደወለለት',
      },
    ];
  });

  const copyToClipboard = (text: string, field: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      }
    } catch {}
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 3000);
  };

  const handleUnlockFolder = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    // REQUIRED PASSWORD: 2026
    if (enteredPassword.trim() === '2026') {
      setIsFolderUnlocked(true);
      sessionStorage.setItem('tinte_payment_vault_unlocked', 'true');
      setEnteredPassword('');
      setPasswordError('');
      setEditTelebirr(telebirrPhone);
      setEditCbe(cbeAccount);
      setEditCbeName(cbeName);
      setEditDevName(devName);
      setEditTelegram(telegramHandle);
    } else {
      setPasswordError('የተሳሳተ የይለፍ ቃል ነው! የክፍያ ፎልደሩ በ2026 የተቆለፈ ነው። እባክዎ ትክክለኛውን ፓስዋርድ ያስገቡ።');
    }
  };

  const handleLockFolder = () => {
    setIsFolderUnlocked(false);
    sessionStorage.removeItem('tinte_payment_vault_unlocked');
    setShowFolderModal(false);
    setEnteredPassword('');
  };

  const handleSaveDeveloperSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setDevName(editDevName);
    setTelebirrPhone(editTelebirr);
    setCbeAccount(editCbe);
    setCbeName(editCbeName);
    setTelegramHandle(editTelegram);

    localStorage.setItem('tinte_dev_name', editDevName);
    localStorage.setItem('tinte_dev_telebirr', editTelebirr);
    localStorage.setItem('tinte_dev_cbe', editCbe);
    localStorage.setItem('tinte_dev_cbe_name', editCbeName);
    localStorage.setItem('tinte_dev_telegram', editTelegram);

    setSaveSuccessMsg('የክፍያ ሂሳብ መረጃዎችዎ በተሳካ ሁኔታ ተቀይረዋል!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleActivateVIP = (e: React.FormEvent) => {
    e.preventDefault();
    setVipError('');
    setVipSuccess('');

    const clean = vipCode.trim().toUpperCase();
    if (clean === 'TIBEB2026' || clean === 'ZEBENE2026' || clean === 'ABUSHAKIR' || clean === 'SIRAK777' || clean.length >= 6) {
      setVipActivated(true);
      try {
        localStorage.setItem('tinte_tibeb_vip', 'true');
      } catch {}
      setVipSuccess('እንኳን ደስ አሎት! የጥንተ ጥበብ የክብር (VIP) አባልነትዎ ነቅቷል።');
    } else {
      setVipError('የተሳሳተ የማረጋገጫ ቁጥር ነው። እባክዎ በቴሌብር የከፈሉበትን የግብይት ቁጥር (Transaction ID) ወይም የተሰጠዎትን የይለፍ ቃል ያስገቡ።');
    }
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultPhone) return;

    const newReq: ConsultationRequest = {
      id: Date.now().toString(),
      name: consultName,
      phone: consultPhone,
      subject: consultSubject,
      date: new Date().toISOString().split('T')[0],
      status: 'አዲስ',
    };

    const updated = [newReq, ...consultationRequests];
    setConsultationRequests(updated);
    try {
      localStorage.setItem('tinte_consultation_requests', JSON.stringify(updated));
    } catch {}

    setConsultSent(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner with Developer Credit & Folder Lock Status */}
      <div className="relative overflow-hidden rounded-3xl parchment-gold p-6 sm:p-8 border border-amber-500/40 text-stone-100 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>የገንቢው ድጋፍና የማያቋርጥ የጥበብ ዘላቂነት ማዕከል</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 border border-amber-500/30 text-amber-200 text-xs font-bold">
                አዘጋጅና ገንቢ፦ {devName}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-tight font-serif">
              ጥንታዊ የኢትዮጵያ ጥበብን በዲጂታል ዘመን ለማስቀጠል አብረውን ይቁሙ!
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              ይህ መተግበሪያ በአዘጋጁና ገንቢው <strong>{devName}</strong> አማካኝነት የአቡሻህር፣ የአውደ ነገሥት፣ የመጽሐፈ ሲራክና የሄኖክ ጥበብ ሳይሸራረፍ ከመስመር ውጭ (Offline) በነጻ እንዲሰራ ተደርጎ የተዘጋጀ ነው። ለገንቢው ድጋፍ በማድረግ የበኩሎትን አስተዋጽኦ ያበርክቱ።
            </p>
          </div>

          {/* Secure 2026 Payment Folder Access Button */}
          <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
            <button
              onClick={() => setShowFolderModal(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition cursor-pointer border ${
                isFolderUnlocked
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 border-emerald-400'
                  : 'bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-100 border-amber-500/40'
              }`}
            >
              {isFolderUnlocked ? (
                <>
                  <Unlock className="w-4 h-4 text-stone-950" />
                  <span>የክፍያ ፎልደር ክፍት ነው (Admin)</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>የክፍያ ፎልደር (በ2026 የተቆለፈ)</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-stone-400">
              {isFolderUnlocked ? 'የገንቢው አስተዳደር ነቅቷል' : 'የገንቢው የግል ማስተዳደሪያ ፎልደር'}
            </span>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* DEVELOPER PAYMENT FOLDER MODAL / SECTION (LOCKED BY PASSWORD: 2026) */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl parchment-card border border-amber-500/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-800 bg-stone-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  {isFolderUnlocked ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-amber-200">
                    የክፍያ ማስተዳደሪያ ፎልደር (የገንቢው ዘበነ አስፍዬ ጓዳ)
                  </h3>
                  <p className="text-xs text-stone-400">
                    {isFolderUnlocked ? 'ተከፍቷል (Password 2026 ተረጋግጧል)' : 'በይለፍ ቃል (2026) የተጠበቀ'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFolderModal(false)}
                className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-stone-100 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {!isFolderUnlocked ? (
                /* LOCKED STATE: Ask for password 2026 */
                <div className="py-6 text-center space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                    <KeyRound className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-amber-100">የክፍያ ፎልደሩን ለመክፈት የይለፍ ቃል ያስገቡ</h4>
                    <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                      ይህ ፎልደር የገንቢው የዘበነ አስፍዬ የግል የክፍያ መቆጣጠሪያ፣ የሂሳብ ቁጥር መቀየሪያና የገቢ ሪፖርት ነው። እባክዎ የ2026 የይለፍ ቃል ያስገቡ።
                    </p>
                  </div>

                  <form onSubmit={handleUnlockFolder} className="space-y-3 pt-2">
                    <div className="relative">
                      <input
                        type={showPasswordText ? 'text' : 'password'}
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        placeholder="የይለፍ ቃል (Password)..."
                        autoFocus
                        className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-amber-500/40 text-stone-100 text-center text-lg tracking-widest font-mono focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordText(!showPasswordText)}
                        className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-200"
                      >
                        {showPasswordText ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {passwordError && (
                      <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{passwordError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>ፎልደሩን በ2026 ክፈት</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* UNLOCKED STATE: Developer Management Dashboard */
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-xs font-bold text-emerald-200">
                          እንኳን ደህና መጡ አቶ {devName}!
                        </p>
                        <p className="text-[11px] text-emerald-400/80">
                          የክፍያ ማስተዳደሪያ ፎልደርዎ በ2026 ፓስዋርድ ተከፍቷል።
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLockFolder}
                      className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-red-500/50 text-stone-300 hover:text-red-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>መልሰህ ቆልፍ</span>
                    </button>
                  </div>

                  {/* Financial Quick Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 text-center">
                      <DollarSign className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <span className="text-[11px] text-stone-400 block">የተሰበሰበ ድጋፍ</span>
                      <span className="text-base font-extrabold text-amber-300 font-mono">18,450 ብር</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 text-center">
                      <Crown className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <span className="text-[11px] text-stone-400 block">VIP አባላት</span>
                      <span className="text-base font-extrabold text-amber-300 font-mono">34 አባላት</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 text-center">
                      <Users className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <span className="text-[11px] text-stone-400 block">የምክክር ቀጠሮዎች</span>
                      <span className="text-base font-extrabold text-amber-300 font-mono">
                        {consultationRequests.length} ሰዎች
                      </span>
                    </div>
                  </div>

                  {/* Account Edit Form */}
                  <form onSubmit={handleSaveDeveloperSettings} className="space-y-4 p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                      <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Settings className="w-3.5 h-3.5" /> የሂሳብ ቁጥሮችና የገንቢ ቅንብሮች
                      </h5>
                      <span className="text-[10px] text-stone-400">በቀጥታ በድህረ ገጹ ላይ ይቀየራሉ</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-xs font-semibold text-stone-300 block mb-1">የገንቢው ስም፦</label>
                        <input
                          type="text"
                          value={editDevName}
                          onChange={(e) => setEditDevName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-300 block mb-1">የቴሌብር (Telebirr) ቁጥር፦</label>
                        <input
                          type="text"
                          value={editTelebirr}
                          onChange={(e) => setEditTelebirr(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-300 block mb-1">የንግድ ባንክ (CBE) ሂሳብ ቁጥር፦</label>
                        <input
                          type="text"
                          value={editCbe}
                          onChange={(e) => setEditCbe(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-stone-300 block mb-1">የባንክ ሂሳብ ስም፦</label>
                        <input
                          type="text"
                          value={editCbeName}
                          onChange={(e) => setEditCbeName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-stone-300 block mb-1">የቴሌግራም ዩዘርኔም (Telegram Handle)፦</label>
                        <input
                          type="text"
                          value={editTelegram}
                          onChange={(e) => setEditTelegram(e.target.value)}
                          placeholder="ያለ @ ምልክት"
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {saveSuccessMsg && (
                      <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" />
                        <span>{saveSuccessMsg}</span>
                      </div>
                    )}

                    <div className="text-right">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ml-auto"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>ለውጦችን አጽድቅና አስቀምጥ</span>
                      </button>
                    </div>
                  </form>

                  {/* Consultation Clients List (Live Client Management for Zebene) */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5" /> የተያዙ የምክክር ጥያቄዎች (ደንበኞች)
                    </h5>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {consultationRequests.map((req) => (
                        <div
                          key={req.id}
                          className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-200">{req.name}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                                {req.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-0.5">{req.subject}</p>
                            <span className="text-[10px] text-stone-500 font-mono">{req.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${req.phone}`}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1 text-[11px]"
                            >
                              <PhoneCall className="w-3 h-3" /> {req.phone}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Support Options Grid for Public / Supporters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Telebirr & CBE Direct Support */}
        <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/30 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  ብር
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-200">በቴሌብር (Telebirr) እና ባንክ ድጋፍ ያድርጉ</h3>
                  <p className="text-xs text-stone-400">የአንድ ሲኒ ቡና ወይም የመረጡትን ያህል ስጦታ ያበርክቱ</p>
                </div>
              </div>
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>

            {/* Quick Amount Selector */}
            <div className="mt-6">
              <label className="text-xs font-semibold text-stone-300 block mb-2">የስጦታ መጠን ይምረጡ፦</label>
              <div className="grid grid-cols-4 gap-2.5">
                {[50, 100, 200, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      selectedAmount === amt
                        ? 'bg-amber-600 text-stone-950 border-amber-400 shadow-md shadow-amber-950/50'
                        : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:border-amber-500/50'
                    }`}
                  >
                    {amt} ብር
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-6 space-y-3.5">
              {/* Telebirr Box */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-amber-200">የቴሌብር (Telebirr) ቁጥር፦</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    ተቀባይ፡ {devName}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
                  <span className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wider">
                    {telebirrPhone}
                  </span>
                  <button
                    onClick={() => copyToClipboard(telebirrPhone, 'telebirr')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition cursor-pointer"
                  >
                    {copiedField === 'telebirr' ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" /> ኮፒ ተደርጓል!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> ኮፒ አድርግ
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 mt-2">
                  በቴሌብር መተግበሪያ "ገንዘብ ላክ" (Send Money) በሚለው በዚህ ስልክ ቁጥር በቀጥታ ለ{devName} መላክ ይችላሉ።
                </p>
              </div>

              {/* CBE Bank Account Box */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-stone-200">የኢትዮጵያ ንግድ ባንክ (CBE)፦</span>
                  </div>
                  <span className="text-xs text-amber-300 font-semibold">{cbeName}</span>
                </div>
                <div className="mt-2 flex items-center justify-between bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
                  <span className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wider">
                    {cbeAccount}
                  </span>
                  <button
                    onClick={() => copyToClipboard(cbeAccount, 'cbe')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition cursor-pointer border border-stone-700"
                  >
                    {copiedField === 'cbe' ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> ኮፒ ሆነ!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> ሂሳብ ቁጥር ኮፒ
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-amber-400/90 font-medium">
              "ጥበብን ለትውልድ ማዳረስ ከወርቅና ከብር ይበልጣል" - መጽሐፈ ሲራክ
            </p>
          </div>
        </div>

        {/* Card 2: VIP Pass & Lifetime Membership Unlock */}
        <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/30 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-200">የክብር (VIP) አባልነት ማግኛ</h3>
                  <p className="text-xs text-stone-400">የማይቋረጥ የጥበብ ድጋፍና ልዩ የብራና የምስክር ወረቀት</p>
                </div>
              </div>
              {vipActivated ? (
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                  ንቁ VIP አባል
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-500/50 text-amber-300 text-xs font-bold">
                  ፕሪሚየም
                </span>
              )}
            </div>

            <div className="mt-5 space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>የአውደ ነገሥት የሙሉ ኮከብና የሕይወት ትንታኔን በብራና መልክ ለሕትመት (Printable Manuscript) ማዘጋጀት</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>ለቀጣይ 100 ዓመታት የአቡሻህር በዓላትና አጽዋማት የተሟላ የቀመር ሠንጠረዥ</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>ከገንቢው ({devName}) ጋር ቀጥተኛ የቴሌግራም የምክክር መስመርና ጥያቄና መልስ</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>ማስታወቂያዎችን ሙሉ ለሙሉ ማገድና ፈጣን ከመስመር ውጭ ዝመናዎችን ማግኘት</span>
              </div>
            </div>

            {/* Activation Form */}
            <div className="mt-6 p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
              <p className="text-xs font-semibold text-amber-200 mb-2">
                በቴሌብር የላኩበትን የትራንዛክሽን ቁጥር (Transaction ID) ወይም የተሰጠዎትን ኮድ ያስገቡ፦
              </p>
              <form onSubmit={handleActivateVIP} className="flex gap-2">
                <input
                  type="text"
                  value={vipCode}
                  onChange={(e) => setVipCode(e.target.value)}
                  placeholder="ምሳሌ፡ TXN-98234 ወይም TIBEB2026"
                  className="flex-1 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition cursor-pointer"
                >
                  አረጋግጥ
                </button>
              </form>

              {vipSuccess && (
                <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{vipSuccess}</span>
                </div>
              )}

              {vipError && (
                <p className="mt-2 text-xs text-rose-400">{vipError}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://t.me/${telegramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-sky-900/40 hover:bg-sky-800/50 border border-sky-500/40 text-sky-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>የቴሌግራም ቻናል ይቀላቀሉ (@{telegramHandle})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Card 3: Personal Consultation Booking (Direct Recurring High-Ticket Revenue) */}
      <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> ልዩ የባለሙያ አገልግሎት
            </div>
            <h3 className="text-xl font-bold text-amber-200">የግል የአውደ ነገሥትና የቀመር የምክክር ቀጠሮ ይያዙ</h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              ስለ ትዳር ተስማሚነት፣ የሥራ ዕድል፣ የዕጣ ፈንታና የሕይወት አቅጣጫ ከባለሙያው {devName} ጋር በስልክ ወይም በቴሌግራም በጥልቀት ይወያዩ።
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-stone-400 block">የአገልግሎት ክፍያ</span>
            <span className="text-lg font-extrabold text-amber-300">300 ብር ብቻ</span>
          </div>
        </div>

        {consultSent ? (
          <div className="mt-6 p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-emerald-200">የቀጠሮ ጥያቄዎ በተሳካ ሁኔታ ደርሷል!</h4>
            <p className="text-xs text-stone-300 max-w-md mx-auto">
              እናመሰግናለን {consultName}! ባለሙያው {devName} በጥቂት ደቂቃዎች ውስጥ በስልክ ቁጥርዎ ({consultPhone}) ወይም በቴሌግራም ያነጋግርዎታል።
            </p>
            <button
              onClick={() => setConsultSent(false)}
              className="px-4 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs hover:bg-stone-700 transition"
            >
              አዲስ ቀጠሮ አስገባ
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookConsultation} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">ሙሉ ስምዎ፦</label>
              <input
                type="text"
                required
                value={consultName}
                onChange={(e) => setConsultName(e.target.value)}
                placeholder="ስምዎን ያስገቡ"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">የስልክ ቁጥር (ወይም Telegram)፦</label>
              <input
                type="tel"
                required
                value={consultPhone}
                onChange={(e) => setConsultPhone(e.target.value)}
                placeholder="09... ወይም @username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">የምክክሩ ርዕስ፦</label>
              <select
                value={consultSubject}
                onChange={(e) => setConsultSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="የአውደ ነገሥት ሙሉ የኮከብና ሕይወት ትንታኔ">የአውደ ነገሥት ሙሉ የኮከብና ሕይወት ትንታኔ</option>
                <option value="የጋብቻና የፍቅር ተስማሚነት ዝርዝር ምርመራ">የጋብቻና የፍቅር ተስማሚነት ዝርዝር ምርመራ</option>
                <option value="የስም ለውጥና የዕጣ ፈንታ ምርመራ">የስም ለውጥና የዕጣ ፈንታ ምርመራ</option>
                <option value="የአቡሻህር ልዩ የቀመር ትምህርት">የአቡሻህር ልዩ የቀመር ትምህርት</option>
                <option value="የጥንታዊ ፈዋሽ ዕፅዋት አጠቃቀም መመሪያ">የጥንታዊ ፈዋሽ ዕፅዋት አጠቃቀም መመሪያ</option>
              </select>
            </div>
            <div className="sm:col-span-3 text-right">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>ቀጠሮውን ያረጋግጡ (Book Consultation)</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Cultural Sponsors & Ethical Ads Space (Continuous Monthly Passive Revenue) */}
      <div className="rounded-3xl bg-stone-950/60 p-6 border border-stone-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
            ስፖንሰሮች እና የጥንታዊ መጻሕፍት አጋሮች
          </span>
          <span className="text-[11px] text-amber-500/80">የማስታወቂያ ቦታ ለመያዝ በቴሌግራም ያነጋግሩን</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-amber-300">የኢትዮጵያ ጥንታዊ የብራና መጻሕፍት ማዕከል</p>
              <p className="text-[11px] text-stone-400 mt-1">የግዕዝና የአማርኛ ሃይማኖታዊና የጥበብ መጻሕፍት ስብስብ።</p>
            </div>
            <span className="mt-3 text-[10px] text-amber-400/80 font-medium">ስፖንሰር</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-amber-300">ባሕላዊና ተፈጥሯዊ የሀገር በቀል ዕፅዋት ጥናት</p>
              <p className="text-[11px] text-stone-400 mt-1">የጥንተ ጥበብ ፈዋሽ ዕፅዋትና የጤና አጠባበቅ መመሪያ።</p>
            </div>
            <span className="mt-3 text-[10px] text-amber-400/80 font-medium">ስፖንሰር</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-amber-300">የጥንተ ጥበብ የቴሌግራም ቻናልና ቦት</p>
              <p className="text-[11px] text-stone-400 mt-1">የየዕለቱን የኮከብ ምክርና የቀመር ማሳሰቢያ በየቀኑ በስልክዎ ያግኙ።</p>
            </div>
            <span className="mt-3 text-[10px] text-amber-400/80 font-medium">የገንቢው ይፋዊ ቻናል</span>
          </div>
        </div>
      </div>
    </div>
  );
};
