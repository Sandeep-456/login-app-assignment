import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "rememberedUsername";

/**
 * WelcomePage
 *
 * - Reads the logged-in username from localStorage.
 * - If no username is found (direct navigation without login), redirects to /.
 * - Logout clears the session state (but keeps the remembered username so it
 *   will be pre-filled on the next visit, per the "remember username" requirement).
 */
function WelcomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Not logged in — redirect to login
      navigate("/", { replace: true });
    } else {
      setUsername(saved);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Keep the remembered username so it is pre-filled on the next login
    navigate("/", { replace: true });
  };

  if (!username) return null; // brief flash guard

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans selection:bg-indigo-500/30">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:w-[280px] md:flex-col bg-[#0F172A] border-r border-slate-800/60 shadow-2xl z-20">
        <div className="flex flex-col flex-grow pt-6 overflow-y-auto">
          {/* Brand Logo */}
          <div className="flex items-center px-6 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-9H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-wide">NEXUS<span className="font-light text-slate-400">CORP</span></span>
          </div>
          
          {/* User Profile Mini */}
          <div className="px-4 mb-6">
            <div className="flex items-center px-4 py-3 bg-slate-800/50 hover:bg-slate-800/80 transition-colors rounded-2xl border border-slate-700/50 cursor-pointer group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold tracking-wider shadow-inner ring-2 ring-slate-800">
                  {username.substring(0, 2).toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-800 rounded-full"></div>
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-white truncate capitalize group-hover:text-indigo-200 transition-colors">{username}</p>
                <p className="text-xs font-medium text-slate-400 truncate">System Administrator</p>
              </div>
              <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mt-2 flex-1 flex flex-col px-3">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
            <nav className="flex-1 space-y-1">
              <a href="#" className="bg-indigo-600/10 text-indigo-400 group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl border border-indigo-500/20">
                <svg className="text-indigo-400 mr-3 flex-shrink-0 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Dashboard Overview
              </a>
              <a href="#" className="text-slate-300 hover:bg-slate-800/80 hover:text-white group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-colors">
                <svg className="text-slate-400 group-hover:text-indigo-300 mr-3 flex-shrink-0 h-5 w-5 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Team Directory
              </a>
              <a href="#" className="text-slate-300 hover:bg-slate-800/80 hover:text-white group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-colors">
                <svg className="text-slate-400 group-hover:text-indigo-300 mr-3 flex-shrink-0 h-5 w-5 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                System Settings
              </a>
            </nav>
          </div>
          
          {/* Logout Section */}
          <div className="p-4 border-t border-slate-800/60">
            <button
              onClick={handleLogout}
              className="w-full group flex items-center justify-center gap-2 bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 rounded-xl py-2.5 px-4 transition-all duration-200"
            >
              <svg className="h-4 w-4 text-slate-400 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Subtle grid background for the main area */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-overlay pointer-events-none" />
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden flex items-center justify-between bg-[#0F172A] px-4 py-4 shadow-md z-20">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-9H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-white text-lg font-bold">NEXUS<span className="font-light text-slate-400">CORP</span></span>
          </div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white p-2 bg-slate-800 rounded-lg border border-slate-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Top bar (Desktop) */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm z-10 hidden md:block border-b border-slate-200/80 sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">Overview</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium border border-slate-200">Production environment</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              {/* Search Icon */}
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              {/* Notifications */}
              <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              
              <div className="h-6 w-px bg-slate-200"></div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100/50">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-700 font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 relative z-0">
          <div className="max-w-6xl mx-auto animate-slide-up">
            
            {/* Welcome Banner */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 mb-8 mt-2 md:mt-0 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="sm:flex sm:items-center sm:justify-between relative z-10">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
                    Welcome back, <span className="capitalize bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{username}</span>
                  </h2>
                  <p className="mt-2 text-base text-slate-500 max-w-2xl">
                    Here's what is happening with your projects today. You have <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">3 pending approvals</span> requiring your attention.
                  </p>
                </div>
                <div className="mt-6 sm:mt-0 flex gap-3">
                  <button type="button" className="inline-flex items-center px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]">
                    View Reports
                  </button>
                  <button type="button" className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]">
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Action
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              {/* Stat 1 */}
              <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200/60 rounded-2xl flex flex-col">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 tracking-wide">Total Team Members</p>
                      <p className="mt-2 text-3xl font-bold text-slate-900">2,405</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl ring-1 ring-blue-100/50">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <svg className="h-4 w-4 text-emerald-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-emerald-600 font-medium">+12.5%</span>
                    <span className="text-slate-400 ml-2">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200/60 rounded-2xl flex flex-col">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 tracking-wide">System Uptime</p>
                      <p className="mt-2 text-3xl font-bold text-slate-900">99.99%</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl ring-1 ring-emerald-100/50">
                      <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Operational</span>
                    <span className="text-slate-400 ml-2">Across all microservices</span>
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200/60 rounded-2xl flex flex-col">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 tracking-wide">Pending Tasks</p>
                      <p className="mt-2 text-3xl font-bold text-slate-900">14</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl ring-1 ring-amber-100/50">
                      <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <svg className="h-4 w-4 text-rose-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <span className="text-rose-600 font-medium">3 High Priority</span>
                    <span className="text-slate-400 ml-2 border-l border-slate-300 pl-2">Due today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State / Content Area */}
            <div className="bg-white shadow-sm border border-slate-200/60 rounded-2xl h-[400px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-white to-slate-50/50">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5 shadow-inner">
                <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">No recent activity</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm">Get started by creating a new project, running a diagnostic report, or inviting team members.</p>
              <div className="mt-8 flex gap-3">
                <button type="button" className="inline-flex items-center px-5 py-2.5 border border-transparent shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]">
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Project
                </button>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default WelcomePage;
