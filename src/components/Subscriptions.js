import React from "react";
import styled from "styled-components";

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

const Subscriptions = () => {
	const URL =
		"https://yt3.ggpht.com/a/AATXAJyeCBlH8r_5nWD3JlwBeeDW6F9W8CD82axJiBWQ=s100-c-k-c0xffffffff-no-rj-mo";

	const subs = [
		{ img: URL, channel: "Cody Ko" },
		{ img: URL, channel: "Pewdipie" },
		{ img: URL, channel: "Kelsey Krepel" }
	];

	return (
		<Wrapper>
			<h4>Subscriptions</h4>
			{subs.map(sub => (
				<div key={sub.channel} className="sub">
					<img src={sub.img} alt="avatar" />
					<span>{sub.channel}</span>
				</div>
			))}
		</Wrapper>
	);
};

export default Subscriptions;
