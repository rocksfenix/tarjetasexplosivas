import React from 'react'
import styled, { keyframes } from 'styled-components'

const Anima = keyframes`
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`

const Panel = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  /* padding: 0.5em; */
  padding-top: 1em;
  padding-bottom: 3em;
  top: 0;
  z-index: 30000;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  animation: ${Anima} ease-out 200ms forwards;
  /* justify-content: center;
  align-items: center; */
  flex-direction: column;
  color: #291d46;
  user-select: none;
  overflow-y: auto;
  @media (max-width: 900px) {
    background-color: rgba(255, 255, 255, 0.85);
    height: 90vh;
    padding-bottom: 1em;
  }
`

const Information = styled.div`
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  word-wrap: break-word;
`

const List = styled.ul`
  @media (max-width: 900px) {
    padding: 0 .8em;
  }
`

const Item = styled.li`
  list-style-type: none;
  display: flex;
  margin: .5em 0;
  align-items: center;
`
const Button = styled.a`
  background: #2196F3;
  padding: .5em 1.8em;
  border: 0;
  color: #ffffff;
  font-size: 20px;
  border-radius: 38px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-align: center;
  margin: 3em auto;
  max-width: 250px;
`
const ButtonsBlock = styled.div`
  max-width: 300px;
  margin: 0.5em auto;
`

const ButtonPricing = styled.a`
  background: #004FFF;
  background: #2196F3;
  padding: .5em 0;
  margin: 0.5em auto;
  border: 0;
  color: #ffffff;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-align: center;
  width: 100%;

  :hover {
    background: linear-gradient(90deg, #9C27B0, blue);
  }

  @media (max-width: 900px) {
    font-size: 18px;
  }
`

const Title = styled.div`
  font-size: 22px;
  line-height: 1.8;
  text-align: center;
  padding-top: 2em;
  padding-bottom: 2em;
`

const Big = styled.span`
  font-size: 25px;
  font-weight: bold;
  padding: 0 0.1em;
`

const Small = styled.span`
  font-size: 16px;
  padding-left: 0.2em;
  font-weight: ${p => p.normal ? 'normal' : 'bold'};
  vertical-align: text-top;
  letter-spacing: 1px;
`

const Note = styled.div`
  list-style-type: none;
  display: flex;
  margin: 2em 0;
`

const Section = styled.section`
  font-size: 22px;
  line-height: 1.5;
  text-align: center;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  :first-child {
    line-height: 1.8;
    padding-top: 2em;
  }
`

const Success = styled.img`
  width: 30px;
  margin-right: 0.5em;
`

const LogoPaypal = styled.img`
  width: 120px;
`

const Paypal = styled.div`
  width: 100%;
  margin: 0 auto;
`

const PaypalText = styled.div`
  width: 100%;
  color: gray;
  font-size: 16px;
  font-weight: 100;
`

export default class extends React.Component {
  state = {
    showPricing: false
  }

  onShowPricing = () => this.setState({
    showPricing: true
  })

  render () {
    // console.log('this.props.how', this.props.show)
    // href={`/api/payment/${this.props.work._id}`}
    if (!this.props.show) return null
    return (
      <Panel>
        {
          !this.state.showPricing

            ? (
              <Information>
                <Section>
                El mejor regalo no cuesta <Big>$1000</Big>  USD ni siquiera <Big>$100 </Big> USD<br />
                Tu puedes crear este regalo unico por solo <Big>$4.<Small>99</Small> </Big>USD
                </Section>

                <Section>Cumple los requisitos de regalo perfecto:</Section>
                <List>
                  <Item><Success src='https://d39p6dv27gzlaf.cloudfront.net/static/img/success3.svg' /><span>Ser unico y original</span></Item>
                  <Item><Success src='https://d39p6dv27gzlaf.cloudfront.net/static/img/success3.svg' />Totalmente personalizado</Item>
                  <Item><Success src='https://d39p6dv27gzlaf.cloudfront.net/static/img/success3.svg' />Creado por ti mismo puff.</Item>
                </List>

                <Section>
                Creala en 10 minutos aproximadamente <br />
                Que obtengo por <Big>$4.<Small>99</Small></Big> ?
                </Section>
                <List>
                  <Item><Success src='https://d39p6dv27gzlaf.cloudfront.net/static/img/success.svg' />Descarga inmediata de material:</Item>
                  <Item><Success src='https://d39p6dv27gzlaf.cloudfront.net/static/img/success.svg' />Planos en PDF de tu diseño listo para impresion</Item>
                  <Item><Success src='https://d39p6dv27gzlaf.cloudfront.net/static/img/success.svg' />Instrucciones de como construirla</Item>
                  <Item><Success src='https://d39p6dv27gzlaf.cloudfront.net/static/img/success.svg' />Video paso a paso para crearla</Item>
                </List>
                <Note>* No esperes mas, regala este precioso y unico regalo.</Note>
                <Button onClick={this.onShowPricing}>Pagar con Paypal</Button>
              </Information>
            )
            : (
              <Information>
                <Title>Aprobecha y obten descuento por varios diseños de Tarjetas</Title>
                <ButtonsBlock>

                  <Paypal>
                    <LogoPaypal src='https://d39p6dv27gzlaf.cloudfront.net/static/img/paypal-logo-129x32.svg' />
                    <PaypalText>* Precios en USD</PaypalText>
                  </Paypal>

                  <ButtonPricing href={`/api/payment/${this.props.work._id}/1`}>1 Diseño por $ 4.<Small normal>99</Small></ButtonPricing>
                  <ButtonPricing href={`/api/payment/${this.props.work._id}/2`}>2 Diseños por $ 7.<Small normal>99</Small></ButtonPricing>
                  <ButtonPricing href={`/api/payment/${this.props.work._id}/4`}>4 Diseños por $ 9.<Small normal>99</Small></ButtonPricing>
                </ButtonsBlock>
              </Information>
            )
        }

      </Panel>
    )
  }
}
