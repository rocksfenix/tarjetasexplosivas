import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import uploadImage from '../upload/upload-image'
import getFileData from '../getFileData'
import thumnailify from '../../services/thumnailify'

export default {
  getAll: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    const isAdmin = req.decode.role === 'admin'

    let limit = 9
    let skip = 0
    let query = {}

    if (!isAdmin) {
      query.active = true
    }

    if (typeof req.query.skip !== 'undefined') {
      skip = Number(req.query.skip)
    }

    if (typeof req.query.limit !== 'undefined') {
      limit = Number(req.query.limit)
    }

    const total = await models.Envelope
      .find(query)
      .estimatedDocumentCount()

    const envelopes = await models.Envelope.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ position: 1 })
      .exec()

    res.json({
      envelopes: envelopes.map(p => p.toJSON()),
      total,
      hasMore: skip + envelopes.length < total
    })
  },

  delete: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const envelope = await models.Envelope.findById(req.params.id)

    if (!envelope) return next(NotFound())

    await envelope.remove()

    res.json({ envelope: envelope.toJSON() })
  },

  post: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const envelope = await models.Envelope.create({
      author: req.decode.sub
    })

    res.json({
      envelope: envelope.toJSON()
    })
  },

  put: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const envelope = await models.Envelope.findById(req.params.id)

    if (!envelope) return next(NotFound());
    [
      'title',
      'position',
      'active'
    ].forEach(key => {
      if (req.body.envelope[key]) {
        envelope[key] = req.body.envelope[key]
      }
    })

    await envelope.save()

    res.json({ envelope: envelope.toJSON() })
  },

  uploadImage: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const { id, ext } = getFileData(req.files.image)
    const Key = `envelopes/${req.decode.sub}/${id}.${ext}`
    const baseLocation = await uploadImage(req.files.image, Key, id)

    const envelope = await models.Envelope.findById(req.params.id)

    if (!envelope) return NotFound()

    envelope.imagekey = baseLocation.key
    envelope.imageLocation = baseLocation.location

    await envelope.save()

    // Emitir Evento de generacion de Thumbnails
    thumnailify(baseLocation, envelope, req.params.id, [
      { size: 260, suffix: 'imageThumbnail' }
    ])

    res.json({
      envelope: envelope.toJSON()
    })
  },

  uploadCover: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const { id, ext } = getFileData(req.files.image)
    const Key = `envelopes/${req.decode.sub}/${id}.${ext}`
    const baseLocation = await uploadImage(req.files.image, Key, id)

    const envelope = await models.Envelope.findById(req.params.id)

    if (!envelope) return NotFound()

    envelope.coverKey = baseLocation.key
    envelope.coverLocation = baseLocation.location

    await envelope.save()

    // Emitir Evento de generacion de Thumbnails
    thumnailify(baseLocation, envelope, req.params.id, [
      { size: 260, suffix: 'coverThumbnail' }
    ])

    res.json({
      envelope: envelope.toJSON()
    })
  }
}
