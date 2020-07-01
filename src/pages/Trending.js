import React, { useEffect } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import TrendingCard from '../components/TrendingCard'
import { getFeed } from "../actions";

const Wrapper = styled.div`
	padding: 1.3rem;
	width: 90%;
	margin: 0 auto;
`

const Trending = ({ feed, getFeed }) => {
	useEffect(() => {
		getFeed()
	}, [getFeed]);

	return (
		<Wrapper>
			<h2>Trending</h2>
			<div className="trending">
				{feed.map(video => <TrendingCard key={video.id} video={video}/>)}
			</div>
		</Wrapper>
  )
}

const mapStateToProps = state => ({ feed: state.feed });

export default connect(mapStateToProps, { getFeed })(Trending);
