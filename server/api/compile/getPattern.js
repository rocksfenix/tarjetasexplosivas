// crear patron en NODE y returnar su base64
// import { createCanvas } from 'canvas'
import path from 'path'
const { createCanvas, registerFont } = require('canvas')

const fontPoppins = path.resolve(__dirname, 'Poppins-Regular.ttf')

export default (title) => new Promise((resolve, reject) => {
  const text = title.length > 6
    ? title
    : title + ' * * * '

  registerFont(fontPoppins, { family: 'Poppins' })
  const size = 1200
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')
  ctx.quality = 'best'

  ctx.fillStyle = '#FFF'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.rotate(-Math.PI / 4)
  ctx.translate(-size, 0)
  ctx.textBaseLine = 'middle'

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const COLORS = [
    '#000000'
  ]

  const getColor = () => COLORS[getRandomInt(0, 4)]

  const renderX = (y) => {
    let acc = 0
    let initialRandom = getRandomInt(-70, 70)
    for (var i = 0; i <= 35; i++) {
      // const text = 'Hermosa Jirafita bebe' // Jirafita Hermosa bebe
      const fontSize = getRandomInt(13, 30)
      const color = getColor()
      const random = getRandomInt(5, 21)
      // let posX = (text.length * fontSize) / 2 * i
      let w = ctx.measureText(text).width
      if (i > 0) {
        acc += (w + random)
      }
      ctx.font = `${fontSize}px Poppins`
      ctx.fillStyle = color
      ctx.fillText(text, acc + initialRandom, y)
    }
  }

  const renderY = (y) => {
    for (var i = 0; i <= 60; i++) {
      renderX(i * 35)
    }
  }

  renderY()

  canvas.toDataURL('image/jpeg', (err, jpeg) => {
    if (err) {
      console.log(err)
      return reject(err)
    }
    // console.log(';FINISO')
    // console.log(jpeg)
    resolve(jpeg)
  })
})
