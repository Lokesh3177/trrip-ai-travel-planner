import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      {/* Ensure main has enough padding to be seen below the fixed navbar */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;