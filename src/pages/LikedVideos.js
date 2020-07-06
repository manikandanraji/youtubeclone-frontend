import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import { getLikedVideos } from "../actions";
import Skeleton from '../skeletons/TrendingSkeleton';

const LikedVideos = ({ isFetching, videos, getLikedVideos }) => {
	useEffect(() => {
		getLikedVideos();
	}, [videos.length, getLikedVideos]);

	if (isFetching) {
		return <Skeleton />
	}

	return (
		<StyledTrending>
			<h2>Liked Videos</h2>

			{videos?.length === 0 && (
				<p className="secondary">
					Videos that you have liked will show up here
				</p>
			)}

			{videos.map(video => (
				<Link to={`/watch/${video.id}`} key={video.id}>
					<TrendingCard video={video} />
				</Link>
			))}
		</StyledTrending>
	);
};

const mapStateToProps = ({ likedVideo }) => ({
	isFetching: likedVideo.isFetching,
	videos: likedVideo.videos
});

export default connect(mapStateToProps, { getLikedVideos })(LikedVideos);
