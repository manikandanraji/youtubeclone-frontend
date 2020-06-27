import React from "react";
import styled from 'styled-components';
import VideoCard from '../components/VideoCard';

const Wrapper = styled.div`
	.recommended {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		margin: 1rem 0;
	}
`;

const Home = () => {
	const recommended = [
		{
			thumb:
				"https://res.cloudinary.com/douy56nkf/image/upload/v1593254711/instaclone/eavdoktvaz46jb1aazw2.jpg",
			title: "My favorite thing summer 2020",
			channelName: "Super Eyepatch Wofl",
			views: "32K views",
			createdAt: "2 hours ago"
		},
		{
			thumb:
				"https://res.cloudinary.com/douy56nkf/image/upload/v1593254321/instaclone/wdyqufpfue9yut062yoc.jpg",
			title: "A look at chris nolan's The Dark Knight",
			channelName: "Chris Stuckmann",
			views: "323K views",
			createdAt: "1 hour ago"
		},
		{
			thumb:
				"https://res.cloudinary.com/douy56nkf/image/upload/v1593254341/instaclone/l9imfzwyiytrmsfewhqe.jpg",
			title: "The chillest video on YouTube",
			channelName: "Cody Ko",
			views: "21K views",
			createdAt: "2 days ago"
		},
		{
			thumb:
				"https://res.cloudinary.com/douy56nkf/image/upload/v1593254485/instaclone/p8tdwwzzssgoijl7k8qy.png",
			title: "Mr Fantastic Fox",
			channelName: "Pewdipie",
			views: "1M views",
			createdAt: "1 week ago"
		}
	];

	return (
		<Wrapper>
			<h2>Recommended</h2>
			<div className="recommended">
				{recommended.map(video => <VideoCard key={video.title} video={video}/>)}
				{recommended.map(video => <VideoCard key={video.title} video={video}/>)}
				{recommended.map(video => <VideoCard key={video.title} video={video}/>)}
			</div>
		</Wrapper>
	)
};

export default Home;
