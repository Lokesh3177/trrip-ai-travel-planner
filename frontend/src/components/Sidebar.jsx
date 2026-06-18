import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaPlane } from 'react-icons/fa';

const Sidebar = () => (
  <aside className="w-64 bg-[#1A2B5F] h-screen p-8 text-white fixed hidden md:block">
    <h2 className="text-xl font-black text-[#B8961E] mb-12 uppercase tracking-tighter">Trip AI</h2>
    <nav className="space-y-6">
      {[ 
         { to: "/dashboard", icon: FaHome, label: "Dashboard" },
         { to: "/upload", icon: FaPlus, label: "New Ingestion" }
      ].map(item => (
        <NavLink 
          key={item.to} 
          to={item.to} 
          className={({isActive}) => `flex items-center gap-4 text-sm font-bold transition ${isActive ? "text-[#B8961E] opacity-100" : "opacity-70 hover:opacity-100"}`}
        >
          <item.icon /> {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;