import React, { useState } from 'react';
import {
  calculateAwdeNegest,
  calculateCompatibility,
  BURJI_LIST,
  FIDEL_VALUES,
} from '../utils/awdeNegest';
import { AwdeNegestCalcResult, BurjiInfo, CompatibilityResult } from '../types';
import {
  Sparkles,
  Heart,
  User,
  Users,
  Compass,
  Flame,
  Droplets,
  Wind,
  Mountain,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Layers,
  Copy,
} from 'lucide-react';

export const AwdeNegestCalc: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'single' | 'compatibility' | 'browse' | 'table'>('single');

  // Single Burji Calculator State
  const [personName, setPersonName] = useState('ዮሐንስ');
  const [motherName, setMotherName] = useState('ማርያም');
  const [calcResult, setCalcResult] = useState<AwdeNegestCalcResult | null>(() => {
    return calculateAwdeNegest('ዮሐንስ', 'ማርያም');
  });

  // Compatibility Calculator State
  const [p1Name, setP1Name] = useState('ተክለ');
  const [p1Mother, setP1Mother] = useState('ወለተ');
  const [p2Name, setP2Name] = useState('ብርሃነ');
  const [p2Mother, setP2Mother] = useState('እኅተ');
  const [compatResult, setCompatResult] = useState<CompatibilityResult | null>(() => {
    return calculateCompatibility('ተክለ', 'ወለተ', 'ብርሃነ', 'እኅተ');
  });

  // Browse state
  const [selectedBurji, setSelectedBurji] = useState<BurjiInfo>(BURJI_LIST[0]);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const handleCalculateSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim() || !motherName.trim()) return;
    const res = calculateAwdeNegest(personName, motherName);
    setCalcResult(res);
  };

  const handleCalculateCompat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!p1Name.trim() || !p1Mother.trim() || !p2Name.trim() || !p2Mother.trim()) return;
    const res = calculateCompatibility(p1Name, p1Mother, p2Name, p2Mother);
    setCompatResult(res);
  };

  const getElementBadge = (element: string) => {
    switch (element) {
      case 'እሳት':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-red-400" /> እሳት
          </span>
        );
      case 'ማይ':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/50 text-blue-300 text-xs font-bold">
            <Droplets className="w-3.5 h-3.5 text-blue-400" /> ማይ (ውኃ)
          </span>
        );
      case 'ነፋስ':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-bold">
            <Wind className="w-3.5 h-3.5 text-amber-400" /> ነፋስ
          </span>
        );
      case 'መሬት':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
            <Mountain className="w-3.5 h-3.5 text-emerald-400" /> መሬት (ዐፈር)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl parchment-gold p-6 sm:p-8 border border-amber-500/40 text-stone-100 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>መጽሐፈ አውደ ነገሥት - ጥንታዊ የከዋክብትና የጠባይ ሚስጥር</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif">
            አውደ ነገሥት - የኮከብና የዕጣ ፈንታ ማውጫ
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
            በጥንታዊው የአበገድ (ሐሳበ ፊደል) ቀመር መሠረት የግለሰቡን ስም ከእናት ስም ጋር በማስላት የተወለዱበትን ኮከብ (ቡርጅ)፣ መሠረተ ባሕርይ (እሳት፣ መሬት፣ ነፋስ፣ ማይ)፣ የሥራና የጤና ዕድል እንዲሁም የጋብቻ መስማማትን ያግኙ።
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-900/90 border border-stone-800 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('single')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'single'
              ? 'bg-amber-600 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>የግል ኮከብ ማውጫ</span>
        </button>
        <button
          onClick={() => setActiveSubTab('compatibility')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'compatibility'
              ? 'bg-amber-600 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>የጋብቻና የፍቅር ተስማሚነት</span>
        </button>
        <button
          onClick={() => setActiveSubTab('browse')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'browse'
              ? 'bg-amber-600 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>፲፪ቱ ቡርጆች ዝርዝር</span>
        </button>
        <button
          onClick={() => setActiveSubTab('table')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'table'
              ? 'bg-amber-600 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>የፊደላት ቁጥር (አበገድ)</span>
        </button>
      </div>

      {/* VIEW 1: SINGLE BURJI CALCULATOR */}
      {activeSubTab === 'single' && (
        <div className="space-y-6">
          <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/30">
            <form onSubmit={handleCalculateSingle} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-1.5">
                  የግለሰቡ ስም (የክርስትና ወይም የልደት ስም)፦
                </label>
                <input
                  type="text"
                  required
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="ምሳሌ፡ ዮሐንስ"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300 block mb-1.5">
                  የእናት ስም፦
                </label>
                <input
                  type="text"
                  required
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="ምሳሌ፡ ማርያም"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg transition cursor-pointer"
                >
                  ኮከብ አውጣ (አስላ)
                </button>
              </div>
            </form>
          </div>

          {/* Result Presentation */}
          {calcResult && (
            <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6 animate-fadeIn">
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl text-amber-300 font-serif">
                    {calcResult.burji.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-amber-400">
                        ቡርጅ ቁጥር {calcResult.burjiNumber} (ቀሪ {calcResult.totalScore % 12})
                      </span>
                      {getElementBadge(calcResult.burji.element)}
                    </div>
                    <h3 className="text-2xl font-black text-amber-100 mt-1">
                      {calcResult.burji.name} ({calcResult.burji.latinName})
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      ኮከብ/ፕላኔት፡ <strong className="text-amber-200">{calcResult.burji.planet}</strong> - {calcResult.burji.planetDesc}
                    </p>
                  </div>
                </div>

                {/* Score breakdown tags */}
                <div className="flex items-center gap-2 bg-stone-950/80 p-3 rounded-2xl border border-stone-800 text-xs">
                  <div className="text-center px-2">
                    <span className="text-[10px] text-stone-400 block">የግለሰብ ድምር</span>
                    <span className="font-bold text-amber-300">{calcResult.personScore}</span>
                  </div>
                  <span className="text-stone-600">+</span>
                  <div className="text-center px-2">
                    <span className="text-[10px] text-stone-400 block">የእናት ድምር</span>
                    <span className="font-bold text-amber-300">{calcResult.motherScore}</span>
                  </div>
                  <span className="text-stone-600">=</span>
                  <div className="text-center px-2">
                    <span className="text-[10px] text-stone-400 block">ጠቅላላ ድምር</span>
                    <span className="font-extrabold text-amber-200">{calcResult.totalScore}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Character and Nature */}
                <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-3">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <User className="w-4 h-4" /> ጠባይና ስነ-ልቦናዊ ባሕርይ
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {calcResult.burji.character}
                  </p>
                  <p className="text-xs text-amber-400/90 italic pt-1">
                    {calcResult.burji.elementDesc}
                  </p>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-3">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> ጠንካራና ደካማ ጎኖች
                  </h4>
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-emerald-400 block">ጠንካራ ጎኖች፦</span>
                    <div className="flex flex-wrap gap-1.5">
                      {calcResult.burji.strengths.map((st, i) => (
                        <span key={i} className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-200">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-rose-400 block">ጥንቃቄ የሚሹ ድክመቶች፦</span>
                    <div className="flex flex-wrap gap-1.5">
                      {calcResult.burji.weaknesses.map((wk, i) => (
                        <span key={i} className="text-xs px-2.5 py-0.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-200">
                          {wk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Career & Fortune */}
                <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-3">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Compass className="w-4 h-4" /> የሥራና የዕድል መስኮች
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    ይህ ኮከብ በተፈጥሮ ለሚከተሉት የሥራ መስኮች የተመቸ ስጦታና ስኬት አለው፦
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {calcResult.burji.careers.map((cr, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-stone-800 text-stone-200 font-medium">
                        • {cr}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Marriage & Favorable days/colors */}
                <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-3">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> የጋብቻና የፍቅር ተስማሚነት
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {calcResult.burji.marriageCompatibility.advice}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px]">ተስማሚ ቀናት፡</span>
                      <span className="font-bold text-amber-200">{calcResult.burji.favorableDays.join('፣ ')}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">ተስማሚ ቀለማት፡</span>
                      <span className="font-bold text-amber-200">{calcResult.burji.favorableColors.join('፣ ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: COMPATIBILITY CALCULATOR */}
      {activeSubTab === 'compatibility' && (
        <div className="space-y-6">
          <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/30">
            <h3 className="text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <span>የጋብቻና የፍቅር መስማማት መመርመሪያ (Awde Negest Compatibility)</span>
            </h3>

            <form onSubmit={handleCalculateCompat} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Person 1 */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 block uppercase">የመጀመሪያው ሰው (ወንድ/ሴት)</span>
                <div>
                  <label className="text-[11px] text-stone-300 block mb-1">ስም፦</label>
                  <input
                    type="text"
                    required
                    value={p1Name}
                    onChange={(e) => setP1Name(e.target.value)}
                    placeholder="ምሳሌ፡ ተክለ"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-300 block mb-1">የእናት ስም፦</label>
                  <input
                    type="text"
                    required
                    value={p1Mother}
                    onChange={(e) => setP1Mother(e.target.value)}
                    placeholder="ምሳሌ፡ ወለተ"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Person 2 */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 block uppercase">ሁለተኛው ሰው (የትዳር አጋር)</span>
                <div>
                  <label className="text-[11px] text-stone-300 block mb-1">ስም፦</label>
                  <input
                    type="text"
                    required
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    placeholder="ምሳሌ፡ ብርሃነ"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-300 block mb-1">የእናት ስም፦</label>
                  <input
                    type="text"
                    required
                    value={p2Mother}
                    onChange={(e) => setP2Mother(e.target.value)}
                    placeholder="ምሳሌ፡ እኅተ"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl transition cursor-pointer"
                >
                  ተስማሚነታቸውን መርምር (Calculate Compatibility)
                </button>
              </div>
            </form>
          </div>

          {compatResult && (
            <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-800">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <Heart className="w-7 h-7 fill-rose-500/40" />
                  </div>
                  <div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                      {compatResult.status} ({compatResult.score}%)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-100 mt-1">
                      {compatResult.p1Name} ({compatResult.p1Burji.name}) እና {compatResult.p2Name} ({compatResult.p2Burji.name})
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-400 block">የመሠረት ትስስር</span>
                  <span className="text-sm font-bold text-amber-300">
                    {compatResult.p1Burji.element} + {compatResult.p2Burji.element}
                  </span>
                </div>
              </div>

              {/* Elemental Analysis */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                <p className="text-xs sm:text-sm text-amber-200 font-medium">
                  {compatResult.elementMatch}
                </p>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                  {compatResult.detailedAnalysis}
                </p>
              </div>

              {/* Recommendations */}
              <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> የአውደ ነገሥት የትዳር ማጠናከሪያ ምክሮች፦
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-300 list-disc list-inside">
                  {compatResult.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: BROWSE ALL 12 BURJIS */}
      {activeSubTab === 'browse' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {BURJI_LIST.map((b) => {
              const isSelected = selectedBurji.id === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBurji(b)}
                  className={`p-3 rounded-2xl text-center transition cursor-pointer border flex flex-col items-center justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-amber-600/30 border-amber-500 text-amber-200 font-bold shadow-lg'
                      : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-amber-500/40'
                  }`}
                >
                  <span className="text-2xl">{b.symbol}</span>
                  <span className="text-xs font-bold block">{b.name}</span>
                  <span className="text-[10px] text-stone-400 block">{b.element}</span>
                </button>
              );
            })}
          </div>

          {/* Active Burji Full Profile */}
          <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl text-amber-300">
                  {selectedBurji.symbol}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-400">ቡርጅ {selectedBurji.id}</span>
                    {getElementBadge(selectedBurji.element)}
                  </div>
                  <h3 className="text-2xl font-bold text-amber-100 mt-1">
                    {selectedBurji.name} ({selectedBurji.latinName})
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    ኮከብ/ፕላኔት፡ <strong className="text-amber-200">{selectedBurji.planet}</strong> - {selectedBurji.planetDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase">ጠባይና ስነ-ልቦና</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{selectedBurji.character}</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase">የሥራ መስኮች</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBurji.careers.map((c, i) => (
                    <span key={i} className="text-xs px-2.5 py-0.5 rounded-lg bg-stone-800 text-stone-200">
                      • {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase">ጤናና ማስተካከያ</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{selectedBurji.health}</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase">የጋብቻ ምክር</h4>
                <p className="text-xs text-stone-300 leading-relaxed">{selectedBurji.marriageCompatibility.advice}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: GEMATRIA HASABE FIDEL TABLE */}
      {activeSubTab === 'table' && (
        <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div>
              <h3 className="text-lg font-bold text-amber-200">የግዕዝ ፊደላት ቁጥራዊ ዋጋ (ሐሳበ ፊደል / አበገድ)</h3>
              <p className="text-xs text-stone-400">በጥንታዊው የአውደ ነገሥት መጻሕፍት መሠረት እያንዳንዱ ፊደል ያለው ዋጋ</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
            {Object.entries(FIDEL_VALUES)
              .filter(([char]) => char.endsWith('')) // Unique base letters
              .slice(0, 34)
              .map(([char, val]) => (
                <div key={char} className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-amber-200">{char}</span>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-stone-950 px-2 py-0.5 rounded">
                    {val}
                  </span>
                </div>
              ))}
          </div>
          <p className="text-[11px] text-stone-400 italic">
            ማስታወሻ፦ የፊደላቱ ሰባት አዕማዶች (ግዕዝ፣ ካዕብ፣ ሣልስ፣ ራብዕ፣ ኃምስ፣ ሳድስ፣ ሳብዕ) ሁሉ ከዋናው ፊደል ቁጥር ጋር እኩል ይቆጠራሉ። (ምሳሌ፡ ሀ፣ ሁ፣ ሂ፣ ሃ... ሁሉም ፩ (1) ናቸው)።
          </p>
        </div>
      )}
    </div>
  );
};
