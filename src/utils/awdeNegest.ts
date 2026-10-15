import { AwdeNegestCalcResult, BurjiInfo, CompatibilityResult } from '../types';

// Traditional Gematria (ሐሳበ ፊደል / አበገድ)
// Base roots and their numerical values in ancient Ethiopian manuscripts
export const FIDEL_VALUES: Record<string, number> = {
  // 1
  ሀ: 1, ሁ: 1, ሂ: 1, ሃ: 1, ሄ: 1, ህ: 1, ሆ: 1,
  // 2
  ለ: 2, ሉ: 2, ሊ: 2, ላ: 2, ሌ: 2, ል: 2, ሎ: 2, ሏ: 2,
  // 3
  ሐ: 3, ሑ: 3, ሒ: 3, ሓ: 3, ሔ: 3, ሕ: 3, ሖ: 3, ሗ: 3,
  // 4
  መ: 4, ሙ: 4, ሚ: 4, ማ: 4, ሜ: 4, ም: 4, ሞ: 4, ሟ: 4,
  // 5
  ሠ: 5, ሡ: 5, ሢ: 5, ሣ: 5, ሤ: 5, ሥ: 5, ሦ: 5, ሧ: 5,
  // 6
  ረ: 6, ሩ: 6, ሪ: 6, ራ: 6, ሬ: 6, ር: 6, ሮ: 6, ሯ: 6,
  // 7
  ሰ: 7, ሱ: 7, ሲ: 7, ሳ: 7, ሴ: 7, ስ: 7, ሶ: 7, ሷ: 7,
  ሸ: 7, ሹ: 7, ሺ: 7, ሻ: 7, ሼ: 7, ሽ: 7, ሾ: 7, ሿ: 7, // ሸ derives from ሰ
  // 8
  ቀ: 8, ቁ: 8, ቂ: 8, ቃ: 8, ቄ: 8, ቅ: 8, ቆ: 8, ቋ: 8,
  // 9
  በ: 9, ቡ: 9, ቢ: 9, ባ: 9, ቤ: 9, ብ: 9, ቦ: 9, ቧ: 9,
  // 10
  ተ: 10, ቱ: 10, ቲ: 10, ታ: 10, ቴ: 10, ት: 10, ቶ: 10, ቷ: 10,
  ቸ: 10, ቹ: 10, ቺ: 10, ቻ: 10, ቼ: 10, ች: 10, ቾ: 10, ቿ: 10, // ቸ derives from ተ
  // 20
  ኀ: 20, ኁ: 20, ኂ: 20, ኃ: 20, ኄ: 20, ኅ: 20, ኆ: 20, ኋ: 20,
  // 30
  ነ: 30, ኑ: 30, ኒ: 30, ና: 30, ኔ: 30, ን: 30, ኖ: 30, ኗ: 30,
  ኘ: 30, ኙ: 30, ኚ: 30, ኛ: 30, ኜ: 30, ኝ: 30, ኞ: 30, ኟ: 30, // ኘ derives from ነ
  // 40
  አ: 40, ኡ: 40, ኢ: 40, ኣ: 40, ኤ: 40, እ: 40, ኦ: 40,
  // 50
  ከ: 50, ኩ: 50, ኪ: 50, ካ: 50,Trace: 50, ክ: 50, ኮ: 50, ኳ: 50, ኬ: 50,
  ኸ: 50, ኹ: 50, ኺ: 50, ኻ: 50, ኼ: 50, ኽ: 50, ኾ: 50, ዃ: 50, // ኸ derives from ከ
  // 60
  ወ: 60, ዉ: 60, ዊ: 60, ዋ: 60, ዌ: 60, ው: 60, ዎ: 60,
  // 70
  ዐ: 70, ዑ: 70, ዒ: 70, ዓ: 70, ዔ: 70, ዕ: 70, ዖ: 70,
  // 80
  ዘ: 80, ዙ: 80, ዚ: 80, ዛ: 80, ዜ: 80, ዝ: 80, ዞ: 80, ዟ: 80,
  ዠ: 80, ዡ: 80, ዢ: 80, ዣ: 80, ዤ: 80, ዥ: 80, ዦ: 80, ዧ: 80, // ዠ derives from ዘ
  // 90
  የ: 90, ዩ: 90, ዪ: 90, ያ: 90, ዬ: 90, ይ: 90, ዮ: 90,
  // 100
  ደ: 100, ዱ: 100, ዲ: 100, ዳ: 100, ዴ: 100, ድ: 100, ዶ: 100, ዷ: 100,
  ጀ: 100, ጁ: 100, ጂ: 100, ጃ: 100, ጄ: 100, ጅ: 100, ጆ: 100, ጇ: 100, // ጀ derives from ደ
  // 200
  ገ: 200, ጉ: 200, ጊ: 200, ጋ: 200, ጌ: 200, ግ: 200, ጎ: 200, ጓ: 200,
  // 300
  ጠ: 300, ጡ: 300, ጢ: 300, ጣ: 300, ጤ: 300, ጥ: 300, ጦ: 300, ጧ: 300,
  ጨ: 300, ጩ: 300, ጪ: 300, ጫ: 300, ጬ: 300, ጭ: 300, ጮ: 300, ጯ: 300, // ጨ derives from ጠ
  // 400
  ጰ: 400, ጱ: 400, ጲ: 400, ጳ: 400, ጴ: 400, ጵ: 400, ጶ: 400, ጷ: 400,
  // 500
  ጸ: 500, ጹ: 500, ጺ: 500, ጻ: 500, ጼ: 500, ጽ: 500, ጾ: 500, ጿ: 500,
  // 600
  ፀ: 600, ፁ: 600, ፂ: 600, ፃ: 600, ፄ: 600, ፅ: 600, ፆ: 600, ፇ: 600,
  // 700
  ፈ: 700, ፉ: 700, ፊ: 700, ፋ: 700, ፌ: 700, ፍ: 700, ፎ: 700, ፏ: 700,
  // 800
  ፐ: 800, ፑ: 800, ፒ: 800, ፓ: 800, ፔ: 800, ፕ: 800, ፖ: 800, ፗ: 800,
};

