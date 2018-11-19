import React, { Component } from 'react'
import styled from 'styled-components'

const Notification = styled.div`
  position: absolute;
  width: 100%;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${p => p.show ? '0px' : '-50px'};
  transition: top 200ms ease-out;
  min-height: 50px;
  background-color: orangered;
  font-size: 18px;
`

export default class extends Component {
  render () {
    return (
      <Notification show={this.props.show}>
        { this.props.message } <button onClick={this.props.onClose}>X</button>
      </Notification>
    )
  }
}
