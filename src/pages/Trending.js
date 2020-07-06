import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import TrendingCard from "../components/TrendingCard";
import { getTrending } from "../actions";
import Skeleton from '../skeletons/TrendingSkeleton';

export const StyledTrending = styled.div`
	padding: 1rem 1.3rem;
	width: 85%;
	margin: 0 auto;
	padding-top: 2rem;
	padding-bottom: ${props => props.nopad ? '7rem': '0'};

	@media screen and (max-width: 930px) {
		width: 95%;
	}

	@media screen and (max-width: 800px) {
		width: 100%;
	}
`;

const Trending = ({ nopad, isFetching, videos, getTrending }) => {
	useEffect(() => {
		getTrending();
	}, [getTrending, videos.length]);

	if(isFetching) {
		return <Skeleton />
	}

	return (
		<StyledTrending nopad={nopad}>
			<h2>Trending</h2>
			<div className="trending">
				{!isFetching &&
					videos.map(video => (
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
