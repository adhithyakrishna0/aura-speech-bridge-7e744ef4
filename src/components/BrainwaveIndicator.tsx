
import React from 'react';
import { Brain } from 'lucide-react';

interface BrainwaveIndicatorProps {
  active: boolean;
}

const BrainwaveIndicator = ({ active }: BrainwaveIndicatorProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Brain size={24} className={`text-secondary ${active ? 'animate-pulse' : 'text-opacity-50'}`} />
      <div className="w-10 flex space-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className={`w-1 h-8 bg-secondary rounded-full ${active ? 'brainwave-animation' : 'opacity-30'}`} 
            style={{ 
              animationDelay: `${i * 0.1}s`,
              height: `${active ? 12 + i * 3 : 8}px`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BrainwaveIndicator;
