import React from 'react'
import styled from 'styled-components'
import GalleryPanel from '../GalleryPanel'
import ColorTip from './ColorTip'
import ColorType from './ColorType'

const Editor = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  background: #FFF;
  z-index: 100;
`

const Tools = styled.div`
  width: 48%;
  height: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  padding: 3px;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const CanvasBox = styled.div`
  border: 1px dashed gray;
  width: 40%;
  background: rebeccapurplel;

  @media (max-width: 900px) {
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }
`

const View = styled.div`
  width: 95%;
  height: 100%;
  max-height: 300px;
  margin: 1em auto;
  display: flex;
  justify-content: space-around;

  @media (max-width: 900px) {
    width: 98%;
    flex-direction: column;
  }
`

const Input = styled.input`
  width: 100%;
  border: 1px solid #8a8a8a;
  font-size: 20px;
  padding: 10px 10px;
  box-sizing: border-box;
  margin: 10px 0;
  border-radius: 5px;
`

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Colors = styled.div`
  width: 100%;
  height: 50px;
  display:flex;
  align-content: center;
  justify-content: center;
  position: relative;
`
const BG = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
  align-items: center;
  margin: 0 auto 2em auto;
  border: 1px solid #b1b1b1;
  border-radius: 5px;
  font-size: 20px;
`

class MessageComponent extends React.Component {
  state = {
    text: 'I love You',
    color1: '#820AE0',
    color2: '#1A82FF',
    color3: '#DB740E',
    color4: '#2EA814',
    color5: '#FF2A00',
    colorType: 'multicolor',
    backgroundColor: '#FFF',
    solidColor: '#388e3c'
  }

  canvasEl = React.createRef()

  componentDidMount () {
    if (process.browser) {
      this.canvas = this.canvasEl.current
      this.ctx = this.canvas.getContext('2d')
      this.ctx.fillStyle = '#FFF'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.rotate(-Math.PI / 4)
      this.ctx.translate(-500, 0)
      this.ctx.textBaseLine = 'middle'
      this.renderY()
    }
  }

  renderX = (y) => {
    let acc = 0
    let initialRandom = getRandomInt(-70, 70)

    // var gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0)
    // gradient.addColorStop('0', 'pink')
    // gradient.addColorStop('0.2', 'orange')
    // gradient.addColorStop('0.8', 'black')
    // gradient.addColorStop('1.0', 'purple')

    for (var i = 0; i <= 15; i++) {
      const text = this.state.text
      const fontSize = getRandomInt(20, 45)
      const color = this.state.colorType === 'multicolor'
        ? this.getColor()
        : this.state.solidColor
      const random = getRandomInt(5, 20)
      // let posX = (text.length * fontSize) / 2 * i
      let w = this.ctx.measureText(text).width
      if (i > 0) {
        acc += (w + random)
      }
      this.ctx.font = `${fontSize}px Poppins`
      // this.ctx.fillStyle = color || '#333' // getColor()
      this.ctx.fillStyle = color
      this.ctx.fillText(text, acc + initialRandom, y)

      // window.data.push({ x: acc, y, color })
    }
  }

  renderY = () => {
    this.ctx.clearRect(0, 0, 1000, 1000)
    this.ctx.fillStyle = this.state.backgroundColor
    this.ctx.fillRect(0, 0, 1000, 1000)

    for (var i = 0; i <= 16; i++) {
      this.renderX(i * 43)
    }
  }

  onBack = () => {
    window.history.back()
  }

  changeText= (e) => {
    this.state.text = e.target.value
    this.forceUpdate()
    this.renderY(e.target.value)
  }

  renderToCanvas = () => {
    this.canvas.toBlob((blob) => {
      const imgURL = URL.createObjectURL(blob)
      this.props.onUploadPhoto({ imgURL, blob })
    })
  }

  onChangeColorType = (colorType) => {
    this.state.colorType = colorType
    this.setState({ colorType }, this.renderY)
  }

  changeColor = (key, color) => {
    this.state[key] = color
    this.setState({
      [key]: color
    }, this.renderY())
  }

  getColor = () => {
    const key = `color${getRandomInt(0, 5)}`
    return this.state[key]
  }

  getRandomSize = () => `${getRandomInt(20, 45)}px`

  render () {
    const { colorType } = this.state
    return (
      <GalleryPanel
        onBack={this.onBack}
        onConfirm={this.renderToCanvas}
        confirmText='Confirmar'
        confirmActive
      >
        <Editor>
          <View>
            <CanvasBox>
              <canvas width='500' height='500' style={{ width: '100%' }} ref={this.canvasEl} />
            </CanvasBox>
            <Tools>
              <Input value={this.state.text} type='text' onChange={this.changeText} />
              <ColorType onChange={this.onChangeColorType} colorType={colorType} />
              {
                colorType === 'multicolor'
                  ? (
                    <Colors>
                      <ColorTip color={this.state.color1} onConfirm={(color) => this.changeColor('color1', color)} />
                      <ColorTip color={this.state.color2} onConfirm={(color) => this.changeColor('color2', color)} />
                      <ColorTip color={this.state.color3} onConfirm={(color) => this.changeColor('color3', color)} />
                      <ColorTip color={this.state.color4} onConfirm={(color) => this.changeColor('color4', color)} />
                      <ColorTip color={this.state.color5} onConfirm={(color) => this.changeColor('color5', color)} />
                    </Colors>
                  )
                  : (
                    <Colors>
                      <ColorTip color={this.state.solidColor} onConfirm={(color) => this.changeColor('solidColor', color)} />
                    </Colors>
                  )
              }
              <BG>
                <div>Fondo</div>
                <Colors>
                  <ColorTip border='2px solid gray' color={this.state.backgroundColor} onConfirm={(color) => this.changeColor('backgroundColor', color)} />
                </Colors>
              </BG>
            </Tools>
          </View>
        </Editor>

      </GalleryPanel>
    )
  }
}

export default MessageComponent
