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

const Tools = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.i`
  font-size: ${p => p.size || '18px'};
  color: ${p => p.color || '#673ab7'};
`

const Button = styled.button`
  background: #673ab7;
  border: 0;
  padding: 0.3em 2em;
  border-radius: 3px;
  cursor: pointer;
`

class PhotoCut extends Component {
  state = {
    scale: 1,
    rotate: 0
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

  rotateRight = () => {
    this.setState(state => ({
      ...state,
      rotate: state.rotate + 90
    }))
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
        message='Puedes Mover y Recortar'
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
              rotate={this.state.rotate}
              scale={this.state.scale}
            />
            <Tools>
              <Icon className='icon-gallery2' size='15px' />

              <Range
                value={this.state.scale}
                type='range'
                step='0.1'
                min='1'
                max='5'
                onChange={this.changeScale}
              />
              <Icon className='icon-gallery2' size='30px' />
            </Tools>
            <Tools>

              <Button onClick={this.rotateRight}>
                <Icon className='icon-rotate' color='#FFF' size='18px' />
              </Button>
            </Tools>
          </EditorPanel>
        </Albums>
      </GalleryPanel>
    )
  }
}

export default PhotoCut
