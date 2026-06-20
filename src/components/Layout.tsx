import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Mobile/tablet top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#111111]/95 backdrop-blur border-b border-dark-700">
        <span className="text-white font-bold text-lg">Ashish Alva</span>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-dark-800 border border-dark-700 text-gray-300 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Overlay for mobile/tablet drawer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar wrapper: slide-in drawer on mobile, pinned/fixed on desktop */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] sm:w-[300px]
                   transition-transform duration-300 ease-in-out
                   ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                   lg:translate-x-0 lg:top-5 lg:left-5 lg:bottom-5 lg:w-64 lg:z-30`}
      >
        {/* Close button for mobile/tablet drawer */}
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
          className="lg:hidden absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-dark-900 border border-dark-700 text-gray-300 hover:text-white"
        >
          <X size={18} />
        </button>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content: reserves space for the fixed sidebar on desktop via padding, not a hardcoded margin */}
      <main className="w-full min-w-0 p-4 sm:p-6 mt-14 lg:mt-0 lg:pl-[calc(16rem+2.5rem+1.5rem)]">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;