import React, { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../../context";
const StyledButton = styled.button`
  color: #818080;
  border: 1px solid #110404;
  border-radius: 5px;
  padding: 10px 30px;
  margin-top: 15px;
  width: auto;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    background-color: #b9b5b5;
    box-shadow: 10px 2px 22px -10px #9da1a0;
    color: #ddd;
  }
`;

export default function Button({
  name,
  action,
  type,
  disabled,
  toExecute,
  category,
}) {
  const { resetFilters } = useContext(ProductContext);

  return (
    <StyledButton
      type={type}
      onClick={action}
      disabled={disabled}
      onClick={() => (category ? resetFilters(category) : null)}
    >
      {name}
    </StyledButton>
  );
}