// 12 Burjis according to the ancient book of Awde Negest (መጽሐፈ አውደ ነገሥት)
export const BURJI_LIST: BurjiInfo[] = [
  {
    id: 1,
    name: 'ሐመል',
    geezName: 'ሐመል (በግዕ)',
    latinName: 'Aries',
    symbol: '♈',
    element: 'እሳት',
    elementDesc: 'የእሳት ባሕርይ - ሞቃትና ደረቅ፤ የብርታት፣ የተነሳሽነት እና የድፍረት መገለጫ',
    planet: 'መሪኽ (ማርስ)',
    planetDesc: 'የጀግንነት፣ የኃይልና የፍጥነት ኮከብ',
    character: 'ቆራጥ፣ ፊት አውራሪ፣ ለጋስ፣ ደፋር፣ በቀላሉ የማይበገር፤ እውነቱን ፊት ለፊት የሚናገር፣ በቁጣ ቢገነፈልም ቂም የማያኖር።',
    strengths: ['የመሪነት ብቃት', 'ከፍተኛ ድፍረትና ተነሳሽነት', 'ልበ ሙሉነት', 'ለጓደኛና ቤተሰብ ታማኝነት'],
    weaknesses: ['ችኮላና ትዕግሥት ማጣት', 'ቶሎ መቆጣት', 'የሌሎችን ምክር ለማዳመጥ ማመንታት'],
    careers: ['አመራርና መሪነት', 'ወታደራዊና ጸጥታ', 'ንግድና ስራ ፈጠራ', 'ምህንድስና', 'ስፖርትና አትሌቲክስ'],
    health: 'የራስ ምታት፣ የደም ግፊትና የዓይን ድካም፤ ማረጋጊያና ዕረፍት መውሰድ ይመከራል።',
    favorableDays: ['ማክሰኞ', 'እሑድ'],
    favorableColors: ['ደማቅ ቀይ', 'ወርቃማ ቢጫ', 'ብርቱካናማ'],
    marriageCompatibility: {
      compatible: ['ጀውዛ (ነፋስ)', 'ሚዛን (ነፋስ)', 'ቀውስ (እሳት)', 'ደልው (ነፋስ)'],
      moderate: ['ሰውር (መሬት)', 'ሰንቡላ (መሬት)', 'ጀዲ (መሬት)'],
      challenging: ['ሰርጣን (ማይ)', 'አቅራብ (ማይ)', 'ሑት (ማይ)'],
      advice: 'ከማይ/ውሃ ባሕርይ ሰዎች ጋር ሲጋቡ ንዴትን መግታትና በትዕግሥት ማዳመጥ ይገባል።',
    },
  },
  {
    id: 2,
    name: 'ሰውር',
    geezName: 'ሰውር (ላም/በሬ)',
    latinName: 'Taurus',
    symbol: '♉',
    element: 'መሬት',
    elementDesc: 'የመሬት ባሕርይ - ቀዝቃዛና ደረቅ፤ የጽናት፣ የታማኝነት፣ የርጋታና የእድገት መሠረት',
    planet: 'ዙህራ (ቬኑስ)',
    planetDesc: 'የውበት፣ የፍቅር፣ የጥበብና የሀብት ኮከብ',
    character: 'ረጋ ያለ፣ እጅግ ታጋሽ፣ አስተዋይ፣ ታማኝ፣ ንብረት ጠባቂ፤ አዳዲስ ነገሮችን በጥንቃቄ የሚያጠና፣ ቃሉ የማይታጠፍ።',
    strengths: ['ጽናትና ጽኑ ዐላማ', 'ታማኝነት', 'የገንዘብና የሀብት አያያዝ ጥበብ', 'ሰላም ወዳድነት'],
    weaknesses: ['አለመስማማት (ግትርነት)', 'ለውጥን መፍራት', 'ቁሳዊ ነገር ላይ ማተኮር'],
    careers: ['እርሻና ተፈጥሮ ሀብት', 'ባንክና ፋይናንስ', 'ኪነ-ጥበብና ሙዚቃ', 'ግንባታና አርክቴክቸር', 'የሆቴልና መስተንግዶ ሥራ'],
    health: 'የጉሮሮና የአንገት ሕመም፤ ጤናማ አመጋገብና እንቅስቃሴ ማድረግ ያስፈልጋል።',
    favorableDays: ['ዓርብ', 'ሰኞ'],
    favorableColors: ['አረንጓዴ', 'ሐምራዊ', 'የመሬት ቡኒ'],
    marriageCompatibility: {
      compatible: ['ሰርጣን (ማይ)', 'አቅራብ (ማይ)', 'ሑት (ማይ)', 'ሰንቡላ (መሬት)'],
      moderate: ['ሐመል (እሳት)', 'ቀውስ (እሳት)'],
      challenging: ['ጀውዛ (ነፋስ)', 'ደልው (ነፋስ)'],
      advice: 'የባልንጀራን ስሜት በቶሎ መረዳትና አዳዲስ ሃሳቦችን በደስታ መቀበል የትዳሩን ፍቅር ያጸናዋል።',
    },
  },
  {
    id: 3,
    name: 'ጀውዛ',
    geezName: 'ጀውዛ (መንትያ)',
    latinName: 'Gemini',
    symbol: '♊',
    element: 'ነፋስ',
    elementDesc: 'የነፋስ ባሕርይ - ሞቃትና ርጥብ፤ የሐሳብ ልውውጥ፣ የብልሃትና የዕውቀት መናኸሪያ',
    planet: 'ኦጣርድ (ሜርኩሪ)',
    planetDesc: 'የንግግር፣ የጥበብ፣ የብልሃትና የመልእክት ኮከብ',
    character: 'ፈጣን አእምሮ፣ ብሩህ አስተሳሰብ፣ ተናጋሪ፣ ተግባቢ፤ ሁልጊዜ አዳዲስ እውቀቶችን ማወቅ የሚሻ፣ ጨዋታ አዋቂ።',
    strengths: ['የማሳመን ችሎታ', 'ተለዋዋጭነትና ፈጣን መላመድ', 'ብልህነት', 'ማኅበራዊ ተወዳጅነት'],
    weaknesses: ['በአንድ ነገር ላይ አለመቆየት', 'ውሳኔ ለማድረግ ማወላወል', 'የወሬ መብዛት'],
    careers: ['ጋዜጠኝነትና ሚዲያ', 'መምህርነት', 'ሽያጭና ግብይት', 'ጸሐፊነትና ተርጓሚነት', 'ዲፕሎማሲ'],
    health: 'የመተንፈሻ አካላትና የነርቭ ውጥረት፤ የትንፋሽ እንቅስቃሴና ማሰላሰል ይመረጣል።',
    favorableDays: ['ረቡዕ', 'ሐሙስ'],
    favorableColors: ['ቢጫ', 'ሰማያዊ ሰማያዊ', 'ብርማ'],
    marriageCompatibility: {
      compatible: ['ሐመል (እሳት)', 'አሰድ (እሳት)', 'ሚዛን (ነፋስ)', 'ደልው (ነፋስ)'],
      moderate: ['ሰርጣን (ማይ)', 'ሑት (ማይ)'],
      challenging: ['ሰውር (መሬት)', 'ጀዲ (መሬት)'],
      advice: 'በትዳር ውስጥ ጽናትና ለትዳር አጋር ሙሉ ትኩረት መስጠት የጋብቻውን መሠረት ያጠናክረዋል።',
    },
  },
  {
    id: 4,
    name: 'ሰርጣን',
    geezName: 'ሰርጣን (ሸርጣን/ሸርጣጥ)',
    latinName: 'Cancer',
    symbol: '♋',
    element: 'ማይ',
    elementDesc: 'የማይ/ውሃ ባሕርይ - ቀዝቃዛና ርጥብ፤ የፍቅር፣ የርኅራኄ፣ የእናትነትና የመንከባከብ ምንጭ',
    planet: 'ቀመር (ጨረቃ)',
    planetDesc: 'የስሜት፣ የደመ-ነፍስና የሕይወት ዑደት ኮከብ',
    character: 'አዛኝ፣ ሩኅሩኅ፣ የቤተሰብ ፍቅር የሚያጠቃው፣ ታማኝ፣ ስሜቱ ጥልቅ የሆነ፤ ለወዳጁ ሕይወቱን አሳልፎ የሚሰጥ።',
    strengths: ['እጅግ የዳበረ የውስጥ ስሜት (Intuition)', 'መንከባከብና አሳቢነት', 'ጽናትና ታማኝነት', 'የቤተሰብ ፍቅር'],
    weaknesses: ['ስሜታዊ መሆን', 'ያለፈውን ነገር አለመርሳት', 'በቀላሉ መጎዳትና ማኩረፍ'],
    careers: ['ሕክምናና ነርሲንግ', 'ሳይኮሎጂና የምክር አገልግሎት', 'ትምህርትና ሕፃናት እንክብካቤ', 'የምግብ ዝግጅት', 'ታሪክና ቅርስ ጥናት'],
    health: 'የሆድና የምግብ መፈጨት ሥርዓት፤ ከአእምሮ ውጥረት መራቅና ሰላማዊ አካባቢ መፍጠር አስፈላጊ ነው።',
    favorableDays: ['ሰኞ', 'ሐሙስ'],
    favorableColors: ['ነጭ', 'ብርማ', 'የባህር ሰማያዊ'],
    marriageCompatibility: {
      compatible: ['ሰውር (መሬት)', 'ሰንቡላ (መሬት)', 'አቅራብ (ማይ)', 'ሑት (ማይ)'],
      moderate: ['ሚዛን (ነፋስ)', 'ቀውስ (እሳት)'],
      challenging: ['ሐመል (እሳት)', 'አሰድ (እሳት)'],
      advice: 'የውስጥ ስሜትን በግልጽ መወያየትና ከልክ በላይ መጨነቅን ማቆም በትዳር ውስጥ ደስታን ያጎናጽፋል።',
    },
  },
  {
    id: 5,
    name: 'አሰድ',
    geezName: 'አሰድ (አንበሳ)',
    latinName: 'Leo',
    symbol: '♌',
    element: 'እሳት',
    elementDesc: 'የእሳት ባሕርይ - ሙቀትና ግርማ፤ የንጉሥነት፣ የክብር፣ የብርሃንና የአስተዳደር ምልክት',
    planet: 'ሸምስ (ፀሐይ)',
    planetDesc: 'የሕይወት፣ የክብር፣ የብርሃንና የታላቅነት ንጉሥ',
    character: 'ክብር ወዳድ፣ ልበ ሙሉ፣ ለጋስ፣ ግርማ ሞገስ ያለው፤ በቡድን ውስጥ ሁልጊዜ ቀዳሚና አስተባባሪ፣ በደልን ይቅር የሚል ትልቅ ልብ።',
    strengths: ['የላቀ የአመራር ክህሎት', 'ታላቅ ልግስና', 'የማያወላውል እምነት', 'ሳቢና ተወዳጅ ግርማ'],
    weaknesses: ['ኩራትና እኔ ብቻ ማወቅ', 'ውዳሴ ከንቱ መውደድ', 'አዛዥነት ማብዛት'],
    careers: ['ከፍተኛ አመራርና ፖለቲካ', 'የኪነ-ጥበብና የቴአትር ዳይሬክተር', 'የድርጅት ባለቤትነት', 'ዳኝነትና ሕግ', 'ዲፕሎማሲ'],
    health: 'የልብና የጀርባ አጥንት ጤና፤ ስፖርት ማዘውተርና የደም ዝውውርን መጠበቅ።',
    favorableDays: ['እሑድ', 'ማክሰኞ'],
    favorableColors: ['ወርቃማ', 'ደማቅ ቢጫ', 'ሮያል ወይን ጠጅ'],
    marriageCompatibility: {
      compatible: ['ሐመል (እሳት)', 'ጀውዛ (ነፋስ)', 'ሚዛን (ነፋስ)', 'ቀውስ (እሳት)'],
      moderate: ['ሰውር (መሬት)', 'ጀዲ (መሬት)'],
      challenging: ['ሰርጣን (ማይ)', 'አቅራብ (ማይ)'],
      advice: 'ለትዳር አጋር እኩል ክብር መስጠትና ውሳኔዎችን በጋራ ማሳለፍ ትዳርን ዘላለማዊ ያደርገዋል።',
    },
  },
  {
    id: 6,
    name: 'ሰንቡላ',
    geezName: 'ሰንቡላ (እሸት/ድንግል)',
    latinName: 'Virgo',
    symbol: '♍',
    element: 'መሬት',
    elementDesc: 'የመሬት ባሕርይ - ቀዝቃዛና ደረቅ፤ የጥራት፣ የሥርዓት፣ የንጽሕና እና የጥበብ ምንጭ',
    planet: 'ኦጣርድ (ሜርኩሪ)',
    planetDesc: 'የሂሳብ፣ የትንታኔና የጥልቅ አእምሮ ኮከብ',
    character: 'ሥርዓታማ፣ ንጹሕ፣ ሂሳባዊ፣ ዝርዝር ነገሮችን አስተዋይ፤ ሥራውን በጥራትና በታማኝነት የሚያከናውን፣ ኃላፊነት የሚሰማው።',
    strengths: ['የትንታኔና የምርምር ብቃት', 'ንጽሕናና ሥርዓታማነት', 'ታማኝነትና ታታሪነት', 'ሌሎችን የመርዳት ፍላጎት'],
    weaknesses: ['ነቀፌታ ማብዛት', 'ከመጠን በላይ ፍጽምናን መፈለግ', 'በቀላሉ መጨነቅ'],
    careers: ['ሕክምናና ፋርማሲ', 'ኦዲትና ሂሳብ', 'ሳይንሳዊ ምርምር', 'አርታዒነትና ጽሕፈት', 'ኢንጂነሪንግ'],
    health: 'የአንጀትና የሆድ ዕቃ ጤና፤ ተፈጥሯዊ ምግቦችን መመገብና ራስን ዘና ማድረግ።',
    favorableDays: ['ረቡዕ', 'ዓርብ'],
    favorableColors: ['ሰማያዊ', 'ፈዛዛ አረንጓዴ', 'ግራጫ'],
    marriageCompatibility: {
      compatible: ['ሰውር (መሬት)', 'ሰርጣን (ማይ)', 'አቅራብ (ማይ)', 'ጀዲ (መሬት)', 'ሑት (ማይ)'],
      moderate: ['ሚዛን (ነፋስ)', 'ደልው (ነፋስ)'],
      challenging: ['ጀውዛ (ነፋስ)', 'ቀውስ (እሳት)'],
      advice: 'የትዳር አጋርን ጉድለት በትዕግሥት ማለፍና ያለምክንያት አለመንቀፍ ሰላምን ያሰፍናል።',
    },
  },
  {
    id: 7,
    name: 'ሚዛን',
    geezName: 'ሚዛን (ሚዛን)',
    latinName: 'Libra',
    symbol: '♎',
    element: 'ነፋስ',
    elementDesc: 'የነፋስ ባሕርይ - ሞቃትና ርጥብ፤ የፍትሕ፣ የዕርቅ፣ የውበትና የስምምነት መፍጠሪያ',
    planet: 'ዙህራ (ቬኑስ)',
    planetDesc: 'የፍቅር፣ የሰላም፣ የስምምነትና የውበት ንግሥት',
    character: 'ፍትሃዊ፣ እርቅ ወዳድ፣ ጨዋ፣ የሰው ፍቅር ያለው፤ ክርክርና ጸብ የማይወድ፣ ሁሉንም በእኩል ዓይን የሚመለከት።',
    strengths: ['የዲፕሎማሲና የማስማማት ችሎታ', 'ማራኪ አንደበትና ጨዋነት', 'ፍትሐዊነት', 'ጥበባዊ ውበት አድናቂነት'],
    weaknesses: ['ውሳኔ ለመስጠት መቸገር', 'ሰውን ላለማስቀየም እውነትን መሸፋፈን', 'ብቸኝነትን መፍራት'],
    careers: ['ሕግና ዳኝነት', 'ዲፕሎማሲና የውጭ ግንኙነት', 'የሽምግልና ሥራ', 'ፋሽንና የውስጥ ዲዛይን', 'ኪነ-ጥበብ'],
    health: 'የኩላሊትና የታችኛው ጀርባ ጤና፤ በቂ ውኃ መጠጣትና ሚዛናዊ አመጋገብ።',
    favorableDays: ['ዓርብ', 'ቅዳሜ'],
    favorableColors: ['ሮዝ', 'ሰማያዊ', 'ፈዛዛ ቢጫ'],
    marriageCompatibility: {
      compatible: ['ሐመል (እሳት)', 'ጀውዛ (ነፋስ)', 'አሰድ (እሳት)', 'ደልው (ነፋስ)'],
      moderate: ['ሰውር (መሬት)', 'ሰንቡላ (መሬት)'],
      challenging: ['ሰርጣን (ማይ)', 'ጀዲ (መሬት)'],
      advice: 'በቀጥታ የራስን ፍላጎት በድፍረት መግለጽና ውሳኔዎችን በጽናት መወሰን ትዳርን የተረጋጋ ያደርገዋል።',
    },
  },
  {
    id: 8,
    name: 'አቅራብ',
    geezName: 'አቅራብ (ጊንጥ)',
    latinName: 'Scorpio',
    symbol: '♏',
    element: 'ማይ',
    elementDesc: 'የማይ/ውሃ ባሕርይ - ቀዝቃዛና ርጥብ፤ የጥልቅ ምስጢር፣ የጽናት፣ የዳግም ልደትና የኃይል ምንጭ',
    planet: 'መሪኽ (ማርስ)',
    planetDesc: 'የጥልቅ ኃይል፣ የመለወጥና የድል ኮከብ',
    character: 'ጥልቅ አስተዋይ፣ ምስጢር ጠባቂ፣ ጽኑ፣ የማይበገር ወኔ ያለው፤ ውሸትን በቅጽበት የሚያውቅ፣ ወዳጁን በሙሉ ልብ የሚወድ።',
    strengths: ['የማይናወጥ ጽናት', 'የምስጢር ጥበቃ', 'ጥልቅ የሰው ጠባይ መረዳት', 'ተስፋ አለመቁረጥ'],
    weaknesses: ['ጥርጣሬ ማብዛት', 'ቂም በቀል መያዝ', 'ከመጠን በላይ ምስጢረኛ መሆን'],
    careers: ['ቀዶ ጥገናና ሕክምና', 'የወንጀል ምርመራና ደህንነት', 'ሳይንሳዊ ምርምር', 'ስነ-ልቦና', 'ፋይናንስና ኢንቨስትመንት'],
    health: 'የመራቢያ አካላትና የሰውነት መከላከያ፤ ጭንቀትንና ቂምን ማራቅ ፍጹም ጤናን ይሰጣል።',
    favorableDays: ['ማክሰኞ', 'ሐሙስ'],
    favorableColors: ['ጥቁር', 'ደማቅ ቀይ', 'የደረት ቡኒ'],
    marriageCompatibility: {
      compatible: ['ሰውር (መሬት)', 'ሰርጣን (ማይ)', 'ሰንቡላ (መሬት)', 'ሑት (ማይ)'],
      moderate: ['ሚዛን (ነፋስ)', 'ጀዲ (መሬት)'],
      challenging: ['ሐመል (እሳት)', 'አሰድ (እሳት)', 'ጀውዛ (ነፋስ)'],
      advice: 'በትዳር አጋር ላይ እምነት መጣልና ያለፈን ነገር ይቅር ማለት የፍቅርን ጥልቀት ያበዛዋል።',
    },
  },
  {
    id: 9,
    name: 'ቀውስ',
    geezName: 'ቀውስ (ቀስት)',
    latinName: 'Sagittarius',
    symbol: '♐',
    element: 'እሳት',
    elementDesc: 'የእሳት ባሕርይ - ሙቀትና ተስፋ፤ የነጻነት፣ የፍልስፍና፣ የጉዞና የእውነት ፍለጋ',
    planet: 'ሙሽተሪ (ጁፒተር)',
    planetDesc: 'የዕድል፣ የጥበብ፣ የሰፊ እይታና የበረከት ኮከብ',
    character: 'እውነት ወዳድ፣ ተስፈኛ፣ ክፍት ልብ ያለው፣ ተጓዥ፤ ለማንም የማይሸነግል እውነተኛ ቃል የሚናገር፣ ደስተኛና ለጋስ።',
    strengths: ['እውነተኝነት', 'ሰፊ አመለካከትና ፍልስፍና', 'ተስፈኝነትና ደስታ', 'የእውቀት ጥማት'],
    weaknesses: ['ግልፍተኛ ንግግር (ሰውን የሚያስቀይም እውነት)', 'ቃል ኪዳን መርሳት', 'አለመረጋጋት'],
    careers: ['ከፍተኛ ትምህርትና ፍልስፍና', 'ሕግና ፍትሕ', 'ቱሪዝም፣ ጉዞና አቪዬሽን', 'መንፈሳዊ አገልግሎት', 'ማተሚያና መጻሕፍት'],
    health: 'የጭንና የወገብ ጤና፤ አዘውትሮ በእግር መጓዝ እና ስፖርት መስራት።',
    favorableDays: ['ሐሙስ', 'እሑድ'],
    favorableColors: ['ሰማያዊ ወይን ጠጅ', 'ሮያል ሰማያዊ', 'ደማቅ ቢጫ'],
    marriageCompatibility: {
      compatible: ['ሐመል (እሳት)', 'ጀውዛ (ነፋስ)', 'አሰድ (እሳት)', 'ደልው (ነፋስ)'],
      moderate: ['ሚዛን (ነፋስ)', 'ሑት (ማይ)'],
      challenging: ['ሰውር (መሬት)', 'ሰንቡላ (መሬት)', 'ጀዲ (መሬት)'],
      advice: 'የቃል ኪዳንን ክብር መጠበቅና በቤት ውስጥ ጊዜ ማሳለፍ ትዳርን የተረጋጋ ያደርገዋል።',
    },
  },
  {
    id: 10,
    name: 'ጀዲ',
    geezName: 'ጀዲ (ፍየል)',
    latinName: 'Capricorn',
    symbol: '♑',
    element: 'መሬት',
    elementDesc: 'የመሬት ባሕርይ - ቀዝቃዛና ደረቅ፤ የጥረት፣ የትዕግሥት፣ የተራራ መውጣትና የክብር መሠረት',
    planet: 'ዙሐል (ሳተርን)',
    planetDesc: 'የጊዜ፣ የትምህርት፣ የሥርዓትና የጽናት አስተማሪ',
    character: 'ትዕግሥተኛ፣ ታታሪ፣ አርቆ አሳቢ፣ ኃላፊነት የሚሸከም፤ ያለ ማንም ድጋፍ በገዛ ጥረቱ ተራራ የሚወጣ፣ ክብሩን የሚጠብቅ።',
    strengths: ['የማይናወጥ ኃላፊነት', 'ትዕግሥትና ብስለት', 'የረጅም ጊዜ እቅድ አውጪነት', 'ታማኝነት'],
    weaknesses: ['ከመጠን በላይ መቆጠብና መጨነቅ', 'ስሜትን አለመግለጽ', 'ሥራን ብቻ ማሰብ'],
    careers: ['የድርጅት አስተዳደርና ስራ አስኪያጅ', 'ግንባታና ኢንጂነሪንግ', 'መንግሥታዊ አመራር', 'አርክቴክቸር', 'ፋይናንስ'],
    health: 'የአጥንትና የመገጣጠሚያ፣ የጥርስ ጤና፤ ካልሲየም የበለፀጉ ምግቦችና የፀሐይ ብርሃን።',
    favorableDays: ['ቅዳሜ', 'ማክሰኞ'],
    favorableColors: ['ጥቁር ቡኒ', 'ጥቁር', 'የጫካ አረንጓዴ'],
    marriageCompatibility: {
      compatible: ['ሰውር (መሬት)', 'ሰርጣን (ማይ)', 'ሰንቡላ (መሬት)', 'አቅራብ (ማይ)', 'ሑት (ማይ)'],
      moderate: ['ሐመል (እሳት)', 'ሚዛን (ነፋስ)'],
      challenging: ['ጀውዛ (ነፋስ)', 'ደልው (ነፋስ)'],
      advice: 'ከሥራ ውጪ ለትዳርና ለፍቅር ጊዜ መስጠት፣ ስሜትን በግልጽ ማሳየት ቤተሰብን በደስታ ይሞላል።',
    },
  },
  {
    id: 11,
    name: 'ደልው',
    geezName: 'ደልው (እንስራ)',
    latinName: 'Aquarius',
    symbol: '♒',
    element: 'ነፋስ',
    elementDesc: 'የነፋስ ባሕርይ - ሞቃትና ርጥብ፤ የፈጠራ፣ የሰብአዊነት፣ የለውጥና የወደፊት ብርሃን',
    planet: 'ዙሐል (ሳተርን)',
    planetDesc: 'የዕውቀት፣ የአዲስ አድማስና የነጻነት ምልክት',
    character: 'ፈጣሪ፣ ነጻነት አፍቃሪ፣ ሰብአዊ፣ አድሏዊ ያልሆነ፤ የሰውን ልጅ ችግር ለመፍታት የሚተጋ፣ በዓለም ፊት አዳዲስ እሳቤዎችን የሚያመጣ።',
    strengths: ['የፈጠራና የቴክኖሎጂ አእምሮ', 'ሰብአዊነትና ፍትሕ ወዳድነት', 'ነጻ አመለካከት', 'እውነተኛ ጓደኝነት'],
    weaknesses: ['ስሜትን አግልሎ ማየት (የርቀት ስሜት)', 'ያልተጠበቀ ውሳኔ', 'ደንብ አለመቀበል'],
    careers: ['ኢንፎርሜሽን ቴክኖሎጂና ሶፍትዌር', 'ሳይንስና ፈጠራ', 'ሰብአዊ መብትና ማኅበራዊ ጥናት', 'አቪዬሽን', 'የጥበብ ፈጠራ'],
    health: 'የእግር ቁርጭምጭሚትና የደም ዝውውር፤ ዘና የሚያደርጉ እንቅስቃሴዎች።',
    favorableDays: ['ቅዳሜ', 'ረቡዕ'],
    favorableColors: ['ኤሌክትሪክ ሰማያዊ', 'ቱርኮይዝ', 'ብርማ'],
    marriageCompatibility: {
      compatible: ['ሐመል (እሳት)', 'ጀውዛ (ነፋስ)', 'አሰድ (እሳት)', 'ሚዛን (ነፋስ)', 'ቀውስ (እሳት)'],
      moderate: ['ሰንቡላ (መሬት)', 'ሑት (ማይ)'],
      challenging: ['ሰውር (መሬት)', 'ሰርጣን (ማይ)', 'ጀዲ (መሬት)'],
      advice: 'የትዳር አጋርን ስሜታዊ ፍላጎት መረዳትና አብሮ ማሳለፍ ልዩ ፍቅርን ይፈጥራል።',
    },
  },
  {
    id: 12,
    name: 'ሑት',
    geezName: 'ሑት (ዓሣ)',
    latinName: 'Pisces',
    symbol: '♓',
    element: 'ማይ',
    elementDesc: 'የማይ/ውሃ ባሕርይ - ቀዝቃዛና ርጥብ፤ የመንፈሳዊነት፣ የጥበብ፣ የይቅርታና የፍቅር ውቅያኖስ',
    planet: 'ሙሽተሪ (ጁፒተር)',
    planetDesc: 'የመንፈስ ጥልቀት፣ የምሕረትና የጥበብ ኮከብ',
    character: 'የዋህ፣ አዛኝ፣ የመንፈስ ሰው፣ ኪነ-ጥበብ አፍቃሪ፤ በሰው ችግር የሚቆረቆር፣ ይቅር ባይ፣ ውስጣዊ መንፈሱ ከፍ ያለ።',
    strengths: ['የላቀ ርኅራኄና ይቅርታ', 'መንፈሳዊ ጥበብና ውስጣዊ ዕይታ', 'የጥበብና የሙዚቃ ስጦታ', 'ራስን መስጠት'],
    weaknesses: ['ከእውነታው ዓለም መሸሽ', 'ሰውን አብዝቶ ማመን', 'በቀላሉ መታለል'],
    careers: ['ሙዚቃና ኪነ-ጥበብ', 'መንፈሳዊና የገዳም አገልግሎት', 'ሕክምናና ነርሲንግ', 'ሳይኮሎጂና ማማከር', 'የባህርና የውሃ ጥናት'],
    health: 'የእግርና የሰውነት ፈሳሽ ጤና፤ በቂ እረፍትና የእግር እንክብካቤ ማድረግ።',
    favorableDays: ['ሐሙስ', 'ሰኞ'],
    favorableColors: ['የባህር አረንጓዴ', 'ሐምራዊ', 'ዕንቁ ነጭ'],
    marriageCompatibility: {
      compatible: ['ሰውር (መሬት)', 'ሰርጣን (ማይ)', 'ሰንቡላ (መሬት)', 'አቅራብ (ማይ)', 'ጀዲ (መሬት)'],
      moderate: ['ሐመል (እሳት)', 'ቀውስ (እሳት)'],
      challenging: ['ጀውዛ (ነፋስ)', 'ሚዛን (ነፋስ)', 'ደልው (ነፋስ)'],
      advice: 'በምድራዊ ሕይወት ላይ ትኩረት ማድረግና አጋርን በሙሉ ልብ ማመን ትዳርን ያደምቀዋል።',
    },
  },
];

