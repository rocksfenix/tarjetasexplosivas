import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../Input'

const Modal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(256,256,256, 0.96);
  position: absolute;
  display: ${p => p.show ? 'block' : 'none'};
  color: #FFF;
`

const Box = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 3em auto;
  position: relative;
`

const Register = styled.button`
  background: #4caf50;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  margin: 0.5em 0;
  border-radius: 3px;
`

const Cross = styled.div`
  position: absolute;
  top: -43px;
  right: -45px;
  font-size: 30px;
  color: black;
`

class InfoAccountComponent extends Component {
  state = {
    notification: {
      message: '',
      show: false
    },
    data: {},
    validate: {}
  }

  componentWillMount () {
    this.setState({
      data: { ...this.props.user }
    })
  }

  onChange = (key, val) => this.setState(state => ({
    ...state,
    data: { ...state.data, [key]: val }
  }))

  onValidate = (key, val) => this.setState(state => ({
    ...state,
    validate: { ...state.validate, [key]: val }
  }))

  updateUser = () => {
    this.props.updateUser({
      ...this.state.data
    })
  }

  render () {
    const { fullname, email } = this.state.data
    return (
      <Modal show>
        <Box>
          <Cross onClick={this.props.closeModal}>X</Cross>
          <Input
            label='Nombre Completo'
            field='fullname'
            value={fullname}
            onChange={this.onChange}
            onValidate={this.onValidate}
          />
          <Input
            label='Email'
            field='email'
            type='email'
            value={email}
            pattern={/[^@]+@[^@]+\.[a-zA-Z]{2,}/g}
            onChange={this.onChange}
            onValidate={this.onValidate}
          />
          <Register onClick={this.updateUser}>Actualizar Informacion</Register>
          <Register onClick={this.props.closeModal}>Atras</Register>
        </Box>
      </Modal>
    )
  }
}

export default InfoAccountComponent
