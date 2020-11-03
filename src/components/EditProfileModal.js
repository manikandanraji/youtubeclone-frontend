import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { CloseIcon } from "./Icons";
import Button from "../styles/Button";
import useInput from "../hooks/useInput";
import { updateUser } from "../reducers/user";
import { updateProfile } from "../reducers/profile";
import { client, updateUserLocalSt, upload } from "../utils";

const openModal = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .edit-profile {
    width: 580px;
    border-radius: 4px;
    background: ${(props) => props.theme.grey};
    margin: 4rem auto;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .edit-profile img {
    object-fit: cover;
  }

  .avatar {
    margin-top: -40px;
    margin-left: 20px;
  }

  div.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
  }

  h3 {
    display: flex;
    align-items: center;
  }

  form {
    padding: 1rem;
  }

  input,
  textarea {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 3px;
    color: ${(props) => props.theme.primaryColor};
  }

  textarea {
    height: 75px;
  }

  svg {
    fill: ${(props) => props.theme.red};
    height: 22px;
    width: 22px;
    margin-right: 1rem;
    position: relative;
    top: -1px;
  }

  @media screen and (max-width: 600px) {
    .edit-profile {
      width: 90%;
      margin: 4rem auto;
    }
  }

  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const EditProfileModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { data: profile } = useSelector((state) => state.profile);

  const firstname = useInput(profile.firstname);
  const lastname = useInput(profile.lastname);
  const channelDesc = useInput(profile.channelDescription || "");

  // uploaded avatar, cover
  const [cover, setCover] = useState("");
  const [avatar, setAvatar] = useState("");

  // handlers for image upload
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setCover(await upload("image", file));
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatar(await upload("image", file));
    }
  };

  const handleEditProfile = () => {
    if (!firstname.value.trim()) {
      return toast.error("firstname should not be empty");
    }

    if (!lastname.value.trim()) {
      return toast.error("lastname should not be empty");
    }

    const data = {
      firstname: firstname.value,
      lastname: lastname.value,
    };

    if (avatar) data.avatar = avatar;
    if (cover) data.cover = cover;

    const updates = { ...data, channelDescription: channelDesc.value };

    dispatch(updateProfile(updates));

    dispatch(updateUser(updates));
    client(`${process.env.REACT_APP_BE}/users`, {
      body: updates,
      method: "PUT",
    });

    updateUserLocalSt(updates);
    toast.dark("Profile updated");
    closeModal();
  };

  return (
    <Wrapper>
      <div className="container"></div>
      <div className="edit-profile">
        <div className="modal-header">
          <h3>
            <CloseIcon onClick={() => closeModal()} />
            <span>Edit Profile</span>
          </h3>
          <Button onClick={handleEditProfile}>Save</Button>
        </div>

        <div className="cover-upload-container">
          <label htmlFor="cover-upload">
            <img
              className="pointer"
              width="100%"
              height="200px"
              src={cover ? cover : profile.cover}
              alt="cover"
            />
          </label>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="avatar-upload-icon">
          <label htmlFor="avatar-upload">
            <img
              src={avatar ? avatar : profile.avatar}
              className="pointer avatar lg"
              alt="avatar"
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            style={{ display: "none" }}
          />
        </div>

        <form>
          <input
            type="text"
            placeholder="firstname"
            value={firstname.value}
            onChange={firstname.onChange}
          />
          <input
            type="text"
            placeholder="lastname"
            value={lastname.value}
            onChange={lastname.onChange}
          />
          <textarea
            type="text"
            placeholder="Tell viewers about your channel"
            value={channelDesc.value}
            onChange={channelDesc.onChange}
          />
        </form>
      </div>
    </Wrapper>
  );
};

export default EditProfileModal;
