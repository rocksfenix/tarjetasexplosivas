import React, { Component } from 'react'
import { removeCookie } from '../client-util/session'
import Navegation from '../components/Navegation'
import config from '../config'

export default class extends Component {
  componentDidMount () {
    if (process.browser) {
      removeCookie('jwt')
      removeCookie('jwt-rfs')
      removeCookie(config.user_cookie_key)
      window.location = '/'
    }
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <Navegation />
        <h1>..... LOGOUT</h1>
      </div>
    )
  }
}
