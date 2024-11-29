import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowLeft, Gamepad2, Trophy } from 'lucide-react';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

interface Props {
  onBack: () => void;
}

export function GameCenter({ onBack }: Props) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <motion.div className="min-h-screen bg-gray-50 pt-20">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <Button onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <div className="grid gap-4">
        <Trophy className="h-8 w-8 text-yellow-500" onClick={handleCelebrate} />
        <Gamepad2 className="h-8 w-8 text-blue-500" />
      </div>
    </motion.div>
  );
}