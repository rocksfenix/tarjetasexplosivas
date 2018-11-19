import path from 'path'
import del from 'del'
import createPDFS from './createPDF'
import createZip from './createZip'
import uploadS3 from './upload-s3'
import createSVG from './createSVG'
import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import getBase64FromUrl from './getBase64FromUrl'
import createReadme from './createReadme'

export default {
  process: async (req, res, next) => {
    try {
      // 1 Obtener el work
      if (!req.decode) return next(ForbiddenError())

      const user = await models.User.findById(req.decode.sub)

      const work = await models.Work.findById(req.params.id)

      if (!work) return next(NotFound())
      if (req.decode.sub !== work.author) return next(ForbiddenError())

      if (user.credits === 0) {
        return res.json({ error: 'No tienes creditos', code: 11 })
      }

      // Si ya tienen locacion no compilar
      // if (work.location) {
      //   return res.json({
      //     location: work.location,
      //     processTime: `0ms`,
      //     uploadTime: `0ms`
      //   })
      // }

      // 2 Descargar 7 imagenes como base64 lados + sobre
      const t1 = Date.now()
      const [ img0, img1, img2, img3, img4, img5, envelope ] = await Promise.all([
        getBase64FromUrl(work.side0.src),
        getBase64FromUrl(work.side1.src),
        getBase64FromUrl(work.side2.src),
        getBase64FromUrl(work.side3.src),
        getBase64FromUrl(work.side4.src),
        getBase64FromUrl(work.side5.src),
        getBase64FromUrl(work.envelope)
      ])

      const endPath = path.resolve(__dirname, '../../../', 'uploads', `${work._id}`)
      // 3 - Generar SVG en base a esas imagenes en Base64
      const { pathSvg1, pathSvg2, pathSvg3 } = await createSVG(endPath, work, img0, img1, img2, img3, img4, img5, envelope)
      console.log(pathSvg1, pathSvg2)

      // 4 - Generamos los PDFS
      await createPDFS(work, endPath, pathSvg1, pathSvg2, pathSvg3)

      // 4 - Creamos el Readme
      await createReadme(endPath, 'INSTRUCCIONES.txt', work, req.decode.sub)

      // 5 Eliminamos las imagenes svg temporales
      await del([ pathSvg1, pathSvg2, pathSvg3 ])

      // 6 - Generamos la carpeta comprimida
      await createZip(endPath, endPath + '.zip')

      // 7 - Eliminamos la carpeta temporal
      await del([ endPath ])

      const t2 = Date.now()
      const t3 = Date.now()

      // 8 - Subir a S3
      const location = await uploadS3(endPath + '.zip', work.author, work._id)
      const t4 = Date.now()

      // 9- Guardamos la locacion en DB
      work.location = location
      await work.save()

      // 10 - Eliminar .zip temporal
      await del([ endPath + '.zip' ])

      // 11 - Enviar al cliente
      // 12 Quitamos el credito
      user.credits = user.credits - 1

      user.save()

      res.json({
        location,
        processTime: `${t2 - t1}ms`,
        uploadTime: `${t4 - t3}ms`
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
