import React, { useState } from "react";
import { UploadIcon } from "./Icons";
import UploadVideoModal from "./UploadVideoModal";
import { upload } from '../utils';

const UploadVideo = () => {
	const [showModal, setShowModal] = useState(false);
	const [previewVideo, setPreviewVideo] = useState("");
	const closeModal = () => setShowModal(false);

	// uploaded data
	const [url, setUrl] = useState("");
	const [thumbnail, setThumbnail] = useState("");

	const handleVideoUpload = async e => {
		if (e.target.files[0]) {
			const url = URL.createObjectURL(e.target.files[0]);
			setPreviewVideo(url);
			setShowModal(true);

			const formData = new FormData()
			formData.append('upload_preset', 'youtubeclone');
			formData.append('file', e.target.files[0]);

			const data = await upload('video', e.target.files[0]);
			setUrl(data);
			setThumbnail(data.replace('.mp4', '.jpg'));

			// axios.post("https://api.cloudinary.com/v1_1/douy56nkf/video/upload", formData).then(res => {
			// 	console.log(res);
			// 	setUrl(res.data.secure_url);
			// 	setThumbnail(res.data.secure_url.replace(".mp4", ".jpg"));
			// });
		}
	};

	return (
		<div>
			<label htmlFor="video-upload">
				<UploadIcon />
			</label>
			<input
				style={{ display: "none" }}
				id="video-upload"
				type="file"
				accept="video/*"
				onChange={handleVideoUpload}
			/>
			{showModal && (
				<UploadVideoModal
					closeModal={closeModal}
					previewVideo={previewVideo}
					thumbnail={thumbnail}
					url={url}
				/>
			)}
		</div>
	);
};

export default UploadVideo;
