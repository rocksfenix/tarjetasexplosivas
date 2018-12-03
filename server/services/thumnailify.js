import axios from 'axios'
import fs from 'fs'
import path from 'path'
import S3 from './S3'
import del from 'delete'

const BUCKET = process.env.S3_BUCKET

const gm = require('gm').subClass({
  imageMagick: true
})

// Descargar imagen
const DownloadImage = (location, localPath) => new Promise(async (resolve, reject) => {
  const res = await axios({
    method: 'GET',
    url: location,
    responseType: 'stream'
  })
  res.data.pipe(fs.createWriteStream(localPath))

  res.data.on('end', () => {
    resolve()
    console.log('Cargada Localmente en: ' + localPath)
  })

  res.data.on('error', (error) => {
    reject(error)
    console.log('Error al cargas: ' + localPath)
  })
})

// Redimencionar
const resize = (localPath, ext, suffix, size) => new Promise(async (resolve, reject) => {
  const location = `${localPath}-${suffix}.${ext}`
  gm(localPath)
    .compress('JPEG-2000')
    .resize(size).write(location, (error) => {
      if (error) reject(error)
      resolve(location)
    })
})

// Subir a S3
const UploadS3 = (fileTemp) => new Promise((resolve, reject) => {
  const stream = fs.createReadStream(fileTemp.resizePath)
  S3.upload({
    Bucket: BUCKET,
    Key: fileTemp.key,
    Body: stream,
    ACL: 'public-read',
    ContentType: fileTemp.mimetype,
    Metadata: {
      'Content-Type': fileTemp.mimetype
    }
  }, (err, docs) => {
    if (err) {
      console.log(err)
      return reject(err)
    }

    const location = docs.Location.replace(
      'https://tarjetas-explosivas.s3.amazonaws.com',
      'https://d39p6dv27gzlaf.cloudfront.net'
    )

    resolve({
      ...fileTemp,
      location
    })
  })
})

const getKey = (key, ext, suffix) => {
  const location = key.replace(`.${ext}`, '')
  return `${location}-${suffix}.${ext}`
}

// Borrar todas las imagenes
export default async ({ location, ext, key, mimetype }, document, id, config) => {
  const localPath = path.resolve(__dirname, '../../', 'uploads', id)
  await DownloadImage(location, localPath)

  const tempImg = []

  await Promise.all(config.map(async ({ suffix, size }) => {
    const resizePath = await resize(localPath, ext, suffix, size)
    tempImg.push({
      resizePath,
      ext,
      suffix,
      size,
      key: getKey(key, ext, suffix),
      mimetype
    })
  }))

  // Subimos a S3
  await Promise.all(tempImg.map(async (fileTemp, index) => {
    const data = await UploadS3(fileTemp)
    tempImg[index] = data
    document[data.suffix] = data.location
    document[data.suffix + 'Key'] = data.key
  }))

  // Guardar en DB
  document.save()
  // Eliminar Temporales
  tempImg.forEach(({ resizePath }) => {
    del(resizePath)
  })

  del(localPath)

  console.log(tempImg)
}
