import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            Hello! It's {time}
        </Container>
    );
}

const Container = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
  font-weight: bold;
`;