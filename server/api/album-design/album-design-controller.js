import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import uploadImage from '../upload/upload-image'
import thumnailify from '../../services/thumnailify'
import getFileData from '../getFileData'

export default {
  getAllAdmin: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    let query = {}

    const total = await models.AlbumDesign
      .find(query)
      .countDocuments()

    const album = await models.AlbumDesign.find(query)
      .sort({ position: 1 })
      .exec()

    res.json({
      albumsDesigns: album.map(p => p.toJSON()),
      total
    })
  },

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

    const total = await models.AlbumDesign
      .find(query)
      .countDocuments()

    const albums = await models.AlbumDesign.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ position: 1 })
      .exec()

    res.json({
      albumsDesigns: albums.map(p => p.toJSON()),
      total,
      hasMore: skip + albums.length < total
    })
  },

  post: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const album = await models.AlbumDesign.create({ ...req.body.album, author: req.decode.sub })

    res.json({ albumDesign: album.toJSON() })
  },

  put: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const album = await models.AlbumDesign.findById(req.params.id)

    if (!album) return next(NotFound());

    [
      'title',
      'position',
      'active'
    ].forEach(key => {
      if (req.body.albumDesign[key]) {
        album[key] = req.body.albumDesign[key]
      }
    })

    await album.save()

    res.json({ albumDesign: album.toJSON() })
  },

  delete: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const album = await models.AlbumDesign.findById(req.params.id)

    if (!album) return next(NotFound())

    await album.remove()

    res.json({ albumDesign: album.toJSON() })
  },

  upload: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const album = await models.AlbumDesign.findById(req.params.id)

    if (!album) return next(NotFound())

    const { id, ext } = getFileData(req.files.image)
    const Key = `album-designs/${req.decode.sub}/${id}.${ext}`

    const baseLocation = await uploadImage(req.files.image, Key, id)

    album.key = baseLocation.key
    album.location = baseLocation.location

    await album.save()

    // Emitir Evento de generacion de Thumbnails
    thumnailify(baseLocation, album, req.params.id, [
      { size: 260, suffix: 'thumbnail' }
    ])

    res.json({
      albumDesign: album.toJSON()
    })
  }
}
