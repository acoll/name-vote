import React from "react";
import styled from "styled-components";

import Background from "./Background";

const LayoutStyles = styled.div`
    display: flex;
    color: snow;
`;

export default function Layout({ addButton }) {
  return (
    <LayoutStyles>
      <Background />
      {addButton}
    </LayoutStyles>
  );
}
