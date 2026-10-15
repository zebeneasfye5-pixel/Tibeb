import React, { useState, useMemo } from 'react';
import { ANCIENT_HERBS, ANCIENT_ASMAT_PRAYERS } from '../data/tibebatData';
import { AncientHerb, AncientAsmat } from '../types';
import {
  Sparkles,
  Leaf,
  Shield,
  Heart,
  AlertTriangle,
  Search,
  BookOpen,
  Copy,
  CheckCircle,
  Volume2,
  VolumeX,
  Compass,
  Clock,
  Info,
  Layers,
} from 'lucide-react';

export const AncientTibebatView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'herbs' | 'asmat' | 'philosophy'>('herbs');
  const [herbCategory, setHerbCategory] = useState<string>('ሁሉም');
  const [herbSearch, setHerbSearch] = useState<string>('');
  const [selectedHerb, setSelectedHerb] = useState<AncientHerb>(ANCIENT_HERBS[0]);

  const [asmatSearch, setAsmatSearch] = useState<string>('');
  const [selectedAsmat, setSelectedAsmat] = useState<AncientAsmat>(ANCIENT_ASMAT_PRAYERS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const herbCategories = ['ሁሉም', 'ግርማ ሞገስ', 'ፈውስና ጤና', 'ጥበቃና ዕቀባ', 'አእምሮና ጥበብ', 'በረከት'] as const;

  const filteredHerbs = useMemo(() => {
    return ANCIENT_HERBS.filter((h) => {
      const matchCat = herbCategory === 'ሁሉም' || h.category === herbCategory;
      if (!matchCat) return false;
      if (!herbSearch.trim()) return true;
      const q = herbSearch.toLowerCase();
      return (
        h.name.toLowerCase().includes(q) ||
        h.geezName.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.benefits.some((b) => b.toLowerCase().includes(q))
      );
    });
  }, [herbCategory, herbSearch]);

  const filteredAsmat = useMemo(() => {
    return ANCIENT_ASMAT_PRAYERS.filter((a) => {
      if (!asmatSearch.trim()) return true;
      const q = asmatSearch.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.geezTitle.toLowerCase().includes(q) ||
        a.sacredWords.toLowerCase().includes(q) ||
        a.purpose.toLowerCase().includes(q)
      );
    });
  }, [asmatSearch]);

  const handleCopy = (text: string, id: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      }
    } catch {}
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
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

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl parchment-gold p-6 sm:p-8 border border-amber-500/40 text-stone-100 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>ጥንታዊ የጥበብ ዕፅዋት፣ አስማተ ዕቀባና የሊቃውንት ምስጢር</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-serif">
            ጥንታዊ የፈውስ፣ የጥበብ ዕፅዋትና የዕቀባ ቃላት
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
            በጥንታዊ የብራና መጻሕፍትና በሀገራችን አበው ትውፊት ሳይሸራረፉ የተላለፉ ታላላቅ የጥበብና የፈውስ ዕፅዋት፣ የቆረጣ ጊዜያቸው፣ አዘገጃጀታቸውና አተገባበራቸው፤ እንዲሁም የግርማ ሞገስ፣ የዕቀባና የሰላም ቃላት ከነማስጠንቀቂያቸው።
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-900/90 border border-stone-800 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('herbs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'herbs'
              ? 'bg-amber-600 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <Leaf className="w-4 h-4" />
          <span>፩. ጥንታዊ የጥበብ ዕፅዋት (12 Herbs)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('asmat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'asmat'
              ? 'bg-amber-600 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>፪. አስማተ ዕቀባና ግርማ ሞገስ</span>
        </button>

        <button
          onClick={() => setActiveSubTab('philosophy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'philosophy'
              ? 'bg-amber-600 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>፫. የመልካምና ክፉ ጥበባት ማስጠንቀቂያ</span>
        </button>
      </div>

      {/* SUB-VIEW 1: ANCIENT HERBS */}
      {activeSubTab === 'herbs' && (
        <div className="space-y-6">
          {/* Herb Filters & Search */}
          <div className="rounded-2xl parchment-card p-4 border border-amber-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={herbSearch}
                  onChange={(e) => setHerbSearch(e.target.value)}
                  placeholder="የዕፁን ስም ወይም ጥቅሙን ይፈልጉ..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {herbCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setHerbCategory(c)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                      herbCategory === c
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Herb Grid and Detail View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Herb Cards List */}
            <div className="lg:col-span-1 space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
              {filteredHerbs.map((h) => {
                const isSelected = selectedHerb.id === h.id;
                return (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHerb(h)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-amber-600/20 border-amber-500 text-amber-200 shadow-lg'
                        : 'bg-stone-900/50 border-stone-800 text-stone-300 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-200">{h.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                        {h.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2">{h.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Selected Herb Detailed Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                      <Leaf className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          {selectedHerb.category}
                        </span>
                        {selectedHerb.scientificName && (
                          <span className="text-[11px] font-mono text-stone-400 italic">
                            ({selectedHerb.scientificName})
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-amber-100 mt-1">
                        {selectedHerb.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* General Description */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                      ጥንታዊ መግለጫና ባሕርይ፦
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {selectedHerb.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> ዋና ዋና ጥቅሞች፦
                    </h4>
                    <ul className="space-y-1 text-xs text-stone-200 list-disc list-inside">
                      {selectedHerb.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Harvest Timing & Calendar */}
                  <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" /> የቆረጣ ጊዜና የቀመር ሥርዓት (Harvest Timing)፦
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {selectedHerb.harvestTiming}
                    </p>
                  </div>

                  {/* Preparation & Application */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-1.5">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" /> አዘገጃጀት (Preparation)፦
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {selectedHerb.preparation}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-1.5">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" /> አተገባበር (Usage Method)፦
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {selectedHerb.usageMethod}
                      </p>
                    </div>
                  </div>

                  {/* Precaution */}
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">የአጠቃቀም ጥንቃቄ፦</strong>
                      <span>{selectedHerb.precautions}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: ANCIENT ASMAT & PROTECTIVE PRAYERS */}
      {activeSubTab === 'asmat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* List */}
            <div className="md:col-span-1 space-y-2.5">
              {filteredAsmat.map((a) => {
                const isSelected = selectedAsmat.id === a.id;
                return (
                  <div
                    key={a.id}
                    onClick={() => setSelectedAsmat(a)}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-amber-600/20 border-amber-500 text-amber-200 shadow-md'
                        : 'bg-stone-900/50 border-stone-800 text-stone-300 hover:border-amber-500/30'
                    }`}
                  >
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                      {a.category}
                    </span>
                    <h4 className="text-xs font-bold text-stone-100">{a.title}</h4>
                    <p className="text-[11px] text-stone-400 line-clamp-2">{a.purpose}</p>
                  </div>
                );
              })}
            </div>

            {/* Active Asmat Content */}
            <div className="md:col-span-2 rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                    {selectedAsmat.category}
                  </span>
                  <h3 className="text-xl font-bold text-amber-100 mt-1 font-serif">
                    {selectedAsmat.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5 italic">{selectedAsmat.geezTitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(selectedAsmat.sacredWords)}
                    className="p-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 transition cursor-pointer"
                    title="በድምፅ ያዳምጡ"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleCopy(selectedAsmat.sacredWords, selectedAsmat.id)}
                    className="p-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 transition cursor-pointer"
                    title="ቃሉን ኮፒ አድርግ"
                  >
                    {copiedId === selectedAsmat.id ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sacred Words Inscription Box */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-amber-500/40 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 block mb-2 font-bold">
                  ጥንታዊው ጽሑፍ / ጸሎት፦
                </span>
                <p className="font-serif text-sm sm:text-base leading-relaxed text-amber-100 italic">
                  "{selectedAsmat.sacredWords}"
                </p>
              </div>

              {/* Purpose and Background */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-300">
                <div>
                  <h4 className="font-bold text-amber-300 mb-1">ዓላማውና ጥቅሙ፦</h4>
                  <p className="leading-relaxed">{selectedAsmat.purpose}</p>
                </div>

                <div>
                  <h4 className="font-bold text-amber-300 mb-1">ባሕላዊና ታሪካዊ መነሻው፦</h4>
                  <p className="leading-relaxed">{selectedAsmat.traditionalContext}</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
                  <h4 className="font-bold text-amber-300 mb-1">አተገባበሩና አጠቃቀሙ፦</h4>
                  <p className="leading-relaxed">{selectedAsmat.instructions}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs">
                  <strong>ሥነ-ምግባራዊ መርህ፦</strong> {selectedAsmat.ethicalNotice}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: THE ETHICAL PHILOSOPHY OF GOOD VS MALEVOLENT ARTS */}
      {activeSubTab === 'philosophy' && (
        <div className="space-y-6">
          <div className="rounded-3xl parchment-card p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-xl font-bold text-amber-200">
                  በጥንታዊ መጻሕፍት የተካተቱ የመልካምና የመጥፎ ጥበባት ሚስጥር
                </h3>
                <p className="text-xs text-stone-400">
                  መጽሐፈ ሄኖክ፣ መጽሐፈ ሲራክና አውደ ነገሥት ስለ ጥቁር አስማትና ፈዋሽ ጥበብ የሚሉት ትምህርት
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1: Sacred Healing Arts */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <h4 className="text-sm font-bold text-emerald-300">
                    ፩. ቅዱስና ፈዋሽ ጥበብ (መልካም ጥበብ)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  በእግዚአብሔር የተፈጠሩ ዕፅዋትን ለሕመም ፈውስ፣ የከዋክብትንና የዘመናትን ቀመር ለአዝመራና ለበዓላት ማወቂያ፣ ጸሎትና ምልጃን ለሰላምና ለትዳር መረጋጋት መጠቀም የተፈቀደና የተባረከ ጥበብ ነው።
                </p>
                <div className="text-xs text-emerald-200/90 bg-emerald-950/60 p-3 rounded-xl">
                  <strong>መጽሐፈ ሲራክ ፴፰፦</strong> "እግዚአብሔር ከመሬት መድኃኒቶችን ፈጠረ፤ አስተዋይ ሰውም አይንቃቸውም። ለሐኪም ስፍራ ስጠው እግዚአብሔር ፈጥሮታልና።"
                </div>
              </div>

              {/* Pillar 2: Condemnation of Malevolent Arts */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <h4 className="text-sm font-bold text-rose-300">
                    ፪. የወደቁት መላእክት ያመጡት መተትና ክፉ ጥበብ (መጥፎ ጥበብ)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  በመጽሐፈ ሄኖክ ምዕራፍ ፯–፰ መሠረት የወደቁት ትጉሃን መላእክት (አዛዝኤልና ሳምያዛ) ሰውን ለመጉዳት፣ ሰውን በግድ ለማስገደድ፣ መርዞችንና ገዳይ መሣሪያዎችን አመጡ። ይህ ጥበብ ሰውን ለውድቀት፣ ለነፍስ መጥፋትና ለረክሰት ስለሚዳርግ በጥብቅ የተወገዘ ነው።
                </p>
                <div className="text-xs text-rose-200/90 bg-rose-950/60 p-3 rounded-xl">
                  <strong>መጽሐፈ ሄኖክ ፱፦</strong> "አዛዝኤል በሰማይ የተደረገውን ክፉ ምስጢር በምድር ላይ አስተማረ፤ ሰዎቹም በክፋት ጠፉ፤ ስለዚህም የፍርድ መቅሠፍት መጣባቸው።"
                </div>
              </div>
            </div>

            {/* Detailed Manuscript Warning Rules */}
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                የኢትዮጵያ ጥንታውያን ሊቃውንት የጣሏቸው ፫ቱ የጥበብ ክልከላዎች፦
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>የሰውን ነጻ ፈቃድ መጋፋት ክልክል ነው፦</strong> ሰውን ያለፈቃዱ ለማስገደድ፣ ለማሳበድ ወይም ለማጥፋት የሚደረግ ማንኛውም የመተት ድግምት ፈጻሚውንም ሆነ ተጠቃሚውን ወደ ጥፋት ይወስዳል።
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>ደም ማፍሰስና ሕይወት ማጥፋት ክልክል ነው፦</strong> በእንስሳት ወይም በሰው ደም የሚደረግ ርኩስ መስዋዕት በእግዚአብሔር ዘንድ የተጠላ ነው፤ እውነተኛ ጥበብ በዕፅዋትና በንጹሕ ጸሎት ብቻ የተመሠረተ ነው።
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong>የጥበብ ፍጻሜ ጽድቅና ሰላም ነው፦</strong> ጥንተ ጥበብ የተሰኘው ይህ መተግበሪያ የተሠራው ለትውልድ ዕውቀት፣ ለባሕላዊ ሕክምናና ለሰላም እንጂ ሰውን ለሚጎዳ ክፉ ሥራ አይደለም።
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
