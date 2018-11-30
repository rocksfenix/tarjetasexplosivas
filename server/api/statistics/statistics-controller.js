import models from '../../models'
import { ForbiddenError } from '../../errors'

export default {
  getAverageCompiledTime: async (req, res, next) => {
    try {
      if (!req.decode) return next(ForbiddenError())
      if (req.decode.role !== 'admin') return next(ForbiddenError())

      let todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)

      let _3 = new Date()
      _3.setDate(_3.getDate() - 3)

      const time1 = Date.now()
      const piplineToday = [
        {
          $match: {
            'compilationTime': { '$exists': true, '$ne': null },
            compiledAt: { '$gte': todayStart }
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

      const piplineLast3 = [
        {
          $match: {
            'compilationTime': { '$exists': true, '$ne': null },
            compiledAt: { '$gte': _3 }
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

      const creditsSumToday = [
        {
          $match: {
            createdAt: { '$gte': todayStart }
          }
        },
        {
          $group: {
            _id: '$cust_id',
            total: {
              $sum: '$amount'
            }
          }
        }
      ]

      const creditsSumLast3 = [
        {
          $match: {
            createdAt: { '$gte': _3 }
          }
        },
        {
          $group: {
            _id: '$cust_id',
            total: {
              $sum: '$amount'
            }
          }
        }
      ]

      const creditsTotal = [
        {
          $match: {}
        },
        {
          $group: {
            _id: '$cust_id',
            total: {
              $sum: '$amount'
            }
          }
        }
      ]

      const amountToday = await models.Invoice.aggregate(creditsSumToday)
      const amountLast3 = await models.Invoice.aggregate(creditsSumLast3)
      const amountTotalFull = await models.Invoice.aggregate(creditsTotal)
      const averageWorksToday = await models.Work.aggregate(piplineToday)
      const averageWorksLast3 = await models.Work.aggregate(piplineLast3)

      const todayUsers = await models.User.find({ createdAt: { '$gte': todayStart } }).countDocuments()
      const las3Users = await models.User.find({ createdAt: { '$gte': _3 } }).countDocuments()
      const totalUsers = await models.User.find().estimatedDocumentCount()

      const countToday = await models.Work.find({ compiledAt: { '$gte': todayStart, '$ne': null, '$exists': true } })
        .countDocuments()

      const countLast3 = await models.Work.find({ compiledAt: { '$gte': _3, '$ne': null, '$exists': true } })
        .countDocuments()

      const total = await models.Work.find()
        .estimatedDocumentCount()

      const worksToday = await models.Work.find({ createdAt: { '$gte': todayStart } })
        .countDocuments()
      const worksLast3 = await models.Work.find({ createdAt: { '$gte': _3 } })

        .countDocuments()

      const time2 = Date.now()

      res.json({
        error: null,
        responseTime: time2 - time1,
        works: total,
        users: totalUsers,
        amount: (amountTotalFull[0] && amountTotalFull[0].total) || 0,
        today: {
          average: (averageWorksToday[0] && averageWorksToday[0].total) || 0,
          count: countToday,
          works: worksToday,
          amount: (amountToday[0] && amountToday[0].total) || 0,
          users: todayUsers
        },
        last3: {
          average: (averageWorksLast3[0] && averageWorksLast3[0].total) || 0,
          count: countLast3,
          works: worksLast3,
          users: las3Users,
          amount: (amountLast3[0] && amountLast3[0].total) || 0
        }
      })
    } catch (error) {
      console.log(error)
      res.json({ error: 'error' })
    }
  }
}
