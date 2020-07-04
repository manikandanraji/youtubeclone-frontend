import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import { LikeIcon } from "../components/Icons";
import { getLikedVideos } from "../actions";

const LikedVideos = ({ videos, getLikedVideos }) => {
	console.log(videos);

	useEffect(() => {
		if (!videos.length) {
			getLikedVideos();
		}
	}, [videos, getLikedVideos]);

	return (
		<StyledTrending>
			<h2>Liked Videos</h2>
			{videos.map(video => (
				<TrendingCard key={video.id} video={video} />
			))}
		</StyledTrending>
	);
};

const mapStateToProps = state => ({ videos: state.likedVideo });

export default connect(mapStateToProps, { getLikedVideos })(LikedVideos);
