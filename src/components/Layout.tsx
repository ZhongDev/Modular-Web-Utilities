import React, { Suspense, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import MobileBackdrop from './MobileBackdrop';
import { Module } from '../types/module';

interface LayoutProps {
  modules: Module[];
}

const Layout: React.FC<LayoutProps> = ({ modules }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mobile detection and initial state setup
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, default to collapsed (hidden)
      if (mobile) {
        setIsCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      {/* Mobile Navbar - only visible on mobile */}
      <MobileNavbar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      
      {/* Mobile Backdrop - only visible on mobile when sidebar is open */}
      <MobileBackdrop 
        isVisible={isMobile && !isCollapsed} 
        onClose={() => setIsCollapsed(true)} 
      />
      
      <div className={`flex ${isMobile ? 'h-full pt-16' : 'h-full md:h-screen'}`}>
        <Sidebar 
          modules={modules} 
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            }>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;