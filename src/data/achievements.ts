export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  xpReward: number;
}

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first lesson",
    category: "lessons",
    icon: "star",
    xpReward: 100
  },
  // Add more achievements as needed
]; 