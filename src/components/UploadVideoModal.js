import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Button from "../styles/Button";
import useInput from "../hooks/useInput";
import { CloseIcon } from "./Icons";
import { uploadVideo } from "../actions";

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
	z-index: 130;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.7);
	animation: ${openModal} 0.5s ease-in-out;

	.modal-content {
		width: 800px;
		margin: 4rem auto;
		background: ${props => props.theme.grey};
		border-radius: 3px;
		box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
	}

	.modal-header svg {
		fill: ${props => props.theme.red};
		margin-right: 0;
	}

	.tab {
	}

	.video-form {
		border-top: 1px solid ${props => props.theme.darkGrey};
		border-bottom: 1px solid ${props => props.theme.darkGrey};
		padding: 0.5rem 1rem;
	}

	.video-form h2 {
		margin: 1rem 0;
	}

	.video-form input,
	.video-form textarea {
		width: 66.25%;
		background: ${props => props.theme.black};
		border: 1px solid ${props => props.theme.darkGrey};
		color: ${props => props.theme.primaryColor};
		padding: 0.6rem 1.2rem;
		margin-bottom: 1.2rem;
		border-radius: 3px;
	}

	.video-form input {
		height: 60px;
	}

	.video-form textarea {
		height: 120px;
	}

	.modal-footer {
		display: flex;
		height: 70px;
		padding: 1rem;
	}

	button {
		margin-left: auto;
	}

	img {
		width: 100%;
		height: 340px;
		object-fit: cover;
	}

	@media screen and (max-width: 835px) {
		.modal-content,
		.modal-content input,
		.modal-content textarea {
			width: 90%;
		}

		.modal-content {
			margin-top: 7rem;
		}
	}

	@media screen and (max-width: 400px) {
		background: rgba(0, 0, 0, 0.9);
	}
`;

const UploadVideoModal = ({
	previewVideo,
	closeModal,
	url,
	thumbnail,
	uploadVideo
}) => {
	const title = useInput("");
	const description = useInput("");
	const [tab, setTab] = useState("PREVIEW");

	const handleTab = () => {
		if (tab === "PREVIEW") {
			setTab("FORM");
		} else {
			if (!title.value.trim() || !description.value.trim()) {
				return toast.error("Please fill in all the fields");
			}

			const newVideo = {
				title: title.value,
				description: description.value,
				url,
				thumbnail
			};

			uploadVideo(newVideo);

			closeModal();
		}
	};

	return (
		<Wrapper>
			<div className="modal-content">
				<div className="modal-header">
					<h3>Upload Video</h3>
					<CloseIcon onClick={() => closeModal()} />
				</div>

				{tab === "PREVIEW" && (
					<div className="tab video-preview">
						<video
							className="video-js vjs-fill vjs-fluid"
							controls
							preload="auto"
							height="340"
							width="800"
							poster="https://res.cloudinary.com/douy56nkf/image/upload/v1593412344/instaclone/rmjfj8kvmqqlkrzmlwnc.jpg"
							alt="video preview"
							data-setup="{}"
						>
							<source src={previewVideo} type="video/mp4"></source>
						</video>
					</div>
				)}

				{tab === "FORM" && (
					<div className="tab video-form">
						<h2>Details</h2>
						<input
							type="text"
							placeholder="Enter the title"
							value={title.value}
							onChange={title.onChange}
						/>
						<textarea
							placeholder="Tell viewers about your video"
							value={description.value}
							onChange={description.onChange}
						/>
					</div>
				)}

				<div style={{ display: !url ? "none" : "" }} className="modal-footer">
					<Button onClick={handleTab}>
						{tab === "PREVIEW" ? "Next" : "Upload"}
					</Button>
				</div>
			</div>
		</Wrapper>
	);
};

export default connect(null, { uploadVideo })(UploadVideoModal);
