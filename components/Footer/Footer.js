import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Panel = styled.footer`
  width: 100%;
  height: 55px;
  background-color: #d6d6d6;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const To = styled.a`
  text-decoration: none;
  color: #808080;
`
export default () => (
  <Panel>
    TarjetasExplosivas.com
    <Link passHref href='/politica-de-privacidad'>
      <To>Politica de privacidad</To>
    </Link>
    <Link passHref href='/terminos-de-servicio'>
      <To>Terminos de Uso</To>
    </Link>
  </Panel>
)
