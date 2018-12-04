import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import { RotateLoader } from 'react-spinners'

const CategoryImage = styled(Dropzone)`
  width: 70px;
  height: 70px;
  background: gray;
  background: ${p => `url(${p.src})`};
  background-size: cover;
  background-position: center;
  border: 1px solid gray;
  position: absolute;
  top: 0;
`

const DropBoxPanel = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
`

const Preloading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 2;
  background-color: rgba(255,255,255,0.7);
`

export default ({ src, onDrop, isUploading }) => {
  return (
    <DropBoxPanel>
      { isUploading ? <Preloading><RotateLoader color='#0057ff' /></Preloading> : null }
      <CategoryImage
        onDrop={onDrop}
        accept='image/*'
        src={src}
      />
    </DropBoxPanel>
  )
}
