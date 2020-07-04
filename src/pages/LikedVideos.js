import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import { getLikedVideos } from "../actions";

const LikedVideos = ({ videos, getLikedVideos }) => {
	useEffect(() => {
		if (!videos.length) {
			getLikedVideos();
		}
	}, [videos, getLikedVideos]);

	return (
		<StyledTrending>
			<h2>Liked Videos</h2>
			{videos.map(video => (
				<Link to={`/watch/${video.id}`} key={video.id}>
					<TrendingCard video={video} />
				</Link>
			))}
		</StyledTrending>
	);
};

const mapStateToProps = state => ({ videos: state.likedVideo });

export default connect(mapStateToProps, { getLikedVideos })(LikedVideos);
