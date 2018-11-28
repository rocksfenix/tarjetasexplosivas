import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Side = styled.div`
  width: 100%;
  height: 100%;
  background: url('https://d39p6dv27gzlaf.cloudfront.net/static/img/default-side.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
`

const Gradient = styled.div`
  background-color: ${p => p.bgColor};
  opacity: 0.4;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
`

const Image = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => `url(${p.src})`};
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  z-index: 200;
`

const ImageButton = styled.img`
  width: 50%;
  height: 50%;
  position: relative;
  z-index: 10;
  background: ${p => `url(${p.src})`};
`

// EL Div que se muestra en hover cuando
// tiene imagen
const EditBox = styled.div`
  width: 50%;
  height: 50%;
  z-index: 200;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.78);
  font-size: 50px;
  text-shadow: 1px 1px 34px #2196F3;
  opacity: 0;
  transition: opacity 200ms ease-out;

  :hover {
    opacity: 1
  }
`

export default ({ name, image, side }) => {
  let imgBtn = 'https://d39p6dv27gzlaf.cloudfront.net/static/img/side-left.svg'
  let bgColor = 'purple'

  if (name === 'side0' || name === 'side5') {
    imgBtn = 'https://d39p6dv27gzlaf.cloudfront.net/static/img/side-up.svg'
  }

  if (name === 'side0' || name === 'side5') bgColor = '#FFF'
  if (name === 'side1') bgColor = 'orangered'
  if (name === 'side2') bgColor = 'purple'
  if (name === 'side3') bgColor = 'yellow'
  if (name === 'side4') bgColor = 'cyan'

  return (
    <Box>
      <Gradient bgColor={bgColor} />
      <Side />
      <ImageButton src={imgBtn} />
      { image ? <Image src={image} /> : null }
      { side.srcReal ? <Image src={side.srcReal} /> : null }
      {/* { image ? <EditBox></EditBox> : null } */}
    </Box>
  )
}
