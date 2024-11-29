export interface Question {
  id: string;
  type: 'multiple-choice' | 'text-input';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface HebrewLetter {
  id?: string;
  letter: string;
  name: string;
  pronunciation: string;
  examples: Array<{
    word: string;
    translation: string;
    transliteration: string;
  }>;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  transliteration: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  translation: string;
  vocabulary: VocabularyItem[];
  questions: Question[];
  difficulty: string;
}