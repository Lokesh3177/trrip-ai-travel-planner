import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TripCard from "../components/TripCard";
import ActionModal from "../components/ActionModal";
import { getItineraries, deleteItinerary } from "../services/itineraryService";
import toast from "react-hot-toast";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: '', trip: null });
  const navigate = useNavigate();

  useEffect(() => { fetchTrips(); }, []);
  
  const fetchTrips = async () => { 
    const res = await getItineraries(); 
    const rawData = res.data.data || [];
    // Filters out malformed elements or empty nodes instantly
    setTrips(rawData.filter(item => item && item._id)); 
  };

  const handleShare = (trip) => {
  console.log("Trip Object:", trip);
  console.log("Mongo ID:", trip._id);
  console.log("Share ID:", trip.shareId);

  if (!trip.shareId) {
    alert("shareId is missing!");
    return;
  }

  const shareUrl = `${window.location.origin}/share/${trip.shareId}`;

  navigator.clipboard.writeText(shareUrl);

toast.success(" Link copied successfully!");
};

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-[#1A2B5F] text-white p-8 rounded-3xl">
            <h1 className="text-3xl font-black mb-4">Smart AI Itinerary Engine</h1>
            <p className="text-sm opacity-80 mb-8 max-w-md">
              Automate document intelligence. Convert flat travel metadata (vouchers, booking PDFs, and confirmations) into structured executive schedules via Google Gemini processing layers.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate("/upload")} 
                className="bg-[#B8961E] px-6 py-3 rounded-xl text-xs font-black uppercase hover:bg-[#a3841a] transition"
              >
                + Ingest Document Source
              </button>
              <button 
                onClick={() => navigate("/my-trips")} 
                className="border border-white/20 px-6 py-3 rounded-xl text-xs font-black uppercase hover:bg-white/10 transition"
              >
                Ledger Workspace
              </button>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="flex flex-col gap-4">
            {[
              { label: "ACTIVE RECORDS", count: trips.length },
              { label: "SHARED ENDPOINTS", count: "3" },
              { label: "INGESTED VECTORS", count: "3" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
                <span className="text-[10px] font-black text-gray-400">{stat.label}</span>
                <span className="text-xl font-black text-[#1A2B5F]">{stat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TRAVEL LEDGERS HEADER */}
        <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-xl font-black text-[#1A2B5F] uppercase">Recent Travel Ledgers</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Real-time extracted document logs indexed sequentially</p>
          </div>
        </div>
        
        {/* RESPONSIVE LAYOUT GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <TripCard 
                key={trip._id} 
                trip={trip} 
                onView={() => navigate(`/my-trip/${trip._id}`)} // Fixed route pointing to /my-trip/:id
                onShare={() => handleShare(trip)}
                onDelete={() => setModal({ isOpen: true, type: 'delete', trip })}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase text-[10px]">No ledgers found.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* ACTION CONFIRMATION MODAL */}
      <ActionModal 
        isOpen={modal.isOpen} 
        type={modal.type} 
        tripName={modal.trip?.itinerary?.tripSummary} 
        onClose={() => setModal({ ...modal, isOpen: false })} 
        onConfirm={async () => { 
          await deleteItinerary(modal.trip._id); 
          fetchTrips(); 
          setModal({ ...modal, isOpen: false }); 
        }} 
      />
    </Layout>
  );
}

export default Dashboard;