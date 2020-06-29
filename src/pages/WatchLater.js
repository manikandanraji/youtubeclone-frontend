import React from "react";
import styled from "styled-components";
import { WatchIcon } from "../components/Icons";

const Wrapper = styled.div`
	padding: 1.3rem;
	width: 80%;
	margin: 0 auto;

	p {
		margin-top: 0.5rem;
	}

	svg {
		margin-right: 0.5rem;
	}
`;

const WatchLater = () => {
	return (
		<Wrapper>
			<h3 className="flex-row">
				<WatchIcon /> Watch Later
			</h3>
			<p className="secondary">Save videos to watch later. Your list will be shown right here.</p>
		</Wrapper>
	);
};

export default WatchLater;
