import styled from "styled-components";

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F3F3F6;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  transition: 0.1s ease;
  cursor: pointer;
  &:hover{
    background-color: #DBEAFE;
    transform: scale(1.05);
  }
  .icon{
    font-size: 0.8rem;
    transition: 0.2s ease;
  }
  &:hover .icon{
    color : #2b66b3;
    transform: scale(1.025);
  }

`

export default IconContainer;