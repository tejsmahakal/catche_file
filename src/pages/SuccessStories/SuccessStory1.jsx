import React, { useEffect, useRef, useState } from "react";
import couple1 from "../../assets/SuccessStories/couple4.jpeg";
import couple2 from "../../assets/SuccessStories/couple5.jpg";
import couple3 from "../../assets/SuccessStories/couple6.jpg";
import couple4 from "../../assets/SuccessStories/couple7.jpg";
import couple5 from "../../assets/SuccessStories/couple8.webp";
import couple6 from "../../assets/SuccessStories/couple9.jpeg";

const SuccessStory1 = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleViewMore = () => {
    setIsAlbumOpen(!isAlbumOpen);
  };

  // Additional images for the album
  const albumImages = [
    { src: couple1, label: "Wedding Day", rotation: -15, position: "top-left" },
    { src: couple2, label: "Travel Memories", rotation: 12, position: "bottom-right" },
    { src: couple3, label: "Together Forever", rotation: -2, position: "center" },
    { src: couple4, label: "Honeymoon", rotation: 8, position: "top-right" },
    { src: couple5, label: "Family Time", rotation: -10, position: "bottom-left" },
    { src: couple6, label: "Celebration", rotation: 5, position: "middle-left" },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-orange-50 py-5 px-2 sm:px-12 lg:px-20 font-[Inter] overflow-hidden relative">
      {/* Animation of backgrounf images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <div 
        ref={containerRef}
        className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="inline-block mb-4">
          <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-pulse shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          Celebrating Love & Connection
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 mt-3 text-lg max-w-3xl mx-auto leading-relaxed">
          Discover the inspiring stories of couples who found their soulmates on our platform. <br className="hidden sm:block" />
          Real people, real connections, real love.
        </p>
      </div>

      {/* Story Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        {/* Text with floating animation */}
        <div 
          className="lg:w-1/2 pl-6 relative group"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-300 to-orange-500 rounded-full transform transition-transform duration-300 group-hover:scale-y-110"></div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">R&N</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Rohit & Neha
                </h3>
                <p className="text-gray-500 text-sm">Married • December 2024</p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-lg">
              Rohit sent Neha a request after reading her profile, and they instantly connected
              over shared values and a love for travel. After a few months of conversations and
              family meetings, they tied the knot in December 2024.
            </p>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-l-4 border-orange-500 transform transition-transform duration-300 hover:translate-x-2">
              <p className="text-orange-700 italic font-medium">
                "A match made with trust and a little help from technology."
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
                <span>Shared Values</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
                <span>Travel Lovers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="lg:w-1/2 relative">
          {/* Main Images Container */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
            {/* Base decorative circles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full border border-orange-100 animate-spin-slow"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full border border-orange-200 animate-spin-slow-reverse"></div>
            </div>

            {/* Main three images */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Main Center Image */}
              <img
                ref={el => imagesRef.current[0] = el}
                src={couple3}
                alt="Rohit & Neha Together"
                className="absolute w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover rounded-2xl shadow-2xl cursor-pointer transform transition-all duration-500 hover:scale-110 hover:z-30 hover:shadow-2xl border-4 border-white"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-2deg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-50%, -50%) rotate(-2deg) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(-50%, -50%) rotate(-2deg) scale(1)';
                }}
              />
              
              {/* Top Left Image */}
              <img
                ref={el => imagesRef.current[1] = el}
                src={couple1}
                alt="Rohit & Neha Wedding"
                className="absolute w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 object-cover rounded-2xl shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-110 hover:z-20 hover:shadow-2xl"
                style={{
                  top: '10%',
                  left: '10%',
                  transform: 'rotate(-15deg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(-15deg) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(-15deg) scale(1)';
                }}
              />
              
              {/* Bottom Right Image */}
              <img
                ref={el => imagesRef.current[2] = el}
                src={couple2}
                alt="Rohit & Neha Travel"
                className="absolute w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 object-cover rounded-2xl shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-110 hover:z-20 hover:shadow-2xl"
                style={{
                  bottom: '10%',
                  right: '10%',
                  transform: 'rotate(12deg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(12deg) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(12deg) scale(1)';
                }}
              />
              
              {/* Floating hearts */}
              <div className="absolute top-2 right-2 w-8 h-8 text-orange-400 animate-bounce">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="absolute bottom-2 left-2 w-6 h-6 text-orange-300 animate-bounce" style={{ animationDelay: '0.3s' }}>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* View more button */}
          <div className="text-center mt-8">
            <button 
              onClick={handleViewMore}
              className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">
                {isAlbumOpen ? 'Close Album' : 'View More Stories'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Photo Album Overlay */}
      <div className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 transition-all duration-700 ease-in-out ${isAlbumOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Album Container */}
        <div className={`relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto transition-all duration-700 transform ${isAlbumOpen ? 'scale-100' : 'scale-90'}`}>
          {/* Album Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-3xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Rohit & Neha's Love Journey</h3>
                <p className="text-orange-100">A visual story of their beautiful moments</p>
              </div>
              <button 
                onClick={handleViewMore}
                className="text-white hover:text-orange-200 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Album Content */}
          <div className="p-8">
            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albumImages.map((image, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.label}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg">
                        <span className="font-semibold">{image.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Album Description */}
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border-l-4 border-orange-500">
              <h4 className="text-xl font-bold text-orange-700 mb-3">Their Journey in Pictures</h4>
              <p className="text-gray-700">
                From their first meeting to the wedding day and beyond, Rohit and Neha have created 
                beautiful memories together. Each photo tells a story of love, laughter, and shared 
                adventures. Their journey reminds us that true connections blossom with time and trust.
              </p>
            </div>

            {/* Album Stats */}
            <div className="mt-6 flex flex-wrap gap-6 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">2</div>
                <div className="text-gray-600">Years Together</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">6</div>
                <div className="text-gray-600">Countries Visited</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">100+</div>
                <div className="text-gray-600">Beautiful Memories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        
        @keyframes album-open {
          0% {
            opacity: 0;
            transform: scale(0.8) rotateX(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
          }
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 30s linear infinite;
        }
        
        .album-open-animation {
          animation: album-open 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SuccessStory1;