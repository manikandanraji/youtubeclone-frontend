import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Subscriptions from "./Subscriptions";
import {
	HomeIcon,
	TrendingIcon,
	SubIcon,
	LibIcon,
	HistoryIcon,
	VidIcon,
	WatchIcon,
	LikeIcon
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

	.active div {
		background: ${props => props.theme.darkGrey};
		cursor: pointer;
	}

	.active svg {
		fill: #fff;
	}

	.icon span {
		padding-left: 1rem;
		position: relative;
		top: 1px;
	}

	@media screen and (max-width: 1093px) {
		display: none;
	}
`;

const Sidebar = () => {
	return (
		<SidebarWrapper>
			<NavLink exact to="/" activeClassName="active">
				<div className="icon">
					<HomeIcon />
					<span>Home</span>
				</div>
			</NavLink>

			<NavLink to="/feed/trending" activeClassName="active">
				<div className="icon">
					<TrendingIcon />
					<span>Trending</span>
				</div>
			</NavLink>

			<NavLink to="/feed/subscriptions" activeClassName="active">
				<div className="icon">
					<SubIcon />
					<span>Subscriptions</span>
				</div>
			</NavLink>

			<div className="ruler"></div>

			<NavLink to="/feed/library" activeClassName="active">
				<div className="icon">
					<LibIcon />
					<span>Library</span>
				</div>
			</NavLink>

			<NavLink to="/feed/history" activeClassName="active">
				<div className="icon">
					<HistoryIcon />
					<span>History</span>
				</div>
			</NavLink>

			<NavLink to="/feed/my_videos" activeClassName="active">
				<div className="icon">
					<VidIcon />
					<span>Your videos</span>
				</div>
			</NavLink>

			<NavLink to="/feed/watch_later" activeClassName="active">
				<div className="icon">
					<WatchIcon />
					<span>Watch Later</span>
				</div>
			</NavLink>

			<NavLink to="/feed/liked_videos" activeClassName="active">
				<div className="icon">
					<LikeIcon />
					<span>Liked videos</span>
				</div>
			</NavLink>

			<div className="ruler"></div>

			<Subscriptions />
		</SidebarWrapper>
	);
};

export default Sidebar;
