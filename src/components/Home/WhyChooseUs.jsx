import React from "react";
 
import coupleImg1 from "../../assets/home/SuccessStories/coupleImg1.jpg";
import coupleImg2 from "../../assets/home/SuccessStories/coupleImg2.jpg";
import coupleImg3 from "../../assets/home/SuccessStories/coupleImg3.jpg";
import coupleImg4 from "../../assets/home/SuccessStories/coupleImg4.jpg";
import coupleImg5 from "../../assets/home/SuccessStories/coupleImg5.jpg";
 
const features = [
  {
    img: coupleImg1,
    title: "100% VERIFIED & GENUINE PROFILES",
    description:
      "We ensure every profile is manually verified to help you connect with real and trustworthy people.",
  },
  {
    img: coupleImg2,
    title: "SAFE, SECURE & CONFIDENTIAL",
    description:
      "Your personal information stays protected with advanced security and complete privacy control.",
  },
  {
    img: coupleImg3,
    title: "SMART MATCHMAKING TECHNOLOGY",
    description:
      "Our smart algorithm recommends matches that align with your values, interests, and lifestyle.",
  },
  {
    img: coupleImg4,
    title: "ENHANCED PRIVACY CONTROLS",
    description:
      "Take full command of who sees your photos and details with our customizable visibility settings.",
  },
  {
    img: coupleImg5,
    title: "PERSONALIZED COMPATIBILITY",
    description:
      "Discover meaningful connections based on deep compatibility scores and shared long-term goals.",
  },
];
const WhyChooseUs = () => {
  const paragraphText =
    "Choosing the right life partner is one of the most important decisions of your life. At Matrimony, we make this journey effortless by offering verified profiles, complete privacy, and intelligent matchmaking. Our platform is designed to build trust, ensure security, and help you connect with genuine people who truly match your values, lifestyle, and aspirations.";
 
  return (
    <section className="bg-white py-0 px-6">
      {/* TEXT SECTION */}
      <div className="why-text-wrapper max-w-4xl mx-auto mb-16 text-center">
        <h2
          className="why-title text-[36px] md:text-[42px] font-bold uppercase mb-4"
          style={{ fontFamily: "Garamond, serif" }}
        >
          WHY CHOOSE US?
        </h2>
 
        {/* underline */}
        <span className="why-underline" />
 
        <p
          className="why-paragraph mt-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "18px",
            lineHeight: "30px",
          }}
        >
          {paragraphText}
        </p>
      </div>
 
      {/* AUTO SCROLL CARDS */}
      <div className="overflow-hidden relative">
        <div className="flex gap-8 animate-scroll-horizontal w-max">
          {[...features, ...features].map((feature, index) => (
            <div
              key={index}
              className="w-[320px] bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full h-56 object-cover"
              />
 
              <div className="p-5">
                <h3 className="text-orange-500 font-semibold text-sm uppercase mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default WhyChooseUs;
 