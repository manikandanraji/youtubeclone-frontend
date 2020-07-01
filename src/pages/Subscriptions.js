import React, { useEffect } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import VideoCard from '../components/VideoCard'
import { getFeed } from "../actions";

const Wrapper = styled.div`
	padding: 1.3rem;

	.subs {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		margin: 1rem 0;
	}
`

const Subscriptions = ({ feed, getFeed }) => {
	useEffect(() => {
		getFeed()
	}, [getFeed]);

	return (
		<Wrapper>
			<h2>Today</h2>
			<div className="subs">
				{feed.map(sub => <VideoCard key={sub.id} hideavatar={true} video={sub}/>)}
			</div>
		</Wrapper>
  )
}

const mapStateToProps = state => ({ feed: state.feed });

export default connect(mapStateToProps, { getFeed })(Subscriptions);
