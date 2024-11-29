import { HebrewLetter } from '@/types/lesson';

interface AlphabetLessonProps {
  currentLetter: HebrewLetter;
}

export function AlphabetLesson({ currentLetter }: AlphabetLessonProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentLetter.name}</h2>
        <p className="text-gray-600">Pronunciation: {currentLetter.pronunciation}</p>
        
        <div className="my-8 flex justify-center items-center">
          <div className="text-9xl font-bold text-blue-600">{currentLetter.letter}</div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Examples:</h3>
          <div className="grid grid-cols-2 gap-4">
            {currentLetter.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded">
                <p className="text-lg font-bold">{example.word}</p>
                <p className="text-gray-600">{example.translation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}