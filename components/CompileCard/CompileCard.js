import React, { Component } from 'react'
import styled from 'styled-components'
import roundTo from 'round-to'

const Box = styled.div`
  width: 100%;
  height:150px;
  border: 1px solid whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BarBox = styled.div`
  height: 30px;
  width: 100%;
  position: relative;
  border: 1px solid #d2d2d2;
  border-radius: 3px;
  overflow: hidden;
`

const Bar = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  background-color: #03A9F4;
  width: 0%;
  transition: all 800ms ease-out;
`

const Title = styled.div`
  width: 100%;
  font-size: 30px;
`

export default class extends Component {
  static defaultProps = {
    minTime: 0,
    maxTime: 9
  }

  state = {
    width: 0,
    isAnimating: false,
    time: 0
  }

  componentDidUpdate () {
    if (this.props.time) {
      this.animate()
    }
  }

  animate = () => {
    if (!this.state.isAnimating) {
      this.state.isAnimating = true
      let time = 0
      const anima = () => {
        if (time < this.props.time / 1000) {
          time += 0.02
          this.setState({ time: roundTo(time, 3) })
        } else {
          window.clearInterval(tick)
        }
      }
      const tick = window.setInterval(anima, 15)
    }
  }

  getPercent = () => {
    const { time, maxTime } = this.props
    if (!time) return `0%`
    const percent = (time / 1000) * 100 / maxTime
    return `${percent}%`
  }

  getColor = () => {
    const { time } = this.state
    let color = '#ffc107'
    if (!time) color = '#ffc107'
    if (time <= 5) color = '#55dc19'
    if (time > 5 && time < 8) color = '#FF5722'
    if (time >= 8) color = '#f44336'

    return color
  }
  render () {
    return (
      <Box>
        <Title>{ this.state.time }s</Title>
        <BarBox>
          <Bar style={{ width: this.getPercent(), backgroundColor: this.getColor() }} />
        </BarBox>
      </Box>
    )
  }
}
