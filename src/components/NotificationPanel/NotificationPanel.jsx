import { X } from "lucide-react";

const NotificationPanel = ({ open, onClose }) => {
  const groupedNotifications = [
    {
      date: "Today",
      items: [
        {
          id: 1,
          message:
            "You've received a new interest request. Take a moment to view the profile and see if you'd like to connect.",
          profile: "Rahul D., 28 yrs, Pune | Software Engineer",
        },
      ],
    },
    {
      date: "21-oct-2018",
      items: [
        {
          id: 2,
          message:
            "You've received a new interest request. Take a moment to view the profile and see if you'd like to connect.",
          profile: "Rahul D., 28 yrs, Pune | Software Engineer",
        },
        {
          id: 3,
          message:
            "You've received a new interest request. Take a moment to view the profile and see if you'd like to connect.",
          profile: "Rahul D., 28 yrs, Pune | Software Engineer",
        },
        {
          id: 4,
          message:
            "You've received a new interest request. Take a moment to view the profile and see if you'd like to connect.",
          profile: "Rahul D., 28 yrs, Pune | Software Engineer",
        },
      ],
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 z-40
        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Right-side Panel with FIXED Z-INDEX */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 md:w-[420px]
          bg-transparent z-[9999] transition-transform duration-500 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* OUTER ROUNDED CONTAINER */}
        <div className="h-full w-full bg-white border border-orange-300 rounded-3xl m-3 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b rounded-t-3xl">
            <h2 className="text-xl font-semibold text-gray-800">
              Notification
            </h2>
            <button onClick={onClose}>
              <X size={26} className="text-black" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto px-5 py-5">
            {groupedNotifications.map((group, gi) => (
              <div key={gi} className="mb-8">
                {/* Date */}
                <p className="text-sm text-gray-500 mb-3">{group.date}</p>

                {/* Notification Cards */}
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FFF7F2] border border-orange-200 rounded-2xl p-4 mb-5"
                  >
                    {/* Message */}
                    <p className="text-gray-800 text-sm leading-relaxed mb-3">
                      {item.message}
                    </p>

                    {/* Profile */}
                    <p className="text-gray-900 text-sm font-medium mb-4">
                      {item.profile}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button className="px-4 py-[6px] border border-orange-400 text-orange-500 rounded-full text-xs font-medium">
                        View Profile
                      </button>

                      <button className="px-4 py-[6px] border border-orange-400 text-orange-500 rounded-full text-xs font-medium">
                        Ignore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
