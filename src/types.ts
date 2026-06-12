export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  tag?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date: string;
  category: 'casamento' | 'namoro' | 'familia' | 'viagem';
}

export interface LoveLetter {
  id: string;
  sender: string;
  recipient: string;
  title: string;
  content: string;
  date: string;
  theme: 'cream' | 'midnight' | 'blush' | 'vintage';
  stamp: 'heart' | 'rose' | 'wings' | 'stars';
}

export interface LoveCounter {
  startDate: string; // ISO date when they met
  weddingDate: string; // ISO date of wedding (6 years ago)
}

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  favoriteThings: string[];
  imageUrl: string;
}

export interface LoveReason {
  id: string;
  text: string;
  category: string;
}


