import React from 'react'
import styled, { keyframes } from 'styled-components'
import Dropzone from 'react-dropzone'
import PhotoCut from '../PhotoCut/PhotoCut'
import Router from 'next/router'
import Facebook from './Facebook'
import Gallery from './Gallery'
import Designs from './Designs'

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

const Upload = styled(Dropzone)`
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

    // console.log(params)

    // this.setState({ params })

    // Si no existe modal se cierra
    if (!params.modal) {
      this.props.closeModal()
    }
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
      `/cube-app?id=${this.props.work._id}&modal=photoSelect&source=${modal}`,
      `/cube-app/${this.props.work._id}/photoSelect/${modal}`
    )
  }

  discartPhoto = () => {
    Router.replace(
      `/cube-app?id=${this.props.work._id}&modal=photoSelect`,
      `/cube-app/${this.props.work._id}/photoSelect`
    )
    this.setState({ imageSrc: null, modal: '' })
  }

  // blob:httping
  onCutPhoto= (resize) => {
    this.setState({ imageSrc: null, modal: '' })
    Router.push(
      `/cube-app?id=${this.props.work._id}`,
      `/cube-app/${this.props.work._id}`
    )
    const { source } = this.state

    console.log(resize.imgURL, source, resize)
    if (source === 'local' || source === 'facebook') {
      // Subir imagen
      this.props.onUploadPhoto(resize)
    } else {
      // Solo guardar en DB referencia
      // NO TE CREAS LA GALERY NO LLAMA A ESTE METODO
      // this.props.updateDB(imgURL)
    }
  }

  onlySave = (imageSrc, thumbnail) => {
    console.log('Only Save', imageSrc)
    this.setState({ modal: 'options' })
    this.props.closeModal()
    this.props.updateDB(imageSrc, thumbnail)
  }

  // Se usa para setear el src de la
  // imagen provenitente de facebook
  onSetPhoto = (imageSrc) => {
    this.setState({ imageSrc, source: 'facebook' })
  }

  getPanel = () => {
    switch (this.state.modal) {
      case 'designs':
        return (
          <Designs {...this.props} onSetPhoto={this.onSetPhoto} onConfirm={this.onlySave} />
        )

      case 'facebook':
        return <Facebook {...this.props} onSetPhoto={this.onSetPhoto} />

      case 'gallery':
        return (
          <Gallery {...this.props} onSetPhoto={this.onlySave} />
        )

      default:
        return (
          <Box>
            <Upload onDrop={this.onDrop} accept='image/*'>Subir Foto</Upload>
            <Button onClick={() => this.setPanel('designs')}>Diseños</Button>
            <Button onClick={() => this.setPanel('facebook')}>Facebook</Button>
            <Button onClick={() => this.setPanel('gallery')} >Mi Galeria</Button>
          </Box>
        )
    }
  }

  closeModal = () => {
    this.setState({
      source: '',
      modal: ''
    })
    this.props.closeModal()
  }

  render () {
    if (!this.props.show) return null
    // const { closeModal } = this.props

    return (
      <Panel onClick={e => e.stopPropagation()} show>
        <Close onClick={this.closeModal}>X</Close>
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
