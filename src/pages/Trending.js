import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import TrendingCard from "../components/TrendingCard";
import { getFeed } from "../actions";

export const StyledTrending = styled.div`
	padding: 1.3rem;
	width: 85%;
	margin: 0 auto;

	@media screen and (max-width: 930px) {
		width: 95%;
	}

	@media screen and (max-width: 800px) {
		width: 100%;
	}
`;

const Trending = ({ feed, getFeed }) => {
	useEffect(() => {
		getFeed();
	}, [getFeed]);

	return (
		<StyledTrending>
			<h2>Trending</h2>
			<div className="trending">
				{feed.map(video => (
					<Link to={`/watch/${video.id}`} key={video.id}>
						<TrendingCard key={video.id} video={video} />
					</Link>
				))}
			</div>
		</StyledTrending>
	);
};

const mapStateToProps = state => ({ feed: state.feed });

export default connect(mapStateToProps, { getFeed })(Trending);
