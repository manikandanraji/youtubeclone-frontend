import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 2rem;

	img {
		width: 106px;
		height: 106px;
		border-radius: 53px;
		margin-bottom: 0.8rem;
		object-fit: cover;
	}

	.channel {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;

const ChannelTabChannels = ({ channels }) => {
	return (
		<Wrapper>
			{channels?.map(channel => (
				<Link to={`/channel/${channel.id}`} key={channel.id}>
					<div className="channel">
						<img src={channel.avatar} alt="avatar" />
						<h3>{channel.username}</h3>
						<p className="secondary">{channel.subscribersCount} subscribers</p>
					</div>
				</Link>
			))}
		</Wrapper>
	);
};

const mapStateToProps = state => ({ channels: state.profile.channels });

export default connect(mapStateToProps)(ChannelTabChannels);
