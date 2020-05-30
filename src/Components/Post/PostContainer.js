import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";

const PostContainer = ({ id, user, files, likeCount, isLiked, comments, createdAt, caption, location }) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");

    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
    const [addCommentMutation] = useMutation(ADD_COMMENT, { variables: { postId: id, text: comment.value } });

    // Image Slide
    const totalFiles = files.length;
    const imageNext = () => {
        if (currentItem !== totalFiles - 1) {
            setCurrentItem(currentItem + 1);
        }
    };
    const imagePrev = () => {
        if (currentItem !== 0) {
            setCurrentItem(currentItem - 1);
        }
    };

    // TimeStamp
    const time = (value) => {
        const today = new Date();
        const postCreated = new Date(value);

        const diffTime = Math.floor((today.getTime() - postCreated.getTime()) / 1000 / 60);
        if (diffTime < 1) return "방금 전";
        if (diffTime < 60) {
            return `${diffTime}분 전`;
        }

        const diffHour = Math.floor(diffTime / 60);
        if (diffHour < 24) {
            return `${diffHour}시간 전`;
        }

        const diffDay = Math.floor(diffTime / 60 / 24);
        if (diffDay < 365) {
            return `${diffDay}일 전`;
        }

        return `${Math.floor(diffDay / 365)}년 전`;
    };

    const toggleLike = () => {
        toggleLikeMutation();
        if (isLikedS === true) {
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    };

    const onKeyPress = async (event) => {
        const { which } = event;
        if (which === 13) {
            event.preventDefault();
            comment.setValue("");
            try {
                const {
                    data: { addComment },
                } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
            } catch {
                toast.error("Can't send comment");
            }
        }
        return;
    };
    return (
        <PostPresenter
            user={user}
            files={files}
            likeCount={likeCountS}
            isLiked={isLikedS}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            caption={caption}
            location={location}
            currentItem={currentItem}
            toggleLike={toggleLike}
            onKeyPress={onKeyPress}
            selfComments={selfComments}
            imageNext={imageNext}
            imagePrev={imagePrev}
            time={time}
            totalFiles={totalFiles}
        />
    );
};

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
};

export default PostContainer;
