import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Link from 'next/link'
import api from '../client-util/api'
import { getUser } from '../client-util/session'
import SeoHead from '../components/SeoHead'
import Input from '../components/Input'
import Submit from '../components/Submit'
import CookiesConsent from '../components/CookiesConsent'

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  background: #d1ebff;
  padding: 2em 0;
  overflow: hidden;
  background: radial-gradient(white, #00a1b8);
  background: radial-gradient(white,#7eefff);
  background: radial-gradient(#00a1b8, white);

  @media (max-width: 900px) {
    overflow-y: auto;
  }
`

const ErrorBox = styled.div`
  width: 100%;
  line-height: 1.5;
  background-color: #ffc55b;
  border-radius: 4px;
  padding: 0.3em 0;
  text-align: center;
  color: #3a2f2f;
  margin: .3em 0;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 2em;
  margin: 5em auto;
  background-color: rgba(255,255,255, 0.9);
  position: relative;
  z-index: 100;
  padding: 1em, 0.5em;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
`

const Form = styled.div`
  width: 100%;
  margin: 1em auto;
  max-width: 350px;
`

class Forgot extends Component {
  static async getInitialProps ({ req, res }) {
    // Redireccionamos si ya esta autentificado
    const user = getUser(req)
    if (user) {
      if (res) {
        res.writeHead(302, {
          Location: '/cube-app'
        })
        res.end()
      } else {
        Router.push('/cube-app')
      }
    }
    return { user, token: req.params.token }
  }

  state = {
    success: false,
    data: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: {

    }
  }

  onChange = (key, val) => this.setState(state => ({
    ...state,
    error: null,
    data: { ...state.data, [key]: val }
  }))

  onValidate = (key, val) => this.setState(state => ({
    ...state,
    validate: { ...state.validate, [key]: val }
  }))

  submit = async () => {
    const { email, password, confirmPassword } = this.state.data
    if (this.validFields()) {
      const res = await api.Auth.changePassword(email, password, this.props.token)

      if (res.error) {
        this.setState({ error: res.error })
      } else {
        this.setState({ success: true })
      }
    } else if (password !== confirmPassword) {
      this.setState({ error: '* Las contraseñas no coinciden' })
    } else {
      this.setState({ error: '* Ingresa el email registrado' })
    }
  }

  validFields = () => {
    const { password, email, confirmPassword } = this.state.validate
    return (
      email &&
      password &&
      confirmPassword &&
      this.state.data.password === this.state.data.confirmPassword
    )
  }

  render () {
    return (
      <Panel>
        <SeoHead title='Actualizar contraseña' />
        {
          this.state.success
            ? (
              <Wrapper>
                <h2>Actualizada exitosamente</h2>
                <Link href='/login'>
                  <a>IR A LOGIN</a>
                </Link>
              </Wrapper>
            )
            : (
              <Wrapper>
                <h1>Cambiar Contraseña</h1>
                <span>Ingresa tu email registrado y una nueva contraseña</span>
                <Form>
                  <Input
                    label='Email'
                    field='email'
                    type='email'
                    value={this.state.data.email}
                    pattern={/[^@]+@[^@]+\.[a-zA-Z]{2,}/g}
                    onChange={this.onChange}
                    onValidate={this.onValidate}
                  />
                  <Input
                    label='Contraseña min 8'
                    field='password'
                    minLength={8}
                    value={this.state.data.password}
                    type='password'
                    onChange={this.onChange}
                    onValidate={this.onValidate}
                  />
                  <Input
                    label='Confirmar Contraseña'
                    field='confirmPassword'
                    minLength={8}
                    value={this.state.data.confirmPassword}
                    type='password'
                    onChange={this.onChange}
                    onValidate={this.onValidate}
                  />
                  { this.state.error ? <ErrorBox>{this.state.error}</ErrorBox> : null }
                  <Submit active={this.validFields()} onClick={this.submit}>Cambiar Contraseña</Submit>
                </Form>
              </Wrapper>
            )
        }
        <CookiesConsent />
      </Panel>
    )
  }
}

export default Forgot
