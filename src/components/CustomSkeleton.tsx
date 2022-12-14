import { Avatar, Skeleton, Space } from "antd"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import styled, { withTheme } from "styled-components"
import QrCard from './QrCard'
import Link from "../UI/Link"
import OriginalLink from "../UI/OriginalLink"
import RoundedButton from "../UI/RoundedButton"
import CopyLink from "./CopyLink"
import CustomImage from "./CustomImage"
import QrIcon from "./QrIcon"

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
  width: 100%;
  /* cursor: grab; */
`
const AvatarContainer = styled.div`
  
`

const DataContainer = styled.div`
  width: 80%;
`
const FirstLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.5rem;
`

const SecondLevel = styled.div`
width: 100%;
`
type urlData = {
  _id: string,
  key: string,
  url: string,
  clicks: number,
}
const CustomSkelton: NextPage = (props: any) => {
  const [qrMenu, setQrMenu] = useState(false);
  console.log(qrMenu)
  const urlData = props.urlData as urlData;
  const router = useRouter()

  const openQrMenuHandler = () => {
    setQrMenu(prev => true);
  }
  const closeQrMenuHandler = () => {
    setQrMenu(prev => false);
  }
  return (
    <Container>
      {
        qrMenu === true ?
          <QrCard closeHandler={closeQrMenuHandler} urlData={{ key: urlData.key, url: urlData.url }} /> : null
      }
      <AvatarContainer>
        {
          urlData?.url ?
            <CustomImage
              src={`http://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${urlData?.url}`}
              width={45}
              height={45}
              alt="website"
            />
            :
            < Skeleton.Avatar style={{ width: '45px', height: '45px' }} />
        }
      </AvatarContainer>
      <DataContainer>
        <FirstLevel>
          {
            urlData?.key ?
              <Link href={`http://localhost:3000/${urlData?.key}`} target="_blank" rel="noreferrer">localhost:3000/{urlData?.key}</Link>
              : <Skeleton.Button style={{ width: '150px' }} size="small" shape="round" />
          }
          {
            urlData?._id ?
              <CopyLink link={urlData.key} /> :
              <Skeleton.Button shape="circle" size="small" />
          }
          {
            urlData?._id ?
              <QrIcon  onClick={openQrMenuHandler}/> :
              <Skeleton.Button shape="circle" size="small" />
          }
          {
            urlData?.clicks > -1 ?
              <RoundedButton>{urlData?.clicks} clicks</RoundedButton> :
              <Skeleton.Button shape="round" size="small" />
          }
        </FirstLevel>
        <SecondLevel>
          <Skeleton
            title={false}
            paragraph={{ rows: 1, width: '100%', }}
            loading={!!!urlData?.url}
          >
            <OriginalLink>{urlData?.url}</OriginalLink>
          </Skeleton>

        </SecondLevel>
      </DataContainer>
    </Container>
  )
}
export default CustomSkelton