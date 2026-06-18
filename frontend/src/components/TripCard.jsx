import React from 'react';
import { FaEye, FaShareAlt, FaTrash, FaPlane } from 'react-icons/fa';

const TripCard = ({ trip, onView, onShare, onDelete }) => {
  const flight = trip.itinerary?.flights?.[0];
  const hasFlatData = trip.itinerary?.departure && trip.itinerary?.arrival;

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-[#B8961E]/50 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Card Title */}
        <h3 className="text-xs font-black text-[#333A4A] uppercase tracking-widest mb-5 truncate">
          {trip.title || "Untitled Ledger"}
        </h3>
        
        {/* Data Container */}
        <div className="bg-[#F5F7FA] p-4 rounded-2xl border border-gray-100">
          {flight ? (
            <>
              <p className="font-black text-[#1A2B5F] text-sm flex items-center gap-2 mb-2">
                {flight.departureCity} <FaPlane size={10} className="text-[#B8961E]" /> {flight.arrivalCity}
              </p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {flight.airline} | FLT: {flight.flightNumber}
              </p>
            </>
          ) : hasFlatData ? (
            <>
              <p className="font-black text-[#1A2B5F] text-sm flex items-center gap-2 mb-2">
                {trip.itinerary.departure} <FaPlane size={10} className="text-[#B8961E]" /> {trip.itinerary.arrival}
              </p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {trip.itinerary.airline || "N/A"}
              </p>
            </>
          ) : (
            <p className="text-[10px] font-bold text-gray-400 uppercase italic">No manifest data indexed.</p>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        <button onClick={onView} className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider border border-gray-100 py-2.5 rounded-xl hover:bg-[#1A2B5F] hover:text-white transition-all">
          <FaEye size={10} /> View
        </button>
        <button onClick={onShare} className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider border border-gray-100 py-2.5 rounded-xl hover:bg-[#B8961E] hover:text-white transition-all">
          <FaShareAlt size={10} /> Share
        </button>
        <button onClick={onDelete} className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider border border-red-50 text-red-600 bg-red-50 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all">
          <FaTrash size={10} /> Del
        </button>
      </div>
    </div>
  );
};

export default TripCard;