import React from 'react'
import styled from 'styled-components'
import Checkbox from '../Checkbox'

const Buttons = styled.div`
  margin: 1em 0;
`
const BoxCheckbox = styled.div`
  margin-bottom: 3em;
`

const ModalDanger = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(105, 12, 12, 0.96);
  position: absolute;
  display: ${p => p.show ? 'block' : 'none'};
  color: #FFF;
  overflow-y: auto;
  /* justify-content: center;
  align-items: center; */
`

const RemoveText = styled.div`
  color: #FFF;
  padding: 1em .6em;
  font-size: 18px;
`

const Box = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 3em auto;
`

const ButtonRemove = styled.button`
    background: #f92727;
    border: 0;
    color: #FFF;
    padding: 1em .5em;
    cursor: pointer;
    width: 50%;
    opacity: 1;

  :hover {
    opacity: 0.6;
  }
`

const ButtonDiscart = styled.button`
  background: green;
  border: 0;
  color: #FFF;
  padding: 1em .5em;
  cursor: pointer;
  width: 50%;
  opacity: 1;

  :hover {
    opacity: 0.6;
  }

`
export default ({ onRemove, onDiscart, onAccept, show }) => (
  <ModalDanger show={show}>
    <Box>
      <RemoveText>* La eliminacion de tu cuenta es irreversible.</RemoveText>
      <RemoveText>* Se eliminaran todos tus datos, tu cuenta, los diseños de tus tarjetas y fotografias y no los podras descargar ni acceder a ellos aun cuando los hayas pagado por los materiales.</RemoveText>
      <BoxCheckbox>
        <Checkbox onCheck={onAccept} label='acceptRemove'>
          Comprendo lo anterior.
        </Checkbox>
      </BoxCheckbox>
      <Buttons>
        <ButtonDiscart onClick={onDiscart}>NO Eliminar</ButtonDiscart>
        <ButtonRemove onClick={onRemove}>Eliminar</ButtonRemove>
      </Buttons>
    </Box>
  </ModalDanger>
)
