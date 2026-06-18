import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlane, FaPlus } from "react-icons/fa";
import { getItineraries } from "../services/itineraryService";
import Layout from "../components/Layout";

function MyTripsList() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await getItineraries();
      setTrips(res.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Layout><div className="min-h-screen flex items-center justify-center font-bold text-[#1A2B5F]">LOADING...</div></Layout>;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F5F7FA] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* PREMIUM HEADER */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-3xl font-black text-[#1A2B5F] uppercase tracking-tight">Travel Audit Log</h1>
              <p className="text-[#333A4A] mt-1 font-bold text-xs uppercase tracking-widest opacity-60">LoanPro Consultancy • Your Trusted Financial Partner</p>
            </div>
            <Link to="/upload" className="bg-[#1A2B5F] text-white px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#253d85] transition">
              <FaPlus /> New Ingest
            </Link>
          </div>

          {trips.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
              <h2 className="text-xl font-black text-[#1A2B5F] uppercase">No Records Found</h2>
              <p className="text-gray-400 mt-2 font-bold text-xs uppercase tracking-widest">Initiate an upload to begin.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div key={trip._id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:border-[#B8961E]/30 transition group">
                  <div className="w-10 h-10 bg-[#F5F7FA] rounded-xl flex items-center justify-center mb-6 text-[#1A2B5F]">
                    <FaPlane size={14} />
                  </div>
                  <h2 className="text-sm font-black text-[#333A4A] truncate uppercase tracking-tight">{trip.title || "Untitled Trip"}</h2>
                  <p className="text-[11px] text-gray-400 mt-2 font-bold line-clamp-2 leading-relaxed">{trip.itinerary?.tripSummary || "No summary available"}</p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{new Date(trip.createdAt).toLocaleDateString()}</span>
                    <Link to={`/my-trip/${trip._id}`} className="text-[#B8961E] font-black text-[9px] uppercase tracking-widest hover:underline">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyTripsList;