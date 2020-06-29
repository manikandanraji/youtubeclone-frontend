import React from "react";
import styled from "styled-components";
import { HistoryIcon, WatchIcon, LikeIcon } from "../components/Icons";

const Wrapper = styled.div`
	padding: 1.3rem;
	width: 80%;
	margin: 0 auto;

	div {
		margin-bottom: 2rem;
		width: 80%;
	}

	svg {
		margin-right: 0.5rem;
	}
`;

const Library = () => {
	return (
		<Wrapper>
			<div className="history">
				<h3 className="flex-row">
					<HistoryIcon />
					History
				</h3>
				<p className="secondary">Videos that you watch will show up here</p>
			</div>

			<div className="ruler"></div>

			<div className="watch-later">
				<h3 className="flex-row">
					<WatchIcon /> Watch Later
				</h3>
				<p className="secondary">
					Save videos to watch later. Your list will be shown right here
				</p>
			</div>

			<div className="ruler"></div>

			<div className="liked-videos">
				<h3 className="flex-row">
					<LikeIcon /> Liked Videos
				</h3>
				<p className="secondary">Videos that you liked will show up here</p>
			</div>
		</Wrapper>
	);
};

export default Library;
