import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import Profile from './Profile'

const Desktop = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 900px) {
    display: none;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
`

const To = styled.a`
  color: #565656;
  text-decoration: none;
  margin: 0 1.5em;
  font-size: 16px;
  letter-spacing: 1px;
  :hover {
    color: #01a7e4;
  }
`

const Link = ({ href, children, style }) => (
  <NextLink passHref href={href}>
    <To style={style}>{ children }</To>
  </NextLink>
)

export default class extends React.Component {
  render () {
    return (
      <Desktop>
        { this.props.user
          ? (
            <Block>
              { this.props.user && this.props.user.role === 'admin'
                ? <Link href='/dashboard'>Dashboard</Link>
                : null
              }
              {
                this.props.showCredits
                  ? <Link href='/credits'>{this.props.user.credits} Credito{this.props.user.credits > 1 ? 's' : ''}</Link>
                  : null
              }
              <Profile {...this.props} />
            </Block>
          )
          : (
            <Block>
              <Link href='/cube-app/new'>Crear</Link>
              {/* <Link href='/ejemplos'>Ejemplos</Link> */}
              <Link href='/login'>Login</Link>
              <Link href='/crear-cuenta'>Registro</Link>
            </Block>
          )
        }
      </Desktop>
    )
  }
}
