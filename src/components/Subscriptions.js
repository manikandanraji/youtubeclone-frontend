import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { closeSidebar } from '../actions';

const Wrapper = styled.div`
	h4 {
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		letter-spacing: 1.2px;
		color: ${props => props.theme.secondaryColor};
		padding-left: 1.5rem;
	}

	.sub {
		display: flex;
		align-items: center;
		padding: 0.2rem 0;
		margin-bottom: 0.5rem;
		padding-left: 1.5rem;
	}

	.sub:hover {
		cursor: pointer;
		background: ${props => props.theme.darkGrey};
	}

	.sub img {
		margin-right: 1rem;
		width: 22px;
		height: 22px;
		border-radius: 11px;
	}
`;

const Subscriptions = ({ subs, closeSidebar }) => {
	return (
		<Wrapper>
			<h4>Subscriptions</h4>
			{subs?.map(sub => (
				<Link key={sub.userId} onClick={() => closeSidebar()} to={`/channel/${sub.userId}`}>
					<div className="sub">
						<img src={sub.User.avatar} alt="avatar" />
						<span>{sub.User.username}</span>
					</div>
				</Link>
			))}
		</Wrapper>
	);
};

const mapStateToProps = state => {
	const duplicateSubs = state.feed.filter(
		video => video.userId !== state.user.id
	);

	let subs = [];

	duplicateSubs.forEach(duplicateSub => {
		const exists = subs.filter(sub => sub.userId === duplicateSub.userId);

		if (!exists.length) {
			subs.push(duplicateSub);
		}
	});

	return { subs };
};

export default connect(mapStateToProps, { closeSidebar })(Subscriptions);
