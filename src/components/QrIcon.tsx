import { NextPage } from "next"
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';

import IconContainer from "../UI/IconContainer"

type PropsType = {
  onClick : Function
}
const QrIcon:NextPage<PropsType> = props => {
  return (
    <IconContainer onClick={props.onClick}>
      <QrCode2RoundedIcon style={{fontSize : '1.35rem'}}/>
    </IconContainer>
  )
}

export default QrIcon