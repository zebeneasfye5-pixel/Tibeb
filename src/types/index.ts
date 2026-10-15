export type TabType = 'sirak' | 'henok' | 'abushakir' | 'awdenegest' | 'tibebat' | 'monetization' | 'about';

export interface AncientHerb {
  id: string;
  name: string;
  geezName: string;
  scientificName?: string;
  category: 'ግርማ ሞገስ' | 'ፈውስና ጤና' | 'ጥበቃና ዕቀባ' | 'አእምሮና ጥበብ' | 'በረከት';
  description: string;
  benefits: string[];
  harvestTiming: string;
  preparation: string;
  usageMethod: string;
  precautions: string;
}

export interface AncientAsmat {
  id: string;
  title: string;
  geezTitle: string;
  category: 'ዕቀባና ጥበቃ' | 'ግርማ ሞገስ' | 'መስተፋቅርና ሰላም' | 'ፈውስና ድኅነት' | 'የጥበብ ማስጠንቀቂያ';
  type: 'protective' | 'majesty' | 'harmony' | 'healing' | 'warning';
  purpose: string;
  sacredWords: string;
  traditionalContext: string;
  instructions: string;
  ethicalNotice: string;
}

export interface HenokChapter {
  chapter: number;
  section: string;
  sectionTitle: string;
  title: string;
  summary: string;
  verses: string[];
}

export interface SirakChapter {
  chapter: number;
  title: string;
  category: string;
  summary: string;
  verses: string[];
}

export interface BahireHasabResult {
  year: number;
  ameteAlem: number;
  wenber: number;
  abekti: number;
  metqi: number;
  meteneRabit: number;
  evangelist: string;
  meskeremOneDay: string;
  neneweMonth: string;
  neneweDay: number;
  feasts: {
    name: string;
    geezName: string;
    month: string;
    day: number;
    description: string;
    type: 'fast' | 'feast';
  }[];
}

export interface BurjiInfo {
  id: number;
  name: string;
  geezName: string;
  latinName: string;
  element: 'እሳት' | 'መሬት' | 'ነፋስ' | 'ማይ';
  elementDesc: string;
  planet: string;
  planetDesc: string;
  character: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  health: string;
  favorableDays: string[];
  favorableColors: string[];
  marriageCompatibility: {
    compatible: string[];
    moderate: string[];
    challenging: string[];
    advice: string;
  };
  symbol: string;
}

export interface AwdeNegestCalcResult {
  personName: string;
  motherName: string;
  personScore: number;
  motherScore: number;
  totalScore: number;
  letterBreakdown: { letter: string; value: number }[];
  burjiNumber: number;
  burji: BurjiInfo;
}

export interface CompatibilityResult {
  p1Name: string;
  p1Mother: string;
  p1Burji: BurjiInfo;
  p2Name: string;
  p2Mother: string;
  p2Burji: BurjiInfo;
  score: number;
  status: 'እጅግ ምርጥ ጥምረት' | 'መልካም ጥምረት' | 'መካከለኛ ጥምረት' | 'ጥንቃቄ የሚሻ ጥምረት';
  elementMatch: string;
  detailedAnalysis: string;
  recommendations: string[];
}
