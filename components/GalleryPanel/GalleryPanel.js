
import React from 'react'
import styled, { keyframes } from 'styled-components'

const Anima = keyframes`
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`

const Panel = styled.div`
  max-width: 800px;
  width: 75%;
  height: 100%;
  overflow: hidden;
  animation: ${Anima} ease-out 200ms forwards;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-top: 60px;
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
    padding-top: 2px;
  }
`

const Button = styled.button`
  margin: 0.4em 0;
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  cursor: ${p => p.active ? 'pointer' : 'not-allowed'};
  padding: 0.2em 1.5em;
  background-color: #0057ff;
  background-color: ${p => p.active ? '#0057ff' : '#b5b5b5'};
  color: #FFF;
  border-radius: 33px;
  border: 0;
  outline: none; 
`

const Gallery = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  position: relative;
  background-color: #FFF;
`

const Buttons = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100px;
  background-color: #FFF;
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 900px) {
    align-items: baseline;
    height: 120px;
  }
`

class GalleryPanel extends React.Component {
  static defaultProps = {
    onResize: () => {},
    backText: 'Atras',
    confirmText: 'Seleccionar'
  }

  componentDidMount () {
    if (process.browser) {
      window.addEventListener('resize', this.resize)
      this.calculePhotoSize()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  calculePhotoSize = () => {
    const p = document.getElementById('scrollableGallery')
    let photoSize = 0
    // tamaño de imagen
    if (window.innerWidth > 600) {
      photoSize = (p.clientWidth / 3) - 10
    } else {
      photoSize = (p.clientWidth / 2) - 5
    }
    this.props.onResize(photoSize)
  }

  resize = () => {
    this.calculePhotoSize()
  }
  render () {
    const { children, onBack, onConfirm, confirmActive } = this.props
    return (
      <Panel >
        <Gallery id='scrollableGallery'>
          { children }
        </Gallery>
        <Buttons>
          <Button active onClick={onBack}>{ this.props.backText }</Button>
          <Button active={confirmActive} onClick={onConfirm}>{ this.props.confirmText }</Button>
        </Buttons>
      </Panel>
    )
  }
}

export default GalleryPanel
