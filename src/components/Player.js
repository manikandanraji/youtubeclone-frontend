import React, { useEffect } from "react";
import { connect } from "react-redux";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Player = ({ isViewed, src, poster }) => {
	let videoRef;

	useEffect(() => {
		const player = videojs(videoRef);
		player.poster(poster);
		player.src(src);
		console.log(isViewed);

		return () => {
			console.log(player);
			player.dispose();
		};
	}, [src, poster, videoRef, isViewed]);

	return (
		<div>
			<div data-vjs-player>
				<video
					controls
					ref={node => (videoRef = node)}
					className="video-js vjs-fluid vjs-big-play-centered"
				></video>
			</div>
		</div>
	);
};

const mapStateToProps = ({ video }) => ({
	poster: video.thumb,
	src: video.url,
	isViewed: video.isViewed
});

export default connect(mapStateToProps)(Player);
