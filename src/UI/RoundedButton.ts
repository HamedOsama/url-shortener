import styled from "styled-components";

const RoundedButton = styled.button`
  font-size: 0.875rem;
  background-color: #F3F3F6;
  padding: 0.15rem 0.5rem;
  border-radius: 0.35rem;
  border : none;
  outline: none;
  cursor: pointer;
  transition: 0.1s ease;
  &:hover{
    transform: scale(1.05);
  }
`;

export default RoundedButton;