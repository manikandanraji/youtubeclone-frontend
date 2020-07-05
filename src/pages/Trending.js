import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import TrendingCard from "../components/TrendingCard";
import { getTrending } from "../actions";

export const StyledTrending = styled.div`
	padding: 1rem 1.3rem;
	width: 85%;
	margin: 0 auto;

	@media screen and (max-width: 930px) {
		width: 95%;
	}

	@media screen and (max-width: 800px) {
		width: 100%;
	}
`;

const Trending = ({ isFetching, videos, getTrending }) => {
	useEffect(() => {
		if (!videos.length) {
			getTrending();
		}
	}, [getTrending, videos.length]);

	return (
		<StyledTrending>
			<h2>Trending</h2>
			<div className="trending">
				{!isFetching && videos.map(video => (
					<Link to={`/watch/${video.id}`} key={video.id}>
						<TrendingCard key={video.id} video={video} />
					</Link>
				))}
			</div>
		</StyledTrending>
	);
};

const mapStateToProps = ({ trending }) => ({
	isFetching: trending.isFetching,
	videos: trending.videos
});

export default connect(mapStateToProps, { getTrending })(Trending);
