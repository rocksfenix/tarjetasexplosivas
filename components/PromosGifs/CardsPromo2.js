import React  from 'react'
import styled from 'styled-components'

const Cards = styled.div`
  display: flex;
  width: 150%;
  transform: translateX(-50%);
  position: relative;
  left: 50%;

  @media(max-width: 900px) {
    left: 0%;
    transform: translateX(0%);
    width: 100%;
  }
`

const Column = styled.div`
  width: 50%;

  @media(max-width: 900px) {
    width: 100%;
  }
`

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media(max-width: 900px) {
    flex-direction: column;
  }
`

const Img = styled.img`
  width: 100%;
  border: 3px solid #FFF;
  box-sizing: border-box;
`

export default () => (
  <Cards>
    <Row>
      <Column>
        <Img src='https://d39p6dv27gzlaf.cloudfront.net/static/img/promos/Tarjetas-explosivas-para-regalo.jpg' />
      </Column>
      <Column>
        <Row>
          <Img src='https://d39p6dv27gzlaf.cloudfront.net/static/img/tarjetas-explosivas-de-confeti-2.jpg' />
        </Row>
        <Row>
          <Img src='https://d39p6dv27gzlaf.cloudfront.net/static/img/promos/Crear-tarjeta-explosiva.jpg' />
        </Row>
      </Column>
    </Row>
  </Cards>
)
