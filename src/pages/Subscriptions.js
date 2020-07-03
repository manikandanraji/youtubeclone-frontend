import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Wrapper } from "./Home";
import VideoCard from "../components/VideoCard";
import VideoGrid from "../styles/VideoGrid";
import { getFeed } from "../actions";

const Subscriptions = ({ feed, getFeed }) => {
	useEffect(() => {
		getFeed();
	}, [getFeed]);

	return (
		<Wrapper>
			<h2>Subscriptions</h2>
			<VideoGrid>
				{feed.map(sub => (
					<Link key={sub.id} to={`/watch/${sub.id}`}>
						<VideoCard key={sub.id} hideavatar={true} video={sub} />
					</Link>
				))}
			</VideoGrid>
		</Wrapper>
	);
};

const mapStateToProps = state => ({ feed: state.feed });

export default connect(mapStateToProps, { getFeed })(Subscriptions);
