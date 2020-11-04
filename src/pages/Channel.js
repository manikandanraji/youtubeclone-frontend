import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";

// components
import EditProfile from "../components/EditProfile";
import ChannelTabVideo from "../components/ChannelTabVideo";
import ChannelTabAbout from "../components/ChannelTabAbout";
import ChannelTabChannels from "../components/ChannelTabChannels";
import NoResults from "../components/NoResults";
import Button from "../styles/Button";
import Skeleton from "../skeletons/ChannelSkeleton";

// reducers and utils
import { addChannel, removeChannel } from "../reducers/user";
import {
  getProfile,
  clearProfile,
  subscribeFromProfile,
  unsubscribeFromProfile,
} from "../reducers/profile";
import { client, addChannelLocalSt, removeChannelLocalSt } from "../utils";

const activeTabStyle = {
  borderBottom: "2px solid white",
  color: "white",
};

const Wrapper = styled.div`
  background: ${(props) => props.theme.black};
  min-height: 100vh;
  padding-bottom: 7rem;

  .cover {
    height: 170px;
  }

  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-tabs {
    padding: 1.2rem 1rem;
    background: ${(props) => props.theme.bg};
  }

  .header {
    width: 80%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }

  .tabs,
  .tab {
    margin: 0 auto;
    margin-top: 1.5rem;
    width: 80%;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  li {
    margin-right: 2rem;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  li:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 860px) {
    .header,
    .tabs,
    .tab {
      width: 90%;
    }
  }

  @media screen and (max-width: 470px) {
    .header,
    .tabs {
      width: 100%;
    }
  }

  ${(props) =>
    props.editProfile &&
    css`
      @media screen and (max-width: 440px) {
        .header {
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
      }
    `}
`;

const Channel = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const { id: loggedInUserId } = useSelector((state) => state.user.data);
  const { isFetching, data: profile } = useSelector((state) => state.profile);

  const [tab, setTab] = useState("VIDEOS");

  const profileId = userId || loggedInUserId;

  const handleSubscribe = (channel) => {
    dispatch(subscribeFromProfile());
    dispatch(addChannel(channel));
    addChannelLocalSt(channel);
    client(`${process.env.REACT_APP_BE}/users/${channel.id}/togglesubscribe`);
  };

  const handleUnsubscribe = (channelId) => {
    dispatch(unsubscribeFromProfile());
    dispatch(removeChannel(channelId));
    removeChannelLocalSt(channelId);
    client(`${process.env.REACT_APP_BE}/users/${channelId}/togglesubscribe`);
  };

  useEffect(() => {
    dispatch(getProfile(profileId));

    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch, profileId]);

  if (!isFetching && !profile) {
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );
  }

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <Wrapper editProfile={profile.isMe}>
      <div className="cover">
        <img src={profile.cover} alt="channel-cover" />
      </div>

      <div className="header-tabs">
        <div className="header">
          <div className="flex-row">
            <img
              className="avatar lg"
              src={profile.avatar}
              alt="channel avatar"
            />
            <div>
              <h3>{profile.username}</h3>
              <span className="secondary">
                {profile.subscribersCount} subscribers
              </span>
            </div>
          </div>

          {profile.isMe && <EditProfile />}

          {!profile.isMe && profile.isSubscribed && (
            <Button grey onClick={() => handleUnsubscribe(profile.id)}>
              Subscribed
            </Button>
          )}

          {!profile.isMe && !profile.isSubscribed && (
            <Button
              onClick={() =>
                handleSubscribe({
                  id: profile.id,
                  avatar: profile.avatar,
                  username: profile.username,
                })
              }
            >
              Subscribe
            </Button>
          )}
        </div>

        <div className="tabs">
          <ul className="secondary">
            <li
              style={tab === "VIDEOS" ? activeTabStyle : {}}
              onClick={() => setTab("VIDEOS")}
            >
              Videos
            </li>
            <li
              style={tab === "CHANNELS" ? activeTabStyle : {}}
              onClick={() => setTab("CHANNELS")}
            >
              Channels
            </li>
            <li
              style={tab === "ABOUT" ? activeTabStyle : {}}
              onClick={() => setTab("ABOUT")}
            >
              About
            </li>
          </ul>
        </div>
      </div>

      <div className="tab">
        {tab === "VIDEOS" && <ChannelTabVideo />}
        {tab === "ABOUT" && <ChannelTabAbout />}
        {tab === "CHANNELS" && <ChannelTabChannels />}
      </div>
    </Wrapper>
  );
};

export default Channel;
