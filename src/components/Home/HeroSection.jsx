import React from "react";
import heroVideo from "../../assets/home/hero_video/hero2.mp4";
 
const HeroSection = () => {
  const title = "SEARCH YOUR LIFE PARTNER";
 
  return (
    <div className="relative h-[38rem] w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
 
      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" /> */}
 
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end items-center text-center pb-20 z-10 px-4">
       
        {/* Animated Heading */}
        <h1 className="hero-title text-white text-3xl md:text-5xl font-serif font-semibold tracking-widest mb-8">
          {title.split(" ").map((word, index) => (
            <span
              key={index}
              className="hero-word"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
 
        {/* CTA Button */}
        <button className="hero-cta-btn">
          <span className="btn-text">Find Your Match</span>
        </button>
      </div>
    </div>
  );
};
 
export default HeroSection;