import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import enhanceWithClickOutside from 'react-click-outside'

const Box = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  background: ${p => p.show ? 'rgba(255, 255, 255, 0.13)' : 'transparent'};
`

const UserButton = styled.div`
  padding: 0;
  height: 30px;
  width: 30px;
  background-color: rgb(33, 100, 243);
  border-radius: 50%;
  border: 2px solid #FFF;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  width: 17px;
`

const MenuBox = styled.div`
  width: 288px;
  min-height: 300px;
  background-color: white;
  box-shadow: 1px 1px 84px #3a31ad30;
  position: absolute;
  top: 60px;
  z-index: 100;
  display: ${p => p.show ? 'flex' : 'none'};
  flex-direction: column;
  padding: .3em;
  justify-content: space-around;
  align-items: baseline;
  padding-left: 1.5em;
`

const To = styled.a`
  color: #444654;
  text-decoration: none;
  font-size: 17px;
  transition: color 200ms;
  position: relative;
  
  :hover {
    color: #01a7e4;
    
    :after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #01a7e4;
    }
  }
`

const Link = ({ href, children, style }) => (
  <NextLink passHref href={href}>
    <To style={style}>{ children }</To>
  </NextLink>
)

class Menu extends React.Component {
  state = {
    showMenu: false
  }

  showMenu = () => {
    this.setState({ showMenu: true })
  }

  hideMenu = () => {
    this.setState({ showMenu: false })
  }

  toggleMenu = () => this.setState(state => ({
    showMenu: !state.showMenu
  }))

  handleClickOutside = () => {
    this.hideMenu()
  }

  render () {
    return (
      <Box show={this.state.showMenu} onClick={this.toggleMenu}>
        <UserButton >
          <Img src='https://d39p6dv27gzlaf.cloudfront.net/static/img/user.svg' />
        </UserButton>
        <MenuBox show={this.state.showMenu}>
          <Link href='/account'>Mi Cuenta</Link>
          { this.props.user && this.props.user.role === 'admin'
            ? <Link href='/dashboard'>Dashboard</Link>
            : null
          }
          <Link href='/my-cards'>Mis Tarjetas</Link>
          <Link href='/cube-app/new'>Crear Nueva Tarjeta</Link>
          <Link href='/ejemplos'>Ejemplos</Link>
          <Link href='/logout'>Logout</Link>
        </MenuBox>
      </Box>
    )
  }
}

export default enhanceWithClickOutside(Menu)
