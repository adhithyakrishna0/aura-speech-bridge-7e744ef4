
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-3 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          AuraSpeech Bridge © {new Date().getFullYear()} | Smart Glasses for Communication Assistance
        </p>
      </div>
    </footer>
  );
};

export default Footer;
