import React from 'react'
import styled from 'styled-components'
import GalleryPanel from '../GalleryPanel'

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

`

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const COLORS = [
  '#820AE0',
  '#1A82FF',
  '#DB740E',
  '#2EA814',
  '#FF2A00'
]

const getColor = () => COLORS[getRandomInt(0, 4)]

const getRandomSize = () => `${getRandomInt(20, 45)}px`

class MessageComponent extends React.Component {
  state = {
    text: 'I love You',
    color1: '#820AE0',
    color2: '#1A82FF',
    color3: '#DB740E',
    color4: '#2EA814',
    multicolor: false
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

    var gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0)
    gradient.addColorStop('0', 'pink')
    // gradient.addColorStop('0.2', 'orange')
    // gradient.addColorStop('0.8', 'black')
    gradient.addColorStop('1.0', 'purple')

    for (var i = 0; i <= 15; i++) {
      const text = this.state.text // Jirafita Hermosa bebe
      const fontSize = getRandomInt(20, 45)
      const color = getColor()
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

      // console.log(acc, w)
    }
  }

  renderY = () => {
    this.ctx.clearRect(0, 0, 1000, 1000)
    this.ctx.fillStyle = '#FFF'
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

  toggleMulticolor = () => {
    this.setState(state => ({
      ...state,
      multicolor: !state.multicolor
    }))
  }

  renderToCanvas = () => {
    this.canvas.toBlob((blob) => {
      const imgURL = URL.createObjectURL(blob)
      console.log(blob, imgURL)

      this.props.onUploadPhoto({ imgURL, blob })
    })
  }

  render () {
    return (
      <GalleryPanel
        onBack={this.onBack}
        onConfirm={this.renderToCanvas}
        confirmActive
      >
        <Editor>
          <canvas width='500' height='500' ref={this.canvasEl} style={{ border: '1px dashed gray', width: '40%', background: 'rebeccapurple' }} />
          <Tools>
            <input value={this.state.text} type='text' onChange={this.changeText} />
            <button onClick={this.toggleMulticolor}>{ this.state.multicolor ? 'solid' : 'Multicolor'}</button>
          </Tools>
        </Editor>

      </GalleryPanel>
    )
  }
}

export default MessageComponent
