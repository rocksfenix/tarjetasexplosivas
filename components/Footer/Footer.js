import React from 'react'
import styled, { keyframes } from 'styled-components'
import Link from 'next/link'

const Panel = styled.footer`
  width: 100%;
  height: 60px;
  background-color: #d6d6d6;
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

const LogoSocial = styled.img`
  width: 40px;
  margin-left: 2em;
  opacity: 0.5;
  transition: 150ms linear;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`

const Legal = styled.div`
  width: 200px;
  margin-left: 2em;
  display: flex;
  flex-direction: column;
`

export default () => (
  <Panel>

    <Link passHref href='/home' target='__blanck'>
      <To><Logo src='/static/img/tarjetas-explosivas3.png' /></To>
    </Link>
    <Socials>
      <a href='https://www.facebook.com/Tarjetas-Explosivas-341585959935818' target='_blank'>
        <LogoSocial src='/static/img/facebook.svg' alt='facebook' />
      </a>
      <a href='https://www.instagram.com/tarjetasexplosivas' target='_blank'>
        <LogoSocial src='/static/img/instagram.svg' alt='instagram' />
      </a>
      <a href='https://twitter.com/ExploTarjetas' target='_blank'>
        <LogoSocial src='/static/img/twitter.svg' alt='twitter' />
      </a>
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
