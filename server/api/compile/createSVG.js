import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'
import getA from './templates/sideA'
import getB from './templates/sideB'
import getEnvelopeA from './templates/envelopeA'
import getEnvelopeB from './templates/envelopeB'

const createSVG = (endPath, work, img0, img1, img2, img3, img4, img5, envelope) => new Promise((resolve, reject) => {
  const pathSvg1 = path.resolve(endPath, `paper-${work._id}-A.svg`)
  const pathSvg2 = path.resolve(endPath, `paper-${work._id}-B.svg`)
  const pathSvg3 = path.resolve(endPath, `paper-${work._id}-sobre-a.svg`)
  const pathSvg4 = path.resolve(endPath, `paper-${work._id}-sobre-b.svg`)

  const sideA = getA(img0, img1, img2, img3, img4, img5)
  const sideB = getB(img0, img1, img2, img3, img4, img5)
  const envelopeA = getEnvelopeA(envelope)
  const envelopeB = getEnvelopeB(envelope)

  mkdirp(endPath, (error) => {
    if (error) return reject(error)
    fs.writeFile(pathSvg1, sideA, (error) => {
      if (error) return reject(error)
      fs.writeFile(pathSvg2, sideB, (error) => {
        if (error) return reject(error)
        fs.writeFile(pathSvg3, envelopeA, (error) => {
          if (error) return reject(error)
          fs.writeFile(pathSvg4, envelopeB, (error) => {
            if (error) return reject(error)
            resolve({ endPath, pathSvg1, pathSvg2, pathSvg3, pathSvg4 })
          })
        })
      })
    })
  })
})

export default createSVG
