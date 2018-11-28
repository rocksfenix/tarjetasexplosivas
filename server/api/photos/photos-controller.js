import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import uploadImage from '../upload/upload-image'
import getFileData from '../getFileData'
import thumnailify from '../../services/thumnailify'

export default {
  getAllSelf: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    let limit = 15
    let skip = 0
    let query = {
      // Solo las imagenes propias
      author: req.decode.sub,

      // Solo las photos no pattenrs
      type: 'photo'
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

  saveSideDB: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    // Obtenemos el work para revisar si es de ese usuario
    const work = await models.Work.findById(req.params.workId)

    if (!work) return next(NotFound())

    if (work.author !== req.decode.sub) return next(ForbiddenError())

    work[req.params.side] = {
      src: req.body.sideSrc
    }

    await work.save()

    const workReview = await models.Work.findById(work._id)

    const isCompleted = (typeof workReview.side0.src === 'string') &&
      (typeof workReview.side1.src === 'string') &&
      (typeof workReview.side2.src === 'string') &&
      (typeof workReview.side3.src === 'string') &&
      (typeof workReview.side4.src === 'string') &&
      (typeof workReview.side5.src === 'string')

    res.json({
      work: work.toJSON(),
      photo: req.body.sideSrc,
      isCompleted
    })
  },

  saveEnvelopeDB: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    // Obtenemos el work para revisar si es de ese usuario
    const work = await models.Work.findById(req.params.workId)

    if (!work) return next(NotFound())

    if (work.author !== req.decode.sub) return next(ForbiddenError())

    work.envelope = req.body.envelopeSrc

    await work.save()

    const workReview = await models.Work.findById(work._id)

    const isCompleted = (typeof workReview.side0.src === 'string') &&
      (typeof workReview.side1.src === 'string') &&
      (typeof workReview.side2.src === 'string') &&
      (typeof workReview.side3.src === 'string') &&
      (typeof workReview.side4.src === 'string') &&
      (typeof workReview.side5.src === 'string')

    res.json({
      work: work.toJSON(),
      photo: req.body.sideSrc,
      isCompleted
    })
  },

  saveTextEnvelopeDB: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    // Obtenemos el work para revisar si es de ese usuario
    const work = await models.Work.findById(req.params.workId)

    if (!work) return next(NotFound())

    if (work.author !== req.decode.sub) return next(ForbiddenError())

    work.envelopeInsideText = req.body.envelopeInsideText

    await work.save()

    const workReview = await models.Work.findById(work._id)

    const isCompleted = (typeof workReview.side0.src === 'string') &&
      (typeof workReview.side1.src === 'string') &&
      (typeof workReview.side2.src === 'string') &&
      (typeof workReview.side3.src === 'string') &&
      (typeof workReview.side4.src === 'string') &&
      (typeof workReview.side5.src === 'string')

    res.json({
      work: work.toJSON(),
      isCompleted
    })
  },

  upload: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    // Obtenemos el work para revisar si es de ese usuario
    const work = await models.Work.findById(req.params.workId)

    if (!work) return next(NotFound())

    if (work.author !== req.decode.sub) return next(ForbiddenError())

    const { id, ext } = getFileData(req.files.image)
    const Key = `photos/${req.decode.sub}/${id}.${ext}`
    const baseLocation = await uploadImage(req.files.image, Key, id)
    work[req.params.side] = {
      src: baseLocation.location
    }

    const photo = await models.Photo.create({
      author: req.decode.sub,
      work: work._id,
      key: baseLocation.key,
      location: baseLocation.location,
      type: req.params.type || 'photo'
    })

    await work.save()

    // Emitir Evento de generacion de Thumbnails
    thumnailify(baseLocation, photo, id, [
      { size: 260, suffix: 'thumbnail' }
    ])

    const workReview = await models.Work.findById(work._id)

    const isCompleted = (typeof workReview.side0.src === 'string') &&
      (typeof workReview.side1.src === 'string') &&
      (typeof workReview.side2.src === 'string') &&
      (typeof workReview.side3.src === 'string') &&
      (typeof workReview.side4.src === 'string') &&
      (typeof workReview.side5.src === 'string')

    res.json({
      work: work.toJSON(),
      photo: photo.toJSON(),
      isCompleted
    })
  }
}
