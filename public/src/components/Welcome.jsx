import React, {useEffect, useState} from "react";
import styled, {Styled} from "styled-components";
import Robot from "../assets/robot.gif"

export default function Welcome() {
    const [username, setUsername] = useState("");
    useEffect(() => {
        async function inner() {
            setUsername(
                await JSON.parse(
                    localStorage.getItem("chat-app-user")
                ).username
            );
        }
        inner();
    }, []);

    return (
        <Container>
            <img src={Robot} alt=""/>
            <h1>
                Welcome, <span>{username}</span>
            </h1>
            <h3>Please select a chat to Start messaging</h3>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  .img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  };
`;