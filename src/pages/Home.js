import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import VideoCard from "../components/VideoCard";
import { getFeed } from "../actions";

const Wrapper = styled.div`
	padding: 1.3rem;

	.recommended {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		margin: 1rem 0;
	}
`;

const Home = ({ feed, getFeed }) => {
	console.log(feed);
	useEffect(() => {
		getFeed()
	}, [getFeed]);

	return (
		<Wrapper>
			<h2>Recommended</h2>
			<div className="recommended">
				{feed.map(video => (
					<VideoCard key={video.id} video={video} />
				))}
			</div>
		</Wrapper>
	);
};

const mapStateToProps = state => ({ feed: state.feed });

export default connect(mapStateToProps, { getFeed })(Home);
