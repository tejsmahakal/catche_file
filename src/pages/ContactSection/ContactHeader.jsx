import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const ContactHeader = () => {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Decorative blurred circles (kept subtle so background still visible) */}
            <div className="absolute top-10 left-8 w-36 h-36 bg-orange-200 blur-3xl opacity-20 rounded-full"></div>
            <div className="absolute bottom-6 right-8 w-44 h-44 bg-orange-300 blur-3xl opacity-20 rounded-full"></div>

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10 px-6">
                {/* Left: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 text-center lg:text-left text-white"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-orange-400 mb-6 drop-shadow-sm">
                        Get In Touch
                    </h2>
                    <p className="text-gray-200 text-base mb-8 max-w-md leading-relaxed">
                        We’d love to hear from you! Whether you have a question, feedback, or a collaboration idea — send us a message and we’ll get back to you soon.
                    </p>

                    <div className="space-y-4 text-gray-100">
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            <FaEnvelope className="text-orange-400 text-lg" />
                            <span>support@yourdomain.com</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            <FaPhoneAlt className="text-orange-400 text-lg" />
                            <span>+91 00000 00000</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            <FaMapMarkerAlt className="text-orange-400 text-lg" />
                            <span>Pune, Maharashtra, India</span>
                        </div>
                    </div>
                    {/* Social Media Icons */}
                    <div className="flex items-center justify-center lg:justify-start gap-5 mt-8">
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-orange-500 hover:bg-orange-600 p-3 rounded-full transition-all duration-300"
                        >
                            <FaInstagram size={18} />
                        </a>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-orange-500 hover:bg-orange-600 p-3 rounded-full transition-all duration-300"
                        >
                            <FaFacebookF size={18} />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-orange-500 hover:bg-orange-600 p-3 rounded-full transition-all duration-300"
                        >
                            <FaTwitter size={18} />
                        </a>
                    </div>

                </motion.div>


                {/* Right: Contact Form - translucent so background image is visible behind */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 rounded-2xl p-8 sm:p-10 border border-orange-100"
                    style={{ backdropFilter: "blur(8px)" }}
                >
                    {/* translucent white card */}
                    <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-6">
                            Send Us a Message
                        </h3>

                        <form className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                />
                            </div>

                            {/* Email + Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        required
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+91 00000 00000"
                                        required
                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <select
                                    required
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                >
                                    <option value="">Select a subject</option>
                                    <option>General Inquiry</option>
                                    <option>Support</option>
                                    <option>Feedback</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Tell us how we can help you"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-orange-500 text-white font-semibold rounded-md py-3 hover:bg-orange-600 transition"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>

    );
};

export default ContactHeader;
