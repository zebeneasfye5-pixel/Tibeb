import React, { useState } from 'react';
import { TabType } from './types';
import { SirakReader } from './components/SirakReader';
import { HenokReader } from './components/HenokReader';
import { AbushakirCalc } from './components/AbushakirCalc';
import { AwdeNegestCalc } from './components/AwdeNegestCalc';
import { AncientTibebatView } from './components/AncientTibebatView';
import { MonetizationSection } from './components/MonetizationSection';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import {
  BookOpen,
  Calendar,
  Sparkles,
  Heart,
  Info,
  ShieldCheck,
  Compass,
  Scroll,
  Leaf,
  Shield,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('sirak');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-ethiopic selection:bg-amber-600 selection:text-white">
      {/* Offline Status Float */}
      <OfflineIndicator />

      {/* Top Universal App Header */}
      <header className="sticky top-0 z-40 bg-stone-950/90 border-b border-amber-500/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & App Title */}
          <div
            onClick={() => setActiveTab('sirak')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 border border-amber-500/40 p-1 flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:border-amber-400 transition">
              <img
                src="/icon.svg"
                alt="ጥንተ ጥበብ"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-amber-200 font-serif">
                  ጥንተ ጥበብ
                </h1>
                <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold uppercase">
                  Offline PWA
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-400 truncate max-w-[200px] sm:max-w-md">
                አዘጋጅና ገንቢ፡ ዘበነ አስፍዬ • የአቡሻህር • የአውደ ነገሥት • የሲራክና የሄኖክ • ጥንታዊ ዕፅዋትና አስማታት
              </p>
            </div>
          </div>

          {/* Action buttons (Install & Developer Support) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <PWAInstallButton variant="header" />

            <button
              onClick={() => setActiveTab('monetization')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeTab === 'monetization'
                  ? 'bg-amber-600 text-stone-950 border-amber-400 shadow-md'
                  : 'bg-gradient-to-r from-amber-600/20 to-red-600/20 text-amber-300 border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
              <span className="hidden sm:inline">ለገንቢው ድጋፍ</span>
              <span className="sm:hidden">ድጋፍ</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="border-t border-stone-800/80 bg-stone-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 scrollbar-none">
              <button
                onClick={() => setActiveTab('sirak')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === 'sirak'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>፩. መጽሐፈ ሲራክ</span>
              </button>

              <button
                onClick={() => setActiveTab('henok')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === 'henok'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <Scroll className="w-4 h-4 text-amber-400" />
                <span>፪. መጽሐፈ ሄኖክ</span>
              </button>

              <button
                onClick={() => setActiveTab('abushakir')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === 'abushakir'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>፫. አቡሻህር (ባሕረ ሐሳብ)</span>
              </button>

              <button
                onClick={() => setActiveTab('awdenegest')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === 'awdenegest'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>፬. አውደ ነገሥት</span>
              </button>

              <button
                onClick={() => setActiveTab('tibebat')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === 'tibebat'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>፭. ጥንታዊ ዕፅዋትና አስማተ ዕቀባ</span>
              </button>

              <button
                onClick={() => setActiveTab('monetization')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === 'monetization'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>፮. ለገንቢው ድጋፍና ገቢ</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === 'about'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <Info className="w-4 h-4 text-amber-400" />
                <span>፯. ስለ ጥንተ ጥበብ</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'sirak' && <SirakReader />}
        {activeTab === 'henok' && <HenokReader />}
        {activeTab === 'abushakir' && <AbushakirCalc />}
        {activeTab === 'awdenegest' && <AwdeNegestCalc />}
        {activeTab === 'tibebat' && <AncientTibebatView />}
        {activeTab === 'monetization' && <MonetizationSection />}
        {activeTab === 'about' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="rounded-3xl parchment-gold p-8 border border-amber-500/40 text-stone-100 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                <Scroll className="w-4 h-4" /> ስለ "ጥንተ ጥበብ" መተግበሪያ ታሪክና ዓላማ
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-serif">
                የኢትዮጵያ ጥንታዊ የጥበብ፣ የዘመን፣ የፈዋሽ ዕፅዋትና የሥነ-ምግባር አውታር
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                "ጥንተ ጥበብ" በአዘጋጁና ገንቢው <strong>ዘበነ አስፍዬ</strong> የተዘጋጀ ሲሆን፣ በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያንና በሀገራችን ጥንታዊ ሊቃውንት ዘንድ ለዘመናት ሲወርድ ሲዋረድ የኖረውን የቀመር፣ የከዋክብት፣ የዕፅዋትና የስነ-ምግባር ዕውቀት ለዘመናችን ትውልድ ያለ ምንም የቃላት፣ የፊደል፣ የአሰራርና የትርጉም ስህተት ሳይሸራረፍ በቀላሉ ለማድረስ ነው።
              </p>
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs px-3 py-1 rounded-xl bg-amber-500/20 text-amber-200 font-bold border border-amber-500/30">
                  አዘጋጅና መካነ ጥበቡን የቀመረው፡ ዘበነ አስፍዬ
                </span>
                <span className="text-xs text-stone-400">
                  የክፍያ ፎልደር በይለፍ ቃል (2026) የተቆለፈ
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl parchment-card border border-amber-500/30 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  ፩
                </div>
                <h3 className="text-base font-bold text-amber-200">መጽሐፈ ሲራክ</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  በኢየሱስ ወልደ ሲራክ የተጻፈው ፶፩ ምዕራፍ ያለው የጥበብ፣ የትዕግሥት፣ የእውነተኛ ወዳጅነትና የፈሪሃ እግዚአብሔር ታላቅ መጽሐፍ።
                </p>
              </div>

              <div className="p-5 rounded-3xl parchment-card border border-amber-500/30 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  ፪
                </div>
                <h3 className="text-base font-bold text-amber-200">መጽሐፈ ሄኖክ</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  ኢትዮጵያ ብቻ በግዕዝ ጠብቃ ያቆየችው፣ ስለ ቅዱሳን መላእክት፣ ስለ ሰማይ ብርሃናት በሮችና ስለ ፍጻሜው ፍርድ የሚያስተምር ራእይ።
                </p>
              </div>

              <div className="p-5 rounded-3xl parchment-card border border-amber-500/30 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  ፫
                </div>
                <h3 className="text-base font-bold text-amber-200">አቡሻህር (ባሕረ ሐሳብ)</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  የጨረቃና የፀሐይን ዑደት ተከትሎ የዓመቱን አጽዋማትና በዓላት፣ ወንጌላውያንን፣ ወንበርን፣ አበቅቴንና መጥቅዕን የሚያሰላ የቀመር መጽሐፍ።
                </p>
              </div>

              <div className="p-5 rounded-3xl parchment-card border border-amber-500/30 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  ፬
                </div>
                <h3 className="text-base font-bold text-amber-200">አውደ ነገሥት</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  በአበገድ (ሐሳበ ፊደል) መሠረት የ፲፪ቱን ቡርጆች ባሕርይ፣ የ፬ቱን መሠረቶች (እሳት፣ መሬት፣ ነፋስ፣ ማይ) እና የጋብቻ መስማማትን የሚመረምር።
                </p>
              </div>

              <div className="p-5 rounded-3xl parchment-card border border-amber-500/30 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  ፭
                </div>
                <h3 className="text-base font-bold text-amber-200">ጥንታዊ ዕፅዋትና አስማታት</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  የዕፀ ሳቤቅ፣ ዕፀ ደብዳቤ፣ ዕፀ መሰውር፣ ቀበርቾና 14 ፈዋሽ ዕፅዋት፤ እንዲሁም የፈውስና የእስር ድግምቶች ከትንሽ እስከ ትልቅ።
                </p>
              </div>

              <div className="p-5 rounded-3xl parchment-card border border-amber-500/30 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  ፮
                </div>
                <h3 className="text-base font-bold text-amber-200">የጥበባት ክልከላና ማስጠንቀቂያ</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  በመጽሐፈ ሄኖክ መሠረት የወደቁት መላእክት ያመጧቸው ጎጂ መተቶችና ጥንቆላዎች ለምን እንደተወገዙና የሰውን ነጻ ፈቃድ መጋፋት ለምን እንደተከለከለ የሚያስረዳ።
                </p>
              </div>
            </div>

            {/* Offline and Quality Commitment */}
            <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> ከመስመር ውጭ (Offline) አሰራርና ጥራት
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                ይህ ድህረ ገጽ Progressive Web App (PWA) ሆኖ ስለተዘጋጀ ኢንተርኔት በሌለበት ማንኛውም ቦታና ገጠር ሳይቀር ያለ መቆራረጥ ይሰራል፤ በስልክዎ ወይም በኮምፒውተርዎ ላይ አውርደው (Install) መጠቀም ይችላሉ።
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <footer className="border-t border-stone-800 bg-stone-950/90 py-8 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-bold text-stone-200 font-serif">ጥንተ ጥበብ (Tsinte Tibeb)</span>
            <span>—</span>
            <span>አዘጋጅና ገንቢ፡ ዘበነ አስፍዬ (Zebene Asfye)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('monetization')}
              className="text-amber-400 hover:text-amber-300 transition font-semibold"
            >
              ለገንቢው (ለዘበነ አስፍዬ) ድጋፍ ያድርጉ (Telebirr / CBE)
            </button>
            <span className="text-stone-700">|</span>
            <span className="text-stone-400">© ፳፻፲፯ (2025/2026) ዘበነ አስፍዬ።</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
