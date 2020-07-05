import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import { getHistory } from "../actions";

const History = ({ isFetching, videos, getHistory }) => {
	useEffect(() => {
		getHistory();
	}, [videos.length, getHistory]);

	if (isFetching) {
		return <p>loader</p>;
	}

	return (
		<StyledTrending>
			<h2>History</h2>

			{!isFetching && !videos.length && (
				<p className="secondary">
					Videos that you have liked will show up here
				</p>
			)}

			{videos.map(video => (
				<Link to={`/watch/${video.id}`} key={video.id}>
					<TrendingCard video={video} />
				</Link>
			))}
		</StyledTrending>
	);
};

const mapStateToProps = ({ history }) => ({
	isFetching: history.isFetching,
	videos: history.videos
});

export default connect(mapStateToProps, { getHistory })(History);
