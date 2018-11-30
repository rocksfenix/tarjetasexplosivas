import React, { Component } from 'react'
import styled from 'styled-components'

const Notification = styled.div`
  position: absolute;
  width: 100vw;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${p => p.show ? '0px' : '-150px'};
  transition: top 200ms ease-out;
  min-height: 55px;
  background-color: ${p => p.bg || 'black'};
  font-size: 18px;
  z-index: 8000;
`

const Content = styled.div`
  padding: 0.5em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  height: 100%;
  width: 75px;
  background: transparent;
  border: 0;
  cursor: pointer;
`

const Icon = styled.i`
  font-size: 20px;
  color: #FFF;
`

export default class extends Component {
  state = {
    show: false
  }

  static getDerivedStateFromProps (nextProps) {
    if (nextProps.query && nextProps.show && nextProps.user) {
      const credits = nextProps.user.credits
      const isSuccess = nextProps.query.payment === 'success'
      const plural = credits > 1 ? 's' : ''
      const bgColor = isSuccess
        ? '#27bf3f'
        : 'orangered'
      const message = isSuccess
        ? `El pago fue realizado y ahora tienes ${credits} credito${plural} disponible${plural}`
        : 'Wops no se pudo completar tu pago'

      // Si el success y tiene creditos
      let show = isSuccess && credits > 0

      // Si no es success y no tiene creditos
      if (!isSuccess && credits === 0) show = true
      // SI no hay nada
      if (!nextProps.query.payment) show = false

      return { show, message, bgColor }
    } else {
      return { show: false }
    }
  }

  onClose = () => this.setState({ show: false })

  render () {
    return (
      <Notification show={this.state.show} bg={this.state.bgColor}>
        <Content>
          { this.state.message } <Button onClick={this.props.closeNotificationPayment}> <Icon className='icon-cross' /></Button>
        </Content>
      </Notification>
    )
  }
}
