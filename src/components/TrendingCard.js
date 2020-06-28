import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	margin: 1rem 0;
	display: flex;

	.thumb {
		width: 250px;
		height: 150px;
	}

	.video-info-container {
		margin-left: 1.2rem;
	}

	p {
		font-size: 0.9rem;
		width: 77%;
	}

	p:last-child {
		margin-top: 0.2rem;
	}

	p span {
		padding-right: 0.3rem;
	}
`;

const TrendingCard = ({ video }) => {
	return (
		<Wrapper>
			<img className="thumb" src={video.thumb} alt="thumbnail" />
			<div className="video-info-container">
				<h3>{video.title}</h3>
				<p className="secondary">
					<span>{video.channelName}</span>
					<span>•</span>
					<span>{video.views}</span>
					<span>•</span>
					<span>{video.createdAt}</span>
				</p>
				<p className="secondary">{video.description.substr(0, 170)}</p>
			</div>
		</Wrapper>
	);
};

export default TrendingCard;
