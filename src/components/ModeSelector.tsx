
import React from 'react';
import { Book, MessageSquare, Mic, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModeSelectorProps {
  activeMode: string;
  onModeChange: (mode: string) => void;
}

const modes = [
  {
    id: 'study',
    name: 'Study Mode',
    icon: Book,
    description: 'For learning environments and study sessions',
    color: 'bg-blue-500'
  },
  {
    id: 'assist',
    name: 'Assist Mode',
    icon: MessageSquare,
    description: 'General assistance for everyday conversations',
    color: 'bg-green-500'
  },
  {
    id: 'speech',
    name: 'Speech Disability Mode',
    icon: Mic,
    description: 'Enhanced support for speech disabilities',
    color: 'bg-purple-500'
  },
  {
    id: 'advanced',
    name: 'Advanced Communication',
    icon: Brain,
    description: 'EEG-enhanced non-verbal communication',
    color: 'bg-orange-500'
  }
];

const ModeSelector = ({ activeMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {modes.map((mode) => {
        const isActive = activeMode === mode.id;
        const Icon = mode.icon;
        
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={cn(
              "mode-card flex flex-col items-center p-4 rounded-lg transition-all",
              isActive 
                ? "bg-secondary text-secondary-foreground border-2 border-secondary" 
                : "bg-background border border-border hover:border-secondary/50"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-3",
              isActive ? "bg-secondary-foreground" : "bg-muted"
            )}>
              <Icon 
                size={24} 
                className={isActive ? "text-secondary" : "text-muted-foreground"} 
              />
            </div>
            <h3 className="font-medium text-center">{mode.name}</h3>
            <p className={cn(
              "text-xs text-center mt-2",
              isActive ? "text-secondary-foreground/80" : "text-muted-foreground"
            )}>
              {mode.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default ModeSelector;
