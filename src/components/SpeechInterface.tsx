
import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SpeechInterfaceProps {
  onSpeechChange: (text: string) => void;
  activeMode: string;
}

const SpeechInterface = ({ onSpeechChange, activeMode }: SpeechInterfaceProps) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Simulated speech recognition
  const startListening = () => {
    setIsListening(true);
    // Simulate speech recognition
    const phrases = [
      "Hello, I'm trying to explain my project idea.",
      "Could you please help me find the right book?",
      "I need assistance with this assignment.",
      "I'd like to order a coffee please.",
      "Thank you for your help today."
    ];
    
    setTimeout(() => {
      const recognized = phrases[Math.floor(Math.random() * phrases.length)];
      setInputText(recognized);
      onSpeechChange(recognized);
      setIsListening(false);
    }, 3000);
  };

  // Simulated text-to-speech
  const speakText = () => {
    if (inputText.trim() === '') return;
    
    setIsSpeaking(true);
    
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    
    onSpeechChange(inputText);
  };

  // Generate mode-specific suggestions
  const getSuggestions = () => {
    switch(activeMode) {
      case 'study':
        return ["Could you explain this concept?", "When is the assignment due?", "I need more time, please."];
      case 'assist':
        return ["Could you help me with this?", "I'm looking for...", "Thank you for your assistance."];
      case 'speech':
        return ["Hello, my name is...", "I'd like to order...", "Could you please..."];
      case 'advanced':
        return ["[Thinking: Need Help]", "[Feeling: Anxious]", "[Want: Water]"];
      default:
        return [];
    }
  };

  return (
    <div className="bg-card shadow-sm border rounded-lg p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or speak your message..."
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            className={cn(isListening && "bg-red-100 text-red-500 animate-pulse")}
            onClick={startListening}
          >
            <Mic size={18} />
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            className={cn(isSpeaking && "bg-green-100 text-green-500 animate-pulse")}
            onClick={speakText}
          >
            <Volume2 size={18} />
          </Button>
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {getSuggestions().map((suggestion, index) => (
            <Button
              key={index}
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setInputText(suggestion);
                onSpeechChange(suggestion);
              }}
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SpeechInterface;
