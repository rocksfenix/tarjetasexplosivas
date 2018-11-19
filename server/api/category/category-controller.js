import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import uploadImage from '../upload/upload-image'

export default {
  getAllAdmin: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    let query = {}

    const total = await models.Category
      .find(query)
      .countDocuments()

    const categories = await models.Category.find(query)
      .sort({ position: 1 })
      .exec()

    res.json({
      categories: categories.map(p => p.toJSON()),
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

    const total = await models.Category
      .find(query)
      .countDocuments()

    const categories = await models.Category.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ position: 1 })
      .exec()

    res.json({
      categories: categories.map(p => p.toJSON()),
      total,
      hasMore: skip + categories.length < total
    })
  },

  post: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const category = await models.Category.create({ ...req.body.category, author: req.decode.sub })

    res.json({ category: category.toJSON() })
  },

  put: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const category = await models.Category.findById(req.params.id)

    if (!category) return next(NotFound());

    [
      'title',
      'position',
      'active'
    ].forEach(key => {
      if (req.body.category[key]) {
        category[key] = req.body.category[key]
      }
    })

    await category.save()

    res.json({ category: category.toJSON() })
  },

  delete: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const category = await models.Category.findById(req.params.id)

    if (!category) return next(NotFound())

    await category.remove()

    res.json({ category: category.toJSON() })
  },

  upload: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const category = await models.Category.findById(req.params.id)

    if (!category) return next(NotFound())

    const { key, filename, location } = await uploadImage(req.files.image, req.decode.sub)

    category.key = key
    category.filename = filename
    category.location = location

    await category.save()

    res.json({
      category: category.toJSON()
    })
  }
}
