import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import Link from '../components/Link'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import CookiesConsent from '../components/CookiesConsent'
import api from '../client-util/api'
import CompileCard from '../components/CompileCard'

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const Card = styled.div`
  width: 40%;
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
    if (!statistics.error) {
      this.setState({
        statistics
      })
    }
  }

  render () {
    return (
      <Panel>
        <SeoHead title='Dashbaord' />
        <Navegation user={this.props.user} />
        <h1>Statistics y links para otros recursos</h1>
        <h2>Estadisticas HOY</h2>

        <Card>
          <h3>Tarjetas Compiladas: {this.state.statistics.today.count}</h3>
          <h3>Monto Recaudado: ${this.state.statistics.today.amount}</h3>
          <h3>Tarjetas Creadas: {this.state.statistics.today.works}</h3>
          <h3>Usuarios Registrados: {this.state.statistics.today.users}</h3>
          <CompileCard time={this.state.statistics.today.average} />
        </Card>

        <hr />
        <h2>Estadisticas Ultimos 3 Dias</h2>
        <Card>
          <h3>Tarjetas Compiladas: {this.state.statistics.last3.count}</h3>
          <h3>Monto Recaudado: ${this.state.statistics.last3.amount}</h3>
          <h3>Tarjetas Creadas: {this.state.statistics.last3.works}</h3>
          <h3>Usuarios Registrados: {this.state.statistics.last3.users}</h3>
          <CompileCard time={this.state.statistics.last3.average} />
        </Card>

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
