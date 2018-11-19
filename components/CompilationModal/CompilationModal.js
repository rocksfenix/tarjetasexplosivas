import React from 'react'
import styled, { keyframes } from 'styled-components'
import { PacmanLoader } from 'react-spinners'
import api from '../../client-util/api'
import Envelopes from '../Envelopes'

const Anima = keyframes`
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`

const Panel = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  padding-top: 1em;
  padding-bottom: 3em;
  top: 0;
  z-index: 30000;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  animation: ${Anima} ease-out 200ms forwards;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #291d46;
  user-select: none;
  overflow-y: auto;
  @media (max-width: 900px) {
    background-color: rgba(255, 255, 255, 0.85);
    height: 90vh;
    padding-bottom: 1em;
  }
`

const Information = styled.div`
  width: 90%;
  height: 100vh;
  max-width: 700px;
  margin: 0 auto;
  word-wrap: break-word;
`

const Button = styled.a`
  background: ${p => p.bg || 'gray'};
  padding: .5em 1.8em;
  border: 0;
  color: #ffffff;
  font-size: 20px;
  border-radius: 38px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-align: center;
  margin: 3em auto;
  max-width: 250px;
`

const Title = styled.div`
  font-size: 22px;
  line-height: 2;
  text-align: center;
  padding-top: 1em;
  :first-child {
    line-height: 2;
    padding-top: 2em;
  }
`

const Note = styled.div`
  list-style-type: none;
  display: flex;
  margin: 2em 0;
  font-size: 18px;
`

const Process = styled.div`
  width: 90%;
  height: 50vh;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  word-wrap: break-word;
  text-align: center;
`

export default class extends React.Component {
  state = {
    isCompiling: false,
    status: '',
    modal: 'danger'
  }

  compile = async () => {
    if (!this.state.isCompiling) {
      this.setState({ isCompiling: true, modal: 'compiling' })
      window.setTimeout(() => this.setState({ status: 'Obteniendo Fotografias' }), 1000)
      window.setTimeout(() => this.setState({ status: 'Creando Diseño' }), 4000)
      window.setTimeout(() => this.setState({ status: 'Creando Archivos PDF' }), 8000)
      window.setTimeout(() => this.setState({ status: 'Creando Folder Descargable' }), 11000)

      const res = await api.Work.compile(this.props.work)

      if (res.location) {
        this.setState({ location: res.location, isCompiling: false, modal: '' })
        this.props.onCompiled(res.location)
      }
    }
  }

  chooseEnvelope = () => {
    this.setState({ modal: 'envelope' })
  }

  onSetEnvelope = (src) => {
    this.props.onSetEnvelope(src)
    this.setState({ modal: 'compiling' })
    window.setTimeout(() => {
      this.compile()
    }, 200)
  }

  onBack = () => {
    window.history.back()
    this.setState({ modal: 'danger' })
  }

  render () {
    if (!this.props.show) return null
    const plural = this.props.user.credits > 1 ? 's' : ''
    return (
      <Panel>
        {
          this.state.modal === 'danger' && !this.props.work.location

            ? (
              <Information>
                <Title>Tienes disponibles <strong>{ this.props.user.credits} Credito{plural}</strong></Title>
                <Note>Cuidado! Cada Diseño cuesta 1 Credito y una vez procesado no se pueden hacer modificaciones a tu tarjeta:</Note>
                <Note>Da un ultimo vistaso a tu tarjeta o procesala si ya es hermosamente perfecta.</Note>
                <Button bg='#2196F3' onClick={this.onBack}>Revisar Diseño</Button>
                <Button bg='linear-gradient(30deg, #F44336, #cc0114)' onClick={this.chooseEnvelope}>Procesar Diseño <br /><small>( {this.props.user.credits} Credito{plural} disponible{plural} )</small></Button>
              </Information>
            )
            : null
        }

        {
          this.state.modal === 'compiling'
            ? (
              <Process>
                <Title>{ this.state.status }</Title>
                <PacmanLoader color={'#0057ff'} />
              </Process>
            )
            : null
        }

        {
          this.state.modal === 'envelope'
            ? (
              <Envelopes
                onSetPhoto={this.onSetEnvelope}
                onBack={this.onBack}
              />
            )
            : null
        }

      </Panel>
    )
  }
}
