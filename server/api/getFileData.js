// Se usa para extraer la informacion de file para
// poder compilar a nuestro gusto como Key en S3

import shortid from 'shortid'
import mime from 'mime'

const getID = () => `${shortid.generate()}${shortid.generate()}${shortid.generate()}${shortid.generate()}${shortid.generate()}${shortid.generate()}${shortid.generate()}${shortid.generate()}`

export default (file) => {
  const id = getID()
  const { mimetype } = file
  const ext = mime.getExtension(mimetype)
  return {
    id,
    mimetype,
    ext
  }
}
