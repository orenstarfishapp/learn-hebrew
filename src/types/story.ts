export interface Story {
  id?: string;
  title: string;
  content: string;
  translation?: string;
  vocabulary?: string[];
  difficulty?: string;
  level?: string;
  estimatedTime?: number;
  points?: number;
  bonusChallenge?: boolean;
  category?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  total: number;
}

export type Answer = {
  text: string;
  correct: boolean;
};
