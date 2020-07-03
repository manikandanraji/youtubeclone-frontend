import React from "react";
// import videojs from "video.js";
import "video.js/dist/video-js.css";

const Player = ({ playerOptions }) => {
	return (
		<div>
			<div data-vjs-player>
				<video className="video-js vjs-fill"></video>
			</div>
		</div>
	);
};

export default Player;
