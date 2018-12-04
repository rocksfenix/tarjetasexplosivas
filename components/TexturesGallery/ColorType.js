import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
  width: 100%;
  border: 1px solid #e6e6e6;
  font-size: 20px;
  padding: 5px 5px;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;

`

const Box = styled.div`
  width: 48%;
  height: 100%;
  text-align: center;
  line-height: 1.8;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  background-color: ${p => p.active ? '#444040' : '#FFF'};
  color: ${p => p.active ? '#FFF' : '#333'};
`

export default ({ colorType, onChange }) => {
  return (
    <Panel>
      <Box active={colorType === 'multicolor'} onClick={() => onChange('multicolor')}>Multicolor</Box>
      <Box active={colorType === 'solid'} onClick={() => onChange('solid')}>Solido</Box>
    </Panel>
  )
}
