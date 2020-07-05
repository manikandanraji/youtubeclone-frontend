import React from "react";
import LikedVideos from "./LikedVideos";
import History from "./History";

const Library = ({ isFetching }) => {
	return (
		<>
			<History />
			<LikedVideos />
		</>
	);
};

export default Library;
