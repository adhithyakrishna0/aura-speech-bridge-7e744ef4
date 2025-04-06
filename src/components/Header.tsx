
import React from 'react';
import { Brain, Glasses, MessageSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Glasses size={24} />
          <span className="text-lg font-bold">AuraSpeech Bridge</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Brain size={18} />
            <span className="text-sm">EEG Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare size={18} />
            <span className="text-sm">AI Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
