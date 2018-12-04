import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { getUser } from '../client-util/session'
import Footer from '../components/Footer'
import SeoHead from '../components/SeoHead'
import Navegation from '../components/Navegation'
import VideoLanding from '../components/Videos/Video-landing'
import ExpiredNotification from '../components/ExpiredNotification'
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
  overflow-x: hidden;
  height: 100vh;
`

const Icon = styled.i`
  margin: 0 0 0 10px;
  font-size: 25px;
`

export default class extends Component {
  static async getInitialProps ({ req, res }) {
    let query = {}
    if (req) query = req.query
    const user = getUser(req)
    return { user, query }
  }

  render () {
    return (
      <Panel>
        <SeoHead />
        <Navegation user={this.props.user} />
        { this.props.query.expired
          ? <ExpiredNotification />
          : null
        }
        <Section>
          <Title>BUSCAS EL REGALO PERFECTO?</Title>
          <CardsPromo1 />
          <Parragraph>
            Ya se que se acerca esa fecha tan especial y no sabes que regalar,
            has buscado por un monton de sitios pero no encuentras nada y aun asi
            tienes la esperanza de sorprender a esa persona que es tan especial para ti
            (poner ojos de borreguito a medio morir aqui).
          </Parragraph>

          <Parragraph>
            Tambien se que te sientes frustrado y con un poco de estres, porque en verdad
            quieres sorprender a esa persona pero son tantas cosas que puedes regalar
            y nada parece original, todo parece tan aburrido y sin vida, porque recuerdas que....
          </Parragraph>

          <H3>EL MEJOR REGALO DEBE:</H3>
          <List>
            <Item>Ser unico y original</Item>
            <Item>Si es personalizado, sube como la espuma</Item>
            <Item>Si es creado por ti mismo puff... Lo logramos.</Item>
          </List>

          <Parragraph>
            Bueno hay buenas noticias para ti, muy buenas de hecho, puedes crear ese
            maravilloso unico y original regalo con ese par de manitas lindas que tienes,
            facilmente y en cuestion de minutos porque se que tienes una vida muuy ocupada, verdad?
            (Esas series de Netflix no se veran solas ehem)
            Bueno como el tiempo es limitado ire directo al grano, listo?... si....
            Cool un excelente regalo es una tarjeta... bahg solo una tarjeta?
          </Parragraph>

          <Parragraph>
            ... y antes de que te vallas a seguir googleando cual holandez herrante por los mares de la web,
            sin saber que regalar, te digo... una tarjeta es aburrida y gris sin chispa ni color, pero...
            Aqui hay un pero, si es una tarjeta que explota confeti la cosa cambia o no? Revisa este video:
          </Parragraph>

          <VideoLanding videoId='hcr56y3zbh' />

          <Parragraph>
            Apoco no esta hermoso, genial, unico, cool, way, chevere!!! Bueno lo mejor de todo que sera
            100% personalizado con tus propias fotos y mensajes, lo haras con tus propias manos, sin ningun
            software especial y sobre todo a un super precio, enserio, gastaras mas en una caja de chocolates
            que en este precioso regalo.
          </Parragraph>

          <H3>CREA TU TARGETA EXPLOSIVA PERSONALIZADA</H3>
          <Ol>
            <ItemOl>
              <StepBall>1</StepBall>
              <Text>
                Sube tus imagenes o selecciona o porque no usar algunas de Facebook o instagram,
                puedes seleccionar algunas de las plantillas cool que tenemos y personalizarlas
                con mensajes unicos, especiales, amorosos y efervecentes.
              </Text>
            </ItemOl>
            <ItemOl>
              <StepBall>2</StepBall>
              <Text>
              Revisa tu diseño en un simulador digital en 3D y apruebalo. Guau que hermosura.
              </Text>
            </ItemOl>
            <ItemOl>
              <StepBall>3</StepBall>
              <Text>
              Descargate los planos, imprime y manos ala obra, en 10~ minutos tendras creada
              esa hermosa tarjeta explosiva y creada por tus manos santas
              (inserte frace alardeadora para usted aqui).
              </Text>
            </ItemOl>
          </Ol>
          <Parragraph>
            * Sin compromiso puedes crear un diseño y solo pagas si te gusta el resultado asi
            como debe ser ohh amigo mio.
          </Parragraph>
          <Link href='/cube-app/new'>
            <ButtonLink>Crear nueva tarjeta <Icon className='icon-star' /></ButtonLink>
          </Link>
        </Section>
        <Footer />
        <CookiesConsent />
      </Panel>
    )
  }
}
