import { BahireHasabResult } from '../types';

export const ETHIOPIAN_MONTHS = [
  'መስከረም',
  'ጥቅምት',
  'ኅዳር',
  'ታኅሣሥ',
  'ጥር',
  'የካቲት',
  'መጋቢት',
  'ሚያዝያ',
  'ግንቦት',
  'ሰኔ',
  'ሐምሌ',
  'ነሐሴ',
  'ጳጉሜን',
] as const;

export const DAYS_OF_WEEK = [
  'ሰኞ',
  'ማክሰኞ',
  'ረቡዕ',
  'ሐሙስ',
  'ዓርብ',
  'ቅዳሜ',
  'እሑድ',
] as const;

// ዕለተ ሐመር / የዕለት ተውሳክ (Tinte Qemer):
// እሑድ=7, ሰኞ=6, ማክሰኞ=5, ረቡዕ=4, ሐሙስ=3, ዓርብ=2, ቅዳሜ=8
export const DAY_TEWSAK: Record<string, number> = {
  እሑድ: 7,
  ሰኞ: 6,
  ማክሰኞ: 5,
  ረቡዕ: 4,
  ሐሙስ: 3,
  ዓርብ: 2,
  ቅዳሜ: 8,
};

// Fixed Annual Feasts in Ethiopian Tradition
export const FIXED_FEASTS = [
  { name: 'እንቁጣጣሽ (ቅዱስ ዮሐንስ)', month: 'መስከረም', day: 1, desc: 'የኢትዮጵያ አዲስ ዓመት መጀመሪያ' },
  { name: 'መስቀል (ደመራ)', month: 'መስከረም', day: 17, desc: 'የቅዱስ መስቀል መታሰቢያ በዓል' },
  { name: 'ልደታ ለማርያም', month: 'ግንቦት', day: 1, desc: 'የእመቤታችን የቅድስት ድንግል ማርያም ልደት' },
  { name: 'ገና (ልደት)', month: 'ታኅሣሥ', day: 29, desc: 'የጌታችን የመድኃኒታችን የኢየሱስ ክርስቶስ ልደት' },
  { name: 'ጥምቀት', month: 'ጥር', day: 11, desc: 'የጌታችን የኢየሱስ ክርስቶስ የጥምቀት በዓል' },
  { name: 'ቃና ዘገሊላ', month: 'ጥር', day: 12, desc: 'ውኃ ወደ ወይን የተለወጠበት በዓል' },
  { name: 'ደብረ ታቦር (ቡሄ)', month: 'ነሐሴ', day: 13, desc: 'ጌታ በደብረ ታቦር የተገለጠበት ብርሃነ መለኮት' },
  { name: 'ፍልሰታ (ዕርገተ ማርያም)', month: 'ነሐሴ', day: 16, desc: 'የእመቤታችን ዕርገት መታሰቢያ' },
];

/**
 * Calculates Bahire Hasab (Abushakir) for any given Ethiopian Year
 */
