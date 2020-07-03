import React from "react";
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
		top: 4px;
		margin-right: 1rem;
	}
`;

const Comments = ({ user, comments, addComment, videoId }) => {
	const comment = useInput("");

	const handleAddComment = e => {
		if (e.keyCode === 13) {
			console.log(comment.value);
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

			{comments && comments.map(comment => (
				<div key={comment.id} className="comment">
					<img src={comment.User?.avatar} alt="avatar" />
					<div className="comment-info">
						<p className="secondary">
							<span>{comment.User?.username}</span>
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

// createdAt: "2020-07-02T09:57:26.246Z"
// id: "60663ee9-3d4e-4848-9e5b-f6e0e2676b8f"
// text: "building youtube using reactjs"
// updatedAt: "2020-07-02T09:57:26.246Z"
// userId: "7f44ec58-9f74-4590-ac82-cd8619100939"
// videoId: "3e85403d-c2d4-43fe-8a73-c33ca95bec81"
