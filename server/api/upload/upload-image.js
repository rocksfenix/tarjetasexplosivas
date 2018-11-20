import mkdirp from 'mkdirp'
import del from 'delete'
import shortid from 'shortid'
import mime from 'mime'
import S3 from '../../services/S3'
import fs from 'fs'

// Ensure upload directory exists
const uploadDir = './uploads'
mkdirp.sync(uploadDir)

const BUCKET = process.env.S3_BUCKET

export default async (file, Key, id) => new Promise((resolve, reject) => {
  const { mimetype } = file
  const ext = mime.getExtension(mimetype)
  const pathTemp = uploadDir + '/' + id + '.' + ext

  file.mv(pathTemp, async (error) => {
    if (error) return console.log(error)

    const stream = fs.createReadStream(pathTemp)
    S3.upload({
      Bucket: BUCKET,
      Key,
      Body: stream,
      ACL: 'public-read',
      ContentType: mimetype,
      Metadata: {
        'Content-Type': mimetype
      }
    }, (err, docs) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      // Eliminamos la imagen temporal
      del(pathTemp)

      const location = docs.Location.replace(
        'https://tarjetas-explosivas.s3.amazonaws.com',
        'https://d39p6dv27gzlaf.cloudfront.net'
      )

      // console.log(location)
      resolve({
        filename: `${id}.${ext}`,
        location,
        key: Key,
        ext,
        mimetype
      })
    })
  })
})
