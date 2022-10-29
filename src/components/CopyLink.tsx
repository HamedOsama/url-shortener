import { NextPage } from "next"
import { useState } from 'react'
import styled from "styled-components";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

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

type propsType = {
  link: string,
  onClick?: object
}
const CopyLink: NextPage<propsType> = ({ link, onClick }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyCodeHandler = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000/${link}`);
    setIsCopied(prev => true)
    setTimeout(() => setIsCopied(prev => false), 1500)
  }
  return (<IconContainer onClick={onClick}>
    {
      isCopied === false ?
        <ContentCopyIcon className="icon" /> :
        <DoneRoundedIcon className="icon" />
    }
  </IconContainer>
  )
}

export default CopyLink