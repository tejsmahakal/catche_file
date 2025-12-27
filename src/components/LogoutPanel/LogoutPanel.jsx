import { X, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  useGetOwnProfileQuery,
  useGetProfilePhotoQuery,
} from "../../context/profileApi";
import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";


// SAME helper
const toImageUrl = (fileData) =>
  fileData ? `data:image/jpeg;base64,${fileData}` : defaultProfileImg;

const LogoutPanel = ({
  open,
  onClose,
  sentCount = 0,
  receivedCount = 0,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { data: profileResponse } = useGetOwnProfileQuery();
  const { data: photoResponse } = useGetProfilePhotoQuery();

  const profilePic = toImageUrl(photoResponse?.data?.fileData);

  const profileData = profileResponse?.data;

  const p = profileData?.userProfile || {};
  const e = profileData?.educationAndProfession || {};

  const fullName =
    `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`
      .replace(/\s+/g, " ")
      .trim() || "Your Name";

  const education =
    e.education ||
    e.degree ||
    "Education details not added";

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm z-[180] duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* PANEL */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-80 md:w-[320px]
          bg-transparent z-[250] duration-500
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow"
        >
          <X size={20} className="text-gray-700" />
        </button>

        <div className="h-full flex justify-center px-2 py-3">
          <div className="w-full h-full border border-orange-400 rounded-3xl bg-white px-4 py-5 flex flex-col">

            {/* IMAGE + NAME */}
            <div className="flex flex-col items-center border-b border-gray-300 pb-4">
              <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden mb-3 bg-gray-100">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultProfileImg;
                    }}
                  />

                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={40} className="text-gray-400" />
                  </div>
                )}
              </div>

              <h3 className="text-[16px] font-semibold text-gray-900">
                {fullName}
              </h3>

              <p className="text-[12px] text-gray-600 text-center leading-tight">
                {education}
              </p>

              <button
                onClick={() => {
                  onClose();
                  navigate("/ViewProfilePage");
                }}
                className="text-[13px] text-orange-500 mt-1 font-semibold"
              >
                View & Update Profile
              </button>
            </div>

            {/* REQUEST COUNTS */}
            <div className="mt-4">
              <p className="text-[13px] font-medium text-gray-800 mb-2 text-center">
                Your Pending Request & Response Rate
              </p>

              <div className="border border-orange-400 rounded-xl py-3 px-4 flex justify-between">
                {/* REQUEST PENDING */}
                <div className="w-1/2 text-center">
                  <p className="text-[12px] text-gray-700">Request Pending</p>

                  <p className="text-[18px] font-bold text-orange-500 mt-1">
                    {sentCount}
                  </p>

                  {/* VIEW ALL */}
                  <a
                    href="/RequestsPage"
                    className="text-[11px] text-orange-500 mt-1 inline-block hover:underline"
                  >
                    View All
                  </a>
                </div>

                <div className="w-px bg-gray-300 mx-2"></div>

                {/* REQUEST RECEIVED */}
                <div className="w-1/2 text-center">
                  <p className="text-[12px] text-gray-700">Request Received</p>

                  <p className="text-[18px] font-bold text-orange-500 mt-1">
                    {receivedCount}
                  </p>

                  {/* VIEW ALL */}
                  <a
                    href="#"
                    className="text-[11px] text-orange-500 mt-1 inline-block hover:underline"
                  >
                    View All
                  </a>
                </div>
              </div>

            </div>

            <div className="mt-5 space-y-2 text-[13px] text-gray-800">
              <button className="hover:text-orange-500">Setting</button>
              <button className="hover:text-orange-500 block">FAQs</button>
              <button className="hover:text-orange-500 block">Privacy & Support</button>
            </div>

            <div className="flex-1"></div>

            {/* LOGOUT */}
            <div className="pb-2">
              <button
                onClick={() => {
                  logout();
                  onClose();
                  window.location.reload();
                }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500 text-white text-[13px]"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutPanel;