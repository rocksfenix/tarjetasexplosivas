import models from '../../models'
import { NotFound, ForbiddenError } from '../../errors'
import { getTokens } from '../../services/auth-service'

export default {
  self: async (req, res, next) => {
    try {
      if (!req.decode) return res.json({ error: 'No Autorizado' })
      const id = req.decode.sub

      const user = await models.User.findById(id)

      if (!user) return next(NotFound())

      res.json({
        user: user.toJSON(),
        error: null
      })
    } catch (error) {
      next(error)
    }
  },

  acceptTerms: async (req, res, next) => {
    try {
      if (!req.decode) return res.json({ error: 'No Autorizado' })
      const id = req.decode.sub

      const user = await models.User.findById(id)
      user.acceptTerms = Date.now()
      user.acceptPolicyPrivacy = Date.now()
      await user.save()

      const { token, refreshToken } = getTokens(user)

      res.json({
        token,
        refreshToken,
        user: user.toJSON(),
        error: null
      })
    } catch (error) {
      next(error)
    }
  },

  updateFBAccessToken: async (req, res, next) => {
    try {
      if (!req.decode) return res.json({ error: 'No Autorizado' })
      const id = req.decode.sub

      const user = await models.User.findById(id)

      if (!user) return next(NotFound())

      user.facebook_access_token = req.body.facebook_access_token
      await user.save()

      res.json({
        user: user.toJSON(),
        error: null
      })
    } catch (error) {
      next(error)
    }
  },

  put: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    if (req.decode.sub !== req.params.id && req.decode.role !== 'admin') {
      return next(ForbiddenError())
    }

    const user = await models.User.findById(req.params.id)

    if (!user) return next(NotFound())

    let seteables = [
      'fullname',
      'email'
    ]

    if (req.decode.role === 'admin') {
      seteables.push('status')
      seteables.push('role')
    }

    seteables.forEach(key => {
      if (typeof req.body.user[key] !== 'undefined') {
        user[key] = req.body.user[key]
      }
    })

    await user.save()

    res.json({ user: user.toJSON() })
  },

  all: async (req, res, next) => {
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

    const total = await models.User
      .find(query)
      .countDocuments()

    const users = await models.User.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      users: users.map(p => p.toJSON()),
      total,
      hasMore: skip + users.length < total
    })
  },

  getByPartialName: async (req, res, next) => {
    try {
      const limit = 50
      let skip = 0
      const search = new RegExp(req.query.search, 'i')

      const query = {
        fullname: { $regex: search }
      }

      const total = await models.User
        .find(query)
        .countDocuments()

      const users = await models.User.find(query)
        .limit(Number(limit))
        .skip(Number(skip))
        .exec()

      res.json({
        users: users.map(p => p.toJSON()),
        total,
        hasMore: skip + users.length < total
      })
    } catch (error) {
      next(error)
    }
  }
}
