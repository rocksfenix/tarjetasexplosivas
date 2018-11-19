import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { getUser } from '../client-util/session'
import api from '../client-util/api'
import Input from '../components/Input'
import Submit from '../components/Submit'
import Navegation from '../components/Navegation'
import SeoHead from '../components/SeoHead'

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

class Forgot extends Component {
  static async getInitialProps ({ req, res }) {
    // Redireccionamos si ya esta autentificado
    const user = getUser(req)
    if (user) {
      if (res) {
        res.writeHead(302, {
          Location: '/app'
        })
        res.end()
      } else {
        Router.push('/app')
      }
    }
    return {}
  }

  state = { email: '', isValid: false }

  onChange = (key, value) => this.setState({ email: value })

  onValidate = (key, val) => this.setState({ isValid: val })

  submit = async () => {
    if (this.state.isValid) {
      const res = await api.Auth.forgot(this.state.email)
      console.log(res)
    }
  }

  render () {
    console.log(this.props)
    return (
      <Panel>
        <SeoHead title='Cuenta' />
        <Navegation user={this.props.user} />
        <h1>FORGOR NO WORRIES</h1>
        <Input
          label='Email'
          field='email'
          type='email'
          value={this.state.email}
          pattern={/[^@]+@[^@]+\.[a-zA-Z]{2,}/g}
          onChange={this.onChange}
          onValidate={this.onValidate}
        />
        <Submit active={this.state.isValid} onClick={this.submit}>Recuperar Contraseña</Submit>
      </Panel>
    )
  }
}

export default Forgot
