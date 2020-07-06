import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import EditProfile from "../components/EditProfile";
import ChannelTabVideo from "../components/ChannelTabVideo";
import ChannelTabAbout from "../components/ChannelTabAbout";
import ChannelTabChannels from "../components/ChannelTabChannels";
import NoResults from "../components/NoResults";
import Button from "../styles/Button";
import {
	clearProfile,
	getProfile,
	subscribeChannel,
	unsubscribeChannel,
	clearNotFound
} from "../actions";
import {
	SUBSCRIBE_FROM_PROFILE,
	UNSUBSCRIBE_FROM_PROFILE
} from "../actions/types";
import Skeleton from '../skeletons/ChannelSkeleton';

const activeTabStyle = {
	borderBottom: "2px solid white",
	color: "white"
};

const Wrapper = styled.div`
	background: ${props => props.theme.black};
	min-height: 100vh;
	padding-bottom: 2rem;

	.cover {
		height: 170px;
	}

	.cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.header-tabs {
		padding: 1.2rem 1rem;
		background: ${props => props.theme.bg};
	}

	.header {
		width: 80%;
		display: flex;
		margin: 0 auto;
		justify-content: space-between;
		align-items: center;
	}

	.tabs,
	.tab {
		margin: 0 auto;
		margin-top: 1.5rem;
		width: 80%;
	}

	ul {
		list-style: none;
		display: flex;
		align-items: center;
	}

	li {
		margin-right: 2rem;
		text-transform: uppercase;
		letter-spacing: 1.1px;
	}

	li:hover {
		cursor: pointer;
	}

	@media screen and (max-width: 860px) {
		.header,
		.tabs,
		.tab {
			width: 90%;
		}
	}

	@media screen and (max-width: 450px) {
		.header {
			width: 100%;
		}
	}
`;

const Channel = ({
	isFetching,
	clearProfile,
	getProfile,
	profile,
	loggedInUserId,
	subscribeChannel,
	unsubscribeChannel,
	notfound,
	clearNotFound
}) => {
	const { userId } = useParams();
	const [tab, setTab] = useState("VIDEOS");

	useEffect(() => {
		getProfile(userId || loggedInUserId);

		return () => {
			clearProfile();
			clearNotFound();
		};
	}, [userId, loggedInUserId, clearProfile, getProfile, clearNotFound]);

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
		<Wrapper>
			<div className="cover">
				<img src={profile.cover} alt="channel-cover" />
			</div>

			<div className="header-tabs">
				<div className="header">
					<div className="flex-row">
						<img
							className="avatar lg"
							src={profile.avatar}
							alt="channel avatar"
						/>
						<div>
							<h3>{profile.username}</h3>
							<span className="secondary">
								{profile.subscribersCount} subscribers
							</span>
						</div>
					</div>

					{profile.isMe && <EditProfile />}

					{!profile.isMe && profile.isSubscribed && (
						<Button
							grey
							onClick={() =>
								unsubscribeChannel({
									type: UNSUBSCRIBE_FROM_PROFILE,
									channelId: profile.id
								})
							}
						>
							Subscribed
						</Button>
					)}

					{!profile.isMe && !profile.isSubscribed && (
						<Button
							onClick={() =>
								subscribeChannel({
									channel: {
										id: profile.id,
										avatar: profile.avatar,
										username: profile.username
									},
									type: SUBSCRIBE_FROM_PROFILE
								})
							}
						>
							Subscribe
						</Button>
					)}
				</div>

				<div className="tabs">
					<ul className="secondary">
						<li
							style={tab === "VIDEOS" ? activeTabStyle : {}}
							onClick={() => setTab("VIDEOS")}
						>
							Videos
						</li>
						<li
							style={tab === "CHANNELS" ? activeTabStyle : {}}
							onClick={() => setTab("CHANNELS")}
						>
							Channels
						</li>
						<li
							style={tab === "ABOUT" ? activeTabStyle : {}}
							onClick={() => setTab("ABOUT")}
						>
							About
						</li>
					</ul>
				</div>
			</div>

			<div className="tab">
				{tab === "VIDEOS" && <ChannelTabVideo />}
				{tab === "ABOUT" && <ChannelTabAbout />}
				{tab === "CHANNELS" && <ChannelTabChannels />}
			</div>
		</Wrapper>
	);
};

const mapStateToProps = ({ notfound, profile }) => ({
	isFetching: profile.isFetching,
	profile,
	notfound
});

export default connect(mapStateToProps, {
	clearProfile,
	getProfile,
	subscribeChannel,
	unsubscribeChannel,
	clearNotFound
})(Channel);
