import React from 'react'
import styled from 'styled-components'
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
const Logo = styled.img`
  width: 187px;
  margin-left: 2em;
`

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  user-select: none;
  position: relative;
  background-color: #3A31AD;
  background-color: #291d46;
  background-color: #212020;
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
