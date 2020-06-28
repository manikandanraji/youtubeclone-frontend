import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	background: ${props => props.theme.black};
	min-height: 100vh;

	.cover {
		height: 170px;
	}

	.cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.header-tabs {
		padding: 1.2rem 1rem;
		background: ${props => props.theme.bg};
	}

	.header {
		width: 80%;
		display: flex;
		margin: 0 auto;
		justify-content: space-between;
		align-items: center;
	}

	button {
		padding: 0.4rem 1rem;
		background: ${props => props.theme.darkGrey};
		border: 1px solid ${props => props.theme.darkGrey};
		color: ${props => props.theme.secondaryColor};
		border-radius: 4px;
	}

	.tabs {
		margin: 0 auto;
		margin-top: 1.5rem;
		width: 80%;
	}

	ul {
		list-style: none;
		display: flex;
		align-items: center;
	}

	li {
		padding-right: 2rem;
		text-transform: uppercase;
		letter-spacing: 1.1px;
	}

	li:hover {
		cursor: pointer;
	}
`;

const Channel = () => {
	const COVER =
		"https://res.cloudinary.com/douy56nkf/image/upload/v1593254711/instaclone/eavdoktvaz46jb1aazw2.jpg";

	const AVATAR =
		"https://yt3.ggpht.com/a/AATXAJyeCBlH8r_5nWD3JlwBeeDW6F9W8CD82axJiBWQ=s100-c-k-c0xffffffff-no-rj-mo";

	return (
		<Wrapper>
			<div className="cover">
				<img src={COVER} alt="channel-cover" />
			</div>
			<div className="header-tabs">
				<div className="header">
					<div className="flex-row">
						<img className="avatar lg" src={AVATAR} alt="channel avatar" />
						<div>
							<h3>Cody Ko</h3>
							<span className="secondary">811K subscribers</span>
						</div>
					</div>
					<button>Subscribe</button>
				</div>
				<div className="tabs">
					<ul className="secondary">
						<li>Home</li>
						<li>Videos</li>
						<li>Playlists</li>
						<li>About</li>
					</ul>
				</div>
			</div>
		</Wrapper>
	);
};

export default Channel;
