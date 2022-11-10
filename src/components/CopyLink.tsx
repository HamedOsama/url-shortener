import { NextPage } from "next"
import { useState } from 'react'

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import IconContainer from "../UI/IconContainer";

type propsType = {
  link: string,
}
const CopyLink: NextPage<propsType> = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyCodeHandler = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000/${link}`);
    setIsCopied(prev => true)
    setTimeout(() => setIsCopied(prev => false), 1500)
  }
  return (<IconContainer onClick={copyCodeHandler}>
    {
      isCopied === false ?
        <ContentCopyIcon className="icon" /> :
        <DoneRoundedIcon className="icon" />
    }
  </IconContainer>
  )
}

export default CopyLink