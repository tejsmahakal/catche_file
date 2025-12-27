import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2b2b2b] text-gray-300 py-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-4">Matrimony <span className="text-orange-500">Logo</span></h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Welcome to India's most trusted matrimonial platform dedicated to
            helping people find their perfect life partner. With thousands of
            verified profiles and personalized matchmaking, we make your journey
            to marriage simple, secure, and successful.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            QUICK LINKS
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/" },
              { label: "Success Stories", path: "/success-stories" },
              { label: "Membership Plans", path: "/plans" },
              { label: "Privacy Policy", path: "/" },
              { label: "Terms & Conditions", path: "/" },
              { label: "Contact Us", path: "/contact" },
              { label: "FAQs", path: "/" },
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                {/* Bullet - NOT underlined */}
                <span className="text-orange-400 font-bold mr-2">•</span>

                {/* Text - Underlined, correct color */}
                <a
                  href={item.path}
                  style={{
                    color: "#B5B297",
                    textDecoration: "underline",
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

        </div>

        {/* Column 3 - Explore by Community */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            EXPLORE BY COMMUNITY
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Hindu Matrimony",
              "Christian Matrimony",
              "Muslim Matrimony",
              "Sikh Matrimony",
              "Jain Matrimony",
              "Buddhist Matrimony",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                {/* Bullet - Orange */}
                <span className="text-orange-400 font-bold mr-2">•</span>

                {/* Text - NO underline */}
                <span style={{ color: "#B5B297" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            FOLLOW US
          </h3>
          <p className="text-sm mb-4 text-gray-300" style={{ color: "#B5B297" }}>
            Stay connected with us on social media for updates, wedding tips,
            and success stories.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition"
            >
              <FaFacebookF size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <p className="text-sm text-gray-400">
          Copyright © 
        </p>
        <p className="text-sm text-gray-400">
          2025 Matrimony. All rights reserved.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Your trusted partner in finding love and lifelong happiness.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
