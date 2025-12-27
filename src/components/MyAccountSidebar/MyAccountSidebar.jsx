import React from "react";
import { NavLink } from "react-router-dom";

const MyAccountSidebar = () => {
  return (
    <div className="border rounded-xl p-5 w-full bg-white shadow-sm">

      {/* My Account */}
      <Section title="My Account">
        <SidebarButton label="My Profile" path="/my-profile" />

        <SidebarButton label="Edit Profile" path="/create-profile" />
        <SidebarButton label="Reset Password" path="/forgot" />
        <SidebarButton label="Delete Account" path="#" />
      </Section>

      {/* My Messages */}
      <Section title="My Messages">
        <SidebarButton label="Interest Receive" path="#" />
        <SidebarButton label="Message Recieve" path="#" />
      </Section>

      {/* My Photos */}
      <Section title="My Photos">
        <SidebarButton label="Manage My Photo" path="#" />
      </Section>

      {/* My Membership */}
      <Section title="My Membership">
        <SidebarButton label="Manage My Membership" path="#" />
      </Section>
    </div>
  );
};

export default MyAccountSidebar;

const Section = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h3 className="text-[18px] font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {children}
      </div>
    </div>
  );
};

const SidebarButton = ({ label, path }) => {
  return (
    <NavLink to={path}>
      <button
        className="
          px-4 py-1.5
          text-[14px]
          border border-orange-400
          rounded-lg
          text-orange-500
          hover:bg-orange-100
          transition
        "
      >
        {label}
      </button>
    </NavLink>
  );
};
