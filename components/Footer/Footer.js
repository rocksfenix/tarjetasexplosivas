import React from 'react'
import styled, { keyframes } from 'styled-components'
import Link from 'next/link'

const Panel = styled.footer`
  width: 100%;
  height: 60px;
  background-color: rgb(243, 243, 243);
  background-color: rgb(41, 40, 40);
  border-top: 1px solid #b5b4b4;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media(max-width: 900px) {
    flex-direction: column;
    height: 250px;
  }
`
const To = styled.a`
  text-decoration: none;
  color: #808080;
`

const logoHue = keyframes`
 0% {
   filter: hue-rotate(0deg);
 }
 100% {
   filter: hue-rotate(365deg);
 }
`

const Logo = styled.img`
  width: 187px;
  margin-left: 2em;
  will-change: filter;
  animation: ${logoHue} 4s linear infinite;
`

const Socials = styled.div`
  width: 300px;

`

const Legal = styled.div`
  width: 200px;
  margin-left: 2em;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`
const Icon = styled.i`
  font-size: 40px;
  margin: 0 0.2em;
  color: #6a7579;

  :hover {
    color: #009af7;
    animation: ${logoHue} 1.5s linear infinite;
  }
`
const A = styled.a`
  text-decoration: none;
`
export default () => (
  <Panel>
    <Link passHref href='/home' target='__blanck'>
      <To>
        <Logo src='https://d39p6dv27gzlaf.cloudfront.net/static/img/tarjetas-explosivas3.png' />
      </To>
    </Link>
    <Socials>
      <A href='https://www.facebook.com/Tarjetas-Explosivas-341585959935818' target='_blank'>
        <Icon className='icon-facebook' />
      </A>
      <A href='https://www.instagram.com/tarjetasexplosivas' target='_blank'>
        <Icon className='icon-instagram' />
      </A>
      <A href='https://twitter.com/ExploTarjetas' target='_blank'>
        <Icon className='icon-twitter' />
      </A>
    </Socials>
    <Legal>
      <Link passHref href='/politica-de-privacidad'>
        <To>Politica de privacidad</To>
      </Link>
      <Link passHref href='/terminos-de-servicio'>
        <To>Terminos de Uso</To>
      </Link>
    </Legal>
  </Panel>
)
