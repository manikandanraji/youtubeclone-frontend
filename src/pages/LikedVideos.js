import React from 'react';
import styled from 'styled-components';
import { LikeIcon } from '../components/Icons'

const Wrapper = styled.div`
	padding: 1.3rem;
	width: 80%;
	margin: 0 auto;

	p {
		margin-top: 0.4rem;
	}

	svg {
		margin-right: 0.3rem;
	}
`

const LikedVideos = () => {
	return (
		<Wrapper>
			<h3 className="flex-row"><LikeIcon/> Liked Videos</h3>
			<p className="secondary">Videos that you watch will show up here</p>
		</Wrapper>
  )
}

export default LikedVideos;
