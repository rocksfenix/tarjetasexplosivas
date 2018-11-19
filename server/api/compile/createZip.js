import archiver from 'archiver'
import fs from 'fs'

/**
 * @param {String} source
 * @param {String} out
 * @returns {Promise}
 */
function zipDirectory (source, out) {
  const archive = archiver('zip', { zlib: { level: 9 } })
  const stream = fs.createWriteStream(out)

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', err => reject(err))
      .pipe(stream)

    stream.on('close', () => resolve())
    archive.finalize()
  })
}

export default zipDirectory
