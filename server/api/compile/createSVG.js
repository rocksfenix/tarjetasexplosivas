import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'
import getB from './templates/e'
import getSobre from './templates/envelope'

const createSVG = (endPath, work, img0, img1, img2, img3, img4, img5, envelope) => new Promise((resolve, reject) => {
  const pathSvg1 = path.resolve(endPath, `paper-${work._id}-A.svg`)
  const pathSvg2 = path.resolve(endPath, `paper-${work._id}-B.svg`)
  const pathSvg3 = path.resolve(endPath, `paper-${work._id}-Sobre.svg`)

  const svg1 = getB(img1, img2)
  const svg2 = getB(img3, img4)
  const svg3 = getSobre(envelope)

  mkdirp(endPath, (error) => {
    if (error) return reject(error)
    fs.writeFile(pathSvg1, svg1, (error) => {
      if (error) return reject(error)
      fs.writeFile(pathSvg2, svg2, (error) => {
        if (error) return reject(error)
        fs.writeFile(pathSvg3, svg3, (error) => {
          if (error) return reject(error)
          resolve({ endPath, pathSvg1, pathSvg2, pathSvg3 })
        })
      })
    })
  })
})

export default createSVG
