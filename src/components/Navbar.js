import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import UploadVideo from "./UploadVideo";
import Avatar from "../styles/Avatar";
import { HamburgerIcon, NotificationIcon } from "./Icons";
import { openSidebar, closeSidebar } from "../actions";

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	background: ${props => props.theme.grey};
	z-index: 99;
	padding: 0.7rem 1.5rem;

	.toggle-navhandler {
		display: none;
	}

	.logo span {
		position: relative;
		top: 1px;
	}

	input.search {
		background: ${props => props.theme.black};
		padding: 0.4rem 1rem;
		border: 1px solid ${props => props.theme.darkGrey};
		width: 37.48%; /* 500 / 1334 */
		height: 31px;
		color: ${props => props.theme.primaryColor};
	}

	ul {
		list-style: none;
		display: flex;
	}

	li svg {
		margin-right: 1.7rem;
		position: relative;
		top: 3px;
	}

	img {
		position: relative;
		top: 3px;
	}

	@media screen and (max-width: 1093px) {
		.toggle-navhandler {
			display: block;
		}
	}

	@media screen and (max-width: 600px) {
		input.search {
			display: none;
		}
	}
`;

const Navbar = ({ logoutUser, user, open, openSidebar, closeSidebar }) => {
	const handleToggleSidebar = () => {
		if (open) {
			closeSidebar();
		} else {
			openSidebar();
		}
	};

	return (
		<Wrapper>
			<div className="logo flex-row">
				<HamburgerIcon
					className="toggle-navhandler"
					onClick={handleToggleSidebar}
				/>
				<span>YouTube Clone</span>
			</div>

			<input className="search" type="text" placeholder="Search" />

			<ul>
				<li>
					<UploadVideo />
				</li>
				<li>
					<NotificationIcon />
				</li>
				<li>
					<Link to={`/channel/${user.id}`}>
						<Avatar className="pointer" src={user.avatar} alt="user-avatar" />
					</Link>
				</li>
			</ul>
		</Wrapper>
	);
};

const mapStateToProps = state => ({ open: state.sidebar, user: state.user });

export default connect(mapStateToProps, { openSidebar, closeSidebar })(Navbar);
