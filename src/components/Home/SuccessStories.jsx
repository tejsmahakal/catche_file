import { MapPin, ArrowLeft, ArrowRight, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coupleImg1 from "../../assets/home/SuccessStories/coupleImg1.jpg";
import coupleImg2 from "../../assets/home/SuccessStories/coupleImg2.jpg";
import coupleImg3 from "../../assets/home/SuccessStories/coupleImg3.jpg";

const SuccessStories = () => {
  const successStories = [
    {
      id: 1,
      name: "Vinayak & Kavita",
      title: "From a Click to a Lifetime",
      location: "Nandgaon, Kolhapur",
      story:
        "I joined Eternal Match with little hope, but one message from Priya changed everything. Our first conversation felt so natural — now we're happily married and thankful every day for this platform. Thank you, Eternal Match, for bringing us together!",
      fullStory: "Vinayak had almost given up on finding love through online matrimony platforms. After several disappointing experiences, he joined Eternal Match with low expectations. Little did he know that Kavita, a software engineer from Kolhapur, was also looking for a meaningful connection. Their first meeting at a café in Kolhapur confirmed what they already felt - this was meant to be. After six months of getting to know each other and their families, they tied the knot in a beautiful traditional Maharashtrian wedding ceremony.",
      image: coupleImg1,
    },
    {
      id: 2,
      name: "Shubham & Ananya",
      title: "Modern Love, Traditional Values",
      location: "Delhi, India",
      story:
        "We connected over our shared love for classical music and family values. Eternal Match understood exactly what we were looking for. Today, we're building a beautiful life together filled with harmony and understanding.",
      fullStory: "Shubham, a finance professional from Delhi, and Ananya, a classical dancer from the same city, found each other through Eternal Match's detailed compatibility matching. Their first date was at a classical music concert, where they realized their shared passion extended to life values and goals. After a courtship of eight months filled with music concerts, family gatherings, and deep conversations about their future, they celebrated their union with both modern and traditional wedding ceremonies.",
      image: coupleImg2,
    },
    {
      id: 3,
      name: "Piyush & Sneha",
      title: "Cross-Cultural Connection",
      location: "Mumbai, Maharashtra",
      story:
        "Despite being from different states, we found common ground in our aspirations and dreams. Eternal Match's detailed profiles helped us understand each other's backgrounds better. We're grateful for this beautiful journey!",
      fullStory: "Piyush from Maharashtra and Sneha from Kerala proved that love knows no boundaries. Both working professionals in Mumbai, they faced the typical challenges of big-city life and cross-cultural relationships. Their families embraced the union, celebrating both Maharashtrian and Kerala traditions during their wedding festivities. Today, they've created their own beautiful blend of cultures at home.",
      image: coupleImg3,
    },
  ];

  const [currentStory, setCurrentStory] = useState(0);
  const [showFullStory, setShowFullStory] = useState(false);
  const [bookAnimation, setBookAnimation] = useState(false);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory(
      (prev) => (prev - 1 + successStories.length) % successStories.length
    );
  };

  const currentProfile = successStories[currentStory];

  const handleReadFullStory = () => {
    setBookAnimation(true);
    setTimeout(() => {
      setShowFullStory(true);
      setBookAnimation(false);
    }, 800);
  };

  const handleCloseFullStory = () => {
    setShowFullStory(false);
  };

  return (
    <>
      <section className="bg-white py-4">
        {/* === MATRIMONY MESSAGE SECTION === */}
        <motion.div
          className="py-12 px-4 flex justify-center items-center mb-12"
          style={{ backgroundColor: "#FFF7F0" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl text-center">
            <p
              className="text-gray-800 text-base md:text-lg font-semibold leading-relaxed tracking-wide"
              style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
            >
              AT MATRIMONY, WE BELIEVE THAT{" "}
              <motion.span
                className="text-orange-500 font-bold"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                MARRIAGE
              </motion.span>{" "}
              IS MORE THAN{" "}
              <motion.span
                className="text-orange-500 font-bold"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                JUST A MATCH
              </motion.span>{" "}
              — IT'S THE BEGINNING OF A LIFELONG JOURNEY OF LOVE, TRUST, AND
              UNDERSTANDING.
            </p>
          </div>
        </motion.div>

        {/* === SUCCESS STORY CARD SECTION === */}
        <div className="flex justify-center items-center px-4 min-h-[600px]">
          <div className="w-full max-w-5xl mx-auto">
            {/* CHANGED: This is the main fix - removed absolute positioning and used flex instead */}
            <div className="relative flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16">
              
              {/* === IMAGE CARD === */}
              {/* CHANGED: Removed absolute positioning and negative margins */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full rounded-2xl shadow-2xl overflow-hidden border-4 border-white transition-transform duration-500 hover:rotate-3 hover:scale-105"
                  >
                    <img
                      src={currentProfile.image}
                      alt={currentProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* === INFO CARD === */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 pt-8 w-full md:w-[520px] min-h-[460px] flex flex-col justify-between relative z-10"
                >
                  {/* === TOP CONTENT === */}
                  <div>
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-gray-500 uppercase tracking-[0.2em] text-xs mb-2"
                    >
                      Success Stories
                    </motion.h4>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-800 font-bold text-2xl sm:text-3xl mb-3 leading-snug"
                      style={{ fontFamily: "Garamond, serif" }}
                    >
                      {currentProfile.name} — {currentProfile.title}
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center text-sm text-orange-500 mb-4"
                    >
                      <MapPin size={18} className="mr-1" />
                      <a href="#" className="text-teal-600 hover:underline">
                        {currentProfile.location}
                      </a>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-600 text-base leading-relaxed mb-4"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      "{currentProfile.story}"
                    </motion.p>

                    {/* === READ FULL STORY BUTTON === */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReadFullStory}
                      className="mt-3 px-5 py-2 bg-orange-400 text-white rounded-lg font-medium hover:bg-orange-200 transition flex items-center justify-center gap-2"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <BookOpen size={18} />
                      Read Full Story
                    </motion.button>
                  </div>

                  {/* === BOTTOM SECTION: DOTS + ARROWS === */}
                  <div className="flex justify-between items-center mt-8">
                    {/* Pagination Dots */}
                    <div className="flex gap-2">
                      {successStories.map((_, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCurrentStory(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                            index === currentStory
                              ? "bg-orange-500"
                              : "bg-gray-300"
                          }`}
                          animate={{
                            scale: index === currentStory ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: index === currentStory ? Infinity : 0,
                            repeatDelay: 1,
                          }}
                        />
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={prevStory}
                        whileHover={{ scale: 1.1, backgroundColor: "#FFEDD5" }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-orange-50 transition"
                      >
                        <ArrowLeft size={18} />
                      </motion.button>
                      <motion.button
                        onClick={nextStory}
                        whileHover={{ scale: 1.1, backgroundColor: "#FFEDD5" }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-orange-50 transition"
                      >
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK OPENING ANIMATION */}
      <AnimatePresence>
        {bookAnimation && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-transparent mt-16"
          >
            <div className="relative w-64 h-96">
              {/* Book Cover */}
              <motion.div
                initial={{ rotateY: 0, scale: 1 }}
                animate={{ 
                  rotateY: -180,
                  scale: 1.2,
                  transition: {
                    rotateY: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    },
                    scale: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }
                }}
                className="absolute inset-0 rounded-lg shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center"
                }}
              >
                {/* Book Spine */}
                <div className="absolute left-0 top-0 w-4 h-full bg-orange-600 rounded-l-lg" />
                
                {/* Book Title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <BookOpen size={48} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Love Story</h3>
                    <p className="text-lg opacity-90">{currentProfile.name}</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Book Pages Opening */}
              <motion.div
                initial={{ rotateY: 0, scale: 1 }}
                animate={{ 
                  rotateY: -180,
                  scale: 1.2,
                  transition: {
                    rotateY: {
                      duration: 0.8,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    },
                    scale: {
                      duration: 0.8,
                      delay: 0.1,
                      ease: "easeOut"
                    }
                  }
                }}
                className="absolute inset-0 bg-white rounded-lg shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center"
                }}
              >
                {/* Pages Edge Effect */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
              </motion.div>

              {/* Opening Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
              >
                <div className="text-center text-white">
                  <motion.h4
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-2xl font-bold mb-2"
                  >
                    Opening Story...
                  </motion.h4>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg"
                  >
                    {currentProfile.name}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STORY BOOK MODAL - FIXED FOR MOBILE */}
      <AnimatePresence>
        {showFullStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, rotateY: -30 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.9, rotateY: 30 }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 100
              }}
              className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[80vh] overflow-hidden bg-white rounded-3xl shadow-2xl flex flex-col"
              style={{
                boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.25)",
              }}
            >
              {/* Close button at top - always visible */}
              <div className="absolute top-4 right-4 z-50">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseFullStory}
                  className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white border border-gray-200"
                >
                  <X size={20} className="text-gray-700" />
                </motion.button>
              </div>

              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Left Side - Image & Details */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="md:w-2/5 bg-gradient-to-b from-orange-100 to-amber-100 p-4 md:p-8 flex flex-col"
                >
                  <div className="flex-1">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="relative h-48 md:h-72 rounded-xl overflow-hidden shadow-xl mb-4 md:mb-6"
                    >
                      <img
                        src={currentProfile.image}
                        alt={currentProfile.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
                        {currentProfile.name}
                      </h2>
                      <p className="text-orange-600 text-base md:text-lg font-medium mb-2 md:mb-3">
                        {currentProfile.title}
                      </p>
                      <div className="flex items-center text-gray-600 text-sm md:text-base">
                        <MapPin size={16} className="mr-2" />
                        <span className="font-medium">{currentProfile.location}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right Side - Story Content */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="md:w-3/5 p-4 md:p-8 overflow-y-auto"
                >
                  <div className="pr-0 md:pr-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mb-6 md:mb-8"
                    >
                      <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                        <span className="w-6 md:w-8 h-1 bg-orange-400 mr-2 md:mr-3"></span>
                        Their Journey
                      </h3>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-3 md:space-y-4"
                      >
                        <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                          {currentProfile.fullStory}
                        </p>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="p-3 md:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-400 mt-4 md:mt-6"
                        >
                          <p className="text-gray-700 italic text-sm md:text-base">
                            "Today, they continue to cherish their journey and are grateful
                            to Eternal Match for bringing them together in this beautiful
                            union of hearts and souls."
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Bottom Close Button - Always visible */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="pt-4 md:pt-6 border-t border-gray-200"
                    >
                      <div className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCloseFullStory}
                          className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                        >
                          Close Book
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
 
export default SuccessStories;