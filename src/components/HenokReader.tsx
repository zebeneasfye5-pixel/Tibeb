import React, { useState, useMemo } from 'react';
import { HENOK_CHAPTERS, HENOK_SECTIONS } from '../data/henokData';
import { HenokChapter } from '../types';
import {
  BookOpen,
  Search,
  Bookmark,
  Share2,
  Copy,
  CheckCircle,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  Type,
  Scroll,
  Sun,
  Shield,
} from 'lucide-react';

export const HenokReader: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('ሁሉም ክፍሎች');
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('henok_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Daily Enoch prophetic proverb
  const dailyWisdom = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const chIndex = (dayOfYear + 7) % HENOK_CHAPTERS.length;
    const ch = HENOK_CHAPTERS[chIndex];
    const vIndex = dayOfYear % ch.verses.length;
    return {
      chapter: ch.chapter,
      verse: ch.verses[vIndex] || ch.verses[0],
      title: ch.title,
    };
  }, []);

  // Filtered chapters list
  const filteredChapters = useMemo(() => {
    return HENOK_CHAPTERS.filter((ch) => {
      const matchSection = selectedSection === 'ሁሉም ክፍሎች' || ch.section === selectedSection;
      if (!matchSection) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = ch.title.toLowerCase().includes(q);
      const inSummary = ch.summary.toLowerCase().includes(q);
      const inVerses = ch.verses.some((v) => v.toLowerCase().includes(q));
      return inTitle || inSummary || inVerses;
    });
  }, [selectedSection, searchQuery]);

  const currentChapter: HenokChapter = useMemo(() => {
    const found = filteredChapters.find((c) => c.chapter === selectedChapterNum);
    return found || filteredChapters[0] || HENOK_CHAPTERS[0];
  }, [selectedChapterNum, filteredChapters]);

  const toggleBookmark = (verseText: string) => {
    const key = `ሄኖክ ምዕራፍ ${currentChapter.chapter} - ${verseText}`;
    let updated: string[];
    if (savedBookmarks.includes(key)) {
      updated = savedBookmarks.filter((b) => b !== key);
    } else {
      updated = [...savedBookmarks, key];
    }
    setSavedBookmarks(updated);
    try {
      localStorage.setItem('henok_bookmarks', JSON.stringify(updated));
    } catch {}
  };

  const handleCopy = (text: string, id: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      }
    } catch {}
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSpeak = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) {
      alert('የድምፅ ንባብ በብሮውዘርዎ አልተደገፈም።');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'am-ET';
    utterance.rate = 0.85;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const fontSizeClass =
    fontSize === 'huge'
      ? 'text-lg sm:text-xl leading-relaxed sm:leading-loose'
      : fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  return (
    <div className="space-y-6">
      {/* Historical Ethiopian Heritage Banner */}
      <div className="relative overflow-hidden rounded-3xl parchment-gold p-6 sm:p-8 border border-amber-500/40 text-stone-100 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Scroll className="w-4 h-4" />
            <span>ኢትዮጵያ ብቻ በግዕዝ ጠብቃ ያቆየችው ጥንታዊው የሄኖክ ነቢይ መጽሐፍ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-serif">
            መጽሐፈ ሄኖክ (1 Enoch) - የጥበብና የራእይ መዝገብ
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
            በዓለም ላይ ሙሉ የግዕዝ ቅጂው በኢትዮጵያ ብቻ የተገኘው ታላቁ መጽሐፈ ሄኖክ፤ ስለ ሰማይ መላእክት፣ ስለ ወደቁት ትጉሃን፣ ስለ ሰማይ ብርሃናት ዑደት (ፀሐይ፣ ጨረቃና ከዋክብት - ከአቡሻህር ጋር በቀጥታ የተቆራኘ) እና ስለ ፍጻሜው ፍርድ የሚያስተምር ድንቅ ቅዱስ መጽሐፍ ነው።
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Daily Enoch Wisdom Banner */}
      <div className="rounded-2xl parchment-card p-4 sm:p-5 border border-amber-500/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>የዕለቱ የሄኖክ ቃል ({dailyWisdom.title})</span>
            </div>
            <p className="text-sm sm:text-base font-serif italic text-amber-100">
              "{dailyWisdom.verse}"
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSpeak(dailyWisdom.verse)}
              className="p-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-300 transition cursor-pointer"
              title="በድምፅ ያዳምጡ"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleCopy(dailyWisdom.verse, 'henok-daily')}
              className="p-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-300 transition cursor-pointer"
              title="ኮፒ አድርግ"
            >
              {copiedIndex === 'henok-daily' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Controls: Search, 5 Sections Filter, Font Size */}
      <div className="rounded-2xl parchment-card p-4 border border-amber-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="በመጽሐፈ ሄኖክ ውስጥ ቃል ወይም ጥቅስ ይፈልጉ..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-900/90 border border-stone-700 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Font Size Adjuster */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto bg-stone-900/80 p-1 rounded-xl border border-stone-800">
            <Type className="w-3.5 h-3.5 text-stone-400 ml-1.5" />
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                fontSize === 'normal' ? 'bg-amber-600 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              መደበኛ
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                fontSize === 'large' ? 'bg-amber-600 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              ትልቅ
            </button>
            <button
              onClick={() => setFontSize('huge')}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                fontSize === 'huge' ? 'bg-amber-600 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              እጅግ ትልቅ
            </button>
          </div>
        </div>

        {/* 5 Sections of Enoch Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {HENOK_SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition cursor-pointer border ${
                selectedSection === sec
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-semibold'
                  : 'bg-stone-900/50 text-stone-400 border-stone-800 hover:border-stone-700'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chapter Content and Quick Index Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Quick Chapter Picker List */}
        <div className="lg:col-span-1 rounded-2xl parchment-card p-4 border border-amber-500/30 max-h-[600px] flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h3 className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>የሄኖክ ምዕራፎች</span>
            </h3>
            <span className="text-[11px] text-stone-400">{filteredChapters.length} ምዕራፎች</span>
          </div>

          <div className="mt-3 overflow-y-auto space-y-1.5 pr-1 flex-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.chapter === currentChapter.chapter;
              return (
                <button
                  key={ch.chapter}
                  onClick={() => setSelectedChapterNum(ch.chapter)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-between border ${
                    isSelected
                      ? 'bg-amber-600/25 border-amber-500/60 text-amber-200 font-bold'
                      : 'bg-stone-900/40 border-stone-800/80 text-stone-300 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="block truncate font-medium">{ch.title}</span>
                    <span className="text-[10px] text-stone-400 block truncate">{ch.sectionTitle}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 shrink-0">
                    {ch.verses.length} ጥቅስ
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chapter Details and Verses */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative">
            {/* Top Chapter Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentChapter.sectionTitle}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-100 mt-2 font-serif">
                  {currentChapter.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed max-w-2xl">
                  {currentChapter.summary}
                </p>
              </div>

              {/* Prev / Next Chapter Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  disabled={filteredChapters.findIndex((c) => c.chapter === currentChapter.chapter) <= 0}
                  onClick={() => {
                    const idx = filteredChapters.findIndex((c) => c.chapter === currentChapter.chapter);
                    if (idx > 0) setSelectedChapterNum(filteredChapters[idx - 1].chapter);
                  }}
                  className="p-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  title="ያለፈው ምዕራፍ"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-amber-300 px-2">
                  ምዕራፍ {currentChapter.chapter}
                </span>
                <button
                  disabled={
                    filteredChapters.findIndex((c) => c.chapter === currentChapter.chapter) >=
                    filteredChapters.length - 1
                  }
                  onClick={() => {
                    const idx = filteredChapters.findIndex((c) => c.chapter === currentChapter.chapter);
                    if (idx < filteredChapters.length - 1) setSelectedChapterNum(filteredChapters[idx + 1].chapter);
                  }}
                  className="p-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  title="ቀጣይ ምዕራፍ"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Verses List */}
            <div className="mt-6 space-y-4">
              {currentChapter.verses.map((verse, idx) => {
                const verseKey = `ሄኖክ ምዕራፍ ${currentChapter.chapter} - ${verse}`;
                const isBookmarked = savedBookmarks.includes(verseKey);
                const verseId = `henok-${currentChapter.chapter}-${idx}`;

                return (
                  <div
                    key={idx}
                    className="group p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/40 transition flex flex-col sm:flex-row items-start justify-between gap-3"
                  >
                    <p className={`font-serif text-stone-200 flex-1 ${fontSizeClass}`}>
                      {verse}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 opacity-90 sm:opacity-40 group-hover:opacity-100 transition self-end sm:self-start shrink-0">
                      <button
                        onClick={() => handleSpeak(verse)}
                        className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 transition"
                        title="ጥቅሱን በድምፅ አንብብ"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => toggleBookmark(verse)}
                        className={`p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 transition ${
                          isBookmarked ? 'text-amber-400' : 'text-stone-300 hover:text-amber-300'
                        }`}
                        title={isBookmarked ? 'ከዕልባት አስወግድ' : 'ወደ ዕልባት አክል'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => handleCopy(verse, verseId)}
                        className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 transition"
                        title="ጥቅሱን ኮፒ አድርግ"
                      >
                        {copiedIndex === verseId ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
