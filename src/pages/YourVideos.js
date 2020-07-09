import React, { useEffect } from "react";
import { connect } from "react-redux";
import Channel from "./Channel";
import { getProfile } from "../actions";

const YourVideos = ({ userId, profile, getProfile }) => {
  useEffect(() => {
    getProfile(userId);
  }, [getProfile, userId]);

  return <Channel profile={profile} loggedInUserId={userId} />;
};

const mapStateToProps = (state) => ({
  userId: state.user.id,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(YourVideos);