/**
 * Calculates sum of Amharic/Ge'ez text based on Hasabe Fidel
 */
export function calculateNameScore(name: string): { total: number; breakdown: { letter: string; value: number }[] } {
  const clean = name.trim().replace(/\s+/g, '');
  let total = 0;
  const breakdown: { letter: string; value: number }[] = [];

  for (const char of clean) {
    const val = FIDEL_VALUES[char] || 0;
    if (val > 0) {
      total += val;
      breakdown.push({ letter: char, value: val });
    }
  }

  return { total, breakdown };
}

/**
 * Calculate Awde Negest Star from Person's Name and Mother's Name
 */
export function calculateAwdeNegest(personName: string, motherName: string): AwdeNegestCalcResult {
  const pScore = calculateNameScore(personName);
  const mScore = calculateNameScore(motherName);
  const totalScore = pScore.total + mScore.total;

  // Remainder divided by 12
  // If remainder is 0, the burji is 12 (ሑት)
  let remainder = totalScore % 12;
  if (remainder === 0) {
    remainder = 12;
  }

  const burji = BURJI_LIST.find((b) => b.id === remainder) || BURJI_LIST[0];

  return {
    personName,
    motherName,
    personScore: pScore.total,
    motherScore: mScore.total,
    totalScore,
    letterBreakdown: [...pScore.breakdown, ...mScore.breakdown],
    burjiNumber: remainder,
    burji,
  };
}

