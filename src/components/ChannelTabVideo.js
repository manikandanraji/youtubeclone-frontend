import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import VideoCard from "./VideoCard";
import styled from "styled-components";

const Wrapper = styled.div`
	.videos {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 2rem;
	}

	@media screen and (max-width: 830px) {
		.videos {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (max-width: 540px) {
		.videos {
			grid-template-columns: 1fr;
		}
	}
`;

const ChannelTabVideo = ({ videos }) => {
	if(!videos?.length) {
		return <p>This channel hasn't posted any videos yet</p>
	}

	return (
		<Wrapper>
			<div className="videos">
				{videos?.map(video => (
					<Link to={`/watch/${video.id}`} key={video.id}>
						<VideoCard nousername={true} hideavatar={true} video={video} />
					</Link>
				))}
			</div>
		</Wrapper>
	);
};

const mapStateToProps = state => ({ videos: state.profile.videos });

export default connect(mapStateToProps)(ChannelTabVideo);
