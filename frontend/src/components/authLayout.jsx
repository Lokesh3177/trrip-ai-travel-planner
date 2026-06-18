import { FaPlaneDeparture } from "react-icons/fa";

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* ================= LEFT PANEL ================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#1A2B5F] via-[#223C7D] to-[#2E5DB8]">

        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-16 text-center text-white">

          <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-2xl mb-8">
            <FaPlaneDeparture className="text-5xl text-[#F6C453]" />
          </div>

          <h1 className="text-5xl font-black">
            TRRIP AI
          </h1>

          <p className="mt-4 max-w-md text-xl text-blue-100">
            Your intelligent AI travel planner that helps
            organize trips effortlessly.
          </p>

        </div>

      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="flex-1 overflow-y-auto">

        <div className="min-h-screen flex items-center justify-center px-5 py-10">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1A2B5F] shadow-xl">

                <FaPlaneDeparture className="text-4xl text-[#F6C453]" />

              </div>

              <h1 className="mt-5 text-3xl font-black text-[#1A2B5F]">
                TRRIP AI
              </h1>

              <p className="mt-2 text-gray-500">
                Plan smarter journeys with AI
              </p>

            </div>

            {/* Card */}
            <div className="rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8">

              {children}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}