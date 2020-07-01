import React from "react";
import styled from "styled-components";
import { timeSince } from "../utils";

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

	h3 {
		width: 90%;
	}

	p {
		font-size: 0.9rem;
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
			<img className="thumb" src={video.thumbnail} alt="thumbnail" />
			<div className="video-info-container">
				<h3>{video.title}</h3>
				<p className="secondary">
					<span>{video.User.username}</span>

					<span>•</span>
					{video.views === 0 && <span>No views</span>}

					{video.views !== 0 && (
						<span>
							{video.views > 1 ? `${video.views} views` : `${video.views} view`}
						</span>
					)}
					<span>•</span>

					<span>{timeSince(video.createdAt)} ago</span>
				</p>
				<p className="secondary">{video.description.substr(0, 170)}</p>
			</div>
		</Wrapper>
	);
};

export default TrendingCard;
