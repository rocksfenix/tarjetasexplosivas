import React, { Component } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import { getUser } from '../client-util/session'
import CookiesConsent from '../components/CookiesConsent'
import CardsPromo1 from '../components/PromosGifs/CardsPromo1'

const Panel = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const H3 = styled.h3`
  color: #30233F;
  font-size: 35px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
  }
`

const Section = styled.section`
  margin: 1em auto;
  max-width: 660px;
  color: #333;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.58;
  padding-bottom: 5em;

  @media (max-width: 900px) {
    width: 100%;
  }
`
const Parragraph = styled.p`
  @media (max-width: 900px) {
    width: 80%;
    margin: 1em auto;
  }
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
        <Section>
          <H3>Ejemplos de Tarjetas Explosivas</H3>
          <CardsPromo1 />

        </Section>
        <CookiesConsent />
      </Panel>
    )
  }
}

export default App
