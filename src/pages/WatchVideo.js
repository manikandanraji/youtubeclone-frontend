import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import VideoCard from "../components/VideoCard";
import Button from "../styles/Button";
import Player from "../components/Player";
import { LikeIcon, DislikeIcon } from "../components/Icons";
import {
	getRecommendations,
	clearVideo,
	getVideo,
	unsubscribeFromVideo,
	subscribeFromVideo,
	likeVideo,
	dislikeVideo,
	cancelLike,
	cancelDislike
} from "../actions";
import { timeSince } from "../utils";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 70% 1fr;
	grid-gap: 2rem;
	padding: 1.3rem;

	.video-container .video-info {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.video-info span {
		color: ${props => props.theme.secondaryColor};
	}

	.channel-info-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.video-info-stats {
		display: flex;
		align-items: center;
	}

	.video-info-stats div {
		margin-left: 6rem;
		position: relative;
		top: -2px;
	}

	.channel-info-flex button {
		font-size: 0.9rem;
	}

	.channel-info-description {
		padding-top: 1rem;
		border-bottom: 1px solid ${props => props.theme.darkGrey};
		border-top: 1px solid ${props => props.theme.darkGrey};
	}

	.channel-info-description p {
		font-size: 0.9rem;
		padding: 1rem 0;
	}

	.related-videos img {
		height: 140px;
	}

	.related-videos div {
		margin-bottom: 1rem;
	}

	svg {
		fill: ${props => props.theme.darkGrey};
	}

	${props =>
		props.filledLike &&
		css`
			.like svg {
				fill: ${props => props.theme.blue};
			}
		`}

	${props =>
		props.filledDislike &&
		css`
			.dislike svg {
				fill: ${props => props.theme.blue};
			}
		`}

	@media screen and (max-width: 930px) {
		grid-template-columns: 90%;
		.related-videos {
			display: none;
		}
	}

	@media screen and (max-width: 930px) {
		grid-template-columns: 1fr;
	}

	@media screen and (max-width: 425px) {
		.video-info-stats div {
			margin-left: 1rem;
		}
	}
`;

const WatchVideo = ({
	next,
	video,
	clearVideo,
	getVideo,
	getRecommendations,
	subscribeFromVideo,
	unsubscribeFromVideo,
	likeVideo,
	cancelLike,
	dislikeVideo,
	cancelDislike
}) => {
	const { videoId } = useParams();

	const handleLike = () => {
		if (video.isLiked) {
			cancelLike(videoId);
		} else {
			likeVideo(video);

			if (video.isDisliked) {
				cancelDislike(videoId);
			}
		}
	};

	const handleDislike = () => {
		if (video.isDisliked) {
			cancelDislike(videoId);
		} else {
			dislikeVideo(videoId);

			if (video.isLiked) {
				cancelLike(videoId);
			}
		}
	};

	useEffect(() => {
		clearVideo();
		getVideo(videoId);
		getRecommendations();
	}, [videoId, clearVideo, getRecommendations, getVideo]);

	return (
		<Wrapper
			filledLike={video && video.isLiked}
			filledDislike={video && video.isDisliked}
		>
			<div className="video-container">
				<div className="video">
					<Player src={video?.url} poster={video?.thumbnai} />
				</div>

				<div className="video-info">
					<h3>{video.title}</h3>

					<div className="video-info-stats">
						<p>
							<span>{video.viewsCount} views</span> <span>•</span>{" "}
							<span>{timeSince(video.createdAt)} ago</span>
						</p>

						<div className="likes-dislikes flex-row">
							<p className="flex-row like">
								<LikeIcon onClick={handleLike} />{" "}
								<span>{video.likesCount}</span>
							</p>
							<p className="flex-row dislike" style={{ marginLeft: "1rem" }}>
								<DislikeIcon onClick={handleDislike} />{" "}
								<span>{video.dislikesCount}</span>
							</p>
						</div>
					</div>
				</div>

				<div className="channel-info-description">
					<div className="channel-info-flex">
						<div className="channel-info flex-row">
							<img
								className="avatar md"
								src={video.User?.avatar}
								alt="channel avatar"
							/>
							<div className="channel-info-meta">
								<h4>
									<Link to={`/channel/${video.userId}`}>
										{video.User?.username}
									</Link>
								</h4>
								<span className="secondary small">
									{video.subscribersCount} subscribers
								</span>
							</div>
						</div>
						{!video.isVideoMine && !video.isSubscribed && (
							<Button
								onClick={() =>
									subscribeFromVideo({
										id: video.User.id,
										avatar: video.User.avatar,
										username: video.User.username
									})
								}
							>
								Subscribe
							</Button>
						)}
						{!video.isVideoMine && video.isSubscribed && (
							<Button grey onClick={() => unsubscribeFromVideo(video.userId)}>
								Subscribed
							</Button>
						)}
					</div>

					<p>{video.description}</p>
				</div>
				<Comments />
			</div>

			<div className="related-videos">
				<h3 style={{ marginBottom: "1rem" }}>Up Next</h3>
				{next &&
					next
						.filter(vid => vid.id !== video.id)
						.map(video => (
							<Link key={video.id} to={`/watch/${video.id}`}>
								<VideoCard key={video.id} hideavatar={true} video={video} />
							</Link>
						))}
			</div>
		</Wrapper>
	);
};

const mapStateToProps = state => ({
	next: state.recommendation,
	video: state.video
});

export default connect(mapStateToProps, {
	clearVideo,
	getVideo,
	getRecommendations,
	subscribeFromVideo,
	unsubscribeFromVideo,
	likeVideo,
	dislikeVideo,
	cancelLike,
	cancelDislike
})(WatchVideo);
