import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import enhanceWithClickOutside from 'react-click-outside'

const Mobile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  @media (min-width: 900px) {
    display: none;
  }
`

const Button = styled.button`
  min-width: 100px;
  background: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
  position: relative;
  z-index: 100;
  /* color: #01a7e4; */
`

const Options = styled.div`
  width: 80vw;
  height: 100vh;
  background-color: #FFF;
  position: absolute;
  top: 0;
  right: 0;
  min-width: 288px;
  max-width: 320px;
  transform: ${p => p.show ? 'translateX(0%)' : 'translateX(130%)'};
  will-change: transform;
  transition: transform 250ms ease-out;
  box-shadow: 1px 1px 88px rgba(0, 0, 0, 0.4117647058823529);
`

const To = styled.a`
  color: #3a31ad;
  text-decoration: none;
  font-size: 20px;
  padding: 1em;
  transition: color 200ms;

  :hover {
    color: #01a7e4;
  }
`

const Link = ({ href, children, style }) => (
  <NextLink passHref href={href}>
    <To style={style}>{ children }</To>
  </NextLink>
)

const Block = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 60px;
`

const Icon = styled.i`
  color: red;
  margin: 0 3px;
  font-size: 20px;
  color: #717171;
`

class MobileComponent extends React.Component {
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
      <Mobile>
        <Button onClick={this.toggleMenu}>
          {
            this.state.showMenu
              ? <Icon className='icon-cross' />
              : <Icon className='icon-menu2' />
          }
        </Button>
        <Options show={this.state.showMenu}>
          { this.props.user
            ? (
              <Block>
                { this.props.showCredits ? <Link href='/credits'>{this.props.user.credits} Creditos</Link> : null }
                <Link href='/my-cards'>Mis Tarjetas</Link>
                <Link href='/cube-app/new'>Crear Nueva Tarjeta</Link>
                <Link href='/account'>Mi Cuenta</Link>
                <Link href='/ejemplos'>Ejemplos</Link>
                { this.props.user.role === 'admin'
                  ? <Link href='/dashboard'>Dashboard</Link>
                  : null
                }
                <Link href='/logout'>Logout</Link>
              </Block>
            )
            : (
              <Block>
                <Link href='/ejemplos'>Ejemplos</Link>
                <Link href='/app/new'>Crear Nueva</Link>
                <Link href='/crear-cuenta'>Registrate</Link>
                <Link href='/login'>Login</Link>
              </Block>
            )
          }
        </Options>
      </Mobile>
    )
  }
}

export default enhanceWithClickOutside(MobileComponent)
