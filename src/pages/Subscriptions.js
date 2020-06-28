import React from 'react';
import styled from 'styled-components';
import VideoCard from '../components/VideoCard'
import subs from '../data';

const Wrapper = styled.div`
	.subs {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		margin: 1rem 0;
	}
`

const Subscriptions = () => {
	return (
		<Wrapper>
			<h2>Today</h2>
			<div className="subs">
				{subs.map(sub => <VideoCard hideavatar={true} video={sub}/>)}
				{subs.map(sub => <VideoCard hideavatar={true} video={sub}/>)}
				{subs.map(sub => <VideoCard hideavatar={true} video={sub}/>)}
			</div>
		</Wrapper>
  )
}

export default Subscriptions;
