import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import UploadVideoModal from "./UploadVideoModal";
import { HamburgerIcon, NotificationIcon, UploadIcon } from "./Icons";

const FlexCenter = styled.div`
	display: flex;
	align-items: center;

	svg {
		margin-right: 0.5rem;
	}
`;

const Avatar = styled.img`
	width: 26px;
	height: 26px;
	border-radius: 13px;
`;

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

	.logo span {
		position: relative;
		top: 1px;
	}

	svg {
		height: 26px;
		width: 26px;
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
`;

const Navbar = ({ logoutUser, user }) => {
	const [showModal, setShowModal] = useState(true);

	return (
		<Wrapper>
			<FlexCenter className="logo">
				<HamburgerIcon />
				<span>YouTube Clone</span>
			</FlexCenter>

			<input className="search" type="text" placeholder="Search" />

			<ul>
				<li onClick={() => setShowModal(true)}>
					<UploadIcon />
					{showModal && <UploadVideoModal show={showModal}/>}
				</li>
				<li>
					<NotificationIcon />
				</li>
				<li>
					<Avatar className="pointer" src={user.avatar} alt="user-avatar" />
				</li>
			</ul>
		</Wrapper>
	);
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Navbar);
