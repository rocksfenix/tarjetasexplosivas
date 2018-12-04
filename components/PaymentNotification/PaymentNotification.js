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
    show: false,
    showed: false
  }

  componentDidUpdate () {
    if (this.props.query && this.props.show && this.props.user) {
      if (!this.state.showed) {
        this.state.showed = true
        const credits = this.props.user.credits
        const isSuccess = this.props.query.payment === 'success'
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
        if (!this.props.query.payment) show = false
        this.setState({ show, message, bgColor })

        let value = 0

        if (credits === 1) value = 4.99
        if (credits === 2) value = 7.99
        if (credits >= 4) value = 9.99

        // FB Pixel
        window.fbq('track', 'Purchase', {
          value,
          currency: 'USD'
        })

        console.log('Pucharse Completed')
      }
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