export function calculateBahireHasab(ameteMihret: number): BahireHasabResult {
  const ameteAlem = ameteMihret + 5500;
  
  // ወንበር = (ዓመተ ዓለም % 19) - 1. If remainder is 0, wenber is 18.
  let wenber = (ameteAlem % 19) - 1;
  if (wenber < 0) {
    wenber = 18;
  }

  // አበቅቴ = (ወንበር * 11) % 30
  const abekti = (wenber * 11) % 30;

  // መጥቅዕ = (ወንበር * 19) % 30
  const metqi = (wenber * 19) % 30;

  // መጠነ ራብዒት = floor(ዓመተ ዓለም / 4)
  const meteneRabit = Math.floor(ameteAlem / 4);

  // ወንጌላዊ (The 4 Evangelists: 1=ማቴዎስ, 2=ማርቆስ, 3=ሉቃስ, 0=ዮሐንስ)
  const evangelistIndex = ameteAlem % 4;
  const evangelists = ['ዮሐንስ', 'ማቴዎስ', 'ማርቆስ', 'ሉቃስ'];
  const evangelist = evangelists[evangelistIndex];

  // መስከረም 1 የሚውልበት ዕለት (ዕለተ ዮሐንስ / ርክበ ቀመር)
  // Day formula: (ameteAlem + meteneRabit) % 7
  // 0=ሰኞ, 1=ማክሰኞ, 2=ረቡዕ, 3=ሐሙስ, 4=ዓርብ, 5=ቅዳሜ, 6=እሑድ
  const meskeremOneDayIndex = (ameteAlem + meteneRabit) % 7;
  const meskeremOneDay = DAYS_OF_WEEK[meskeremOneDayIndex];

  // Determining Metqi Month and Day:
  // If Metqi > 14: Month is Meskerem (መስከረም)
  // If Metqi <= 14: Month is Tikimt (ጥቅምት)
  let metqiMonth = 'መስከረም';
  let daysFromMeskeremOne = 0;

  if (metqi > 14) {
    metqiMonth = 'መስከረም';
    daysFromMeskeremOne = metqi - 1;
  } else {
    metqiMonth = 'ጥቅምት';
    // Meskerem has 30 days + metqi days - 1
    daysFromMeskeremOne = 30 + metqi - 1;
  }

  // Day of the week for Metqi:
  const metqiDayOfWeekIndex = (meskeremOneDayIndex + daysFromMeskeremOne) % 7;
  const metqiDayOfWeek = DAYS_OF_WEEK[metqiDayOfWeekIndex];

  // Tinte Qemer of Metqi Day
  const tewsak = DAY_TEWSAK[metqiDayOfWeek] || 0;

  // መባጃ ሐመር
  const mebajaHamer = metqi + tewsak;

  // Determining Nineveh Fast (ጾመ ነነዌ):
  // If Metqi > 14:
  //   if mebajaHamer > 30: month is Yekatit, day is mebajaHamer - 30
  //   if mebajaHamer <= 30: month is Tir, day is mebajaHamer
  // If Metqi <= 14:
  //   month is Tir, day is mebajaHamer
  let neneweMonth = 'ጥር';
  let neneweDay = 0;

  if (metqi > 14) {
    if (mebajaHamer > 30) {
      neneweMonth = 'የካቲት';
      neneweDay = mebajaHamer - 30;
    } else {
      neneweMonth = 'ጥር';
      neneweDay = mebajaHamer;
    }
  } else {
    // Metqi in Tikimt
    if (mebajaHamer > 30) {
      neneweMonth = 'የካቲት';
      neneweDay = mebajaHamer - 30;
    } else {
      neneweMonth = 'ጥር';
      neneweDay = mebajaHamer;
    }
  }

  // Helper to add days in Ethiopian calendar
  const addEthiopianDays = (baseMonth: string, baseDay: number, addDays: number) => {
    const months = ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን'];
    let mIdx = months.indexOf(baseMonth);
    let d = baseDay + addDays;
    while (d > 30) {
      d -= 30;
      mIdx++;
    }
    return { month: months[mIdx], day: d };
  };

  const abiyTsom = addEthiopianDays(neneweMonth, neneweDay, 14);
  const debreZeyt = addEthiopianDays(neneweMonth, neneweDay, 41);
  const hosaena = addEthiopianDays(neneweMonth, neneweDay, 62);
  const siklet = addEthiopianDays(neneweMonth, neneweDay, 67);
  const fasika = addEthiopianDays(neneweMonth, neneweDay, 69);
  const rikbeKahinat = addEthiopianDays(neneweMonth, neneweDay, 93);
  const erget = addEthiopianDays(neneweMonth, neneweDay, 108);
  const peraklitos = addEthiopianDays(neneweMonth, neneweDay, 118);
  const tsomeHawaryat = addEthiopianDays(neneweMonth, neneweDay, 119);
  const tsomeDihnet = addEthiopianDays(neneweMonth, neneweDay, 121);

  const feasts = [
    {
      name: 'ጾመ ነነዌ',
      geezName: 'ጾመ ነነዌ',
      month: neneweMonth,
      day: neneweDay,
      description: 'የሦስት ቀን ጾም፤ የዮናስ ነቢይ ስብከትና የነነዌ ሰዎች ንስሐ መታሰቢያ',
      type: 'fast' as const,
    },
    {
      name: 'ዓቢይ ጾም (ሁዳዴ)',
      geezName: 'ጾመ ሁዳዴ',
      month: abiyTsom.month,
      day: abiyTsom.day,
      description: 'ጌታችን መድኃኒታችን ኢየሱስ ክርስቶስ በገዳመ ቆሮንቶስ የጾመው የ፶፭ (55) ቀናት ታላቅ ጾም መግቢያ',
      type: 'fast' as const,
    },
    {
      name: 'ደብረ ዘይት',
      geezName: 'ደብረ ዘይት',
      month: debreZeyt.month,
      day: debreZeyt.day,
      description: 'የዓቢይ ጾም እኩሌታ፤ የጌታ ዳግም ምጽአት የሚታሰብበት እሑድ',
      type: 'feast' as const,
    },
    {
      name: 'ሆሣዕና',
      geezName: 'ሆሣዕና በአርያም',
      month: hosaena.month,
      day: hosaena.day,
      description: 'ጌታችን በአህያ ውርንጭላ ተቀምጦ በክብር ወደ ኢየሩሳሌም የገባበት ዕለት',
      type: 'feast' as const,
    },
    {
      name: 'ስቅለት (ዓርበ ስቅለት)',
      geezName: 'ስቅለተ ክርስቶስ',
      month: siklet.month,
      day: siklet.day,
      description: 'የጌታችንና የመድኃኒታችን የኢየሱስ ክርስቶስ የማዳን ስቅለት የተፈጸመበት ቅዱስ ዓርብ',
      type: 'fast' as const,
    },
    {
      name: 'ትንሣኤ (ፋሲካ)',
      geezName: 'ብርሃነ ትንሣኤ',
      month: fasika.month,
      day: fasika.day,
      description: 'የጌታችን የመድኃኒታችን የኢየሱስ ክርስቶስ የትንሣኤው በዓል፤ የድልና የሕይወት በዓል',
      type: 'feast' as const,
    },
    {
      name: 'ርክበ ካህናት',
      geezName: 'ርክበ ካህናት',
      month: rikbeKahinat.month,
      day: rikbeKahinat.day,
      description: 'የካህናት ጉባኤና ስብሰባ የሚታሰብበት በዓል (ከትንሣኤ በኋላ በ፬ኛው ሳምንት ረቡዕ)',
      type: 'feast' as const,
    },
    {
      name: 'ዕርገት',
      geezName: 'ዕርገተ ክርስቶስ',
      month: erget.month,
      day: erget.day,
      description: 'ጌታችን ከትንሣኤ በኋላ በ፵ኛው ቀን ወደ ሰማያት ያረገበት በዓል (ሐሙስ)',
      type: 'feast' as const,
    },
    {
      name: 'ጰራቅሊጦስ',
      geezName: 'ጰራቅሊጦስ',
      month: peraklitos.month,
      day: peraklitos.day,
      description: 'መንፈስ ቅዱስ በሐዋርያት ላይ የወረደበት የ፶ኛው ቀን በዓል (እሑድ)',
      type: 'feast' as const,
    },
    {
      name: 'ጾመ ሐዋርያት (የሰኔ ጾም)',
      geezName: 'ጾመ ሐዋርያት',
      month: tsomeHawaryat.month,
      day: tsomeHawaryat.day,
      description: 'ከጰራቅሊጦስ ማግስት ሰኞ የሚገባ የሐዋርያት ጾም እስከ ሐምሌ ፭ (የጴጥሮስና ጳውሎስ ዕረፍት)',
      type: 'fast' as const,
    },
    {
      name: 'ጾመ ድህነት',
      geezName: 'ጾመ ድህነት',
      month: tsomeDihnet.month,
      day: tsomeDihnet.day,
      description: 'ከጰራቅሊጦስ በኋላ የሚጀመረው መደበኛ የረቡዕና ዓርብ የድህነት ጾም መመለሻ',
      type: 'fast' as const,
    },
  ];

  return {
    year: ameteMihret,
    ameteAlem,
    wenber,
    abekti,
    metqi,
    meteneRabit,
    evangelist,
    meskeremOneDay,
    neneweMonth,
    neneweDay,
    feasts,
  };
}

