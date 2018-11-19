import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import uploadImage from '../upload/upload-image'

export default {
  getAllSelf: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    let limit = 15
    let skip = 0
    let query = {
      // Solo las imagenes propias
      author: req.decode.sub
    }

    if (typeof req.query.skip !== 'undefined') {
      skip = Number(req.query.skip)
    }

    if (typeof req.query.limit !== 'undefined') {
      limit = Number(req.query.limit)
    }

    const total = await models.Photo
      .find(query)
      .estimatedDocumentCount()

    const photos = await models.Photo.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      photos: photos.map(p => p.toJSON()),
      total,
      hasMore: skip + photos.length < total
    })
  },

  upload: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    // Obtenemos el work para revisar si es de ese usuario
    const work = await models.Work.findById(req.params.workId)

    if (!work) return next(NotFound())

    if (work.author !== req.decode.sub) return next(ForbiddenError())

    const { key, filename, location } = await uploadImage(req.files.image, req.decode.sub)

    work[req.params.side] = {
      src: location
    }

    const photo = await models.Photo.create({
      author: req.decode.sub,
      work: work._id,
      key,
      filename,
      location
    })

    await work.save()

    res.json({
      work: work.toJSON(),
      photo: photo.toJSON()
    })
  }
}
