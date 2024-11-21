export interface Question {
  id: string;
  type: 'multiple-choice' | 'text-input';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface HebrewLetter {
  letter: string;
  name: string;
  pronunciation: string;
  soundUrl?: string;
  examples: {
    word: string;
    translation: string;
    transliteration: string;
  }[];
}

export interface Story {
  id: string;
  title: string;
  content: string;
  translation: string;
  vocabulary: {
    word: string;
    translation: string;
    transliteration: string;
  }[];
  questions: Question[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}