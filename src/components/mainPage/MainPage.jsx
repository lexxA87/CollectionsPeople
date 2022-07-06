import React from "react";
import MainPageCollections from "./MainPageCollections";
import MainPageItems from "./MainPageItems";
import MainPageTagsCloud from "./MainPageTagsCloud";

function MainPage() {
  return (
    <>
      <MainPageTagsCloud />
      <MainPageItems />
      <MainPageCollections />
    </>
  );
}

export default MainPage;
