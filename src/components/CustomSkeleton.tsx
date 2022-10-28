import { Avatar, Skeleton, Space } from "antd"
import { NextPage } from "next"
import styled from "styled-components"
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
  click: number,
}
const CustomSkelton: NextPage = (props: any) => {
  console.log(props)
  const urlData = props.urlData as urlData;
  console.log(`http://s2.googleusercontent.com/s2/favicons?domain_url=${urlData?.url}`)
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
          <Skeleton.Button style={{ width: '150px' }} size="small" shape="round" />
          <Skeleton.Button shape="circle" size="small" />
          <Skeleton.Button shape="round" size="small" />
        </FirstLevel>
        <SecondLevel>
          <Skeleton
            title={false}
            paragraph={{ rows: 1, width: '100%', }}
          >
            <h2>hamed</h2>
          </Skeleton>

        </SecondLevel>
      </DataContainer>
    </Container>
  )
}
export default CustomSkelton