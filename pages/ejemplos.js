import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import { getUser } from '../client-util/session'

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

class App extends Component {
  static async getInitialProps ({ req, res }) {
    const user = getUser(req)

    if (!user) {
      if (res) {
        res.writeHead(302, {
          Location: '/login'
        })
        res.end()
      } else {
        Router.push('/login')
      }
    }
    return { user }
  }

  render () {
    return (
      <Panel>
        <SeoHead title='Ejemplos de Tarjetas Explosivas' />
        <Navegation user={this.props.user} />
        <h1>Ejemplos</h1>
      </Panel>
    )
  }
}

export default App
