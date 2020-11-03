import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  img {
    width: 106px;
    height: 106px;
    border-radius: 53px;
    margin-bottom: 0.8rem;
    object-fit: cover;
  }

  .channel {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    margin: 0 auto;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChannelTabChannels = () => {
  const { channels } = useSelector((state) => state.profile.data);

  if (!channels.length) {
    return <p>Not subscribed to any channels yet</p>;
  }

  return (
    <Wrapper>
      {channels.map((channel) => (
        <Link to={`/channel/${channel.id}`} key={channel.id}>
          <div className="channel">
            <img src={channel.avatar} alt="avatar" />
            <h3>{channel.username}</h3>
            <p className="secondary">{channel.subscribersCount} subscribers</p>
          </div>
        </Link>
      ))}
    </Wrapper>
  );
};

export default ChannelTabChannels;
