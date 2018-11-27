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
import api from '../client-util/api'
import Router from 'next/router'
import VideoInstruccions from '../components/Videos/Video-landing'

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

const Cards = styled.div`
  display: flex;
  width: 150%;
  transform: translateX(-50%);
  position: relative;
  left: 50%;

  @media(max-width: 900px) {
    left: 0%;
    transform: translateX(0%);
    width: 100%;
  }
`

const Column = styled.div`
  width: 50%;

  @media(max-width: 900px) {
    width: 100%;
  }
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

const Img = styled.img`
  width: 100%;
  border: 3px solid #FFF;
  box-sizing: border-box;
`

const Image = styled.img`
  width: 50%;
  margin: 1em auto;
  display: block;
`

export default class extends Component {
  state = {
    user: {},
    isAuthorized: false,
    status: ''
  }

  componentDidMount = async () => {
    const { user = {} } = await api.User.get()

    let isAuthorized = false
    let status = 'UnAuthorized'

    if (user) {
      if (user.purchaseCredits !== 0) {
        isAuthorized = true
        status = 'Authorized'
      }
    }

    this.setState({ isAuthorized, status, user })
  }

  render () {
    return (
      <Panel>
        <SeoHead />
        <Navegation user={this.props.user} />
        <Section>
          <Title>Has tomado la decicion correcta</Title>
          <H3>Un regalo tan perfecto, barato y hermoso no es todos los dias</H3>

          <Parragraph>
            En esta parte de abajo encontraras el video con las instrucciones a detalle de como crear esa hermosa tarjeta, tambien mas abajo del video tienes las instrucciones en texto paso a paso de como contruila por si te pierdes, si ya has visto el video y las instrucciones y aun tienes problemas puedes contactarnos en <strong>hola@tarjetasexplosivas.com</strong> estamos para ayudarte con cualquier problema en el proceso, nuestra motivacion es que puedas regalar algo increible y puedas generar una hermosa experiencia.
          </Parragraph>

          <H3>Necesitaras:</H3>
          <ul>
            <li>Impresora a color</li>
            <li>1 Cutter o navaja</li>
            <li>Tijeras</li>
            <li>1 Pegamento adhesivo</li>
            <li>1 Regla</li>
            <li>1 Liga de 6cm</li>
            <li>Impresora a color</li>
            <li>4 Hojas Tamaño carta de papel opalina o papel fotografico (de minimo 200 Gramos ya que si es inferior la tarjeta podria doblarse y no funcionar bien).</li>
          </ul>

          <VideoInstruccions />

          <H3>Pasos para Crear la Tarjeta</H3>

          <Parragraph>
            <strong>1</strong>Descarga los materiales vienen en una carpeta comprimida .ZIP, descomprimela y enctontraras 5 archivos, las instrucciones y 4 de ellos son las hojas en formato .PDF, imprimelas en el papel que se mencina arriba, es muy importante el grosor del papel minimo 200gramos ya que de lo contario la tajeta se puede doblar / quedar pegada.
          </Parragraph>

          <Parragraph>
            <strong>2</strong> Recorta el contorno de los diseños como se muestra en la siguiente imagen (contorno verde):
          </Parragraph>
          <Image src='/static/guia-1.jpg' />

          <Parragraph>
            <strong>3</strong> Con una pluma o la punta de las tijeras has unos pequeños huecos con movimientos circulares tratando de que queden redondos (señalado con rojo) Ya que los termines recorta los lados (color Morado).
          </Parragraph>
          <Image src='/static/guia-2.jpg' />

          <Parragraph>
            <strong>4</strong> Vamos a ir marcando los dobleces, la idea es precionar muy suavemente con el cutter / navaja para que puedas doblar los lados sin dificultad, para que practiques un poco e ir midiendo el filo de tu navaja en la aprte de abajo de cada hoja encontraras estas lineas (Color Verde), practica en esos lugares, la idea es solo precionar un poco para poder dobler esa parte mas facilmente, teniendo mucho cuidado de no sobre pasar el papel.
          </Parragraph>
          <Image src='/static/guia-3.jpg' />
          <Parragraph>
            Una vez que hayas practicado ahora es momento de marcar los siguientes puntos con ayuda de una regla, sostenida fuertemente, y con la navaja marcar estas lineas <strong>muy suavemente</strong> ya que si se rompe se arruinara la hoja y la tendremos que imprimir nuevamente, (marca las lineas marcadas con rojo)
          </Parragraph>
          <Image src='/static/guia-4.jpg' />
          <Parragraph>
            Buen trabajo, ahora con cuidado debemos doblar cada lado de la siguiente forma
          </Parragraph>

          <Parragraph>
            Una vez doblado pueder ver que ya tomaa forma de medio cubo,
          </Parragraph>

          <Parragraph>
            * Repite los mismos pasos hasta aqui para las 2 horas (1 y 2).
          </Parragraph>

          <Parragraph>
            Excelente ya casi, ahora debemos marcar acomodarlas de la siguiente forma, en la parte señalada con amarillo debes de poner pegamento adeshivo y quedara de la siguiente forma.
          </Parragraph>

          <Parragraph>
            Ahora devemos de pegar el lado marcado en naranja, y nos quedara asi:
          </Parragraph>

          <Parragraph>
            *
          </Parragraph>

          {/* <H3>Hey Comenzamos {this.state.status} {this.state.user.purchaseCredits}</H3> */}

        </Section>
        <Footer />
        <CookiesConsent />
      </Panel>
    )
  }
}
