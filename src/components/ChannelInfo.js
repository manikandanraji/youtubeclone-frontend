import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 1rem 0;

	img {
		width: 134px;
		height: 134px;
		border-radius: 67px;
		object-fit: cover;
		margin-right: 1.2rem;
	}

	p span:first {
		padding-right: 0.6rem;
	}

	@media screen and (max-width: 580px) {
		font-size: 0.9rem;

		img {
			width: 100px;
			height: 100px;
			border-radius: 50px;
		}
	}
`;

const ChannelInfo = ({ channel }) => {
	return (
		<Wrapper>
			<img src={channel.avatar} alt="avatar" />
			<div className="channel-info-meta">
				<h3>{channel.username}</h3>
				<p className="secondary">
					<span>{channel.subscribersCount} subscribers</span> <span>•</span>{" "}
					<span>{channel.videosCount} videos</span>
				</p>
				{channel.channelDescription && (
					<p className="secondary">{channel.channelDescription}</p>
				)}
			</div>
		</Wrapper>
	);
};

export default ChannelInfo;
