import { NextPage } from "next"
import { useRef, useState } from "react"
import { getQRAsCanvas, getQRAsSVGDataUri, QRCodeSVG, } from "../lib/qr"

import styled from "styled-components"
import CustomImage from "./CustomImage"
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';

const Container = styled.div`
  position : absolute;
  inset : 0;
  backdrop-filter : blur(2px);
  z-index: 99;
  `
const CardContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 100;
  background-color: white;
  width: 450px;
  border-radius: 1rem;
`
const Header = styled.div`
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
`
const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
`
const Body = styled.div`
  background-color: #F9FAFB;
  padding: 1.5rem 0;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
`
const QrWrapper = styled.div`
  margin: 0 auto;
  width: fit-content;
  padding: 1rem;
  border: 1px solid #D0D0D0;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  .qr__code{
  }
`
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  margin: 1.5rem auto 0;
`
const DownloadBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    outline: none;
    padding: 0.3rem 1.375rem;
    background-color: #000000;
    color: #ffffff;
    border: 1px solid #000000;
    border-radius: 0.35rem;
    transition: 0.15s ease;
    cursor: pointer;
    &:hover{
      background-color: transparent;
      color: #000000;
    }
    .icon{
      font-size : 1rem;
      opacity: 0.9;
    }
`
const ButtonTitle = styled.span`

`

type propsType = {
  urlData: {
    key: string,
    url: string,
  },
  closeHandler : Function,
}

const QrCard: NextPage<propsType> = ({ urlData ,closeHandler}) => {
  const currentDomain = window?.location?.href
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // set QR code settings
  const [qrData, setQrData] = useState({
    value: currentDomain + urlData?.key,
    bgColor: "#ffffff",
    fgColor: "#000000",
    size: 1024,
    includeMargin: false,
    level: "Q", // QR Code error correction level: https://blog.qrstuff.com/general/qr-code-error-correction
    imageSettings: {
      src: 'https://static.zpao.com/favicon.png',
      height: 256,
      width: 256,
      excavate: true,
    },
  });
  const download = async (url: string, format: string) => {
    if (!downloadRef.current)
      return;
    downloadRef.current.href = url
    downloadRef.current.download = `${urlData?.key}-qrcode.${format}`;
    downloadRef.current.click();
  }
  return (
    <>
    <Container onClick={closeHandler} />
    <CardContainer>
      <Header>
        <CustomImage
          src={`http://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${urlData?.url}`}
          width={45}
          height={45}
          alt="website"
        />
        <Title>Download QR Code</Title>
      </Header>
      <Body>
        <QrWrapper>
          <QRCodeSVG
            className="qr__code"
            value={qrData.value}
            size={qrData.size / 8}
            bgColor={qrData.bgColor}
            fgColor={qrData.fgColor}
            level={qrData.level}
            includeMargin={qrData.includeMargin}
            imageSettings={{
              ...qrData.imageSettings,
              height: (qrData.imageSettings.height / 8),
              width: (qrData.imageSettings.width / 8),
            }}
          />
        </QrWrapper>
        <ButtonsContainer>
          <DownloadBtn
            onClick={
              async () =>
                download(
                  getQRAsSVGDataUri({
                    ...qrData,
                    imageSettings: {
                      ...qrData.imageSettings,
                    },
                  }),
                  "svg",
                )
            }
          >
            <SaveAltRoundedIcon className="icon" />
            <ButtonTitle>SVG</ButtonTitle>
          </DownloadBtn>
          <DownloadBtn
            onClick={async () =>
              download(await getQRAsCanvas(qrData, "image/png"), "png")
            }
          >
            <SaveAltRoundedIcon className="icon" />
            <ButtonTitle>PNG</ButtonTitle>
          </DownloadBtn>
          <DownloadBtn
            onClick={async () =>
              download(await getQRAsCanvas(qrData, "image/jpeg"), "jpeg")
            }
          >
            <SaveAltRoundedIcon className="icon" />
            <ButtonTitle>JPEG</ButtonTitle>
          </DownloadBtn>
        </ButtonsContainer>
        <a style={{ display: 'none' }}
          download={`${urlData?.key}-qrcode.svg`}
          ref={downloadRef}
        />
      </Body>
    </CardContainer>
    
    </>
  )
}

export default QrCard