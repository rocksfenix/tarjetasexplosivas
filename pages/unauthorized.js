import React from 'react'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import Navegation from '../components/Navegation'
import CookiesConsent from '../components/CookiesConsent'

const Panel = styled.div`
  width: 100%;
  height: 100%;
`

const Img = styled.img`
  display: block;
  margin: 1em auto;
`

export default class extends React.Component {
  static async getInitialProps ({ req, res }) {
    const user = getUser(req)
    return { user }
  }
  render () {
    return (
      <Panel>
        <Navegation user={this.props.user} />
        <Img src='/static/img/401.svg' />
        <CookiesConsent />
      </Panel>
    )
  }
}
