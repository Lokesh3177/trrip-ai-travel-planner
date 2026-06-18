import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaUserCircle, FaSignOutAlt, FaThLarge, FaCloudUploadAlt, FaSuitcase } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user") || "{}").name || "Traveler";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="bg-[#1A2B5F] p-2.5 rounded-xl text-[#B8961E]"><FaPlaneDeparture size={16} /></div>
          <h1 className="text-md font-black text-[#1A2B5F] uppercase">Trrip AI</h1>
        </Link>
        <div className="hidden md:flex items-center gap-8 h-full">
          {[
            { to: "/dashboard", icon: FaThLarge, label: "Dashboard" },
            { to: "/upload", icon: FaCloudUploadAlt, label: "Upload" },
            { to: "/my-trips", icon: FaSuitcase, label: "My Trips" }
          ].map((item) => (
            <Link key={item.to} to={item.to} className={`flex items-center gap-2 h-full px-1 text-xs font-black uppercase ${location.pathname === item.to ? "text-[#1A2B5F] border-b-2 border-[#B8961E]" : "text-gray-400"}`}>
              <item.icon /> {item.label}
            </Link>
          ))}
        </div>
        <button onClick={() => { localStorage.clear(); navigate("/"); }} className="text-xs font-black uppercase border border-gray-200 px-3 py-2 rounded-lg">Logout</button>
      </div>
    </nav>
  );
}
export default Navbar;