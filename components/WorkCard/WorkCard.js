import React from 'react'
import styled from 'styled-components'
import MiniCube from '../MiniCube'

const Panel = styled.div`
  width: 220px;
  height: 350px;
  display: flex;
  box-shadow: 0 5px 30px -15px rgba(0,0,0,.2);
  color: #343855;
  background: #FFF;
  margin: 3%;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 45%;
    margin: 2%;
  }

  :hover {
    box-shadow: 0 5px 30px -15px rgba(0,0,0,.8);
  }
`

const CubeBox = styled.div`
  width:100%;
  height: 300px;
  position: relative;
  @media (max-width: 900px) {
    height: 240px;

  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
`

const Button = styled.a`
  background: #FFF;
  color: #251a38;
  padding: 0.4em 1.7em;
  border: 1px solid #c1c1c1;
  border-radius: 30px;
  font-size: 11px;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #FFF;
    background-color: #251a38;
  }
`

export default ({ work }) => {
  return (
    <Panel>
      <CubeBox>
        <MiniCube work={work} />
      </CubeBox>
      <Buttons>
        <Button href={`/cube-app/${work._id}`}>Editar</Button>
        {
          work.location
            ? <Button download href={`${work.location}`}>Descargar</Button>
            : null
        }
      </Buttons>
    </Panel>
  )
}
