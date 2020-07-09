import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div``;

const ChannelTabAbout = ({ about }) => {
  return (
    <Wrapper>
      <p>{about ? about : "No description for this channel"}</p>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  about: state.profile.channelDescription,
});

export default connect(mapStateToProps)(ChannelTabAbout);
