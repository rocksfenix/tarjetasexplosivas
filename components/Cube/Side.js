import React from 'react'
import styled from 'styled-components'
import Image from './Image'

const Side = styled.div`
  overflow: hidden;
  position: absolute;
  opacity: 1;
  height: ${p => `${p.size}px`};
  width: ${p => `${p.size}px`};
  -webkit-touch-callout: none;
  -moz-touch-callout: none;
  -ms-touch-callout: none;
  -o-touch-callout: none;
  touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  cursor: pointer;
  transform: ${p => p.transform};
  background-color: gray;
  background-size: cover;
`

export default class extends React.Component {
  click = () => {
    this.props.mouseUp(this.props.name)
  }

  render () {
    return (
      <Side
        size={this.props.size}
        transform={this.props.transform}
        src={this.props.image}
        onMouseUp={this.click}
      >
        <Image name={this.props.name} image={this.props.image} />
      </Side>
    )
  }
}
