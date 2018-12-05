import React, { Component } from 'react'
import styled from 'styled-components'
import SeoHead from '../components/SeoHead'
import Checkbox from '../components/Checkbox'
// import Navegation from '../components/Navegation'
import api from '../client-util/api'
import { setCookie, getUser } from '../client-util/session'
import CookiesConsent from '../components/CookiesConsent'
import config from '../config'

const H3 = styled.h3`
  color: #30233F;
  font-size: 30px;
  text-transform: capitalize;

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
    width: 90%;
    margin: 1em auto;
  }
`

const Present = styled.img`
  display: block;
  margin: 0 auto;
  width: 40%;
`

const Panel = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100vh;
`

const PrivacyLink = styled.a`
  text-decoration: none;
  color: #4d58d8;
  font-size: 20px;
  display: block;
`
const Button = styled.button`
  border: 2px solid transparent;
  padding: .50em 4em;
  border-radius: 3px;
  color: #FFF;
  font-size: 20px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition: all .3s ease-out;
  background-color: ${p => p.active ? '#5da508' : '#cccccc'};
  background-color: ${p => p.active ? '#4d55d8' : '#cccccc'};
  opacity: .9;
  cursor: ${p => p.active ? 'pointer' : 'not-allowed'};
  user-select: none;

  @media (max-width: 900px) {
    display: block;
    width: 80%;
    padding: .50em 0;
    margin: 0;
    margin: 0 auto;
  }

  &:hover {
    opacity: 1;
  }
`

const Checks = styled.div`
  margin: 2em 0;
`

export default class extends Component {
  static async getInitialProps ({ req, res }) {
    const user = getUser(req)
    return { user }
  }

  state = {
    terms: false,
    privacy: false
  }

  onChange = (key, value) => {
    this.setState({ [key]: value })
    setTimeout(() => console.log(this.state), 50)
  }

  getChecked = () => {
    return this.state.privacy && this.state.terms
  }

  submit = async () => {
    if (this.getChecked()) {
      const res = await api.User.acceptTerms()
      if (res.token) {
        setCookie('jwt', res.token)
        setCookie('jwt-rfs', res.refreshToken)
        setCookie(config.user_cookie_key, res.user)
        window.location = '/cube-app/new'
      }
    }
  }

  render () {
    return (
      <Panel>
        <SeoHead />
        <Section>
          <Present src='https://d39p6dv27gzlaf.cloudfront.net/static/img/privacy2.svg' />
          <H3>Hola {this.props.user ? this.props.user.fullname : ''} </H3>
          <Parragraph>
              Nos tomamos muy enserio la privacidad de tu informacion. Para poder usar nuestros servicios debes aceptar:
            <Checks>
              <Checkbox onCheck={this.onChange} label='privacy'>
                <PrivacyLink href='/politica-de-privacidad' target='_blank'>
                  Politica de Privacidad
                </PrivacyLink>
              </Checkbox>
              <Checkbox onCheck={this.onChange} label='terms'>
                <PrivacyLink href='/terminos-de-servicio' target='_blank'>
                  Terminos de Servicio
                </PrivacyLink>
              </Checkbox>
            </Checks>
          </Parragraph>
          <Button
            onClick={this.submit}
            active={this.getChecked()}
          >
          Aceptar
          </Button>
        </Section>
        <CookiesConsent />
      </Panel>
    )
  }
}
