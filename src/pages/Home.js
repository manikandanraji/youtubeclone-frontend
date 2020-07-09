import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import VideoCard from "../components/VideoCard";
import VideoGrid from "../styles/VideoGrid";
import { getRecommendations } from "../actions";
import Skeleton from "../skeletons/HomeSkeleton";

export const StyledHome = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 7rem;

  h2 {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1093px) {
    width: 95%;
  }

  @media screen and (max-width: 1090px) {
    width: 99%;
  }

  @media screen and (max-width: 870px) {
    width: 90%;
  }

  @media screen and (max-width: 670px) {
    width: 99%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;

const Home = ({ isFetching, videos, getRecommendations }) => {
  useEffect(() => {
    getRecommendations();
  }, [videos.length, getRecommendations]);

  if (isFetching) {
    return <Skeleton title={true} />;
  }

  return (
    <StyledHome>
      <h2>Recommended</h2>
      <VideoGrid>
        {!isFetching &&
          videos.map((video) => (
            <Link key={video.id} to={`/watch/${video.id}`}>
              <VideoCard video={video} />
            </Link>
          ))}
      </VideoGrid>
    </StyledHome>
  );
};

const mapStateToProps = ({ recommendation }) => ({
  isFetching: recommendation.isFetching,
  videos: recommendation.videos,
});

export default connect(mapStateToProps, { getRecommendations })(Home);
