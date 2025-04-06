
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  hideHeaderFooter?: boolean; // New prop to toggle header/footer visibility
}

const Layout = ({ children, hideHeaderFooter = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      {!hideHeaderFooter && <Header />}
      <main className={`flex-1 container mx-auto px-4 py-8 ${hideHeaderFooter ? 'pt-0' : ''}`}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
