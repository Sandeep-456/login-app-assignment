import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:5000";
const STORAGE_KEY = "rememberedUsername";

/**
 * LoginPage
 *
 * - Reads a previously saved username from localStorage and pre-fills the field.
 * - On successful login (200), saves the username to localStorage and navigates
 *   to the /welcome page.
 * - On failed login (401 / other error), displays an error message with a shake
 *   animation.
 */
function LoginPage() {
  const navigate = useNavigate();

  // Pre-fill username from localStorage if it was saved previously
  const [username, setUsername] = useState(
    () => localStorage.getItem(STORAGE_KEY) || ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  // Show error with shake animation
  const showError = (msg) => {
    setError(msg);
    setShakeError(true);
    setTimeout(() => setShakeError(false), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      showError("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        username: username.trim(),
        password: password.trim(),
      });

      // ✅ Success — remember username and navigate to welcome page
      localStorage.setItem(STORAGE_KEY, data.username);
      navigate("/welcome");
    } catch (err) {
      if (err.response) {
        // Server responded with a non-2xx status
        showError(err.response.data?.message || "Login failed. Please try again.");
      } else {
        // Network or other error
        showError("Cannot connect to server. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Branding/Marketing (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden">
        {/* Dynamic mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-900 to-violet-800 opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        
        {/* Glowing orbs for depth */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse" />
        <div className="absolute bottom-12 -right-12 w-80 h-80 bg-violet-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse delay-700" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-16 h-full w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-9H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-wider">NEXUS<span className="font-light">CORP</span></span>
          </div>
          
          <div className="max-w-md animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Unlock your team's full potential.
            </h1>
            <p className="text-indigo-200 text-lg leading-relaxed mb-10">
              The all-in-one enterprise platform designed to streamline operations, manage resources, and scale your business effortlessly.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-indigo-900 shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="" />
                <img className="w-10 h-10 rounded-full border-2 border-indigo-900 shadow-sm" src="https://i.pravatar.cc/100?img=2" alt="" />
                <img className="w-10 h-10 rounded-full border-2 border-indigo-900 shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="" />
                <div className="w-10 h-10 rounded-full border-2 border-indigo-900 bg-white/10 backdrop-blur flex items-center justify-center text-xs text-white font-medium">+2k</div>
              </div>
              <div className="text-sm text-indigo-200">
                Trusted by industry leaders
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 bg-slate-50 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600 lg:hidden" />
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="square" strokeLinejoin="miter" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-9H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <span className="text-slate-900 text-2xl font-bold tracking-wider">NEXUS<span className="font-light text-slate-500">CORP</span></span>
        </div>

        <div className="w-full max-w-md mx-auto animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500 mb-8">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Error message */}
            {error && (
              <div
                className={`flex items-start gap-3 bg-red-50 border border-red-100 p-4 rounded-xl ${
                  shakeError ? "animate-shake" : ""
                }`}
                role="alert"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0V8.75a.75.75 0 0 0-1.5 0v4.5Zm.75-6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Authentication error</h3>
                  <p className="mt-0.5 text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
                Work Email or Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 bg-white ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 shadow-sm transition-all sm:text-sm sm:leading-6"
                placeholder="Enter your corporate ID"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 bg-white ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 shadow-sm transition-all sm:text-sm sm:leading-6"
                placeholder="••••••••"
              />
            </div>

            {/* Functionality Row */}
            <div className="flex items-center justify-between pt-2">
              {localStorage.getItem(STORAGE_KEY) ? (
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                    <svg className="h-1.5 w-1.5 fill-indigo-500" viewBox="0 0 6 6" aria-hidden="true"><circle cx={3} cy={3} r={3} /></svg>
                    Session remembered
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>
              )}

              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-xl bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  "Sign in to Dashboard"
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-slate-50 px-6 text-slate-400 text-xs uppercase tracking-wider">Demo Credentials</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-4 text-sm text-slate-600 font-mono bg-white py-3 border border-slate-200 rounded-xl shadow-sm">
            <span>U: <strong className="text-indigo-600 font-bold">admin</strong></span>
            <span className="text-slate-300">|</span>
            <span>P: <strong className="text-indigo-600 font-bold">admin</strong></span>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
