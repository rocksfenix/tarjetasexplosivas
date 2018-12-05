import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'

export default {
  getAllSelf: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    let limit = 9
    let skip = 0
    let query = {
      // Solo los propios
      author: req.decode.sub
    }

    if (typeof req.query.skip !== 'undefined') {
      skip = Number(req.query.skip)
    }

    if (typeof req.query.limit !== 'undefined') {
      limit = Number(req.query.limit)
    }

    const total = await models.Work
      .find(query)
      .countDocuments()

    const works = await models.Work.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      works: works.map(p => p.toJSON()),
      total,
      hasMore: skip + works.length < total,
      error: null
    })
  },

  post: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    try {
      const [ work, user ] = await Promise.all([
        await models.Work.create({ author: req.decode.sub }),
        await models.User.findById(req.decode.sub)
      ])

      user.cards = user.cards + 1

      await user.save()

      res.json({
        work: work.toJSON(),
        error: null
      })
    } catch (error) {
      next(error)
    }
  },

  getById: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    const work = await models.Work.findById(req.params.id)

    if (!work) return next(NotFound())
    if (req.decode.sub !== work.author) return next(ForbiddenError())

    const isCompleted = (typeof work.side0.src === 'string') &&
      (typeof work.side1.src === 'string') &&
      (typeof work.side2.src === 'string') &&
      (typeof work.side3.src === 'string') &&
      (typeof work.side4.src === 'string') &&
      (typeof work.side5.src === 'string')

    res.json({
      work: work.toJSON(),
      isCompleted,
      error: null
    })
  },

  update: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    const work = await models.Work.findById(req.params.id)

    if (!work) return next(NotFound())
    if (req.decode.sub !== work.author) return next(ForbiddenError());

    // Solo campos validos
    [
      'envelope',
      'side0',
      'side1',
      'side2',
      'side3',
      'side4',
      'side5',
      'envelopeInsideText'
    ].forEach(field => {
      if (req.body.work[field]) {
        work[field] = req.body.work[field]
      }
    })

    await work.save()

    res.json({
      work: work.toJSON(),
      error: null
    })
  }
}
