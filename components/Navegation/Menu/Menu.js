import React from 'react'
import styled from 'styled-components'
import Desktop from './Desktop'
import Mobile from './Mobile'

const Panel = styled.div`
  height: 100%;
  width: 50%;
`

export default class extends React.Component {
  render () {
    return (
      <Panel>
        <Desktop {...this.props} />
        <Mobile {...this.props} />
      </Panel>
    )
  }
}
