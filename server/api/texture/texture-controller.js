import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import uploadImage from '../upload/upload-image'
import getFileData from '../getFileData'
import thumnailify from '../../services/thumnailify'

export default {
  getAll: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    let limit = 15
    let skip = 0
    let query = {}

    if (typeof req.query.skip !== 'undefined') {
      skip = Number(req.query.skip)
    }

    if (typeof req.query.limit !== 'undefined') {
      limit = Number(req.query.limit)
    }

    const total = await models.Texture
      .find(query)
      .estimatedDocumentCount()

    const texture = await models.Texture.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ position: 1 })
      .exec()

    res.json({
      textures: texture.map(p => p.toJSON()),
      total,
      hasMore: skip + texture.length < total
    })
  },

  post: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const texture = await models.Texture.create({ ...req.body.texture, author: req.decode.sub })

    res.json({ texture: texture.toJSON() })
  },

  put: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const texture = await models.Texture.findById(req.params.id)

    if (!texture) return next(NotFound());
    [
      'title',
      'active',
      'position'
    ].forEach(key => {
      if (req.body.texture[key]) {
        texture[key] = req.body.texture[key]
      }
    })

    await texture.save()

    res.json({ texture: texture.toJSON() })
  },

  delete: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const texture = await models.Texture.findById(req.params.id)

    if (!texture) return next(NotFound())

    await texture.remove()

    res.json({ texture: texture.toJSON() })
  },

  upload: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const texture = await models.Texture.findById(req.params.id)

    if (!texture) return next(NotFound())

    const { id, ext } = getFileData(req.files.image)
    const Key = `textures/${req.decode.sub}/${id}.${ext}`
    const baseLocation = await uploadImage(req.files.image, Key, id)

    texture.key = baseLocation.key
    texture.location = baseLocation.location

    await texture.save()

    // Emitir Evento de generacion de Thumbnails
    thumnailify(baseLocation, texture, req.params.id, [
      { size: 260, suffix: 'thumbnail' }
    ])

    res.json({
      texture: texture.toJSON()
    })
  }
}
