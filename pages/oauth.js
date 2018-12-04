import React, { Component } from 'react'
import Router from 'next/router'
import jwtDecode from 'jwt-decode'
import api from '../client-util/api'
import { setCookie } from '../client-util/session'
import Navegation from '../components/Navegation'
import config from '../config'

export default class extends Component {
  static async getInitialProps (ctx) {
    if (ctx.query.h) {
      // Login with Hash POST and get JWT
      const res = await api.Auth.oAuth(ctx.query.h)

      // Si esta caducada mostrar error
      if (res.error) {
        if (ctx.res) {
          ctx.res.writeHead(302, {
            Location: '/login?error=true'
          })
          ctx.res.end()
        } else {
          Router.push('/login?error=true')
        }
      }
      return res
    } else {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: '/login'
        })
        ctx.res.end()
      } else {
        Router.push('/login')
      }
    }
    return {}
  }

  componentDidMount () {
    if (process.browser) {
      if (this.props.token) {
        setCookie('jwt', this.props.token)
        setCookie('jwt-rfs', this.props.refreshToken)
        setCookie(config.user_cookie_key, this.props.user)
        // FB Pixel
        window.fbq('track', 'CompleteRegistration')
        if (jwtDecode(this.props.token).acpp === 'false') {
          window.location = '/terms'
        } else {
          window.location = '/my-cards'
        }
      }
    }
  }

  render () {
    return (
      <div>
        <Navegation />
        <h1>.....</h1>
      </div>
    )
  }
}
