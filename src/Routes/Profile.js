import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Avatar from "../Components/Avatar";
import FatText from "../Components/FatText";
import FollowButton from "../Components/FollowButton";

const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            id
            avatar
            username
            fullName
            isFollowing
            isSelf
            bio
            followingCount
            followersCount
            postsCount
            posts {
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

const Wrapper = styled.div`
    min-height: 100;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
    display: flex;
    align-items: center;
`;

const Username = styled.span`
    font-size: 26px;
    display: block;
    margin-right: 10px;
`;

const Counts = styled.ul`
    display: flex;
    margin: 15px 0px;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const FullName = styled(FatText)`
    font-size: 16px;
`;

const Bio = styled.p`
    margin: 10px 0px;
`;

export default withRouter(
    ({
        match: {
            params: { username },
        },
    }) => {
        const { data, loading } = useQuery(GET_USER, { variables: { username } });
        if (loading) {
            return (
                <Wrapper>
                    <Loader />
                </Wrapper>
            );
        } else {
            const {
                seeUser: { id, avatar, username, fullName, isFollowing, isSelf, bio, followingCount, followersCount, postsCount, posts },
            } = data;
            return (
                <Wrapper>
                    <Helmet>
                        <title>{username} | Prismagram</title>
                    </Helmet>
                    <Header>
                        <HeaderColumn>
                            <Avatar size="lg" url={avatar} />
                        </HeaderColumn>
                        <HeaderColumn>
                            <UsernameRow>
                                <Username>{username}</Username> {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
                            </UsernameRow>
                            <Counts>
                                <Count>
                                    <FatText text={String(postsCount)} /> posts
                                </Count>
                                <Count>
                                    <FatText text={String(followersCount)} /> followers
                                </Count>
                                <Count>
                                    <FatText text={String(followingCount)} /> following
                                </Count>
                            </Counts>
                            <FullName text={fullName} />
                            <Bio>{bio}</Bio>
                        </HeaderColumn>
                    </Header>
                </Wrapper>
            );
        }
    }
);
