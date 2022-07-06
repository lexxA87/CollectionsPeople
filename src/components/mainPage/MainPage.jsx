import React from "react";
import MainPageCollections from "./MainPageCollections";
import MainPageItems from "./MainPageItems";
import MainPageTagsCloud from "./MainPageTagsCloud";

function MainPage() {
  return (
    <div className="mb-5">
      <MainPageTagsCloud />
      <MainPageItems />
      <MainPageCollections />
    </div>
  );
}

export default MainPage;
