import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'

export default {
  getAverageCompiledTime: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const time1 = Date.now()
    const pipline = [
      {
        $match: {
          'compilationTime': { '$exists': true, '$ne': null }
        }
      },
      {
        $group: {
          _id: '$cust_id',
          total: {
            $avg: '$compilationTime'
          }
        }
      }
    ]

    const response = await models.Work.aggregate(pipline)
    const time2 = Date.now()

    res.json({
      average: response[0].total,
      responseTime: time2 - time1
    })
  }
}
