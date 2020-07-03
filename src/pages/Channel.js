import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import EditProfile from "../components/EditProfile";
import ChannelTabVideo from "../components/ChannelTabVideo";
import ChannelTabAbout from "../components/ChannelTabAbout";
import ChannelTabChannels from "../components/ChannelTabChannels";
import Button from "../styles/Button";
import {
	clearProfile,
	getProfile,
	subscribeFromProfile,
	unsubscribeFromProfile
} from "../actions";

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
	clearProfile,
	getProfile,
	profile,
	loggedInUserId,
	subscribeFromProfile,
	unsubscribeFromProfile
}) => {
	const { userId } = useParams();
	console.log(userId);

	const [tab, setTab] = useState("VIDEOS");

	useEffect(() => {
		clearProfile();
		getProfile(userId || loggedInUserId);
	}, [userId, loggedInUserId, clearProfile, getProfile]);

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
						<Button grey onClick={() => unsubscribeFromProfile()}>
							Subscribed
						</Button>
					)}

					{!profile.isMe && !profile.isSubscribed && (
						<Button onClick={() => subscribeFromProfile()}>Subscribe</Button>
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

const mapStateToProps = state => ({ profile: state.profile });

export default connect(mapStateToProps, {
	clearProfile,
	getProfile,
	subscribeFromProfile,
	unsubscribeFromProfile
})(Channel);
