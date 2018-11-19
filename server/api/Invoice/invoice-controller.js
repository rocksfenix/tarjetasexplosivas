import models from '../../models'
import { ForbiddenError } from '../../errors'

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

    const total = await models.Invoice
      .find(query)
      .estimatedDocumentCount()

    const invoices = await models.Invoice.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      invoices,
      total,
      hasMore: skip + invoices.length < total
    })
  },

  getAllSelf: async (req, res, next) => {
    try {
      if (!req.decode) return next(ForbiddenError())

      let limit = 15
      let skip = 0
      let query = {
        author: req.decode.sub
      }

      if (typeof req.query.skip !== 'undefined') {
        skip = Number(req.query.skip)
      }

      if (typeof req.query.limit !== 'undefined') {
        limit = Number(req.query.limit)
      }

      const total = await models.Invoice
        .find(query)
        .countDocuments()

      const invoices = await models.Invoice.find(query)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec()

      res.json({
        invoices,
        total,
        hasMore: skip + invoices.length < total
      })
    } catch (error) {
      next(error)
    }
  }
}
