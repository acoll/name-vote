import React from "react";
import styled from "styled-components";

const Background = styled.div`
    background:  linear-gradient(darkslateblue, tomato);
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    // filter: blur(10px);
    position: fixed;
    overflow: hidden;
    z-index: -2;
`;

export default Background;
