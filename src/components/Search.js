import React from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import useInput from "../hooks/useInput";

const Wrapper = styled.div`
	input.search {
		background: ${props => props.theme.black};
		padding: 0.4rem 1rem;
		border: 1px solid ${props => props.theme.darkGrey};
		height: 31px;
		color: ${props => props.theme.primaryColor};
	}

	@media screen and (max-width: 700px) {
		input.search {
			display: none;
		}
	}
`;

const Search = () => {
	const history = useHistory();
	const searchterm = useInput("");

	const handleSearch = e => {
		if (e.keyCode === 13) {
			console.log(searchterm.value);
			history.push(`/results/${searchterm.value}`);
			searchterm.setValue('');
		}
	};

	return (
		<Wrapper>
			<input
				className="search"
				type="text"
				placeholder="Search"
				value={searchterm.value}
				onKeyDown={handleSearch}
				onChange={searchterm.onChange}
			/>
		</Wrapper>
	);
};

export default Search;
