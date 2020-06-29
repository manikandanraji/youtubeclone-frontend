import React from 'react';
import styled from 'styled-components';
import { WatchIcon } from '../components/Icons';

const Wrapper = styled.div`
	padding: 1.3rem;
	width: 80%;
	margin: 0 auto;

	svg {
		margin-right: 0.5rem;
	}

	p {
		margin-top: 1rem;
	}

`

const History = () => {
	return (
		<Wrapper>
			<h3 className="flex-row"><WatchIcon />Watch History</h3>
			<p className="secondary">Videos that you watch will show up here</p>
		</Wrapper>
  )
}

export default History;
