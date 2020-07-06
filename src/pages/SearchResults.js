import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSearchResults, clearSearchResults } from "../actions";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import NoResults from '../components/NoResults';
import ChannelInfo from "../components/ChannelInfo";
import Skeleton from '../skeletons/TrendingSkeleton';

const StyledChannels = styled.div`
	margin-top: 1rem;
`;

const SearchResults = ({
	isFetching,
	videos,
	users,
	getSearchResults,
	clearSearchResults
}) => {
	const { searchterm } = useParams();

	useEffect(() => {
		getSearchResults(searchterm);

		return () => {
			clearSearchResults();
		};
	}, [getSearchResults, searchterm, clearSearchResults]);

	if (isFetching) {
		return <Skeleton title="true"/>
	}

	if(!isFetching && !videos.length && !users.length) {
		return <NoResults title="No results found" text="Try different keywords"/>
	}

	return (
		<StyledTrending>
			<h2>Search Results</h2>
			<StyledChannels>
				{!isFetching &&
					users?.map(channel => (
						<ChannelInfo key={channel.id} search={true} channel={channel} />
					))}
			</StyledChannels>
			{!isFetching &&
				videos?.map(video => (
					<Link key={video.id} to={`/watch/${video.id}`}>
						<TrendingCard video={video} />
					</Link>
				))}
		</StyledTrending>
	);
};

const mapStateToProps = ({ searchResult }) => ({
	isFetching: searchResult.isFetching,
	videos: searchResult.videos,
	users: searchResult.users
});

export default connect(mapStateToProps, {
	getSearchResults,
	clearSearchResults
})(SearchResults);
