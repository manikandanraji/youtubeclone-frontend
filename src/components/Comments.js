import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { connect } from "react-redux";
import { addComment } from "../actions";
import useInput from "../hooks/useInput";
import { timeSince } from "../utils";

const Wrapper = styled.div`
	margin: 1rem 0;

	h3 {
		margin-bottom: 0.8rem;
	}

	.add-comment {
		display: flex;
		align-items: center;
		margin-bottom: 2.3rem;
	}

	.add-comment textarea {
		background: inherit;
		border: none;
		border-bottom: 1px solid ${props => props.theme.darkGrey};
		color: ${props => props.theme.primaryColor};
		width: 100%;
		height: 100%;
	}

	.add-comment img {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		object-fit: cover;
		margin-right: 1rem;
	}

	.comment {
		display: flex;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.comment img {
		width: 40px;
		object-fit: cover;
		height: 40px;
		border-radius: 20px;
		position: relative;
		top: 2px;
		margin-right: 1rem;
	}
`;

const Comments = ({ user, comments, addComment, videoId }) => {
	const comment = useInput("");

	const handleAddComment = e => {
		if (e.keyCode === 13) {
			if (!comment.value.trim()) {
				return toast.error("Please write a comment");
			}

			addComment({ videoId, text: comment.value });
			comment.setValue("");
		}
	};

	return (
		<Wrapper>
			<h3>{comments?.length} comments</h3>

			<div className="add-comment">
				<img src={user.avatar} alt="avatar" />
				<textarea
					placeholder="Add a public comment"
					value={comment.value}
					onKeyDown={handleAddComment}
					onChange={comment.onChange}
				/>
			</div>

			{comments &&
				comments.map(comment => (
					<div key={comment.id} className="comment">
						<Link to={`/channel/${comment.User?.id}`}>
							<img src={comment.User?.avatar} alt="avatar" />
						</Link>
						<div className="comment-info">
							<p className="secondary">
								<span>
									<Link to={`/channel/${comment.User?.id}`}>
										{comment.User?.username}
									</Link>
								</span>
								<span style={{ marginLeft: "0.6rem" }}>
									{timeSince(comment.createdAt)} ago
								</span>
							</p>
							<p>{comment.text}</p>
						</div>
					</div>
				))}
		</Wrapper>
	);
};

const mapStateToProps = state => ({
	comments: state.video.comments,
	videoId: state.video.id,
	user: state.user
});

export default connect(mapStateToProps, { addComment })(Comments);
