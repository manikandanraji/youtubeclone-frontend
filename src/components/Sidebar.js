import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import Subscriptions from "./Subscriptions";
import { closeSidebar } from "../actions";
import {
  HomeIcon,
  TrendingIcon,
  SubIcon,
  LibIcon,
  HistoryIcon,
  VidIcon,
  LikeIcon,
} from "./Icons";

const SidebarWrapper = styled.div`
  position: fixed;
  top: 55px;
  left: 0;
  height: 100vh;
  width: 240px;
  background: ${(props) => props.theme.grey};
  padding-top: 1rem;
  overflow: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    padding-left: 1.5rem;
    margin-bottom: 0.4rem;
  }

  .icon:not(.hover-disable):hover {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active div {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active svg {
    fill: #fff;
  }

  .icon span {
    padding-left: 1rem;
    position: relative;
    top: 1px;
  }

  @media screen and (max-width: 1093px) {
    transform: translateX(-100%);

    ${(props) =>
      props.open &&
      css`
        transform: translateX(0);
      `}
  }
`;

const Sidebar = ({ open, closeSidebar }) => {
  return (
    <SidebarWrapper open={open}>
      <NavLink
        onClick={() => closeSidebar()}
        exact
        to="/"
        activeClassName="active"
      >
        <div className="icon">
          <HomeIcon />
          <span>Home</span>
        </div>
      </NavLink>

      <NavLink
        onClick={() => closeSidebar()}
        to="/feed/trending"
        activeClassName="active"
      >
        <div className="icon">
          <TrendingIcon />
          <span>Trending</span>
        </div>
      </NavLink>

      <NavLink
        onClick={() => closeSidebar()}
        to="/feed/subscriptions"
        activeClassName="active"
      >
        <div className="icon">
          <SubIcon />
          <span>Subscriptions</span>
        </div>
      </NavLink>

      <div className="ruler"></div>

      <NavLink
        onClick={() => closeSidebar()}
        to="/feed/library"
        activeClassName="active"
      >
        <div className="icon">
          <LibIcon />
          <span>Library</span>
        </div>
      </NavLink>

      <NavLink
        onClick={() => closeSidebar()}
        to="/feed/history"
        activeClassName="active"
      >
        <div className="icon">
          <HistoryIcon />
          <span>History</span>
        </div>
      </NavLink>

      <NavLink
        onClick={() => closeSidebar()}
        to="/feed/my_videos"
        activeClassName="active"
      >
        <div className="icon">
          <VidIcon />
          <span>Your videos</span>
        </div>
      </NavLink>

      <NavLink
        onClick={() => closeSidebar()}
        to="/feed/liked_videos"
        activeClassName="active"
      >
        <div className="icon">
          <LikeIcon />
          <span>Liked videos</span>
        </div>
      </NavLink>

      <div className="ruler"></div>

      <Subscriptions />
    </SidebarWrapper>
  );
};

const mapStateToProps = (state) => ({ open: state.sidebar });

export default connect(mapStateToProps, { closeSidebar })(Sidebar);
