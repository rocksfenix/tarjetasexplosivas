import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import Link from '../components/Link'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import CookiesConsent from '../components/CookiesConsent'
import api from '../client-util/api'

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
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

  state = {
    statistics: {
      today: {},
      last3: {}
    }
  }

  componentDidMount = async () => {

    const statistics = await api.Statistics.getAverageCompilationTime()
    console.log(statistics)
    if (!statistics.error) {
      this.setState({
        statistics
      })
    }
  }

  render () {
    console.log(this.state)
    return (
      <Panel>
        <SeoHead title='Dashbaord' />
        <Navegation user={this.props.user} />
        <h1>Statistics y links para otros recursos</h1>
        <h2>Estadisticas HOY</h2>
        <h3>Compilacion Promedio: {this.state.statistics.today.average / 1000}s</h3>
        <h3>Tarjetas Compiladas: {this.state.statistics.today.count}</h3>
        <h3>Monto Recaudado: ${this.state.statistics.today.amount}</h3>
        <h3>Tarjetas Creadas: {this.state.statistics.today.works}</h3>
        <h3>Usuarios Registrados: {this.state.statistics.today.users}</h3>

        <hr />
        <h2>Estadisticas Ultimos 3 Dias</h2>
        <h3>Compilacion Promedio: {this.state.statistics.last3.average / 1000}s</h3>
        <h3>Tarjetas Compiladas: {this.state.statistics.last3.count}</h3>
        <h3>Monto Recaudado: ${this.state.statistics.last3.amount}</h3>
        <h3>Tarjetas Creadas: {this.state.statistics.last3.works}</h3>
        <h3>Usuarios Registrados: {this.state.statistics.last3.users}</h3>

        <hr />
        <h2>Total</h2>
        <h2>Tiempo de respuesta {this.state.statistics.responseTime}</h2>
        <h2>Usuarios Registrados: {this.state.statistics.users}</h2>

        <h1>Monto total: ${this.state.statistics.amount}</h1>
        <div>
          <Link href='/users' color='blue'>Usuarios</Link>
          <Link href='/designs' color='blue'>Designs</Link>
          <Link href='/album-designs' color='blue'>Album Designs</Link>
          <Link href='/textures' color='blue'>Textures</Link>
          <Link href='/envelopes' color='blue'>Envelopes</Link>
          <Link href='/coupons' color='blue'>Coupons</Link>
          <Link href='/config' color='blue'>Config</Link>
        </div>
        <CookiesConsent />
      </Panel>
    )
  }
}

export default App
