import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import uploadImage from '../upload/upload-image'

export default {
  getAll: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    let limit = 15
    let skip = 0
    let query = {}

    if (typeof req.query.skip !== 'undefined') {
      skip = Number(req.query.skip)
    }

    if (typeof req.query.limit !== 'undefined') {
      limit = Number(req.query.limit)
    }

    const total = await models.Design
      .find(query)
      .countDocuments()

    const designs = await models.Design.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      designs: designs.map(p => p.toJSON()),
      total,
      hasMore: skip + designs.length < total
    })
  },

  getByCategory: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    let limit = 15
    let skip = 0
    let query = {
      // published: true,
      category: req.query.category
    }

    if (typeof req.query.skip !== 'undefined') {
      skip = Number(req.query.skip)
    }

    if (typeof req.query.limit !== 'undefined') {
      limit = Number(req.query.limit)
    }

    const total = await models.Design
      .find(query)
      .countDocuments()

    const designs = await models.Design.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      designs: designs.map(p => p.toJSON()),
      total,
      hasMore: skip + designs.length < total
    })
  },

  post: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const design = await models.Design.create({ ...req.body.design, author: req.decode.sub })

    res.json({ design: design.toJSON() })
  },

  put: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const design = await models.Design.findById(req.params.id)

    if (!design) return next(NotFound());
    [
      'title',
      'category',
      'published'
    ].forEach(key => {
      if (req.body.design[key]) {
        design[key] = req.body.design[key]
      }
    })

    await design.save()

    res.json({ design: design.toJSON() })
  },

  delete: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const design = await models.Design.findById(req.params.id)

    if (!design) return next(NotFound())

    await design.remove()

    res.json({ design: design.toJSON() })
  },

  upload: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const design = await models.Design.findById(req.params.id)

    if (!design) return next(NotFound())

    const { key, location } = await uploadImage(req.files.image, req.decode.sub)

    design.key = key
    design.location = location

    await design.save()

    res.json({
      design: design.toJSON()
    })
  }
}