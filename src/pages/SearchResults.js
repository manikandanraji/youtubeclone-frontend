import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSearchResults } from "../actions";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import ChannelInfo from "../components/ChannelInfo";

const StyledChannels = styled.div`
	margin-top: 1rem;
`;

const SearchResults = ({ results, getSearchResults }) => {
	const { searchterm } = useParams();

	useEffect(() => {
		getSearchResults(searchterm);
	}, [getSearchResults, searchterm]);

	return (
		<StyledTrending>
			<h2>Search Results</h2>
			<StyledChannels>
				{results &&
					results?.users?.map(channel => (
						<Link key={channel.id} to={`/channel/${channel.id}`}>
							<ChannelInfo channel={channel} />
						</Link>
					))}
			</StyledChannels>
			{results &&
				results?.videos?.map(video => (
					<Link key={video.id} to={`/watch/${video.id}`}>
						<TrendingCard video={video} />
					</Link>
				))}
		</StyledTrending>
	);
};

const mapStateToProps = state => ({ results: state.searchResult });

export default connect(mapStateToProps, { getSearchResults })(SearchResults);
