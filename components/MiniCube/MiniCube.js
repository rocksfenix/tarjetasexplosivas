import React, { Component } from 'react'
import styled from 'styled-components'
import Side from '../Cube/Side'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFF;
  background: radial-gradient(#cce8ff, #ffffff);
  user-select: none;
  opacity: 1;

  transition: opacity 200ms ease-out;

  :hover {
    opacity: 1;
  }
`

const Viewport = styled.div`
  perspective: 800px;
  perspective-origin: ${p => `50% ${p.size}px`};
  transform: scale(1, 1);
  position: relative;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`

const Cube = styled.div`
  position: relative;
  margin: 0 auto;
  height: ${p => `${p.size}px`};
  width: ${p => `${p.size}px`};
  transform-style: preserve-3d;
  transform: rotateX(313deg) rotateY(53deg);
  will-change: transform;
`

const Confetti = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  z-index: 1;
  opacity: 0.8;
`

export default class extends Component {
  getSideTransforms = (size) => ({
    side0: `rotateX(90deg) translateZ(${size / 2}px)`,
    side1: `translateZ(${size / 2}px)`,
    side2: `rotateY(90deg) translateZ(${size / 2}px)`,
    side3: `rotateY(180deg) translateZ(${size / 2}px)`,
    side4: `rotateY(-90deg) translateZ(${size / 2}px)`,
    side5: `rotateX(-90deg) rotate(180deg) translateZ(${size / 2}px)`
  })

  size = 120
  transforms = this.getSideTransforms(this.size)
  state = {
    fy: '56.6021',
    fx: '326.291'
  }
  componentDidMount () {
    if (process.browser) {
      if (window.innerWidth < 900) {
        this.size = 100
      } else {
        this.size = 120
      }
    }
    this.transforms = this.getSideTransforms(this.size)
    this.forceUpdate()
  }
  render () {
    const { fx, fy } = this.state
    const { side0, side1, side2, side3, side4, side5 } = this.props.work

    const cubeStyle = {
      transform: `rotateX(${fx}deg) rotateY(${fy}deg)`
    }

    return (
      <Wrapper >
        <Confetti src='https://d39p6dv27gzlaf.cloudfront.net/static/img/confetti.png' />
        <Viewport size={this.size}>
          <Cube
            size={this.size}
            style={cubeStyle}
            className={this.props.className}
          >
            <Side
              size={this.size}
              image={side0.src}
              side={side0}
              transform={this.transforms.side0}
              name='side0'
              small
            />
            <Side
              size={this.size}
              image={side1.src}
              side={side1}
              transform={this.transforms.side1}
              name='side1'
              small
            />
            {/* <Side
              size={this.size}
              image={side2.src}
              side={side2}
              transform={this.transforms.side2}
              name='side2'
              small
            /> */}
            <Side
              size={this.size}
              image={side3.src}
              side={side3}
              transform={this.transforms.side3}
              name='side3'
              small
            />
            <Side
              size={this.size}
              image={side4.src}
              side={side4}
              transform={this.transforms.side4}
              name='side4'
              small
            />
            {/* <Side
              size={this.size}
              image={side5.src}
              side={side5}
              transform={this.transforms.side5}
              name='side5'
              small
            /> */}
          </Cube>
        </Viewport>
      </Wrapper>
    )
  }
}
