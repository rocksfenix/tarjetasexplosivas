import fs from 'fs'
import S3 from '../../services/S3'

const BUCKET = process.env.S3_BUCKET

/**
 * @param {String} pathTemp
 * @param {String} userId
 * @param {String} workId
 * @returns {Promise}
 */
export default (pathTemp, userId, workId) => new Promise((resolve, reject) => {
  const stream = fs.createReadStream(pathTemp)
  const Key = `works/${userId}/${workId}.zip`
  S3.upload({
    Bucket: BUCKET,
    Key,
    Body: stream,
    ACL: 'public-read',
    ContentType: 'application/zip',
    Metadata: {
      'Content-Type': 'application/zip'
    }
  }, (error, docs) => {
    if (error) {
      console.log(error)
      return reject(error)
    }

    const location = docs.Location.replace(
      'https://tarjetas-explosivas.s3.amazonaws.com',
      'https://d39p6dv27gzlaf.cloudfront.net'
    )

    resolve(location)
  })
})
