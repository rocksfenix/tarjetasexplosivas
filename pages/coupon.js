import React, { Component } from 'react'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import CookiesConsent from '../components/CookiesConsent'
import api from '../client-util/api'

const Title = styled.h1`
  color: #30233F;
  font-size: 35px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
  }
`

const Section = styled.section`
  margin: 1em auto;
  max-width: 800px;
  color: #333;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.58;
  padding-bottom: 5em;
  overflow-y: auto;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const Panel = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100vh;
`

export default class extends Component {
  static async getInitialProps ({ req, res }) {
    const user = getUser(req)
    return { user }
  }

  state = { code: '' }

  change = ({ target }) => {
    this.setState({ code: target.value })
  }

  apply = async () => {
    console.log('APPLYING', this.state)
    const res = await api.Coupon.apply(this.state.code)

    console.log(res)
  }

  render () {
    return (
      <Panel>
        <SeoHead />
        <Navegation user={this.props.user} />
        <Section>
          <Title>Ingresa el codigo de tu cupon</Title>
          <input type='text' value={this.state.code} onChange={this.change} />
          <button onClick={this.apply}>APPLY</button>
        </Section>
        <CookiesConsent />
      </Panel>
    )
  }
}
