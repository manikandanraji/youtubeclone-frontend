import React from "react";
import styled from "styled-components";
import { StyledTrending } from "../pages/Trending";
import { SkeletonLine, TrendingCardSkeleton } from "../styles/Skeleton";

const SkeletonWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 750px) {
    .video-info-container {
      margin-left: 1.5rem;
    }
  }

  @media screen and (max-width: 645px) {
    flex-direction: column;

    .video-info-container {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
`;

const TrendingSkeleton = () => {
  return (
    <StyledTrending>
      <SkeletonLine width="350px" height="30px" mt="20px" mb="25px" />

      <SkeletonWrapper>
        <TrendingCardSkeleton className="thumb" mb="20px" mr="20px" />
        <div className="video-info-container">
          <SkeletonLine width="350px" height="30px" mb="20px" />
          <SkeletonLine width="300px" height="30px" mb="20px" />
        </div>
      </SkeletonWrapper>

      <SkeletonWrapper>
        <TrendingCardSkeleton className="thumb" mb="20px" mr="20px" />
        <div className="video-info-container">
          <SkeletonLine width="350px" height="30px" mb="20px" />
          <SkeletonLine width="300px" height="30px" mb="20px" />
        </div>
      </SkeletonWrapper>

      <SkeletonWrapper>
        <TrendingCardSkeleton className="thumb" mb="20px" mr="20px" />
        <div className="video-info-container">
          <SkeletonLine width="350px" height="30px" mb="20px" />
          <SkeletonLine width="300px" height="30px" mb="20px" />
        </div>
      </SkeletonWrapper>
    </StyledTrending>
  );
};

export default TrendingSkeleton;
