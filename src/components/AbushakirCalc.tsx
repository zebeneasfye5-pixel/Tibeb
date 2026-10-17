import React, { useState, useMemo } from 'react';
import { calculateBahireHasab, calculateAbushakirCycles, ABUSHAKIR_TUTORIAL, FIXED_FEASTS } from '../utils/abushakir';
import {
  Calendar,
  Clock,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  Copy,
  CheckCircle,
  HelpCircle,
  Layers,
  Compass,
  Flame,
  Shield,
} from 'lucide-react';

export const AbushakirCalc: React.FC = () => {
  const currentEthiopianYear = 2017; // Current active year
  const [yearInput, setYearInput] = useState<number>(currentEthiopianYear);
  const [copied, setCopied] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const result = useMemo(() => {
    const validYear = Math.max(1, Math.min(9999, yearInput || currentEthiopianYear));
    return calculateBahireHasab(validYear);
  }, [yearInput]);

  const handleCopyReport = () => {
    const lines = [
      `❖ የአቡሻህር (ባሕረ ሐሳብ) የቀመር ውጤት ለ ${result.year} ዓ.ም. ❖`,
      `• ዓመተ ዓለም፡ ${result.ameteAlem}`,
      `• ወንጌላዊ፡ ዘመነ ${result.evangelist}`,
      `• ወንበር፡ ${result.wenber} | አበቅቴ፡ ${result.abekti} | መጥቅዕ፡ ${result.metqi}`,
      `• መጠነ ራብዒት፡ ${result.meteneRabit}`,
      `• አዲስ ዓመት (መስከረም ፩)፡ ዕለተ ${result.meskeremOneDay}`,
      `• ጾመ ነነዌ፡ ${result.neneweMonth} ${result.neneweDay}`,
      '',
      '--- ተንቀሳቃሽ አጽዋማትና በዓላት ---',
      ...result.feasts.map((f) => `• ${f.name}፡ ${f.month} ${f.day}`),
      '',
      'ጥንተ ጥበብ - የአቡሻህር፣ የአውደ ነገሥት እና የሲራክ መተግበሪያ',
    ].join('\n');

    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(lines);
      }
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl parchment-gold p-6 sm:p-8 border border-amber-500/40 text-stone-100 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>የአቡሻህር (ባሕረ ሐሳብ) ጥንታዊ የዘመንና የከዋክብት ቀመር</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif">
            ባሕረ ሐሳብ - የዘመን ቀመር ማውጫ
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
            በሊቁ አቡሻኪር (ኢብን አር-ራሂብ) እና በኢትዮጵያ ሊቃውንት ትውፊት መሠረት ማንኛውንም ዓመተ ምሕረት በማስገባት ወንበር፣ አበቅቴ፣ መጥቅዕ፣ ወንጌላዊ እንዲሁም የዓመቱን አጽዋማትና በዓላት ያለ ምንም ስህተት በትክክል ያግኙ።
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Interactive Year Selector & Presets */}
      <div className="rounded-3xl parchment-card p-6 border border-amber-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex-1">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1.5">
              የሚሰላበትን የኢትዮጵያ ዓመተ ምሕረት ያስገቡ፦
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="9999"
                value={yearInput}
                onChange={(e) => setYearInput(parseInt(e.target.value) || currentEthiopianYear)}
                className="w-40 px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-500/50 text-amber-100 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-stone-400 text-sm font-semibold">ዓ.ም. (ዓመተ ምሕረት)</span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">ፈጣን ምርጫዎች፦</span>
            {[2016, 2017, 2018, 2019, 2020].map((y) => (
              <button
                key={y}
                onClick={() => setYearInput(y)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  yearInput === y
                    ? 'bg-amber-600 text-stone-950 border-amber-400'
                    : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-500/40'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Core Computus Key Values Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Amete Alem */}
        <div className="p-4 rounded-2xl parchment-card border border-amber-500/30 text-center">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">ዓመተ ዓለም</span>
          <span className="text-xl sm:text-2xl font-black text-amber-300 mt-1 block">
            {result.ameteAlem}
          </span>
          <span className="text-[10px] text-stone-400 mt-0.5 block">5500 + {result.year}</span>
        </div>

        {/* Card 2: Evangelist */}
        <div className="p-4 rounded-2xl parchment-card border border-amber-500/30 text-center">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">ወንጌላዊ</span>
          <span className="text-xl sm:text-2xl font-black text-amber-200 mt-1 block">
            {result.evangelist}
          </span>
          <span className="text-[10px] text-stone-400 mt-0.5 block">የ፬ ዓመት ዑደት</span>
        </div>

        {/* Card 3: Wenber */}
        <div className="p-4 rounded-2xl parchment-card border border-amber-500/30 text-center">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">ወንበር</span>
          <span className="text-xl sm:text-2xl font-black text-amber-300 mt-1 block">
            {result.wenber}
          </span>
          <span className="text-[10px] text-stone-400 mt-0.5 block">(ዓ.ዓ % 19) - 1</span>
        </div>

        {/* Card 4: Abekti */}
        <div className="p-4 rounded-2xl parchment-card border border-amber-500/30 text-center">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">አበቅቴ</span>
          <span className="text-xl sm:text-2xl font-black text-amber-200 mt-1 block">
            {result.abekti}
          </span>
          <span className="text-[10px] text-stone-400 mt-0.5 block">(ወንበር × 11) % 30</span>
        </div>

        {/* Card 5: Metqi */}
        <div className="p-4 rounded-2xl parchment-card border border-amber-500/30 text-center">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">መጥቅዕ</span>
          <span className="text-xl sm:text-2xl font-black text-amber-300 mt-1 block">
            {result.metqi}
          </span>
          <span className="text-[10px] text-stone-400 mt-0.5 block">(ወንበር × 19) % 30</span>
        </div>

        {/* Card 6: New Year Day */}
        <div className="p-4 rounded-2xl parchment-card border border-amber-500/30 text-center">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">መስከረም ፩</span>
          <span className="text-xl sm:text-2xl font-black text-amber-200 mt-1 block">
            {result.meskeremOneDay}
          </span>
          <span className="text-[10px] text-stone-400 mt-0.5 block">ርክበ ቀመር</span>
        </div>
      </div>

      {/* Main Movable Feasts & Fasts Table */}
      <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-amber-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>የ {result.year} ዓ.ም. ተንቀሳቃሽ አጽዋማትና በዓላት ቀመር</span>
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              ጾመ ነነዌ፡ <strong className="text-amber-300">{result.neneweMonth} {result.neneweDay}</strong> ተነስቶ በየተራ የሚገቡ በዓላትና አጽዋማት
            </p>
          </div>
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition cursor-pointer"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>የዓመቱን ቀመር ኮፒ አድርግ</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.feasts.map((feast, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                feast.type === 'fast'
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-stone-900/40 border-stone-800 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        feast.type === 'fast'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {feast.type === 'fast' ? 'ጾም' : 'በዓል'}
                    </span>
                    <h4 className="text-sm font-bold text-stone-100">{feast.name}</h4>
                  </div>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">{feast.description}</p>
                </div>
                <div className="text-right shrink-0 bg-stone-950/80 px-3 py-1.5 rounded-xl border border-stone-800">
                  <span className="text-xs text-amber-400 font-semibold block">{feast.month}</span>
                  <span className="text-xl font-black text-amber-200 block">{feast.day}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Annual Holy Feasts */}
      <div className="rounded-3xl bg-stone-950/60 p-6 border border-stone-800">
        <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>ቋሚ ዓመታዊ በዓላት (በየዓመቱ የማይለወጡ ቀናት)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FIXED_FEASTS.map((ff, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-200">{ff.name}</span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {ff.month} {ff.day}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1 truncate">{ff.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical and Theological Deep Explanation (የአቡሻህር ጥንታዊ ፍልስፍና) */}
      <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/30">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-lg font-bold text-amber-200">{ABUSHAKIR_TUTORIAL.title}</h3>
              <p className="text-xs text-stone-400">የ 19 ዓመት የጨረቃና የ 28 ዓመት የፀሐይ ዑደት (532 ዓመት ዐውደ ማኅተም)</p>
            </div>
          </div>
          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold transition"
          >
            {showTutorial ? 'አሳጥር' : 'ሙሉውን አንብብ'}
          </button>
        </div>

        <div className={`mt-5 space-y-4 ${showTutorial ? 'block' : 'line-clamp-4 overflow-hidden'}`}>
          {ABUSHAKIR_TUTORIAL.principles.map((pr, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80">
              <h4 className="text-xs sm:text-sm font-bold text-amber-300">{pr.title}</h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-1.5 leading-relaxed">{pr.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Great Astronomical Cycles of Abushakir */}
      <div className="rounded-3xl parchment-gold p-6 sm:p-8 border border-amber-500/40 text-stone-100 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h3 className="text-lg sm:text-xl font-bold text-amber-100 font-serif">
            የአቡሻህር ታላላቅ የስነ-ፈለክ ዑደቶች (ዐውደ ፀሐይ፣ ዐውደ ቀመርና ዐውደ ማኅተም)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          በአቡሻህር ጥንታዊ የቀመር መጽሐፍ መሠረት ጊዜ በሦስት ታላላቅ ሰማያዊ ዑደቶች ይሽከረከራል፦
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-amber-500/30 text-center space-y-1">
            <Sun className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <span className="text-xs text-amber-300 font-bold block">ዐውደ ፀሐይ (Solar Cycle)</span>
            <span className="text-2xl font-black text-amber-100 font-mono">
              {calculateAbushakirCycles(result.year).awdeTsehay} / 28
            </span>
            <p className="text-[11px] text-stone-400">በየ ፳፰ ዓመቱ ፀሐይ ወደ ነበረችበት ዕለት ትመለሳለች</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-amber-500/30 text-center space-y-1">
            <Moon className="w-6 h-6 text-sky-400 mx-auto mb-1" />
            <span className="text-xs text-sky-300 font-bold block">ዐውደ ቀመር (Metonic Lunar)</span>
            <span className="text-2xl font-black text-sky-100 font-mono">
              {calculateAbushakirCycles(result.year).awdeQemer} / 19
            </span>
            <p className="text-[11px] text-stone-400">በየ ፲፱ ዓመቱ የጨረቃ ወራትና ሙላት ይታደሳል</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/70 border border-amber-500/30 text-center space-y-1">
            <Compass className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
            <span className="text-xs text-emerald-300 font-bold block">ዐውደ ማኅተም (Great Cycle)</span>
            <span className="text-2xl font-black text-emerald-100 font-mono">
              {calculateAbushakirCycles(result.year).awdeMahtem} / 532
            </span>
            <p className="text-[11px] text-stone-400">፳፰ × ፲፱ = ፭፻፴፪ ዓመት፤ ሁሉም በዓላት ወደ ቦታቸው ይመለሳሉ</p>
          </div>
        </div>

        {/* Day-Night Hours & Zodiac Signs Across 12 Months */}
        <div className="pt-4 border-t border-amber-500/20">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
            የ ፲፪ቱ ወራት የቀንና የሌሊት ሰዓታት እና ህብረ-ከዋክብት (Astronomical Constellations)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {calculateAbushakirCycles(result.year).dayNightHours.map((dnh, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-200">
                  <span>{dnh.month}</span>
                  <span className="text-[11px] font-mono text-amber-400">ቀን፡{dnh.dayHours}ሰ / ሌ፡{dnh.nightHours}ሰ</span>
                </div>
                <div className="text-[10px] text-stone-400 mt-1 flex items-center justify-between">
                  <span>{dnh.astronomicalSign}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ancient Abushakir Celestial Blessing */}
        <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 space-y-2 mt-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <h5 className="text-xs font-bold text-amber-200">ጸሎተ አቡሻህር ወዐውደ ፀሐይ (የሰማያት ቡራኬ)</h5>
          </div>
          <p className="text-xs font-serif text-stone-200 leading-relaxed">
            "በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ፤ ዘአስተካከለ ሰዓታተ መዓልት ወሌሊት፤ በ፭፻፴፪ ዓመተ ማኅተም ፍጥረትን የሚያድስ አምላክ ሆይ፤ የዘመኑን ቀመር የተባረከ አድርግልን፤ በፀሐይ መውጣትና በጨረቃ መግባት ሰላምን አብዛልን። አሜን።"
          </p>
        </div>
      </div>
    </div>
  );
};
