import { Avatar, Skeleton, Space } from "antd"
import { NextPage } from "next"
import { useRouter } from "next/router"
import styled, { withTheme } from "styled-components"
import RoundedButton from "../UI/RoundedButton"
import CustomImage from "./CustomImage"

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
  width: 100%;
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
  margin: 0 0 1rem;
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
  console.log(props)
  const urlData = props.urlData as urlData;
  const router = useRouter()
  // console.log(window.location.hostname)

  return (
    <Container>
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
              <a href={`http://localhost:3000/${urlData?.key}`} target="_blank" rel="noreferrer">{urlData?.key}</a>
              : <Skeleton.Button style={{ width: '150px' }} size="small" shape="round" />
          }
          {
            urlData?._id ?
              <RoundedButton>copy</RoundedButton> :
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
            <p style={{ color: "#777" }}>{urlData?.url}</p>
          </Skeleton>

        </SecondLevel>
      </DataContainer>
    </Container>
  )
}
export default CustomSkelton