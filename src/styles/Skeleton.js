import styled, { keyframes } from "styled-components";

const pulse = keyframes`
	0% {
		background-position: 0% 0%;
	}

	100% {
		background-position: -135% 0%;
	}
`;

const SkeletonPulse = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  background: linear-gradient(-90deg, #121212 0%, #161616 50%, #121212 100%);
  background-size: 400% 400%;
  animation: ${pulse} 1s linear;
`;

export const SkeletonLine = styled(SkeletonPulse)`
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};
  margin-top: ${(props) => (props.mt ? props.mt : "")};
  margin-left: ${(props) => (props.ml ? props.ml : "")};
  margin-right: ${(props) => (props.mr ? props.mr : "")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;

  &::before {
    content: "\\00a0";
  }
`;

export const VideoCardSkeleton = styled(SkeletonLine)`
  width: 100%;
  height: 180px;

  @media screen and (max-width: 600px) {
    height: 250px;
  }

  @media screen and (max-width: 420px) {
    height: 200px;
  }
`;

export const TrendingCardSkeleton = styled(SkeletonLine)`
  width: 250px;
  height: 140px;

  @media screen and (max-width: 645px) {
    width: 100%;
    height: 300px;
  }

  @media screen and (max-width: 530px) {
    width: 100%;
    height: 250px;
  }

  @media screen and (max-width: 420px) {
    width: 100%;
    height: 200px;
  }
`;

export const ChannelInfoSkeleton = styled(SkeletonLine)`
	width: 134px;
	height: 134px;
	border-radius: 67px;
	margin-right: 1.2rem;

	@media screen and (max-width: 580px) {
		width: 100px;
		height: 100px;
	}

	@media screen and (max-width: 400px) {
		width: 50px;
		height: 50px;
		position: relative;
		top: -16px;
`;
