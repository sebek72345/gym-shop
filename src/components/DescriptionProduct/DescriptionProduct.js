import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  font-family: "Nunito", sans-serif;
`;
const StyledLi = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  list-style: none;
  width: 100%;
`;
const StyledH2 = styled.h2`
  font-size: 32px;
  padding-left: 30px;
`;
export default function DescriptionProduct({ details }) {
  return (
    <StyledWrapper>
      <StyledH2>Features:</StyledH2>
      <ul>
        {details.map((detail) => (
          <StyledLi key={detail}>{detail}</StyledLi>
        ))}
      </ul>
    </StyledWrapper>
  );
}
