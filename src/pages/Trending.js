import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import TrendingCard from "../components/TrendingCard";
import { getTrending } from "../actions";

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

const Trending = ({ trending, getTrending }) => {
	useEffect(() => {
		if (!trending.length) {
			console.log('dispatching...')
			getTrending();
		}
	}, [getTrending, trending]);

	return (
		<StyledTrending>
			<h2>Trending</h2>
			<div className="trending">
				{trending.map(video => (
					<Link to={`/watch/${video.id}`} key={video.id}>
						<TrendingCard key={video.id} video={video} />
					</Link>
				))}
			</div>
		</StyledTrending>
	);
};

const mapStateToProps = state => ({ trending: state.trending });

export default connect(mapStateToProps, { getTrending })(Trending);
