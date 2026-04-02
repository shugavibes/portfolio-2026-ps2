export interface WorkEntry {
  id: string;
  label: string;
  company: string;
  color: string;
  role: string;
  dates: string;
  abbreviation: string;
  bullets: string[];
  backContent: string;
}

export interface IdeaEntry {
  id: string;
  title: string;
  description: string;
  url: string;
}

export type MiscIcon = '★' | '♦' | '●';

export interface MiscEntry {
  id: string;
  text: string;
  icon: MiscIcon;
}

export interface ConnectEntry {
  id: string;
  label: string;
  url: string;
}

export interface SiteContent {
  identity: {
    name: string;
    label: string;
  };
  work: WorkEntry[];
  ideas: IdeaEntry[];
  misc: MiscEntry[];
  connect: ConnectEntry[];
}

export type SectionId = 0 | 1 | 2 | 3;

export interface NavSection {
  id: SectionId;
  emoji: string;
  label: string;
}
