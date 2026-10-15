import React, { useState, useMemo } from 'react';
import { SIRAK_CHAPTERS, SIRAK_CATEGORIES } from '../data/sirakData';
import { SirakChapter } from '../types';
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
} from 'lucide-react';

export const SirakReader: React.FC = () => {
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('ሁሉም');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sirak_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Daily wisdom proverb (picks based on day of year)
  const dailyWisdom = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const chIndex = dayOfYear % SIRAK_CHAPTERS.length;
    const ch = SIRAK_CHAPTERS[chIndex];
    const vIndex = dayOfYear % ch.verses.length;
    return {
      chapter: ch.chapter,
      verse: ch.verses[vIndex] || ch.verses[0],
      summary: ch.summary,
    };
  }, []);

  // Filtered chapters list based on category or search
  const filteredChapters = useMemo(() => {
    return SIRAK_CHAPTERS.filter((ch) => {
      const matchCat = selectedCategory === 'ሁሉም' || ch.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = ch.title.toLowerCase().includes(q);
      const inSummary = ch.summary.toLowerCase().includes(q);
      const inVerses = ch.verses.some((v) => v.toLowerCase().includes(q));
      return inTitle || inSummary || inVerses;
    });
  }, [selectedCategory, searchQuery]);

  const currentChapter: SirakChapter = useMemo(() => {
    const found = SIRAK_CHAPTERS.find((c) => c.chapter === selectedChapterNum);
    return found || SIRAK_CHAPTERS[0];
  }, [selectedChapterNum]);

  const toggleBookmark = (verseText: string) => {
    const key = `ምዕራፍ ${currentChapter.chapter} - ${verseText}`;
    let updated: string[];
    if (savedBookmarks.includes(key)) {
      updated = savedBookmarks.filter((b) => b !== key);
    } else {
      updated = [...savedBookmarks, key];
    }
    setSavedBookmarks(updated);
    try {
      localStorage.setItem('sirak_bookmarks', JSON.stringify(updated));
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
    utterance.lang = 'am-ET'; // Amharic
    utterance.rate = 0.85; // Slightly deliberate for classical scripture
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
      {/* Daily Wisdom Verse Banner */}
      <div className="relative overflow-hidden rounded-3xl parchment-gold p-6 border border-amber-500/40 text-stone-100 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>የዕለቱ የሲራክ የወርቅ ጥበብ (ምዕራፍ {dailyWisdom.chapter})</span>
            </div>
            <p className="text-base sm:text-lg font-serif italic text-amber-100 font-medium">
              "{dailyWisdom.verse}"
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSpeak(dailyWisdom.verse)}
              className="p-2.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-300 transition cursor-pointer"
              title="በድምፅ ያዳምጡ"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleCopy(dailyWisdom.verse, 'daily')}
              className="p-2.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-300 transition cursor-pointer"
              title="ጥቅሱን ኮፒ አድርግ"
            >
              {copiedIndex === 'daily' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Controls: Search, Category Filter, Font Size */}
      <div className="rounded-2xl parchment-card p-4 border border-amber-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="በመጽሐፈ ሲራክ ውስጥ ቃል ወይም ጥቅስ ይፈልጉ..."
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

        {/* Categories Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {SIRAK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-semibold'
                  : 'bg-stone-900/50 text-stone-400 border-stone-800 hover:border-stone-700'
              }`}
            >
              {cat}
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
              <span>ምዕራፎች (፩ - ፶፩)</span>
            </h3>
            <span className="text-[11px] text-stone-400">{filteredChapters.length} ምዕራፎች</span>
          </div>

          <div className="mt-3 overflow-y-auto space-y-1.5 pr-1 flex-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.chapter === selectedChapterNum;
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
                    <span className="block truncate font-medium">ምዕራፍ {ch.chapter}</span>
                    <span className="text-[10px] text-stone-400 block truncate">{ch.title.split('-')[1] || ch.category}</span>
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
                  {currentChapter.category}
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
                  disabled={selectedChapterNum <= 1}
                  onClick={() => setSelectedChapterNum((prev) => Math.max(1, prev - 1))}
                  className="p-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  title="ያለፈው ምዕራፍ"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-amber-300 px-2">
                  {selectedChapterNum} / 51
                </span>
                <button
                  disabled={selectedChapterNum >= 51}
                  onClick={() => setSelectedChapterNum((prev) => Math.min(51, prev + 1))}
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
                const verseKey = `ምዕራፍ ${currentChapter.chapter} - ${verse}`;
                const isBookmarked = savedBookmarks.includes(verseKey);
                const verseId = `${currentChapter.chapter}-${idx}`;

                return (
                  <div
                    key={idx}
                    className="group p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/40 transition flex flex-col sm:flex-row items-start justify-between gap-3"
                  >
                    <p className={`font-serif text-stone-200 flex-1 ${fontSizeClass}`}>
                      {verse}
                    </p>

                    {/* Action buttons per verse */}
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
