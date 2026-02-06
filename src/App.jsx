import React, { useState } from 'react';
import ProfileCard from './components/ProfileCard';

function App() {
  const [username, setUsername] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!username) return;
    setLoading(true);
    setUserData(null); 
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (data.message === "Not Found") {
        setError("User not found! Please check the username.");
      } else {
        setUserData(data);
      }
    } catch (error) {
      setError("Something went wrong. Check your internet connection.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUsername("");
    setUserData(null);
    setError(null);
  };

  // --- THE NEW UI STARTS HERE ---
  return (
    // 1. BACKGROUND: Changed to a sleek Dark Blue Gradient
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col text-white font-sans">
      
      {/* 2. NAVBAR: Title Centered, No Extra Links */}
      <nav className="p-5 bg-slate-900/50 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-wide">
            GitHub Finder
          </h1>
        </div>
      </nav>

      {/* 3. MAIN CONTENT: Centered and spacious */}
      <main className="flex-grow flex flex-col items-center justify-start pt-10 px-4">
        
        <div className="w-full max-w-md">
          {/* Search Box Card */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-center">Search for a User</h2>
            
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Enter GitHub username..." 
                className="w-full p-4 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />

              <div className="flex gap-2">
                <button 
                  onClick={handleSearch}
                  disabled={loading} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? "Searching..." : "Search"}
                </button>

                {userData && (
                  <button 
                    onClick={handleClear}
                    className="bg-slate-700 text-gray-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition border border-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
              <div className="mt-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-200 rounded-r-lg">
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
              </div>
          )}

          {/* Loading Indicator */}
          {loading && (
             <div className="flex justify-center mt-8">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
             </div>
          )}
        </div>

        {/* Profile Card (It will pop nicely against the dark background) */}
        {userData && !loading && !error && (
          <div className="w-full max-w-md mt-6 animate-fade-in-up">
            <ProfileCard data={userData} />
          </div>
        )}

      </main>

      {/* 4. FOOTER: The "Copyright" signature */}
      <footer className="p-6 text-center text-gray-500 text-sm border-t border-slate-700/50 mt-10">
        <p>Built with React & Tailwind CSS • Day 5 Final</p>
      </footer>

    </div>
  );
}

export default App;