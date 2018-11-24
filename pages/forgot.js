import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { getUser } from '../client-util/session'
import api from '../client-util/api'
import Input from '../components/Input'
import Submit from '../components/Submit'
import Navegation from '../components/Navegation'
import SeoHead from '../components/SeoHead'
import CookiesConsent from '../components/CookiesConsent'

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Text = styled.div`
  font-size: 20px;
  color: #3c3546;
  text-align: center;
  padding: 1em 0;
`

const Wrapper = styled.div`
  margin: 1em auto;
  width: 100%;
  max-width: 380px;
`

class Forgot extends Component {
  static async getInitialProps ({ req, res }) {
    // Redireccionamos si ya esta autentificado
    const user = getUser(req)
    if (user) {
      if (res) {
        res.writeHead(302, {
          Location: '/cards'
        })
        res.end()
      } else {
        Router.push('/cards')
      }
    }
    return {}
  }

  state = {
    email: '',
    isValid: false,
    done: false
  }

  onChange = (key, value) => this.setState({ email: value })

  onValidate = (key, val) => this.setState({ isValid: val })

  submit = async () => {
    if (this.state.isValid) {
      const res = await api.Auth.forgot(this.state.email)
      if (res.success) {
        this.setState({ done: true })
      }
    }
  }

  render () {
    return (
      <Panel>
        <SeoHead title='Cuenta' />
        <Navegation user={this.props.user} />
        {
          !this.state.done
            ? (
              <Wrapper>
                <Text>Ingresa el Email con el cual te registraste:</Text>
                <Input
                  label='Email'
                  field='email'
                  type='email'
                  value={this.state.email}
                  pattern={/[^@]+@[^@]+\.[a-zA-Z]{2,}/g}
                  onChange={this.onChange}
                  onValidate={this.onValidate}
                />
                <Submit active={this.state.isValid} onClick={this.submit}>
                   Recuperar Contraseña
                </Submit>
              </Wrapper>
            )
            : (
              <Wrapper>
                <Text>
                  Te hemos enviado un email con instrucciones para recuperar
                  tu contraseña
                </Text>
              </Wrapper>
            )
        }
        <CookiesConsent />
      </Panel>
    )
  }
}

export default Forgot
