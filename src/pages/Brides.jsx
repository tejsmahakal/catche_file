import React, { useState, useEffect } from "react";
import ProfileCard from "../components/Brides/GroomCard";
import { Menu, X } from "lucide-react";
import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

const Brides = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [usingCache, setUsingCache] = useState(false); // ✅ Cache flag

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useBrowseProfilesByGenderQuery(
    { gender: "FEMALE", page, size: 10 },
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  const users = data?.data?.content || [];
  const isLastPage = data?.data?.last === true;

  
  useEffect(() => {
    const cachedData = localStorage.getItem("cached_brides");
    const cachedTimestamp = localStorage.getItem("brides_cache_timestamp");
    
    
    const isCacheFresh = cachedTimestamp && 
      (Date.now() - parseInt(cachedTimestamp)) < 24 * 60 * 60 * 1000;
    
    if (cachedData && isCacheFresh) {
      const parsedData = JSON.parse(cachedData);
      setAllUsers(parsedData);
      console.log("📦 Loaded brides from cache");
    }
  }, []);

 
  useEffect(() => {
    if (users.length > 0) {
      setAllUsers((prev) => {
        const ids = new Set(prev.map((u) => u.userProfileId));
        const filtered = users.filter(
          (u) => !ids.has(u.userProfileId)
        );
        const newAllUsers = [...prev, ...filtered];
        
        // Save to cache
        localStorage.setItem("cached_brides", JSON.stringify(newAllUsers));
        localStorage.setItem("brides_cache_timestamp", Date.now());
        
        return newAllUsers;
      });
    }
  }, [users]);

  
  useEffect(() => {
    if (isError && !isLoading) {
      const cachedData = localStorage.getItem("cached_brides");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setAllUsers(parsedData);
        setUsingCache(true);
        console.log("🔄 API failed, using cached data");
      }
    }
  }, [isError, isLoading]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* MOBILE MENU */}
      <button
        className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* SINGLE PAGE SCROLL */}
      <section className="flex-1 p-4 md:p-6 mt-5">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* CACHE NOTICE */}
          {usingCache && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Showing cached data.</strong> Live data unavailable. 
                    <button 
                      onClick={() => window.location.reload()}
                      className="ml-2 underline font-medium"
                    >
                      Try again
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* INITIAL LOADING */}
          {isLoading && page === 0 && !usingCache && (
            <p className="text-center text-gray-500">
              Loading brides…
            </p>
          )}

          {/* ERROR (only show if no cache available) */}
          {isError && allUsers.length === 0 && !usingCache && (
            <div className="text-center">
              <p className="text-red-500 mb-2">
                Unable to load brides right now. Please try again.
              </p>
              <button 
                onClick={() => {
                  const cachedData = localStorage.getItem("cached_brides");
                  if (cachedData) {
                    setAllUsers(JSON.parse(cachedData));
                    setUsingCache(true);
                  }
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Show Last Cached Data
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!isLoading && allUsers.length === 0 && !usingCache && (
            <p className="text-center text-gray-600">
              No brides found.
            </p>
          )}

          {/* CARDS */}
          {allUsers.map((profile) => (
            <ProfileCard
              key={profile.userProfileId}
              profile={profile}
              isCached={usingCache} // Optional: pass cache flag to card
            />
          ))}

          {/* LOAD MORE (hide when using cache) */}
          {!isLoading && !isLastPage && !usingCache && (
            <div className="text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={isFetching}
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 disabled:opacity-60"
              >
                {isFetching ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {/* CACHE CLEAR BUTTON (for testing) */}
          <div className="text-center mt-4">
            <button
              onClick={() => {
                localStorage.removeItem("cached_brides");
                localStorage.removeItem("brides_cache_timestamp");
                setAllUsers([]);
                setUsingCache(false);
                window.location.reload();
              }}
              className="text-xs text-gray-500 hover:text-red-500"
            >
              Clear Cache & Refresh
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Brides;