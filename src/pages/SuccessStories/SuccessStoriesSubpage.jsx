import React from "react";
import storyImage1 from "../../assets/SuccessStories/story1.jpg";
import storyImage2 from "../../assets/SuccessStories/story1.jpg";
 
const SuccessStoriesSubpage = () => {
    const stories = [
        {
            id: 1,
            name: "Vinod Sharma",
            profession: "Software Engineer",
            location: "Mumbai, India",
            quote: "\"Distance couldn't stop us because we had the right connection. Best decision ever!\"",
            description: "Long-distance became love-distance for Anjali and Rohan. Despite being in different cities, they made their relationship work through the platform's messaging features. Rohan eventually moved to be with Anjali, and they now live happily together.",
            image: storyImage1
        },
        {
            id: 2,
            name: "Vinod Sharma",
            profession: "Software Engineer",
            location: "Mumbai, India",
            quote: "\"Distance couldn't stop us because we had the right connection. Best decision ever!\"",
            description: "Long-distance became love-distance for Anjali and Rohan. Despite being in different cities, they made their relationship work through the platform's messaging features. Rohan eventually moved to be with Anjali, and they now live happily together.",
            image: storyImage2
        }
    ];
 
    return (
        <section className="bg-[#F6F6F6] min-h-screen py-16 px-6 sm:px-12 lg:px-20 font-[Inter]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500 mb-4">
                        View More Stories
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Real stories from couples who found their perfect match
                    </p>
                </div>
 
                {/* Stories - Single column layout */}
                <div className="flex flex-col gap-12">
                    {stories.map((story) => (
                        <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="flex flex-col lg:flex-row">
                                {/* Image Section - Left Side */}
                                <div className="lg:w-2/5">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-64 lg:h-full object-cover"
                                    />
                                </div>
 
                                {/* Content Section - Right Side */}
                                <div className="lg:w-3/5 p-6">
 
                                    {/* Profile Info */}
                                    <div className="mb-4">
                                        <h2 className="text-xl font-bold text-gray-800">{story.name}</h2>
                                        <p className="text-gray-600">{story.profession}</p>
                                        <div className="flex items-center text-orange-500 text-sm">
                                            {/* Location Icon */}
                                            <svg
                                                className="w-4 h-4 mr-1 text-orange-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {story.location}
                                        </div>
                                    </div>
 
                                    {/* Quote */}
                                    <blockquote className="text-gray-700 italic font-semibold text-lg sm:text-xl leading-relaxed mb-4 border-l-4 border-orange-500 pl-4 py-1">
                                        {story.quote.split(" ").slice(0, Math.ceil(story.quote.split(" ").length / 3)).join(" ")}<br />
                                        {story.quote.split(" ").slice(Math.ceil(story.quote.split(" ").length / 3)).join(" ")}
                                    </blockquote>
 
 
                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {story.description}
                                    </p>
 
                                    {/* View Story Button */}
                                    <button className="bg-orange-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300">
                                        View the Story
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
 
export default SuccessStoriesSubpage;
 