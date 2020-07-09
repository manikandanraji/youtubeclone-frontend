import React from "react";
import styled from "styled-components";
import { StyledTrending } from "../pages/Trending";
import { SkeletonLine, ChannelInfoSkeleton } from "../styles/Skeleton";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SuggestionSkeleton = () => {
  return (
    <StyledTrending>
      <SkeletonLine width="350px" height="30px" mt="20px" mb="30px" />

      <Wrapper>
        <ChannelInfoSkeleton />
        <div>
          <SkeletonLine width="250px" height="20px" mb="20px" />
          <SkeletonLine width="200px" height="20px" mb="20px" />
        </div>
      </Wrapper>

      <Wrapper>
        <ChannelInfoSkeleton />
        <div>
          <SkeletonLine width="250px" height="20px" mb="20px" />
          <SkeletonLine width="200px" height="20px" mb="20px" />
        </div>
      </Wrapper>

      <Wrapper>
        <ChannelInfoSkeleton />
        <div>
          <SkeletonLine width="250px" height="20px" mb="20px" />
          <SkeletonLine width="200px" height="20px" mb="20px" />
        </div>
      </Wrapper>
    </StyledTrending>
  );
};

export default SuggestionSkeleton;
