import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import VideoCard from "../components/VideoCard";
import Button from "../styles/Button";
import Player from "../components/Player";
import NoResults from "../components/NoResults";
import Skeleton from "../skeletons/WatchVideoSkeleton";
import { LikeIcon, DislikeIcon } from "../components/Icons";
import {
	getRecommendations,
	clearVideo,
	getVideo,
	unsubscribeChannel,
	subscribeChannel,
	likeVideo,
	dislikeVideo,
	cancelLike,
	cancelDislike,
	clearNotFound
} from "../actions";
import { SUBSCRIBE_FROM_VIDEO, UNSUBSCRIBE_FROM_VIDEO } from "../actions/types";
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
	isFetching,
	next,
	video,
	clearVideo,
	getVideo,
	getRecommendations,
	subscribeChannel,
	unsubscribeChannel,
	likeVideo,
	cancelLike,
	dislikeVideo,
	cancelDislike,
	notfound,
	clearNotFound
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
		getVideo(videoId);
		getRecommendations();

		return () => {
			clearNotFound();
			clearVideo();
		};
	}, [videoId, clearVideo, getRecommendations, getVideo, clearNotFound]);

	if (notfound) {
		return (
			<NoResults
				title="Page not found"
				text="The page you are looking for is not found or it may have been removed"
			/>
		);
	}

	if (isFetching) {
		return <Skeleton />
	}

	return (
		<Wrapper
			filledLike={video && video.isLiked}
			filledDislike={video && video.isDisliked}
		>
			<div className="video-container">
				<div className="video">{!isFetching && <Player />}</div>

				<div className="video-info">
					<h3>{video.title}</h3>

					<div className="video-info-stats">
						<p>
							<span>{video.views} views</span> <span>•</span>{" "}
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
									subscribeChannel({
										channel: {
											id: video.User.id,
											avatar: video.User.avatar,
											username: video.User.username
										},
										type: SUBSCRIBE_FROM_VIDEO
									})
								}
							>
								Subscribe
							</Button>
						)}
						{!video.isVideoMine && video.isSubscribed && (
							<Button
								grey
								onClick={() =>
									unsubscribeChannel({
										type: UNSUBSCRIBE_FROM_VIDEO,
										channelId: video.userId
									})
								}
							>
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
				{!isFetching &&
					next
						.filter(vid => vid.id !== video.id)
						.slice(0, 3)
						.map(video => (
							<Link key={video.id} to={`/watch/${video.id}`}>
								<VideoCard key={video.id} hideavatar={true} video={video} />
							</Link>
						))}
			</div>
		</Wrapper>
	);
};

const mapStateToProps = ({ notfound, video, recommendation }) => ({
	isFetching: video.isFetching || recommendation.isFetching,
	video,
	next: recommendation.videos,
	notfound
});

export default connect(mapStateToProps, {
	clearVideo,
	getVideo,
	getRecommendations,
	subscribeChannel,
	unsubscribeChannel,
	likeVideo,
	dislikeVideo,
	cancelLike,
	cancelDislike,
	clearNotFound
})(WatchVideo);
