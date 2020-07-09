import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import EditProfileModal from "./EditProfileModal";
import Button from "../styles/Button";
import { SignoutIcon } from "./Icons";
import { logoutUser } from "../actions";

const Wrapper = styled.div`
  svg {
    width: 30px;
    height: 30px;
    margin-left: 1rem;
    fill: ${(props) => props.theme.darkGrey};
  }

  div {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 440px) {
    margin-top: 1rem;
  }
`;

const EditProfile = ({ logoutUser }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Wrapper>
        <div>
          <Button grey onClick={() => setShowModal(true)}>
            Edit Profile
          </Button>
          <SignoutIcon onClick={() => logoutUser()} />
        </div>
      </Wrapper>
      {showModal && <EditProfileModal closeModal={closeModal} />}
    </>
  );
};
export default connect(null, { logoutUser })(EditProfile);
