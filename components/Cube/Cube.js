import React, { Component } from 'react'
import styled from 'styled-components'
import Side from './Side'
import Current from './Current'

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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  background: ${p => p.bg};
  user-select: none;
`

class CubeBlock extends Component {
  size = 10
  fps = 5
  sensivity = 0.3
  sensivityFade = 0.6
  speed = 1
  touchSensivity = 1
  lastX = 0
  lastY = 0
  mouseX = 0
  mouseY = 0
  distanceX = 0
  distanceY = 0
  positionX = 53
  positionY = 313
  torqueX = 0
  torqueY = 0
  // Si el mouse es down
  down= false
  upsideDown= false
  previousPositionX= 0
  previousPositionY= 0
  // Cara activa
  currentSide = 0
  calculatedSide = 0
  transforms = {}

  state = {}

  getSideTransforms = (size) => ({
    side0: `rotateX(90deg) translateZ(${size / 2}px)`,
    side1: `translateZ(${size / 2}px)`,
    side2: `rotateY(90deg) translateZ(${size / 2}px)`,
    side3: `rotateY(180deg) translateZ(${size / 2}px)`,
    side4: `rotateY(-90deg) translateZ(${size / 2}px)`,
    side5: `rotateX(-90deg) rotate(180deg) translateZ(${size / 2}px)`
  })

  componentDidMount () {
    if (process.browser) {
      // if (window.innerWidth < 1400) {
      //   this.size = 210
      // } else if (window.innerWidth < 900) {
      //   this.size = 170
      //   this.sensivityFade = 0.93
      // } else {
      //   this.size = 250
      // }
      this.resize()
      this.transforms = this.getSideTransforms(this.size)
    }

    if (process.browser) {
      window.addEventListener('mouseup', this.mouseUp)
      window.addEventListener('mousemove', this.mouseMove)
      window.addEventListener('mousedown', this.mouseDown)
      window.addEventListener('touchstart', this.touchStart)
      window.addEventListener('touchmove', this.touchMove)
      window.addEventListener('touchend', this.touchEnd)
      window.addEventListener('resize', this.resize)
    }

    // Es necesario forzar el estado inicial
    // para redimencionar el cubo segun viewport
    this.forceUpdate()
  }

  componentWillUnmount () {
    window.removeEventListener('mouseup', this.mouseUp)
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mousedown', this.mouseDown)
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchmove', this.touchMove)
    window.removeEventListener('touchend', this.touchEnd)
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.size = 250
    if (window.innerWidth < 1400) {
      this.size = 210
    }

    if (window.innerWidth < 900) {
      this.size = 180
      this.sensivityFade = 0.93
    }

    this.transforms = this.getSideTransforms(this.size)
  }

  mouseDown = (e) => {
    this.interaction = 'tap'
    this.originalDeltaX = e.clientX
    this.down = true
  }

  mouseUp = () => {
    this.down = false
  }

  mouseMove = (e) => {
    // Dentro del rango para determinar
    // la interaccion
    const tolerance = 2
    const diff = this.originalDeltaX - this.deltaX
    if (Math.abs(diff) < tolerance) {
      this.interaction = 'tap'
    } else {
      this.interaction = 'moved'
    }
    this.deltaX = e.clientX
    this.mouseX = e.pageX
    this.mouseY = e.pageY

    this.animate()
  }

  touchStart = (e) => {
    this.down = true
    this.mouseX = e.touches[0].pageX / this.touchSensivity
    this.mouseY = e.touches[0].pageY / this.touchSensivity
    this.lastX = this.mouseX
    this.lastY = this.mouseY
  }

  touchMove = (e) => {
    if (e.preventDefault) {
      e.preventDefault()
    }

    if (e.touches.length === 1) {
      this.touches = e.touches[0] || null
      this.mouseX = e.touches[0].pageX / this.touchSensivity
      this.mouseY = e.touches[0].pageY / this.touchSensivity
    }

    if (!this.props.showModal) {
      this.animate()
    }
  }

  touchEnd = () => {
    this.down = false
  }

  animate = () => {
    this.distanceX = (this.mouseX - this.lastX)
    this.distanceY = (this.mouseY - this.lastY)

    this.lastX = this.mouseX
    this.lastY = this.mouseY

    if (this.down && !this.props.showModal) {
      const { torqueX, torqueY, sensivityFade, distanceX, distanceY, speed, sensivity } = this
      this.torqueX = torqueX * sensivityFade + (distanceX * speed - torqueX) * sensivity
      this.torqueY = torqueY * sensivityFade + (distanceY * speed - torqueY) * sensivity
    }

    if (Math.abs(this.torqueX) > 1.0 || Math.abs(this.torqueY) > 1.0) {
      if (!this.down) {
        this.torqueX *= this.sensivityFade
        this.torqueY *= this.sensivityFade
      }

      this.positionY -= this.torqueY

      if (this.positionY > 360) {
        this.positionY -= 360
      } else if (this.positionY < 0) {
        this.positionY += 360
      }

      if (this.positionY > 90 && this.positionY < 270) {
        this.positionX -= this.torqueX

        if (!this.upsideDown) {
          this.upsideDown = true
        }
      } else {
        this.positionX += this.torqueX

        if (this.upsideDown) {
          this.upsideDown = false
        }
      }

      if (this.positionX > 360) {
        this.positionX -= 360
      } else if (this.positionX < 0) {
        this.positionX += 360
      }

      if (!(this.positionY >= 46 && this.positionY <= 130) && !(this.positionY >= 220 && this.positionY <= 308)) {
        if (this.upsideDown) {
          if (this.positionX >= 42 && this.positionX <= 130) {
            this.calculatedSide = 3
          } else if (this.positionX >= 131 && this.positionX <= 223) {
            this.calculatedSide = 2
          } else if (this.positionX >= 224 && this.positionX <= 314) {
            this.calculatedSide = 5
          } else {
            this.calculatedSide = 4
          }
        } else {
          if (this.positionX >= 42 && this.positionX <= 130) {
            this.calculatedSide = 5
          } else if (this.positionX >= 131 && this.positionX <= 223) {
            this.calculatedSide = 4
          } else if (this.positionX >= 224 && this.positionX <= 314) {
            this.calculatedSide = 3
          } else {
            this.calculatedSide = 2
          }
        }
      } else {
        if (this.positionY >= 46 && this.positionY <= 130) {
          this.calculatedSide = 6
        }

        if (this.positionY >= 220 && this.positionY <= 308) {
          this.calculatedSide = 1
        }
      }

      if (this.calculatedSide !== this.currentSide) {
        this.currentSide = this.calculatedSide - 1
      }
    }

    if (this.positionY !== this.previousPositionY || this.positionX !== this.previousPositionX) {
      this.previousPositionY = this.positionY
      this.previousPositionX = this.positionX
    }

    if (this.down) {
      this.setState({
        fx: this.positionY,
        fy: this.positionX
      })
    }
  }

  handleClick = (sideInFocusName) => {
    if (this.interaction === 'tap' && !this.props.work.location) {
      // Open Modal
      this.props.onOpenModal(sideInFocusName)
    }
  }

  render () {
    const { fx, fy } = this.state
    const { side0, side1, side2, side3, side4, side5 } = this.props.work

    const cubeStyle = {
      transform: `rotateX(${fx}deg) rotateY(${fy}deg)`
    }
    // radial-gradient(#ffffff,#a0fff2)
    // radial-gradient(#beffbe,#ffffff)
    return (
      <Wrapper bg={this.props.isFinish ? 'radial-gradient(#2196F3,#a0fff2)' : 'radial-gradient(#141415,#000000)'}>
        <Current active={this.currentSide} work={this.props.work} />
        <Viewport size={this.size}>
          <Cube
            size={this.size}
            onMouseUp={this.mouseUp}
            style={cubeStyle}
            className={this.props.className}
            onDoubleClick={() => {
              if (this.props.work.location) {
                window.alert('Wops, esta ya fue compilado pero puedes crear uno nuevo')
              }
            }}
          >
            <Side
              size={this.size}
              image={side0.src}
              side={side0}
              transform={this.transforms.side0}
              mouseUp={this.handleClick}
              name='side0'
            />
            <Side
              size={this.size}
              image={side1.src}
              side={side1}
              transform={this.transforms.side1}
              mouseUp={this.handleClick}
              name='side1'
            />
            <Side
              size={this.size}
              image={side2.src}
              side={side2}
              transform={this.transforms.side2}
              mouseUp={this.handleClick}
              name='side2'
            />
            <Side
              size={this.size}
              image={side3.src}
              side={side3}
              transform={this.transforms.side3}
              mouseUp={this.handleClick}
              name='side3'
            />
            <Side
              size={this.size}
              image={side4.src}
              side={side4}
              transform={this.transforms.side4}
              mouseUp={this.handleClick}
              name='side4'
            />
            <Side
              size={this.size}
              image={side5.src}
              side={side5}
              transform={this.transforms.side5}
              mouseUp={this.handleClick}
              name='side5'
            />
          </Cube>
        </Viewport>
      </Wrapper>
    )
  }
}

export default CubeBlock
