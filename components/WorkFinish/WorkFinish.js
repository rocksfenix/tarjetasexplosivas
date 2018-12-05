import React from 'react'
import styled, { keyframes } from 'styled-components'

const Anima = keyframes`
  from {
    transform: scale(0.6);
  }
  to {
    transform: scale(1);
  }
`

const Panel = styled.div`
  position: absolute;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.52);
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
  padding: 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: 250ms ease-out ${Anima} forwards;

  @media(max-width: 900px) {
    bottom: 0;
    padding: 1em 0
  }
`

const Button = styled.button`
  background: #76ce11;
  color: #FFF;
  padding: 0.4em 2em;
  margin: 0.6em 0;
  border: 0;
  font-size: 20px;
  border-radius: 39px;
  cursor: pointer;
  background: linear-gradient(30deg, #2196F3, #9C27B0);
  opacity: 0.8;

  @media(max-width: 900px) {
    opacity: 1;
  }

  :hover {
    opacity: 1;
  }
`

const ButtonLink = styled.a`
  background: ${p => p.bg || 'gray'};
  padding: .5em 1.8em;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  border-radius: 38px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-align: center;
  margin: 3em auto;
  max-width: 250px;

  @media(max-width: 900px) {
    font-size: 16px;
    padding: .5em 1em;
  }

  :hover {
    background: linear-gradient(90deg, #9C27B0, blue);
  }
`

const Text = styled.div`
  color: #291d46;
  font-size: 18px;
  line-height: 1.8;

  @media(max-width: 900px) {
    font-size: 18px;
    padding: .5em 1em;
  }
`

const Text2 = styled.div`
  color: #291d46;
  font-size: 18px;
  line-height: 1.8;
  font-weight: 100;
  text-align: center;
  display: block;

  @media(max-width: 900px) {
    display: none;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  width: 80%;

  @media(max-width: 900px) {
    bottom: 0;
    width: 90%;
  }
`

const ButtonsFinish = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class extends React.Component {
  render () {
    if (!this.props.show) return null
    return (
      <Panel>

        {
          this.props.work.location
            ? (
              <Block>
                <Text>Hemos completado el proceso de Diseño para esta tarjeta</Text>
                <ButtonsFinish>
                  <ButtonLink bg='#0057ff' href='/cube-app/new'>Crear Nueva Tarjeta</ButtonLink>
                  <ButtonLink bg='orangered' href={`/cubo-instrucciones?workref=${this.props.work.location}`}>Como Hacerla?</ButtonLink>
                </ButtonsFinish>
              </Block>
            )
            : (
              <Block>
                <Text>¡Guau! Ha quedado hermosa</Text>
                <Text2>Descargar los planos listos para Impresion e instrucciones para hacerla</Text2>
                <Button onClick={this.props.openPaymentModal}>Obtener Planos</Button>
              </Block>
            )
        }

      </Panel>
    )
  }
}
