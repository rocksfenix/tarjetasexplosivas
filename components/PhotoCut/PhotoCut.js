import React, { Component } from 'react'
import styled from 'styled-components'
import AvatarEditor from 'react-avatar-editor'
import resize from '../../client-util/resize'
import GalleryPanel from '../GalleryPanel'

const Albums = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #FFF;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EditorPanel = styled.div`
  width: 310px;
  height: 310px;
`

const Range = styled.input`
  width: 100%;
`

class PhotoCut extends Component {
  state = {
    scale: 1
  }
  setEditorRef = (editor) => { this.editor = editor }

  changeScale = ({ target }) => {
    this.setState({ scale: Number(target.value) })
  }

  cutPhoto = () => {
    this.setState({ working: true }, () => {
      if (this.editor) {
        // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
        // drawn on another canvas, or added to the DOM.
        // console.log('image', this.props.image)
        // NOTA SI FUNCIONA CUANDO LA URL ES UN BLOB
        // such as image blob:http://localhost:3000/373b6545-a03f-4dec-8573-e4981e8da631
        try {
          let canvas = this.editor.getImage().toDataURL()
          window.fetch(canvas)
            .then(res => res.blob())
            .then(async blob => {
              const imageCutURL = window.URL.createObjectURL(blob)
              // this.props.onConfirm(imageCutURL, blob)
              // AHora redimencionamos a 500 px
              const imgResized = await resize(imageCutURL)
              // Subir Imagen
              // this.uploadPhoto(sideInFocusName, imgResize.blob)
              // console.log(imageCutURL, imgResized)
              this.setState({ imageSrc: null })
              this.props.onCutPhoto(imgResized)
            })
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  render () {
    const crossOrigin = this.props.source === 'facebook'
      ? 'anonymous'
      : ''
    return (
      <GalleryPanel
        confirmActive
        onBack={this.props.discartPhoto}
        onConfirm={this.cutPhoto}
        onResize={this.onResize}
        confirmText='Confirmar'
        backText='Descartar'
      >
        <Albums>
          <EditorPanel>
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.props.imageSrc}
              crossOrigin={crossOrigin}
              width={250}
              height={250}
              border={30}
              color={[0, 0, 0, 0.8]}
              // scale={1}
              rotate={0}
              scale={this.state.scale}
            />
            <Range
              value={this.state.scale}
              type='range'
              step='0.1'
              min='1'
              max='4'
              onChange={this.changeScale}
            />
          </EditorPanel>
        </Albums>
      </GalleryPanel>
    )
  }
}

export default PhotoCut
