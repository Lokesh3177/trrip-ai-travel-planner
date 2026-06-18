import React from 'react';
import { FaTimes, FaExclamationTriangle, FaShareAlt } from 'react-icons/fa';

const ActionModal = ({ isOpen, type, onClose, onConfirm, tripName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1A2B5F]/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#F5F7FA] p-4 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-[10px] font-black text-[#1A2B5F] uppercase tracking-widest">
            {type === 'delete' ? 'Confirm Deletion' : 'Share Itinerary'}
          </h3>
          <button onClick={onClose}><FaTimes className="text-gray-400" /></button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {type === 'delete' ? (
            <FaExclamationTriangle className="mx-auto text-[#B8961E] mb-4" size={30} />
          ) : (
            <FaShareAlt className="mx-auto text-[#1A2B5F] mb-4" size={30} />
          )}
          <p className="text-[11px] font-bold text-[#333A4A] mb-6">
            {type === 'delete' 
              ? `Are you sure you want to permanently delete "${tripName}"? This action cannot be undone.`
              : `Generate a secure shareable link for: "${tripName}"`}
          </p>

          <button 
            onClick={onConfirm}
            className={`w-full py-3 rounded-lg text-[10px] font-black uppercase transition-colors ${
              type === 'delete' ? 'bg-red-600 text-white' : 'bg-[#B8961E] text-white'
            }`}
          >
            {type === 'delete' ? 'Delete Permanently' : 'Generate Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;