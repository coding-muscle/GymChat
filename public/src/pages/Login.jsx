import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../assets/logo.svg";
import styled from "styled-components";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {loginRoute} from "../utils/APIRoutes";

export default function Login() {
    const navigate = useNavigate();

    //根据本地缓存，直接进入聊天界面，如果没有不跳转
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/chat');
        }
    }, [])

    //控制传入用户数据
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    //改变处理函数，values随着输入框内容改变而改变
    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    };

    //提交验证函数
    const handleValidation = () => {
        const {username, password} = values;
        if (username.length === 0) {
            toast.error(
                "Email and Password is required.",
                toastOptions
            );
            return false;
        } else if (password.length === 0) {
            toast.error(
                "Email and Password is required.",
                toastOptions
            );
            return false;
        }
        return true;
    }

    //提交处理函数
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const {username, password} = values;
            const {data} = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem(
                    "chat-app-user",
                    JSON.stringify(data.user)
                );
                navigate("/chat");
            }
        }
    }

    //toast样式
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    return (
        <>
            <FormContainer>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo"/>
                        <h1>GymChat</h1>
                    </div>

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />

                    <button type="submit">Log in</button>

                    <span> Don't have an account ? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
  
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;