import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import logo from "../logo.png";
import { HomeEmpty, HeartEmpty, CompassEmpty, MessageEmpty, MessageFull, CompassFull, HeartFull, HomeFull } from "./Icons";
import Avatar from "./Avatar";

const Header = styled.header`
    width: 100%;
    border: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    border-bottom: ${(props) => props.theme.boxBorder};
    border-radius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    padding: 0px 20px;
    z-index: 2;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child {
        margin-right: auto;
        text-align: left;
    }
    &:last-child {
        margin-left: auto;
        text-align: right;
    }
`;

const SearchInput = styled(Input)`
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
    font-size: 12px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 70%;
    &::placeholder {
        opacity: 0.8;
    }
`;

const HeaderLink = styled(Link)`
    &:not(:last-child) {
        margin-right: 20px;
    }
    div {
        display: inline-block;
    }
`;

const Image = styled.img`
    width: 105px;
    height: 35px;
`;

const ME = gql`
    {
        me {
            username
            avatar
        }
    }
`;

export default withRouter(({ history }) => {
    const search = useInput("");

    const { data, loading } = useQuery(ME);
    if (loading) return "";

    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`);
    };

    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                    <Link to="/">
                        <Image src={logo} alt={"logo"} />
                    </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput value={search.value} onChange={search.onChange} placeholder="Search" />
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    {history.location.pathname === "/" ? (
                        <HeaderLink to="/">
                            <HomeFull />
                        </HeaderLink>
                    ) : (
                        <HeaderLink to="/">
                            <HomeEmpty />
                        </HeaderLink>
                    )}
                    {history.location.pathname === "/messages" ? (
                        <HeaderLink to="/messages">
                            <MessageFull />
                        </HeaderLink>
                    ) : (
                        <HeaderLink to="/messages">
                            <MessageEmpty />
                        </HeaderLink>
                    )}
                    {history.location.pathname === "/explore" ? (
                        <HeaderLink to="/explore">
                            <CompassFull />
                        </HeaderLink>
                    ) : (
                        <HeaderLink to="/explore">
                            <CompassEmpty />
                        </HeaderLink>
                    )}
                    {history.location.pathname === "/notifications" ? (
                        <HeaderLink to="/notifications">
                            <HeartFull />
                        </HeaderLink>
                    ) : (
                        <HeaderLink to="/notifications">
                            <HeartEmpty />
                        </HeaderLink>
                    )}
                    {!data.me ? (
                        <HeaderLink to="/#">
                            <Avatar size={"sm"} url={data.me.avatar} />
                        </HeaderLink>
                    ) : (
                        <HeaderLink to={data.me.username}>
                            <Avatar size={"tiny"} url={data.me.avatar} />
                        </HeaderLink>
                    )}
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    );
});
