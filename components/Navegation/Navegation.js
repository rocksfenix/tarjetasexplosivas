import React from 'react'
import styled, { keyframes } from 'styled-components'
import _Headroom from 'react-headroom'
import Link from '../Link'
import Menu from './Menu'

const Headroom = styled(_Headroom)`
  width: 100%;
  height: 55px;
`

const Nav = styled.nav`
  height: 55px;
  width: 100%;
  background-color: #3A31AD;
  position: relative;
  z-index: 200;
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

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  user-select: none;
  position: relative;
  background: white;
  border-bottom: 1px solid whitesmoke;
  height: 55px;
`

export default ({ user, showCredits }) => {
  return (
    <Nav>
      <Headroom>
        <Block>
          <Link href='/home' as='/'><Logo src='/static/img/tarjetas-explosivas3.png' /></Link>
          <Menu user={user} showCredits={showCredits} />
        </Block>
      </Headroom>
    </Nav>
  )
}
