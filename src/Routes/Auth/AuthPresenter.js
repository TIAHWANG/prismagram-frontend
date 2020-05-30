import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import logo from "../../logo.png";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Box = styled.div`
    ${(props) => props.theme.whiteBox}
    border-radius: 0px;
    width: 100%;
    max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align: center;
    padding: 20px 0px;
`;

const Link = styled.span`
    color: ${(props) => props.theme.blueColor};
    cursor: pointer;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    form {
        width: 100%;
        input {
            width: 100%;
            &:not(:last-child) {
                margin-bottom: 7px;
            }
        }
        button {
            margin-top: 10px;
        }
    }
`;

const Image = styled.img`
    width: 100%;
    margin-bottom: 35px;
`;

const Text = styled.p`
    font-size: 12px;
    color: ${(props) => props.theme.darkGreyColor};
    line-height: 16px;
    margin: 10px 0px;
    text-align: center;
`;

export default ({ action, username, firstName, lastName, email, setAction, onSubmit, secret }) => (
    <Wrapper>
        <Form>
            {action === "logIn" && (
                <>
                    <Helmet>
                        <title>로그인| Prismagram</title>
                    </Helmet>
                    <Image src={logo} alt={"logo"} />
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"이메일"} {...email} type="email" />
                        <Button text={"로그인"} />
                    </form>
                </>
            )}
            {action === "signUp" && (
                <>
                    <Helmet>
                        <title>가입하기 | Prismagram</title>
                    </Helmet>
                    <Image src={logo} alt={"logo"} />
                    <form onSubmit={onSubmit}>
                        <Input placeholder={"이름"} {...firstName} />
                        <Input placeholder={"성"} {...lastName} />
                        <Input placeholder={"이메일"} {...email} type="email" />
                        <Input placeholder={"사용자 이름"} {...username} />
                        <Button text={"가입"} />
                        <Text>
                            가입하면 Instagram의 <FatText text={"약관, 데이터 정책"} /> 및 <FatText text={"쿠키 정책"} />에 동의하게 됩니다.
                        </Text>
                    </form>
                </>
            )}
            {action === "confirm" && (
                <>
                    <Helmet>
                        <title>로그인 | Prismagram</title>
                    </Helmet>
                    <Image src={logo} alt={"logo"} />
                    <form onSubmit={onSubmit}>
                        <Input placeholder="Secret" required {...secret} />
                        <Button text={"확인"} />
                    </form>
                </>
            )}
        </Form>
        {action !== "confirm" && (
            <StateChanger>
                {action === "logIn" ? (
                    <>
                        계정이 없으신가요?{" "}
                        <Link onClick={() => setAction("signUp")}>
                            <FatText text={"가입하기"} />
                        </Link>
                    </>
                ) : (
                    <>
                        계정이 있으신가요?{" "}
                        <Link onClick={() => setAction("logIn")}>
                            <FatText text={"로그인"} />
                        </Link>
                    </>
                )}
            </StateChanger>
        )}
    </Wrapper>
);