/**
 * Calculate marriage and partnership compatibility between two persons
 */
export function calculateCompatibility(
  p1Name: string,
  p1Mother: string,
  p2Name: string,
  p2Mother: string
): CompatibilityResult {
  const r1 = calculateAwdeNegest(p1Name, p1Mother);
  const r2 = calculateAwdeNegest(p2Name, p2Mother);

  const e1 = r1.burji.element;
  const e2 = r2.burji.element;

  let score = 70;
  let status: CompatibilityResult['status'] = 'መልካም ጥምረት';
  let elementMatch = '';
  let detailedAnalysis = '';
  const recommendations: string[] = [];

  // Elemental harmony evaluation
  if (
    (e1 === 'እሳት' && e2 === 'ነፋስ') ||
    (e1 === 'ነፋስ' && e2 === 'እሳት')
  ) {
    score = 96;
    status = 'እጅግ ምርጥ ጥምረት';
    elementMatch = 'እሳት እና ነፋስ - ነፋስ እሳትን እንደሚያንቦገቡግ ሁሉ አንዱ ሌላውን የሚያነሳሳና የሚያበለጽግ ተስማሚ ጥምረት ነው።';
    detailedAnalysis = `${r1.burji.name} (${e1}) እና ${r2.burji.name} (${e2}) ፍጹም የተዋሃደ ጥምረት አላቸው። በመካከላቸው የጋለ ፍቅር፣ ንቁ ውይይት እና አንዱ ለሌላው የብርታት ምንጭ የሚሆንበት የተባረከ ጋብቻ ይኖራቸዋል።`;
    recommendations.push('የተግባቦት ንጽሕናን መጠበቅና ውሳኔዎችን በጋራ ማክበር።');
    recommendations.push('አንዱ ሲቆጣ ሌላው በለሰለሰ አንደበት ማረጋጋት።');
  } else if (
    (e1 === 'ማይ' && e2 === 'መሬት') ||
    (e1 === 'መሬት' && e2 === 'ማይ')
  ) {
    score = 94;
    status = 'እጅግ ምርጥ ጥምረት';
    elementMatch = 'ውኃና መሬት - ውኃ መሬትን እንደሚያለመልመውና ፍሬያማ እንደሚያደርገው ሁሉ ጸንቶ የሚኖር በረከት አላቸው።';
    detailedAnalysis = `${r1.burji.name} (${e1}) እና ${r2.burji.name} (${e2}) የረጋ፣ ቤተሰብንና ንብረትን የሚያሳድግ ፍሬያማ ጥምረት ናቸው። አንዱ ለአንዱ ጋሻና ጥላ ይሆናል።`;
    recommendations.push('አብሮ ለረጅም ጊዜ የሚዘልቅ የቤተሰብና የንብረት እቅድ ማውጣት።');
    recommendations.push('የውስጥ ፍቅርን በድርጊትም በቃልም ማሳየት።');
  } else if (e1 === e2) {
    score = 85;
    status = 'መልካም ጥምረት';
    elementMatch = `ተመሳሳይ መሠረት (${e1} ከ ${e2}) - አንድ ዓይነት ተፈጥሮ ስላላቸው መግባባታቸው ፈጣን ነው።`;
    detailedAnalysis = `ሁለቱም ከተመሳሳይ መሠረት (${e1}) የተገኙ በመሆናቸው ስሜታቸውን፣ ፍላጎታቸውንና ጠባያቸውን በቀላሉ ይረዳዳሉ። ይሁን እንጂ ድክመቶቻቸውም ተመሳሳይ ስለሚሆኑ መደጋገፍ ያስፈልጋቸዋል።`;
    recommendations.push('ተመሳሳይ ድክመቶችን ተነጋግሮ ማረም።');
    recommendations.push('በቤት ውስጥ ሁሌም አዳዲስ አስደሳች ልምዶችን መፍጠር።');
  } else if (
    (e1 === 'እሳት' && e2 === 'ማይ') ||
    (e1 === 'ማይ' && e2 === 'እሳት')
  ) {
    score = 58;
    status = 'ጥንቃቄ የሚሻ ጥምረት';
    elementMatch = 'እሳትና ውኃ - እሳት ውኃን ያፈላል፣ ውኃ እሳትን ያጠፋል። ተቃራኒ ባሕርያት ናቸው።';
    detailedAnalysis = `${r1.burji.name} (${e1}) እና ${r2.burji.name} (${e2}) ጠንካራ መሳሳብ ቢኖራቸውም ተደጋጋሚ ግጭት ሊገጥማቸው ይችላል። አንዱ የሌላውን ባሕርይ ለመለወጥ መሞከር የለበትም።`;
    recommendations.push('የእሳት ባሕርይ ያለው ሰው ቁጣውን መቆጣጠር፣ የማዩ ወገን ደግሞ ቂም አለመያዝ።');
    recommendations.push('በክርክር ወቅት ማሸነፍን ሳይሆን ሰላምን ማስቀደም።');
    recommendations.push('በሽምግልና እና በትዕግሥት መመላለስ።');
  } else {
    score = 75;
    status = 'መካከለኛ ጥምረት';
    elementMatch = `${e1} እና ${e2} - የተረጋጋና በትዕግሥት የሚጎለብት ግንኙነት።`;
    detailedAnalysis = `${r1.burji.name} እና ${r2.burji.name} በጋራ ሕይወታቸው ውስጥ ልዩነታቸውን እንደ ጥንካሬ ከተጠቀሙበት እጅግ ስኬታማ ትዳር መገንባት ይችላሉ።`;
    recommendations.push('የባልንጀራን ልዩነት ማክበርና ማድነቅ።');
    recommendations.push('የትዳርን ቅድስና መጠበቅና ጸሎት ማብዛት።');
  }

  return {
    p1Name,
    p1Mother,
    p1Burji: r1.burji,
    p2Name,
    p2Mother,
    p2Burji: r2.burji,
    score,
    status,
    elementMatch,
    detailedAnalysis,
    recommendations,
  };
}
