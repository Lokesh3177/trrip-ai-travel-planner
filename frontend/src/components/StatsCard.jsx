import React from 'react';

const StatsCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm">
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</p>
      <h4 className="text-2xl font-black text-[#1A2B5F] mt-1">{value}</h4>
    </div>
    <div className="bg-[#B8961E]/10 p-3 rounded-xl text-[#B8961E]">
      <Icon size={20} />
      
    </div>
  </div>
);

export default StatsCard;