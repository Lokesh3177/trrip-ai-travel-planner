import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaPlane,
  FaCalendarAlt,
  FaUser,
  FaTicketAlt,
  FaBed,
  FaArrowLeft,
  FaClipboardList,
} from "react-icons/fa";

import { getItineraryById } from "../services/itineraryService";

const MyTrip = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await getItineraryById(id);
        setTrip(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="text-xs font-black text-[#1A2B5F] uppercase tracking-widest animate-pulse">
          Loading Ledger Details...
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <p className="text-xs font-black text-red-600 uppercase tracking-widest">
            Audit Record Not Found
          </p>
          <Link
            to="/dashboard"
            className="inline-block mt-4 text-[10px] font-black uppercase bg-[#1A2B5F] text-white px-4 py-2 rounded-lg tracking-wider"
          >
            Return to Log
          </Link>
        </div>
      </div>
    );
  }

  const itinerary = trip.itinerary || {};
  const flight = itinerary.flights?.[0] || {};
  const hotel = itinerary.hotels?.[0] || {};

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* BACK NAVIGATION */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1A2B5F] mb-8 hover:opacity-70 transition-all"
        >
          <FaArrowLeft size={10} /> Back to Audit Log
        </Link>

        {/* LEDGER OVERVIEW CONTAINER */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B8961E]"></div>
          <span className="text-[9px] font-black text-[#B8961E] uppercase tracking-widest block mb-2">
            Trip With AI  Document Ingest
          </span>
          <h1 className="text-2xl font-black text-[#333A4A] uppercase tracking-tight">
            {trip.title || "Untitled Document"}
          </h1>
          {itinerary.tripSummary && (
            <p className="text-xs text-gray-400 font-bold mt-2 leading-relaxed max-w-3xl">
              {itinerary.tripSummary}
            </p>
          )}
        </div>

        {/* HIGH-LEVEL HIGHLIGHT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: <FaCalendarAlt size={14} />,
              label: "Travel Date",
              value: itinerary.travelDates || flight.departureDate,
              bg: "bg-[#1A2B5F]/5",
              textColor: "text-[#1A2B5F]",
            },
            {
              icon: <FaUser size={14} />,
              label: "Passenger Manifest",
              value: flight.passenger,
              bg: "bg-[#B8961E]/5",
              textColor: "text-[#B8961E]",
            },
            {
              icon: <FaTicketAlt size={14} />,
              label: "Assigned Asset / Flight",
              value: flight.flightNumber,
              bg: "bg-emerald-50",
              textColor: "text-emerald-700",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 p-5 rounded-2xl flex items-start gap-4 shadow-sm"
            >
              <div
                className={`w-9 h-9 ${card.bg} ${card.textColor} rounded-xl flex items-center justify-center shrink-0`}
              >
                {card.icon}
              </div>
              <div className="truncate">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                  {card.label}
                </p>
                <p className="text-xs font-black text-[#333A4A] truncate uppercase tracking-tight">
                  {card.value || "Not Indexed"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DETAILS ACCORDION SECTIONS */}
        <div className="space-y-6">
          
          {/* FLIGHT SEGMENT DETAILS */}
          {(flight.airline || flight.departureCity) && (
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-6 border-b border-gray-50 pb-4">
                <FaPlane className="text-[#1A2B5F]" size={14} />
                <h2 className="text-xs font-black text-[#1A2B5F] uppercase tracking-widest">
                  Flight Segment Specification
                </h2>
              </div>

              {/* ROUTE PIPELINE VIEW */}
              <div className="mb-8 flex items-center justify-between bg-[#F5F7FA] px-8 py-6 rounded-2xl border border-gray-100">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Origin Station
                  </p>
                  <p className="text-lg font-black text-[#1A2B5F] uppercase tracking-tight">
                    {flight.departureAirport || flight.departureCity || "N/A"}
                  </p>
                </div>
                <div className="flex-1 px-8 flex items-center gap-2 text-[#B8961E]">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <FaPlane className="rotate-90 text-[#B8961E]" size={12} />
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Terminal Destination
                  </p>
                  <p className="text-lg font-black text-[#1A2B5F] uppercase tracking-tight">
                    {flight.arrivalAirport || flight.arrivalCity || "N/A"}
                  </p>
                </div>
              </div>

              {/* CORE FLIGHT METADATA METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { tag: "Carrier Agency", val: flight.airline },
                  { tag: "Seat Allocation", val: flight.seat },
                  { tag: "Departure Gate", val: flight.gate },
                  { tag: "Target Terminal", val: flight.terminal },
                  { tag: "Booking System Ref", val: flight.bookingReference },
                  { tag: "Operation Date", val: flight.departureDate },
                ].map((meta, mIdx) => (
                  <div key={mIdx} className="border border-gray-100 p-4 rounded-xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {meta.tag}
                    </p>
                    <p className="text-xs font-black text-[#333A4A] uppercase tracking-tight">
                      {meta.val || "—"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HOTEL SEGMENT DETAILS */}
          {hotel.hotelName && (
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-6 border-b border-gray-50 pb-4">
                <FaBed className="text-[#1A2B5F]" size={14} />
                <h2 className="text-xs font-black text-[#1A2B5F] uppercase tracking-widest">
                  Lodging Arrangement Specifications
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-[#F5F7FA] p-5 rounded-2xl border border-gray-100 flex flex-col justify-center">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Facility Name & Corporate Address
                  </p>
                  <p className="text-sm font-black text-[#1A2B5F] uppercase tracking-tight">
                    {hotel.hotelName}
                  </p>
                  <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
                    {hotel.address || hotel.city || "No address record available"}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Check-In Protocol
                    </p>
                    <p className="text-xs font-black text-emerald-700 uppercase tracking-tight">
                      {hotel.checkIn || "—"}
                    </p>
                  </div>
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Check-Out Protocol
                    </p>
                    <p className="text-xs font-black text-red-600 uppercase tracking-tight">
                      {hotel.checkOut || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTES SEGMENT */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5 border-b border-gray-50 pb-4">
              <FaClipboardList className="text-[#1A2B5F]" size={13} />
              <h2 className="text-xs font-black text-[#1A2B5F] uppercase tracking-widest">
                Compliance & Ingest Notes
              </h2>
            </div>

            {itinerary.importantNotes?.length ? (
              <ul className="space-y-2.5">
                {itinerary.importantNotes.map((note, index) => (
                  <li
                    key={index}
                    className="text-[11px] font-bold text-gray-500 bg-[#F5F7FA] px-4 py-2.5 rounded-xl border border-gray-100 flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-[#B8961E] font-black select-none">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                No supplementary policy exceptions noted during parsing.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyTrip;