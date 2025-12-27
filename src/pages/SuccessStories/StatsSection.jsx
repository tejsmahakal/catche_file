import React, { useEffect, useRef, useState } from "react";

const StatsSection = () => {
  const [couplesCount, setCouplesCount] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  const [successStories, setSuccessStories] = useState(0);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate couples count
            let currentCouples = 0;
            const couplesInterval = setInterval(() => {
              currentCouples += 100;
              if (currentCouples >= 5000) {
                currentCouples = 5000;
                clearInterval(couplesInterval);
              }
              setCouplesCount(currentCouples);
            }, 20);

            // Animate satisfaction rate
            let currentSatisfaction = 0;
            const satisfactionInterval = setInterval(() => {
              currentSatisfaction += 2;
              if (currentSatisfaction >= 92) {
                currentSatisfaction = 92;
                clearInterval(satisfactionInterval);
              }
              setSatisfactionRate(currentSatisfaction);
            }, 30);

            // Animate success stories
            let currentStories = 0;
            const storiesInterval = setInterval(() => {
              currentStories += 50;
              if (currentStories >= 1000) {
                currentStories = 1000;
                clearInterval(storiesInterval);
              }
              setSuccessStories(currentStories);
            }, 25);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-orange-400 text-white py-10 mt-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-around items-center text-center gap-8 px-4">
        <div>
          <h3 className="text-4xl font-bold">
            {couplesCount.toLocaleString()}+
          </h3>
          <p className="text-sm mt-2">Couples United</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold">
            {satisfactionRate}%
          </h3>
          <p className="text-sm mt-2">Satisfaction Rate</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold">
            {successStories.toLocaleString()}+
          </h3>
          <p className="text-sm mt-2">Success Stories</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;