import React, { useEffect } from "react";
import { connect } from "react-redux";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { addToHistory } from "../actions";

const Player = ({ isViewed, previewUrl, src, poster, video, addToHistory }) => {
  let videoRef;

  useEffect(() => {
    const player = videojs(videoRef);
    if (!previewUrl) {
      player.poster(poster);
      player.src(src);
    } else {
      player.src({ type: "video/mp4", src: previewUrl });
    }

    player.on("ended", function () {
      if (!isViewed && !previewUrl) {
        addToHistory(video);
      }
    });

    return () => {
      player.dispose();
    };
  }, [src, poster, previewUrl, videoRef, isViewed, addToHistory]);

  return (
    <div>
      <div data-vjs-player>
        <video
          controls
          ref={(node) => (videoRef = node)}
          className="video-js vjs-fluid vjs-big-play-centered"
        ></video>
      </div>
    </div>
  );
};

const mapStateToProps = ({ video }) => ({
  poster: video.thumb,
  src: video.url,
  isViewed: video.isViewed,
  video: {
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    views: video.views + 1,
    User: {
      id: video.User?.id,
      username: video.User?.username,
      avatar: video.User?.avatar,
    },
  },
});

export default connect(mapStateToProps, { addToHistory })(Player);
