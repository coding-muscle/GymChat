import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {allUsersRoute, host} from "../utils/APIRoutes";
import axios from "axios";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";

export default function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    //设置当前用户
    useEffect(() => {
        async function setCurrentUserInner() {
            setCurrentUser(
                await JSON.parse(localStorage.getItem("chat-app-user")));
        }
        setCurrentUserInner();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        } else {
            console.log("用户未建立连接");
        }
    }, [currentUser]);

    useEffect(() => {
        async function setContactsInner() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate("/setAvatar");
                }
            }
        }
        setContactsInner();
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                {currentChat === undefined? (
                    <Welcome />
                ): (
                    <ChatContainer
                        currentUser={currentUser}
                        currentChat={currentChat}
                        socket={socket}
                    />
                )}
            </div>
        </Container>
    )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 100vh;
    width: 100vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
`;