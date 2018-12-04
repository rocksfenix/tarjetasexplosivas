import React, { Component } from 'react'
import styled from 'styled-components'
import { setCookie, getCookie } from '../../client-util/session'

const Panel = styled.div`
  width: 100vw;
  height: 70px;
  background-color: #d0871c;
  background-color: rgb(35, 122, 252);
  color: #FFF;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: ${p => p.show ? '0' : '-80px'};
  z-index: 1000;
  padding: 0 0.5em;
  transition: bottom 250ms ease-out;

  @media(max-width: 900px) {
    height: 210px;
    padding: 0 0.5em;
    flex-direction: column;
    bottom: ${p => p.show ? '0' : '-210px'};
  }
`

const Text = styled.div`
  font-size: 15px;
  font-weight: 100;
`

const Buttons = styled.div`

`

const Link = styled.a`
  color: #92eaff;
`

const Button = styled.button`
  color: rgb(255, 255, 255);
  background-color: transparent;
  border: 2px solid #FFF;
  padding: .5em 1em;
  font-size: 17px;
  cursor: pointer;
  margin: 0 .5em;
`

class ConcentComponent extends Component {
  state = {
    show: false
  }
  componentDidMount () {
    if (process.browser) {
      const consent = getCookie('cookieConsent')
      this.setState({ show: !consent })
    }
  }
  consent = () => {
    setCookie('cookieConsent', true)
    this.setState({ show: false })
  }
  render () {
    return (
      <Panel show={this.state.show}>
        <Text>
          Utilizamos cookies para asegurar que damos la mejor experiencia al usuario en nuestro sitio web. Si continúa utilizando este sitio asumiremos que está de acuerdo. <Link href='/politica-de-cookies'> Mas Informacion</Link>
        </Text>
        <Buttons>
          <Button onClick={this.consent}>Estoy de acuerdo</Button>
        </Buttons>
      </Panel>
    )
  }
}

export default ConcentComponent
