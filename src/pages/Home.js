import React from "react";
import styled from "styled-components";
import VideoCard from "../components/VideoCard";
import recommended from "../data";

const Wrapper = styled.div`
	padding: 1.3rem;

	.recommended {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		margin: 1rem 0;
	}
`;

const Home = () => {
	return (
		<Wrapper>
			<h2>Recommended</h2>
			<div className="recommended">
				{recommended.map(video => (
					<VideoCard key={video.title} video={video} />
				))}
				{recommended.map(video => (
					<VideoCard key={video.title} video={video} />
				))}
				{recommended.map(video => (
					<VideoCard key={video.title} video={video} />
				))}
			</div>
		</Wrapper>
	);
};

export default Home;
