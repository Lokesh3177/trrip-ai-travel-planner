import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaPlane, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import axios from "axios";

function ShareView() {
  const { shareId } = useParams();
  const [itData, setItData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSharedItinerary = async () => {
      try {
        // Points directly to your public backend share route without an auth header
        const response = await axios.get(`http://localhost:5000/api/share/${shareId}`);
        if (response.data && response.data.data && response.data.data.itinerary) {
          setItData(response.data.data.itinerary);
        } else if (response.data && response.data.itinerary) {
          setItData(response.data.itinerary);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Shared ledger retrieval failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (shareId) fetchSharedItinerary();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Navbar />
        <div className="flex justify-center items-center py-32">
          <div className="h-10 w-10 rounded-xl border-4 border-[#1A2B5F] border-t-[#B8961E] animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !itData) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <FaExclamationTriangle className="text-[#B8961E] text-3xl mx-auto mb-4" />
            <h3 className="text-sm font-black text-[#1A2B5F] uppercase tracking-wider">Link Expired or Invalid</h3>
            <p className="text-xs text-gray-400 mt-1">
              This travel document hash manifest could not be retrieved from the central database node.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const flight = (itData.flights && itData.flights.length > 0) ? itData.flights[0] : {};
  const passengerName = flight.passengerName || flight.passenger || "Not detected in source";
  const airlineName   = flight.airline || flight.carrier || "—";
  const flightCode    = flight.flightNumber || flight.flight || "—";
  const departLoc     = flight.from || flight.departure || "—";
  const arrivalLoc    = flight.to || flight.destination || "—";
  const seatAlloc     = flight.seat || "—";
  const gateLoc       = flight.gate || "—";

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#333A4A] font-sans antialiased">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-10 shadow-sm space-y-8">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-[9px] font-mono font-black uppercase tracking-widest bg-[#B8961E]/10 text-[#B8961E] px-2.5 py-1 rounded-md">
              Shared Travel Manifest
            </span>
            <h1 className="text-xl font-black text-[#1A2B5F] uppercase tracking-tight mt-3 leading-snug">
              {itData.tripSummary || "Unassigned Document Extraction"}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F5F7FA] border border-gray-100 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-[#1A2B5F] flex items-center justify-center shadow-xs">
                <FaCalendarAlt size={14} />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 block font-bold">Travel Date</span>
                <span className="text-xs font-bold text-[#333A4A] mt-0.5 block">{itData.travelDates || "Not specified"}</span>
              </div>
            </div>
            <div className="bg-[#F5F7FA] border border-gray-100 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-[#B8961E] flex items-center justify-center shadow-xs">
                <FaUser size={14} />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 block font-bold">Passenger Manifest</span>
                <span className="text-xs font-bold text-[#333A4A] mt-0.5 block">{passengerName}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#1A2B5F] font-mono flex items-center gap-2">
              <FaPlane className="text-[#B8961E] text-xs" /> Flight Core Details
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 p-5 bg-[#F5F7FA]/40">
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">Operator Airline</span>
                  <span className="text-xs font-black text-[#333A4A] mt-0.5 block">{airlineName}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">Flight Core Code</span>
                  <span className="text-xs font-mono font-bold text-[#1A2B5F] mt-0.5 block">{flightCode}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">Departing Location</span>
                  <span className="text-xs font-bold text-[#333A4A] mt-0.5 block">{departLoc}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">Destination Node</span>
                  <span className="text-xs font-bold text-[#333A4A] mt-0.5 block">{arrivalLoc}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">Seat Allocation</span>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border text-[#B8961E] mt-0.5 inline-block">{seatAlloc}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">Gate Vector Location</span>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border text-[#333A4A] mt-0.5 inline-block">{gateLoc}</span>
                </div>
              </div>
            </div>
          </div>

          {itData.importantNotes && itData.importantNotes.length > 0 && (
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#1A2B5F] font-mono flex items-center gap-2">
                <FaInfoCircle className="text-[#1A2B5F]" /> Processing Rule Manifest
              </h4>
              <ul className="space-y-2 bg-[#F5F7FA]/60 border border-dashed border-gray-200 rounded-xl p-5">
                {itData.importantNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed">
                    <span className="text-[#B8961E] font-black mt-0.5 font-mono">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShareView;