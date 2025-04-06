
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import BrainwaveIndicator from './BrainwaveIndicator';

interface GlassesDisplayProps {
  text: string;
  mode: string;
}

const GlassesDisplay = ({ text, mode }: GlassesDisplayProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (text !== displayText) {
      setIsTyping(true);
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.substring(0, i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [text, displayText]);

  return (
    <div className="glasses-display rounded-lg p-6 relative overflow-hidden border border-opacity-20 border-white shadow-lg max-w-2xl mx-auto aspect-[16/9]">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10 text-primary text-opacity-80">
          <div className="text-xs font-medium">
            Mode: {mode}
          </div>
          <div className="flex items-center text-xs">
            <Clock size={14} className="mr-1" />
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <BrainwaveIndicator active={isTyping} />
          
          <div className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
            <p className={`text-lg font-medium ${isTyping ? 'typing-indicator' : ''}`}>
              {displayText}
            </p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between text-xs text-primary text-opacity-60">
          <span>Battery: 86%</span>
          <span>Connection: Strong</span>
          <span>Memory: 42%</span>
        </div>
      </div>
    </div>
  );
};

export default GlassesDisplay;
