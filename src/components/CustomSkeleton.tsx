import { Skeleton, Space } from "antd"
import { NextPage } from "next"
import styled from "styled-components"

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
const CustomSkelton: NextPage = () => {
  return (
    <Container>
      <AvatarContainer>
        <Skeleton.Avatar style={{ width: '45px', height: '45px' }} />
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