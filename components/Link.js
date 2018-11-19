import React from 'react'
import NextLink from 'next/link'
import styled from 'styled-components'

const To = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.color || '#FFF'};
  transition: all .3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  margin: 0 10px;
  height: 100%;
  padding: 0 3px 0 3px;
  font-size: 16px;
  opacity: 1;

  &:hover {
    opacity: .3;
  }
`

const ToPro = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  color: #524ebf !important;
  height: 100%;
  padding: 0 3px 0 3px;
  cursor: pointer;
  font-size: 17px;

  & i {
    color: #524ebf !important;
    transition: all .3s ease-out;
    margin-left: 5px;
  }

  &:hover {
    color: orange !important;
  }

  &:hover > i {
    color: orange !important;
  }
`
const Link = ({ href, children, color, style }) => (
  <NextLink passHref href={href}>
    <To style={{ color, ...style }}>{ children }</To>
  </NextLink>
)

export default Link
