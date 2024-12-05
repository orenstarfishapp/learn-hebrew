import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Rotate, Volume2 } from 'lucide-react';

interface VocabularyPracticeProps {
  onBack: () => void;
}

interface Flashcard {
  hebrew: string;
  english: string;
  pronunciation: string;
  example: string;
}

const sampleFlashcards: Flashcard[] = [
  {
    hebrew: 'שלום',
    english: 'Hello / Peace',
    pronunciation: 'Shalom',
    example: 'שלום, מה שלומך?'
  },
  {
    hebrew: 'תודה',
    english: 'Thank you',
    pronunciation: 'Toda',
    example: 'תודה רבה!'
  },
  {
    hebrew: 'בבקשה',
    english: 'Please / You\'re welcome',
    pronunciation: 'Bevakasha',
    example: 'בבקשה, קח את זה.'
  },
  // Add more flashcards here
];

export function VocabularyPractice({ onBack }: VocabularyPracticeProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<Set<number>>(new Set());

  const currentCard = sampleFlashcards[currentCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => 
      prev === sampleFlashcards.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => 
      prev === 0 ? sampleFlashcards.length - 1 : prev - 1
    );
  };

  const handleKnown = () => {
    setKnownWords((prev) => {
      const newSet = new Set(prev);
      newSet.add(currentCardIndex);
      return newSet;
    });
    handleNext();
  };

  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(currentCard.pronunciation);
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Practice
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Vocabulary Flashcards</h1>
          <p className="mt-4 text-xl text-gray-600">
            Master Hebrew vocabulary through interactive flashcards
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {knownWords.size} of {sampleFlashcards.length} words mastered
          </div>
        </div>

        <motion.div
          className="relative bg-white rounded-xl shadow-lg p-8 mb-8 min-h-[300px] cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`absolute inset-0 p-8 backface-hidden ${!isFlipped ? 'block' : 'hidden'}`}>
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">{currentCard.hebrew}</h2>
              <p className="text-xl text-gray-600">{currentCard.pronunciation}</p>
              <Button
                variant="ghost"
                size="icon"
                className="mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  playPronunciation();
                }}
              >
                <Volume2 className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className={`absolute inset-0 p-8 backface-hidden ${isFlipped ? 'block' : 'hidden'}`}>
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{currentCard.english}</h3>
              <p className="text-lg text-gray-600 mb-4">Example:</p>
              <p className="text-xl mb-2 text-gray-900">{currentCard.example}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <Rotate className="mr-2 h-4 w-4" />
              Flip Card
            </Button>
            <Button
              variant="default"
              onClick={handleKnown}
              className={knownWords.has(currentCardIndex) ? 'bg-green-600' : ''}
            >
              Mark as Known
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
