// Resize to 500px
const resize = (imageCutURL) => new Promise((resolve, reject) => {
  var image = new window.Image(500, 500)
  image.src = imageCutURL
  image.onload = () => {
    var canvas = document.createElement('canvas')
    var width = 500
    var height = 500

    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(image, 0, 0, width, height)
    var dataUrl = canvas.toDataURL('image/jpeg')
    var resizedImage = dataURLToBlob(dataUrl)

    const imgURL = window.URL.createObjectURL(resizedImage)
    resolve({
      imgURL,
      blob: resizedImage
    })
  }

  /* Utility function to convert a canvas to a BLOB */
  var dataURLToBlob = function (dataURL) {
    if (process.browser) {
      let BASE64_MARKER = ';base64,'
      if (dataURL.indexOf(BASE64_MARKER) === -1) {
        let parts = dataURL.split(',')
        let contentType = parts[0].split(':')[1]
        let raw = parts[1]

        return new window.Blob([raw], { type: contentType })
      }

      let parts = dataURL.split(BASE64_MARKER)
      let contentType = parts[0].split(':')[1]
      let raw = window.atob(parts[1])
      let rawLength = raw.length

      let uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }

      return new window.Blob([uInt8Array], { type: contentType })
    }
  }
})

export default resize
