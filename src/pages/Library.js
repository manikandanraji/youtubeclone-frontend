import React from "react";
import LikedVideos from "./LikedVideos";
import History from "./History";

const Library = () => (
  <>
    <History nopad={true} />
    <LikedVideos />
  </>
);

export default Library;
