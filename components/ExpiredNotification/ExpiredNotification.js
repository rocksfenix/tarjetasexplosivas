import React, { Component } from 'react'
import styled from 'styled-components'

const Notification = styled.div`
  position: absolute;
  width: 100vw;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${p => p.show ? '55px' : '-150px'};
  transition: top 200ms ease-out;
  min-height: 50px;
  background-color: ${p => p.bg || 'black'};
  font-size: 18px;
  z-index: 1;
`

const Content = styled.div`
  padding: 0.5em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class extends Component {
  state = {
    show: true
  }

  onClose = () => this.setState({ show: false })

  render () {
    return (
      <Notification show={this.state.show} bg='#f3c231'>
        <Content>
          La session ha expirado puedes acceder nuevamente desde /login <button onClick={this.onClose}>X</button>
        </Content>
      </Notification>
    )
  }
}
