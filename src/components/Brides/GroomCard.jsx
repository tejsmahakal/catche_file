import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAddToFavoriteMutation } from "../../context/profileApi";
import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";

const GroomCard = ({ profile, isCached = false }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [cachedProfile, setCachedProfile] = useState(null);

  // ✅ SIMPLE CACHE: Save profile when available
  useEffect(() => {
    if (profile?.userProfileId) {
      const cacheKey = `groom_${profile.userProfileId}`;
      localStorage.setItem(cacheKey, JSON.stringify(profile));
      setCachedProfile(profile);
    }
  }, [profile]);

  // ✅ Load from cache if profile is null
  useEffect(() => {
    if (!profile && !cachedProfile) {
      // Try to load any cached profile
      const keys = Object.keys(localStorage);
      const groomKeys = keys.filter(key => key.startsWith('groom_'));
      
      if (groomKeys.length > 0) {
        const cached = localStorage.getItem(groomKeys[0]);
        if (cached) {
          setCachedProfile(JSON.parse(cached));
        }
      }
    }
  }, [profile]);

  // ✅ Use display profile
  const displayProfile = profile || cachedProfile;
  if (!displayProfile) return null;

  const {
    userProfileId,
    firstName,
    age,
    gender,
    religion,
    caste,
    height,
    complexion,
    currentCity,
    maritalStatus,
    hasProfilePhoto,
    profilePhotoBase64,
    profilePhotoContentType,
  } = displayProfile;

  const fullName = firstName || "Profile";

  // HEIGHT: cm → ft/in
  const heightInInches = height ? height / 2.54 : 0;
  const ft = Math.floor(heightInInches / 12);
  const inches = Math.round(heightInInches % 12);
  const heightText = height ? `${ft}'${inches}"` : "";

  // IMAGE SOURCE
  const profileImageSrc = useMemo(() => {
    if (
      hasProfilePhoto === true &&
      profilePhotoBase64 &&
      profilePhotoContentType
    ) {
      return `data:${profilePhotoContentType};base64,${profilePhotoBase64}`;
    }
    return defaultProfileImg;
  }, [hasProfilePhoto, profilePhotoBase64, profilePhotoContentType]);

  // FAVORITE HANDLER
  const handleFavorite = async () => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    try {
      await addToFavorite(userProfileId).unwrap();
      setIsFavorited(true);
    } catch (error) {
      console.error("Add to favorite failed", error);
      alert(error?.data?.message || "Failed to add to favorites");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-3xl mx-auto">
      
      {/* IMAGE - ORIGINAL UI */}
      <div className="relative md:w-1/3 w-full">
        {/* {isCached && !profile && (
          <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
            Cached
          </div>
        )}
         */}
        <img
          src={profileImageSrc}
          alt={fullName}
          className="w-full h-60 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultProfileImg;
          }}
        />
      </div>

      {/* DETAILS - ORIGINAL UI */}
      <div className="p-4 px-8 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {fullName}
            {!profile && cachedProfile && (
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                (Cached)
              </span>
            )}
          </h3>

          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFavorite}
                disabled={isFavorited || isLoading}
                title={isFavorited ? "Added to Favorites" : "Add to Favorites"}
                className={`p-2 rounded-full shadow-md transition-all
                  ${
                    isFavorited
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
              >
                <Heart size={18} fill={isFavorited ? "gray" : "white"} />
              </button>

              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
                ID: {userProfileId}
              </span>
            </div>
          )}
        </div>

        <ul className="mt-2 text-gray-700 text-sm space-y-0.5">
          {age && <li><strong>Age:</strong> {age} Yrs</li>}
          {gender && <li><strong>Gender:</strong> {gender}</li>}
          {religion && <li><strong>Religion:</strong> {religion}</li>}
          {caste && <li><strong>Caste:</strong> {caste}</li>}
          {complexion && <li><strong>Complexion:</strong> {complexion}</li>}
          {heightText && <li><strong>Height:</strong> {heightText}</li>}
          {currentCity && <li><strong>City:</strong> {currentCity}</li>}
          {maritalStatus && (
            <li><strong>Marital Status:</strong> {maritalStatus}</li>
          )}
        </ul>

        <button
          onClick={() =>
            navigate(
              isLoggedIn ? "/OthersEmptyBiodataPage" : "/PublicBiodataPage",
              { state: { userProfileId } }
            )
          }
          className="mt-3 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default GroomCard;