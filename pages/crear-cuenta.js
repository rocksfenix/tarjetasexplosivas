import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import jwtDecode from 'jwt-decode'
import api from '../client-util/api'
import { setCookie, getUser } from '../client-util/session'
import SeoHead from '../components/SeoHead'
import Confetii from '../components/Confetti'
import Notification from '../components/Notification'
import Input from '../components/Input'
import config from '../config'
import CookiesConsent from '../components/CookiesConsent'

const Title = styled.div`
  color: #333;
  font-size: 18px;
`

const Subtitle = styled.div`
  color: #333;
  font-size: 16px;
  padding: 1em 0;
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

const Facebook = styled.a`
  background: #4267b2;
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

const Google = styled.a`
  background: #ff5353;
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

const Register = styled.a`
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

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  background: #d1ebff;
  padding: 2em 0;
  overflow: hidden;
  background: radial-gradient(white, #00a1b8);
  background: radial-gradient(white,#7eefff);
  background: radial-gradient(#00a1b8, white);
  overflow-y: auto;
`

export default class extends Component {
  static async getInitialProps ({ req, res }) {
    // Redireccionamos si ya esta autentificado
    const user = getUser(req)
    if (user) {
      if (res) {
        res.writeHead(302, {
          Location: '/my-cards'
        })
        res.end()
      } else {
        Router.push('/my-cards')
      }
    }
    return {}
  }

  state = {
    notification: {
      message: '',
      show: false
    },
    data: {},
    validate: {}
  }

  onChange = (key, val) => this.setState(state => ({
    ...state,
    data: { ...state.data, [key]: val }
  }))

  onValidate = (key, val) => this.setState(state => ({
    ...state,
    validate: { ...state.validate, [key]: val }
  }))

  validFields = () => {
    return (
      this.state.validate.fullname &&
      this.state.validate.email &&
      this.state.validate.password
    )
  }

  signup = async () => {
    const res = await api.Auth.signup(this.state.data)
    if (res.error) {
      return this.setState({
        notification: { message: res.error, show: true }
      })
    }
    if (res.token) {
      setCookie('jwt', res.token)
      setCookie('jwt-rfs', res.refreshToken)
      setCookie(config.user_cookie_key, res.user)

      // Pixel Facebook
      window.fbq('track', 'CompleteRegistration')

      if (jwtDecode(res.token).acpp === 'false') {
        // /terms
        window.location = '/cube-app/new'
      } else {
        window.location = '/cube-app/new'
      }
    }
  }

  closeNotification = () => {
    this.setState({ notification: { ...this.state.notification, show: false } })
  }

  render () {
    const { fullname, email, password } = this.state.data
    return (
      <Panel>
        <SeoHead />
        <Confetii />
        <Notification
          show={this.state.notification.show}
          message={this.state.notification.message}
          onClose={this.closeNotification}
        />
        <Wrapper>
          <Form>
            <Title>REGISTRATE GRATIS</Title>
            <Subtitle>Con tus redes sociales:</Subtitle>
            <Link href='/api/auth/signup/facebook' passHref>
              <Facebook>Facebook</Facebook>
            </Link>
            <Link href='/api/auth/signup/google' passHref>
              <Google>Google</Google>
            </Link>
            <Subtitle>O con tu email y contraseña:</Subtitle>
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
            <Input
              label='Contraseña (min 8)'
              field='password'
              minLength={8}
              value={password}
              type='password'
              onChange={this.onChange}
              onValidate={this.onValidate}
            />

            {
              this.validFields()
                ? <Register onClick={this.signup}>Registrar</Register>
                : null
            }
            <Subtitle>Ya tienes cuenta?
              <Link href='login' passHref>
                <a> Has Login</a>
              </Link>
            </Subtitle>
          </Form>
        </Wrapper>
        <CookiesConsent />
      </Panel>
    )
  }
}
