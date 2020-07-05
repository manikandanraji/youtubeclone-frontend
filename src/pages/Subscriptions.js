import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Wrapper } from "./Home";
import VideoCard from "../components/VideoCard";
import VideoGrid from "../styles/VideoGrid";
import Suggestions from '../components/Suggestions';
import { getFeed } from "../actions";

const Subscriptions = ({ isFetching, videos, getFeed }) => {
	useEffect(() => {
		getFeed();
	}, [getFeed]);

	if(isFetching) {
		return <p>loader</p>
	}

	if(!isFetching && !videos.length) {
		return <Suggestions />
	}

	return (
		<Wrapper>
			<VideoGrid>
				{!isFetching && videos.map(video => (
					<Link key={video.id} to={`/watch/${video.id}`}>
						<VideoCard key={video.id} hideavatar={true} video={video} />
					</Link>
				))}
			</VideoGrid>
		</Wrapper>
	);
};

const mapStateToProps = ({ feed }) => ({
	isFetching: feed.isFetching,
	videos: feed.videos
});

export default connect(mapStateToProps, { getFeed })(Subscriptions);
