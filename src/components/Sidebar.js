import React from "react";
import styled from "styled-components";
import Subscriptions from "./Subscriptions";
import {
	HomeIcon,
	TrendingIcon,
	SubIcon,
	LibIcon,
	HistoryIcon,
	VidIcon,
	WatchIcon,
	LikeIcon,
	MoreIcon,
} from "./Icons";

const SidebarWrapper = styled.div`
	position: fixed;
	top: 55px;
	left: 0;
	height: 100vh;
	width: 240px;
	background: ${props => props.theme.grey};
	padding-top: 1rem;
	overflow: auto;
	padding-bottom: 1.5rem;

	&::-webkit-scrollbar {
		width: 0;
	}

	.icon {
		display: flex;
		align-items: center;
		padding: 0.2rem 0;
		padding-left: 1.5rem;
		margin-bottom: 0.4rem;
	}

	.icon:not(.hover-disable):hover {
		background: ${props => props.theme.darkGrey};
		cursor: pointer;
	}

	.icon span {
		padding-left: 1rem;
		position: relative;
		top: 1px;
	}

	.ruler {
		height: 1px;
		background: ${props => props.theme.darkGrey};
		margin: 1rem 0;
	}

	@media screen and (max-width: 1093px) {
		display: none;
	}
`;

const Sidebar = () => {
	return (
		<SidebarWrapper>
			<div className="icon">
				<HomeIcon />
				<span>Home</span>
			</div>
			<div className="icon">
				<TrendingIcon />
				<span>Trending</span>
			</div>
			<div className="icon">
				<SubIcon />
				<span>Subscriptions</span>
			</div>

			<div className="ruler"></div>

			<div className="icon">
				<LibIcon />
				<span>Library</span>
			</div>
			<div className="icon">
				<HistoryIcon />
				<span>History</span>
			</div>
			<div className="icon">
				<VidIcon />
				<span>Your videos</span>
			</div>
			<div className="icon">
				<WatchIcon />
				<span>Watch Later</span>
			</div>
			<div className="icon">
				<LikeIcon />
				<span>Liked videos</span>
			</div>
			<div className="icon">
				<MoreIcon />
				<span>Show more</span>
			</div>

			<div className="ruler"></div>

			<Subscriptions />
		</SidebarWrapper>
	);
};

export default Sidebar;
