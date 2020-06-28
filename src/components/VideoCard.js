import React from 'react';
import styled from 'styled-components';
import Avatar from '../styles/Avatar';

const Wrapper = styled.div`
	margin-bottom: 1rem;

	.thumb {
		width: 100%;
		height: 150px;
		object-fit: cover;
	}

	.video-info-container {
		display: flex;
		margin-top: 0.3rem;
	}

	.channel-avatar img {
		position: relative;
		top: 5px;
	}

	.video-info {
		margin-left: 1rem;
		line-height: 1.5;
	}

	.video-info h4 {
		margin-bottom: 0.3rem;
	}

	.video-info span {
		font-size: 0.9rem;
		padding-right: 0.1rem;
	}

`;

const VideoCard = ({ hideavatar, video }) => {
	return (
		<Wrapper>
		<img className="thumb" src={video.thumb} alt="thumbnail" />
		<div className="video-info-container">
			<div className="channel-avatar">
			{!hideavatar && 
				<Avatar src={video.thumb} alt="channel avatar"/>
			}
			</div>
			<div className="video-info">
				<h4>{video.title}</h4>
				<span className="secondary">{video.channelName}</span>
				<p className="secondary"><span>{video.views}</span> <span>•</span> <span>{video.createdAt}</span></p>
			</div>
		</div>
		</Wrapper>
  )
}

export default VideoCard;