/**
 * Returns detailed historical background of Abushakir and Bahire Hasab
 */
export const ABUSHAKIR_TUTORIAL = {
  title: 'ስለ አቡሻህር (ባሕረ ሐሳብ) ጥንታዊ የዘመን ቀመር',
  author: 'አቡሻኪር (ኢብን አር-ራሂብ) እና የኢትዮጵያ ሊቃውንት',
  principles: [
    {
      title: '፩. ዓመተ ዓለም (ፍጥረተ ዓለም)',
      text: 'ከፍጥረተ ዓለም እስከ ልደተ ክርስቶስ ፭፲፭፻ (5500) ዘመናት ተቆጥረዋል። ስለዚህ ዓመተ ዓለምን ለማግኘት በዓመተ ምሕረቱ ላይ 5500 ይደመራል። (ምሳሌ፡ 2017 + 5500 = 7517 ዓመተ ዓለም)።',
    },
    {
      title: '፪. ወንጌላውያን (የአራት ዓመት ዑደት)',
      text: 'ዓመታቱ በ፬ቱ ወንጌላውያን (ማቴዎስ፣ ማርቆስ፣ ሉቃስ፣ ዮሐንስ) ተከፋፍለው ይሽከረከራሉ። ዓመተ ዓለምን ለ፬ በማካፈል ቀሪው ፩ ከሆነ ማቴዎስ፣ ፪ ከሆነ ማርቆስ፣ ፫ ከሆነ ሉቃስ፣ ዜሮ ከሆነ ዮሐንስ (ዘመነ ዮሐንስ የጳጉሜን ፮ ቀናት የሚኖራት ዘመን) ይሆናል።',
    },
    {
      title: '፫. ወንበር፣ አበቅቴ እና መጥቅዕ (የጨረቃ ዑደት)',
      text: 'ጨረቃ በየ ፲፱ (19) ዓመቱ ዑደቷን ታድሳለች (Metonic cycle)። ይህ "ዐውደ ቀመር" ይባላል። ወንበር = (ዓመተ ዓለም % 19) - 1። አበቅቴ (የጨረቃ ትርፍ ቀናት) = (ወንበር × 11) % 30 ሲሆን፣ መጥቅዕ = (ወንበር × 19) % 30 ነው። ሁልጊዜም አበቅቴ + መጥቅዕ = 30 ይሆናል።',
    },
    {
      title: '፬. መጠነ ራብዒት እና ዕለተ ዮሐንስ',
      text: 'መጠነ ራብዒት ማለት ዓመተ ዓለም በየአራት ዓመቱ አንዲት ቀን ስለምትጨምር (Leap year adjustment) ዓመተ ዓለምን ለ፬ በማካፈል የሚገኝ ድርሻ ነው። (ዓመተ ዓለም + መጠነ ራብዒት) ለ፯ ሲካፈል ቀሪው የአዲስ ዓመት (መስከረም ፩) የሚውልበትን ዕለት ይወስናል።',
    },
    {
      title: '፭. የ፬ቱ ወቅቶች ክፍፍል (አዕዋዳት)',
      text: 'መፀው (ከመስከረም ፳፮ እስከ ታኅሣሥ ፳፭)፣ በጋ (ከታኅሣሥ ፳፮ እስከ መጋቢት ፳፭)፣ ጸደይ (ከመጋቢት ፳፮ እስከ ሰኔ ፳፭)፣ ክረምት (ከሰኔ ፳፮ እስከ መስከረም ፳፭)። እያንዳንዱ ወቅት ፺፩ (91) ቀናትና ፫ ሰዓት አለው።',
    },
  ],
};
