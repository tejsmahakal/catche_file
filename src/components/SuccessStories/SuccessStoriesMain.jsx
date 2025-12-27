import React from "react";
import SuccessStory1 from "../../pages/SuccessStories/SuccessStory1";
import WhyCouplesFindSuccess from "../../pages/SuccessStories/WhyCouplesFindSuccess";
import SuccessStory2 from "../../pages/SuccessStories/SuccessStory2";
import SuccessStoriesSubpage from "../../pages/SuccessStories/SuccessStoriesSubpage";
import StatsSection from "../../pages/SuccessStories/StatsSection";

const SuccessStoriesMain = () => {
  return (
    <div>
      <SuccessStory1 />
      <StatsSection />
      <WhyCouplesFindSuccess />
      <SuccessStory2 />
      <SuccessStoriesSubpage />
    </div>
  );
};

export default SuccessStoriesMain;
