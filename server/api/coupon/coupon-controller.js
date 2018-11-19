import models from '../../models'
import { ForbiddenError } from '../../errors'
import CC from 'coupon-code'

export default {
  create: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    try {
      const coupon = await models.Coupon.create({
        code: CC.generate()
      })

      res.json({
        coupon: coupon.toJSON()
      })
    } catch (error) {
      next(error)
    }
  },

  apply: async (req, res, next) => {
    // Apicamos el coupon al usuario con los creditos

  }
}
