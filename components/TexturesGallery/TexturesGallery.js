import React from 'react'
import styled, { keyframes } from 'styled-components'
import PhotoCut from '../PhotoCut/PhotoCut'
import Router from 'next/router'
import Message from './Message'
import Gallery from './Gallery'

const Anima = keyframes`
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
`

const Panel = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 100;
  background-color: rgba(0,0,0,0.8);
  background-color: rgba(255, 255, 255, 0.7);
  display: ${p => p.show ? 'flex' : 'none'};
  animation: ${Anima} ease-out 200ms forwards;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Close = styled.button`
  color: #333;
  font-size: 35px;
  position: absolute;
  top: 10%;
  right: 30%;
  background-color: transparent;
  border: 0;
`

const Button = styled.button`
  margin: 0.4em 0;
  font-family: 'Poppins', sans-serif;
  font-size: 25px;
  cursor: pointer;
  padding: 0.2em 1.5em;
  background-color: #4A63FF;
  background: linear-gradient(30deg,#00c2ff,#008ff5);

  color: #FFF;
  border-radius: 33px;
  border: 0;
  outline: none;

  :hover {
    background: linear-gradient(250deg,#00c2ff,#008ff5);
  }
`

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

class ModalComponent extends React.Component {
  state = {
    imageSrc: null,
    source: '',
    modal: ''
  }

  componentDidMount () {
    if (process.browser) {
      window.addEventListener('popstate', this.popstate)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('popstate', this.popstate)
  }

  popstate = () => {
    const url = window.location.href.split('/')
    const params = {
      id: url[4], // work id
      modal: url[5], // photoSelect
      source: url[6], // facebook designs gallery
      subId: url[7]
    }

    // Si no existe modal se cierra
    if (!params.modal) this.props.closeModal()
    if (!params.source) this.setState({ modal: 'options' })
    if (params.source) {
      if (params.source.toLocaleLowerCase() === 'facebook') {
        this.setState({ modal: 'facebook' })
      }

      if (params.source.toLocaleLowerCase() === 'gallery') {
        this.setState({ modal: 'gallery' })
      }
    }
  }

  onDrop = (files) => {
    const imageSrc = URL.createObjectURL(files[0])
    this.setState({ imageSrc, source: 'local' })
  }

  setPanel = (modal) => {
    this.setState({ modal })
    Router.push(
      `/cube-app?id=${this.props.work._id}&modal=confetii&source=${modal}`,
      `/cube-app/${this.props.work._id}/confetii/${modal}`
    )
  }

  onlySave = (imageSrc) => {
    console.log('Only Save', imageSrc)
    this.setState({ modal: 'options' })
    this.props.closeModal()
    this.props.updateDB(imageSrc)
  }

  getPanel = () => {
    switch (this.state.modal) {
      case 'texture':
        return <Gallery {...this.props} onlySave={this.onlySave} />

      case 'messaje':
        return (
          <Message {...this.props} />
        )

      default:
        return (
          <Box>
            <Button onClick={() => this.setPanel('texture')}>Textura</Button>
            <Button onClick={() => this.setPanel('messaje')}>Mensaje</Button>
          </Box>
        )
    }
  }

  render () {
    if (!this.props.show) return null
    const { closeModal } = this.props

    return (
      <Panel onClick={e => e.stopPropagation()} show>
        <Close onClick={closeModal}>X</Close>
        {
          this.state.imageSrc
            ? (
              <PhotoCut
                discartPhoto={this.discartPhoto}
                onCutPhoto={this.onCutPhoto}
                imageSrc={this.state.imageSrc}
                source={this.state.source}
              />
            ) : this.getPanel()
        }
      </Panel>
    )
  }
}

export default ModalComponent
