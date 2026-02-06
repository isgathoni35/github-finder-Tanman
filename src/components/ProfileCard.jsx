import React from 'react';

function ProfileCard({ data }) {
  // Helper to format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    // CARD CONTAINER: Dark background, lighter border, white text
    <div className="mt-8 p-6 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-blue-900/20">
      
      {/* Avatar with a dark border to blend in */}
      <div className="relative inline-block">
        <img 
          src={data.avatar_url} 
          alt={`${data.login}'s avatar`} 
          className="w-32 h-32 rounded-full mx-auto border-4 border-slate-700 shadow-lg mb-4"
        />
        {/* Status Dot */}
        <span className="absolute bottom-4 right-4 bg-green-500 w-5 h-5 border-2 border-slate-800 rounded-full"></span>
      </div>
      
      {/* Name and Username */}
      <h2 className="text-3xl font-bold text-white tracking-tight">
        {data.name || data.login}
      </h2>
      <p className="text-blue-400 font-medium mb-4 text-lg">@{data.login}</p>
      
      {/* Joined Date */}
      <p className="text-slate-400 text-sm mb-6">
        Joined {formatDate(data.created_at)}
      </p>

      {/* Bio Section: Darker box inside the card */}
      {data.bio && (
        <div className="bg-slate-900/50 p-4 rounded-lg mb-6 border border-slate-700/50 backdrop-blur-sm">
          <p className="text-slate-300 italic font-light">
            "{data.bio}"
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6 border-y border-slate-700 py-4">
        <div className="flex flex-col items-center hover:bg-slate-700/50 p-2 rounded-lg transition cursor-default">
          <span className="font-bold text-xl text-white">{data.followers}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Followers</span>
        </div>
        <div className="flex flex-col items-center hover:bg-slate-700/50 p-2 rounded-lg transition cursor-default">
          <span className="font-bold text-xl text-white">{data.following}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Following</span>
        </div>
        <div className="flex flex-col items-center hover:bg-slate-700/50 p-2 rounded-lg transition cursor-default">
          <span className="font-bold text-xl text-white">{data.public_repos}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wide">Repos</span>
        </div>
      </div>

      {/* Details List (Location, Twitter, etc.) */}
      <div className="text-left space-y-3 mb-8 text-slate-300 text-sm px-2">
        {data.location && (
          <p className="flex items-center gap-3">
            <span className="text-xl">📍</span> <span>{data.location}</span>
          </p>
        )}
        {data.twitter_username && (
          <p className="flex items-center gap-3">
            <span className="text-xl">🐦</span> 
            <a href={`https://twitter.com/${data.twitter_username}`} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              @{data.twitter_username}
            </a>
          </p>
        )}
        {data.company && (
          <p className="flex items-center gap-3">
            <span className="text-xl">🏢</span> <span>{data.company}</span>
          </p>
        )}
      </div>

      {/* BUTTON: Gradient Background to make it pop */}
      <a 
        href={data.html_url} 
        target="_blank" 
        rel="noreferrer"
        className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
      >
        View on GitHub ➜
      </a>

    </div>
  );
}

export default ProfileCard;