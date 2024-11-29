import { useState } from 'react';
import { Story } from '@/types/reading';
import { Button } from '@/components/ui/button';
import { readingContent as stories } from '@/data/reading-content';

export default function ReadingPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
  return (
    <div>
      {selectedStory ? (
        // Show story content when selected
        <div>
          <h2>{selectedStory.title}</h2>
          {/* Add story reading interface */}
        </div>
      ) : (
        // Show story selection
        stories.map((story: Story) => (
          <div key={story.id}>
            <h3>{story.title}</h3>
            <span className="font-semibold text-brand-600">+{story.xpReward} XP</span>
            <Button className="w-full" onClick={() => setSelectedStory(story)}>
              Start Reading
            </Button>
          </div>
        ))
      )}
    </div>
  );
}