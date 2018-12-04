import React, { Component } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import CookiesConsent from '../components/CookiesConsent'
import api from '../client-util/api'
import VideoInstruccions from '../components/Videos/Video-landing'
import party from '../client-util/party'

const Title = styled.h1`
  color: #30233F;
  font-size: 35px;

  @media (max-width: 900px) {
    margin: 1em auto;
    padding: 0 .3em;
  }
`

const H3 = styled.h3`
  color: #30233F;
  font-size: 25px;

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

const Panel = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media(max-width: 900px) {
    flex-direction: column;
  }
`

const ButtonLink = styled.a`
  background: ${p => p.bg || 'gray'};
  padding: .9em 2em;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  border-radius: 38px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-align: center;
  margin: 3em auto;
  max-width: 250px;

  @media(max-width: 900px) {
    font-size: 16px;
    padding: .5em 1em;
  }

  :hover {
    background: linear-gradient(90deg, #9C27B0, blue);
  }
`

const Image = styled.img`
  width: 150px;
  height: auto;
  border: 1px solid #d2cece;
  box-sizing: border-box;
`

const Images = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default class extends Component {
  static getInitialProps ({ req }) {
    if (req) {
      return {
        query: req.query
      }
    } else {
      return {}
    }
  }

  state = {
    user: {},
    isAuthorized: false,
    status: '',
    isFetching: true
  }

  componentDidMount = async () => {
    const { user = {} } = await api.User.get()

    let isAuthorized = false
    let status = 'UnAuthorized'

    if (user) {
      if (user.purchaseCredits && user.purchaseCredits !== 0) {
        isAuthorized = true
        status = 'Authorized'
      }
    }

    this.setState({ isAuthorized, status, user, isFetching: false })

    if (process.browser) {
      window.setTimeout(() => {
        party()
      }, 2000)
    }
  }

  render () {
    if (this.state.isFetching) {
      return (
        <Panel>
          <SeoHead />
          <Navegation user={this.state.user.role ? this.state.user : null} />
          <Section>
            <Title>Cargando ...</Title>
          </Section>
        </Panel>
      )
    }
    return (
      <Panel>
        <SeoHead />
        <Navegation user={this.state.user.role ? this.state.user : null} />
        { !this.state.isAuthorized && !this.state.isFetching
          ? (
            <Section>
              <Title>Wops, debes primero realizar la compra o hacer login</Title>
            </Section>
          )
          : (
            <Section>
              <Title>Has tomado la decicion correcta</Title>
              <H3>Un regalo tan perfecto, barato y hermoso no es todos los dias</H3>

              <ButtonLink bg='#0057ff' download href={this.props.query.workref}>Descargar Materiales</ButtonLink>

              <Parragraph>
            En esta parte de abajo encontraras el video con las instrucciones a detalle de como crear esa hermosa tarjeta, tambien mas abajo del video tienes las instrucciones en texto paso a paso de como contruila por si te pierdes, si ya has visto el video y las instrucciones y aun tienes problemas puedes contactarnos en <strong>hola@tarjetasexplosivas.com</strong> estamos para ayudarte con cualquier problema en el proceso, nuestra motivacion es que puedas regalar algo increible y puedas generar una hermosa experiencia.
              </Parragraph>

              <H3>Necesitaras:</H3>
              <ul>
                <li>Impresora a color</li>
                <li>1 Cutter o navaja</li>
                <li>1 Tijeras</li>
                <li>1 Pegamento adhesivo</li>
                <li>1 Regla</li>
                <li>1 Liga de 6cm</li>
                <li>4 Hojas Tamaño carta de papel opalina o papel fotografico (de minimo 200 Gramos ya que si es inferior la tarjeta se doblara y no funcionara bien).</li>
                <li>Hojas de colores o confeti</li>
              </ul>

              <VideoInstruccions videoId='1soi82xlxt' />

              <H3>Confeti y patrones</H3>
              <Images>
                <Row>
                  <a download target='_blank' href='https://d39p6dv27gzlaf.cloudfront.net/static/others/emoticons-confetii-heart.pdf'>
                    <Image src='https://d39p6dv27gzlaf.cloudfront.net/static/img/confeti-emoticons-heart.jpg' />
                  </a>
                  <a download target='_blank' href='https://d39p6dv27gzlaf.cloudfront.net/static/others/emoticons-confetii.pdf'>
                    <Image src='https://d39p6dv27gzlaf.cloudfront.net/static/img/confeti-emoticons.jpg' />
                  </a>
                </Row>
                <Row>
                  <a download target='_blank' href='https://d39p6dv27gzlaf.cloudfront.net/static/others/emoticons-confetii-star.pdf'>
                    <Image src='https://d39p6dv27gzlaf.cloudfront.net/static/img/confeti-emoticons-star.jpg' />
                  </a>
                  <a download target='_blank' href='https://d39p6dv27gzlaf.cloudfront.net/static/others/emoticons-confetii-love.pdf'>
                    <Image src='https://d39p6dv27gzlaf.cloudfront.net/static/img/confeti-emoticons-love.jpg' />
                  </a>
                </Row>
              </Images>
            </Section>
          )
        }
        <Footer />
        <CookiesConsent />
      </Panel>
    )
  }
}
