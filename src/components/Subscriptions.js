import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { closeSidebar } from "../reducers/sidebar";

const Wrapper = styled.div`
  h4 {
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    letter-spacing: 1.2px;
    color: ${(props) => props.theme.secondaryColor};
    padding-left: 1.5rem;
  }

  .channel {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
  }

  .channel:hover {
    cursor: pointer;
    background: ${(props) => props.theme.darkGrey};
  }

  .channel img {
    margin-right: 1rem;
    width: 22px;
    height: 22px;
    object-fit: cover;
    border-radius: 11px;
  }
`;

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.user.data);

  return (
    <Wrapper>
      {channels.length > 0 && <h4>Subscriptions</h4>}

      {channels?.map((channel) => (
        <Link
          key={channel.id}
          onClick={() => dispatch(closeSidebar())}
          to={`/channel/${channel.id}`}
        >
          <div className="channel">
            <img src={channel.avatar} alt="avatar" />
            <span>{channel.username}</span>
          </div>
        </Link>
      ))}
    </Wrapper>
  );
};

export default Subscriptions;
