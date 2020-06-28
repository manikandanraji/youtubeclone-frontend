import React from 'react';
import styled from 'styled-components';
import TrendingCard from '../components/TrendingCard'
import trending from '../data';

const Wrapper = styled.div`
`

const Trending = () => {
	return (
		<Wrapper>
			<h2>Trending</h2>
			<div className="trending">
				{trending.map(video => <TrendingCard key={video.title} video={video}/>)}
			</div>
		</Wrapper>
  )
}

export default Trending;
