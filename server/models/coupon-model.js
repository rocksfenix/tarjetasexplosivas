import mongoose from 'mongoose'
import shortid from 'shortid'

const CouponSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  code: String,
  count: { type: Number, default: 1 },
  expiration: { type: Date }
}, { timestamps: true })

CouponSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    code: this.code,
    count: this.count,
    expiration: this.expiration
  }
}

export default mongoose.model('Coupon', CouponSchema)
