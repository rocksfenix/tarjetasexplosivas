import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import Link from '../components/Link'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'

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
          Location: '/crear-cuenta'
        })
        res.end()
      } else {
        Router.push('/crear-cuenta')
      }
    }

    if (user && user.role !== 'admin') {
      if (res) {
        res.writeHead(302, {
          Location: '/unauthorized'
        })
        res.end()
      } else {
        Router.push('/unauthorized')
      }
    }
    return { user }
  }

  render () {
    console.log(this.props)
    return (
      <Panel>
        <SeoHead title='Dashbaord' />
        <Navegation user={this.props.user} />
        <h1>Statistics y links para otros recursos</h1>
        <div>
          <Link href='/users' color='blue'>Usuarios</Link>
          <Link href='/designs' color='blue'>Designs</Link>
          <Link href='/categories' color='blue'>Categorias</Link>
          <Link href='/textures' color='blue'>Textures</Link>
          <Link href='/envelopes' color='blue'>Envelopes</Link>
          <Link href='/config' color='blue'>Config</Link>
        </div>
      </Panel>
    )
  }
}

export default App
