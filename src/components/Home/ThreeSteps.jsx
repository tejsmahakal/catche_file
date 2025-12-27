import React from "react";
import createProfileImg from "../../assets/home/3easyStep/createProfile.webp";
import searchMatchesImg from "../../assets/home/3easyStep/connectImg.webp";
import connectJourneyImg from "../../assets/home/3easyStep/connectImg.webp";

const steps = [
  {
    image: createProfileImg,
    title: "Create your profile",
    description:
      "Sign up for free, add your details, and upload your photo to get started.",
  },
  {
    image: searchMatchesImg,
    title: "Search & Discover Matches",
    description:
      "Explore verified profiles that match your preferences and interests.",
  },
  {
    image: connectJourneyImg,
    title: "Connect & Start Your Journey",
    description:
      "Send interest, chat securely, and take the first step toward your happily ever after.",
  },
];

const ThreeSteps = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 text-center">
      {/* Heading */}
      <h2 className="text-gray-500 font-semibold uppercase tracking-wide md:text-3xl">
        Find Your Perfect
      </h2>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 text-orange-500">
        MATCH IN JUST 3 EASY WAYS
      </h1>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center transition-all duration-300"
          >
            {/* Image Card */}
            <div
              className="
                bg-white rounded-2xl p-0 w-64 h-48 mb-6
                flex items-center justify-center
                shadow-md overflow-hidden
                transition-all duration-300 ease-out
                group-hover:-translate-y-3
                group-hover:scale-105
                group-hover:shadow-xl
                group-hover:ring-2
                group-hover:ring-orange-400/50"
            >
              <img
                src={step.image}
                alt={step.title}
                className="
                h-full max-h-40 w-auto
                object-contain
                transition-transform duration-500 ease-out
                group-hover:scale-110"
              />
            </div>

            {/* Title */}
            <h3
              className="
              text-lg font-semibold text-gray-800 mb-2
              transition-colors duration-300
              group-hover:text-orange-500
            "
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              className="
              text-gray-600 text-sm max-w-xs
              transition-colors duration-300
              group-hover:text-gray-700
            "
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeSteps;
