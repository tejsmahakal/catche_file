import React from "react";

const SuccessStories = () => {
  const stories = [
    {
      couple: "Anita & Rohit",
      story:
        "We matched instantly through the platform and got married within six months. The support team made the journey simple and secure.",
    },
    {
      couple: "Neha & Arjun",
      story:
        "Detailed profiles and trust features helped us connect quickly. We are grateful for the meaningful conversations we had here.",
    },
    {
      couple: "Pooja & Karan",
      story:
        "The personalised recommendations were spot on. We found each other despite living in different cities.",
    },
  ];

  return (
    <section className="bg-[#FFF9F5] min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Success Stories</h1>
          <p className="text-gray-600">
            Real couples who found their perfect match on our platform. Your story could be next.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((item) => (
            <article
              key={item.couple}
              className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 flex flex-col gap-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">{item.couple}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{item.story}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

