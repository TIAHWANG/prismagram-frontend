import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartEmpty, Comment as CommentIcon, NextButton, PrevButton, HeartRed, MessageEmpty } from "../Icons";
import { Link } from "react-router-dom";

const Post = styled.div`
    ${(props) => props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
    user-select: none;
    a {
        color: inherit;
    }
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn = styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`;

const Files = styled.div`
    position: relative;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.img`
    width: 100%;
    max-width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    opacity: ${(props) => (props.showing ? 1 : 0)};
    transition: opacity 0.5s linear;
`;

const Button = styled.span`
    cursor: pointer;
`;

const Meta = styled.div`
    padding: 15px;
`;

const Buttons = styled.div`
    ${Button} {
        &:not(:last-child) {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`;

const TimeStamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const Comment = styled.div`
    margin-bottom: 7px;
    span {
        margin-right: 5px;
    }
`;

const Caption = styled.div`
    margin: 10px 0px;
`;

const SlideButton = styled.div`
    z-index: 2;
    cursor: pointer;
    position: absolute;
    top: 50%;
    ${(props) => (props.type === "prev" ? "left: 10px" : "right: 10px")};
    opacity: 0.7;
`;

export default ({
    user: { username, avatar },
    location,
    files,
    isLiked,
    likeCount,
    createdAt,
    newComment,
    currentItem,
    toggleLike,
    onKeyPress,
    comments,
    selfComments,
    caption,
    imageNext,
    imagePrev,
    time,
    totalFiles,
}) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
                <Link to={`/${username}`}>
                    <FatText text={username} />
                </Link>
                <Location>{location}</Location>
            </UserColumn>
        </Header>
        <Files>
            {files && files.map((file, index) => <File key={file.id} src={file.url} showing={index === currentItem} />)}
            {files && currentItem !== totalFiles - 1 && (
                <>
                    <SlideButton type="next" onClick={imageNext}>
                        <NextButton />
                    </SlideButton>
                </>
            )}
            {files && currentItem !== 0 && (
                <>
                    <SlideButton type="prev" onClick={imagePrev}>
                        <PrevButton />
                    </SlideButton>
                </>
            )}
        </Files>
        <Meta>
            <Buttons>
                <Button onClick={toggleLike}>{isLiked ? <HeartRed /> : <HeartEmpty />}</Button>
                <Button>
                    <CommentIcon />
                </Button>
                <Button>
                    <MessageEmpty />
                </Button>
            </Buttons>
            <FatText text={`좋아요 ${likeCount}개`} />
            <Caption>
                <FatText text={username} /> {caption}
            </Caption>
            {comments && (
                <Comments>
                    {comments.map((comment) => (
                        <Comment key={comment.id}>
                            <FatText text={comment.user.username} />
                            {comment.text}
                        </Comment>
                    ))}
                    {selfComments.map((comment) => (
                        <Comment key={comment.id}>
                            <FatText text={comment.user.username} />
                            {comment.text}
                        </Comment>
                    ))}
                </Comments>
            )}
            <TimeStamp>{time(createdAt)}</TimeStamp>
            <Textarea placeholder={"댓글 달기..."} value={newComment.value} onChange={newComment.onChange} onKeyPress={onKeyPress} />
        </Meta>
    </Post>
);
