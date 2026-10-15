import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, CheckCircle, Share2, PlusSquare, X } from 'lucide-react';

export const PWAInstallButton: React.FC<{ variant?: 'header' | 'banner' | 'card' }> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [installedNotice, setInstalledNotice] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledNotice(true);
        setTimeout(() => setInstalledNotice(false), 5000);
      }
    } else {
      setShowGuide(true);
    }
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>መተግበሪያው ተጭኗል</span>
      </div>
    );
  }

  return (
    <>
      {variant === 'banner' ? (
        <div className="w-full bg-gradient-to-r from-amber-950/90 via-stone-900 to-amber-950/90 border-y border-amber-500/30 px-4 py-3 text-stone-200">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-200">ጥንተ ጥበብን በስልክዎ ወይም ኮምፒውተርዎ ላይ ይጫኑ</p>
                <p className="text-xs text-stone-400">ያለ ኢንተርኔት (Offline) በፍጥነት እንዲሰራና በቀላሉ ለመክፈት አፑን ያውርዱ</p>
              </div>
            </div>
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/50 flex items-center gap-2 cursor-pointer transition transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>መተግበሪያውን አውርድ (Install)</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold transition active:scale-95 cursor-pointer shadow-sm"
          title="ጥንተ ጥበብን በስልክዎ/ኮምፒውተርዎ ላይ ይጫኑ"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">አፕ ጫን / አውርድ</span>
          <span className="sm:hidden">ጫን</span>
        </button>
      )}

      {/* Installation Guide Modal (for iOS and standard browsers) */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl parchment-card border border-amber-500/40 p-6 shadow-2xl relative text-stone-100">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-200">ጥንተ ጥበብን ማውረጃ መመሪያ</h3>
                <p className="text-xs text-stone-400">በስልክዎ ስክሪን ላይ እንደ አፕሊኬሽን ለማኖር</p>
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-sm text-stone-300 bg-stone-900/60 p-4 rounded-xl border border-stone-800">
                <p className="font-semibold text-amber-300 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> በ iPhone / iPad ላይ ለመጫን፦
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-stone-300">
                  <li>
                    በ Safari ብሮውዘር ታችኛው ክፍል የሚገኘውን <strong className="text-amber-200">Share (ማጋሪያ)</strong> ምልክት ይጫኑ።
                  </li>
                  <li>
                    ወደ ታች ዝቅ ብለው <strong className="text-amber-200">"Add to Home Screen" (ወደ መነሻ ገጽ አክል)</strong> የሚለውን ይምረጡ።
                  </li>
                  <li>
                    በስተቀኝ በላይ በኩል የሚታየውን <strong className="text-amber-200">"Add" (አክል)</strong> የሚለውን ሲጫኑ አፑ በስልክዎ ላይ ይጫናል።
                  </li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-stone-300 bg-stone-900/60 p-4 rounded-xl border border-stone-800">
                <p className="font-semibold text-amber-300 flex items-center gap-2">
                  <PlusSquare className="w-4 h-4" /> በ Android እና ኮምፒውተር (Chrome / Edge) ላይ፦
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-stone-300">
                  <li>
                    በብሮውዘሩ የላይኛው ቀኝ ጥግ የሚገኙትን <strong className="text-amber-200">ሦስት ነጥቦች (⋮)</strong> ይጫኑ።
                  </li>
                  <li>
                    <strong className="text-amber-200">"Install App" (መተግበሪያውን ጫን)</strong> ወይም <strong className="text-amber-200">"Add to Home screen"</strong> የሚለውን ይጫኑ።
                  </li>
                  <li>
                    ከዚያም ልክ እንደ ፕሌይስቶር/አፕስቶር አፕሊኬሽኖች ኢንተርኔት ሳይኖርም ሙሉ በሙሉ በስልክዎ ይከፈታል።
                  </li>
                </ol>
              </div>
            )}

            <button
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition"
            >
              ተረድቻለሁ / ዝጋ
            </button>
          </div>
        </div>
      )}
    </>
  );
};
