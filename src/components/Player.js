import React, { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Player = ({ src, poster }) => {
	let videoRef;

	useEffect(() => {
		const player = videojs(videoRef);
		player.poster(poster);
		player.src(src);

		return () => {
			console.log(player)
			player.dispose();
		}
	}, [src, poster, videoRef]);

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

export default Player;
