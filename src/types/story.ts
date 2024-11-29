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
}

export type Answer = {
  text: string;
  correct: boolean;
};
