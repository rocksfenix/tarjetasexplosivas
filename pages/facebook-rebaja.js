import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import Footer from '../components/Footer'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
// import VideoLanding from '../components/Videos/Video-landing'
import CookiesConsent from '../components/CookiesConsent'
import CardsPromo1 from '../components/PromosGifs/CardsPromo1'

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

const Present = styled.img`
  display: block;
  margin: 0 auto;
`

const List = styled.ul`
  @media (max-width: 900px) {
    padding: 0 .8em;
  }
`

const Item = styled.li`
  list-style-type: none;
  display: flex;
  margin: .5em 0;

    &:before{
    content:'';
    padding: 0 0 0 1.5em;
    background:url('https://d39p6dv27gzlaf.cloudfront.net/static/img/success.svg') no-repeat 0 3px;
}
`

const Ol = styled.ol`
  list-style-type: none;

  @media (max-width: 900px) {
    padding: 0 .8em;
  }
`

const ItemOl = styled.li`
  list-style-type: none;
  display: flex;
  margin-bottom: 0.8em;
  `

const StepBall = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3bbff2;
  flex-shrink: 0;
  margin-right: 0.5em;
  margin-top: .5em;
`

const Text = styled.div`

`

const ButtonLink = styled.a`
  background-color: #3BBFF2;
  background: linear-gradient(30deg,#00c2ff,#008ff5);
  color: #FFF;
  display: inline-block;
  line-height: 3;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  margin: 2em auto;
  font-weight: 500;
  font-size: 23px;

  :hover {
    background: linear-gradient(250deg,#00c2ff,#008ff5);
  }

  @media (max-width: 900px) {
    width: 90%;
    margin: 0 auto;
  }
`

const Panel = styled.div`
  position: relative;
  overflow-y: auto;
  height: 100vh;
  overflow-x: hidden;
`

const Icon = styled.i`
  margin: 0 0 0 10px;
  font-size: 25px;
`

export default class extends Component {
  static async getInitialProps ({ req, res }) {
    const user = getUser(req)
    return { user }
  }

  render () {
    return (
      <Panel>
        <SeoHead />
        <Navegation user={this.props.user} />
        <Section>
          <CardsPromo1 />
          <Parragraph>
            Apoco no estaria hermoso, genial, unico, cool, way, chevere regalar este detalle original,
            personalizado y hecho con el par de manitas lindas que tienes. Asi es, una tarjeta que se hace cubo y explota junto con confeti (inserte cara de wow aqui).

            {/* Ya sea para cumpleaños, aniversario o solo porque quieres dar un regalo hermoso */}
          </Parragraph>
          {/* <VideoLanding videoId='2zpj3qxauv' /> */}
          <Parragraph>

          100% personalizada con tus propias fotos y mensajes, sin ningun
          software especial y sobre todo a un super precio, enserio, gastaras mas en una caja de chocolates
          que en este precioso regalo.
          </Parragraph>

          <Parragraph>
            * Sin compromiso puedes crear una tarjeta y solo pagas si te gusta el resultado asi
            como debe ser ohh amigo mio.
          </Parragraph>
          <Link href='/crear-cuenta'>
            <ButtonLink>Crear nueva tarjeta <Icon className='icon-star' /></ButtonLink>
          </Link>
        </Section>
        <Footer />
        <CookiesConsent />
      </Panel>
    )
  }
}
