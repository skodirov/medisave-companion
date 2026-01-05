import React from 'react';
import { BottomNav } from './BottomNav';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, hideNav = false }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <main className="flex-1 pb-24 overflow-y-auto hide-scrollbar">
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};
