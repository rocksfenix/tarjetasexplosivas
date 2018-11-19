import axios from 'axios'

// Obtiene el base64 de una imagen a travez de una url
const getBase64FromUrl = async (url) => {
  const reqSide1 = await axios.get(url, {
    responseType: 'arraybuffer'
  })
  return Buffer
    .from(reqSide1.data, 'binary')
    .toString('base64')
}

export default getBase64FromUrl
