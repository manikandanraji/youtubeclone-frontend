import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import NoResults from "../components/NoResults";
import ChannelInfo from "../components/ChannelInfo";
import Skeleton from "../skeletons/TrendingSkeleton";
import { getSearchResults, clearSearchResults } from "../reducers/searchResult";

const StyledChannels = styled.div`
  margin-top: 1rem;
`;

const SearchResults = () => {
  const { searchterm } = useParams();

  const dispatch = useDispatch();
  const { isFetching, users, videos } = useSelector(
    (state) => state.searchResult
  );

  useEffect(() => {
    dispatch(getSearchResults(searchterm));

    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, searchterm]);

  if (isFetching) {
    return <Skeleton title="true" />;
  }

  if (!isFetching && !videos.length && !users.length) {
    return <NoResults title="No results found" text="Try different keywords" />;
  }

  return (
    <StyledTrending>
      <h2>Search Results</h2>

      <StyledChannels>
        {!isFetching &&
          users.map((channel) => (
            <ChannelInfo key={channel.id} search={true} channel={channel} />
          ))}
      </StyledChannels>

      {!isFetching &&
        videos.map((video) => (
          <Link key={video.id} to={`/watch/${video.id}`}>
            <TrendingCard video={video} />
          </Link>
        ))}
    </StyledTrending>
  );
};

export default SearchResults;
