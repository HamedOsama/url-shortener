import Image, { ImageProps } from "next/future/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledImage = styled(Image)`
  &.loading{
    
    filter: blur(12px) grayscale(1); 
  }
  &.loaded{
    filter: blur(0) grayscale(0); 
  }
`
const CustomImage = (props: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);
  useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes
  return (
    <StyledImage
      {...props}
      src={src}
      alt={props.alt}
      className={`${props.className} ${isLoading ? "loading" : "loaded"}`}
      onLoadingComplete={async () => {
        setLoading(false);
      }}
      onError={() => {
        setSrc(`https://avatar.tobi.sh/${props.alt}`); // if the image fails to load, use the default avatar
      }}
    />
  );
}
export default CustomImage