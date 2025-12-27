import React from "react";
import journeyImage from "../../assets/SuccessStories/journeyImage.jpg";
import { FaCommentDots, FaVideo, FaUsers, FaHeart } from "react-icons/fa";

const SuccessStory2 = () => {
  const steps = [
    {
      icon: <FaCommentDots className="text-orange-500 text-xl" />,
      title: "Matched",
      subtitle: "First conversation lasted hours",
      description: "Instant connection",
    },
    {
      icon: <FaVideo className="text-orange-500 text-xl" />,
      title: "Video Calls",
      subtitle: "Regular virtual dates",
      description: "Getting to know each other",
    },
    {
      icon: <FaUsers className="text-orange-500 text-xl" />,
      title: "Family Meeting",
      subtitle: "Families connected",
      description: "Everyone approved!",
    },
    {
      icon: <FaHeart className="text-orange-500 text-xl" />,
      title: "Wedding",
      subtitle: "October 20, 2024",
      description: "Everyone approved!",
    },
  ];

  return (
    <section className="bg-[#F6F6F6] py-16 px-6 sm:px-12 lg:px-20 font-[Inter]">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={journeyImage}
            alt="Couple Journey"
            className="rounded-lg shadow-lg w-full max-w-md h-[500px] object-cover"
          />
        </div>

        {/* Steps */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-8 text-center lg:text-left">
            Journey to Forever
          </h2>

          <div className="flex flex-col gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Icon */}
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0 flex items-center justify-center">
                  {step.icon}
                </div>

                {/* Vertical line - Dark grey color */}
                <div className="w-0.5 bg-gray-600 h-full min-h-[60px]"></div>

                {/* Step text */}
                <div className="flex flex-col">
                  <h3 className="text-orange-500 font-semibold">{step.title}</h3>
                  <p className="text-gray-700 text-sm">{step.subtitle}</p>
                  <p className="text-gray-500 text-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStory2;