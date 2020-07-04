import React from "react";
import { StyledTrending } from './Trending'
import LikedVideos from './LikedVideos';

const Library = () => {
	return (
		<>
			<StyledTrending>
				<h2>History</h2>
				<p className="secondary">Videos that you have watched will show up here</p>
			</StyledTrending>
			<LikedVideos />
		</>
	);
};

export default Library;
