import type { GetServerSideProps, NextPage } from 'next'

type Url = {
  link: string | any
}
const url: NextPage = () => {
  return (
    <div>hello</div>
  )
}

export default url

// export const getServerSideProps:GetServerSideProps = async()=>{
//   const s = await axios.get()
// }