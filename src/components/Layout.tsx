import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Module } from '../types/module';

interface LayoutProps {
  modules: Module[];
}

const Layout: React.FC<LayoutProps> = ({ modules }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar modules={modules} />
      
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
  );
};

export default Layout;