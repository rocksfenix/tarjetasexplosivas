import mongoose from 'mongoose'
import shortid from 'shortid'

const CouponSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  code: String,
  uses: { type: Number, default: 0 },
  credits: { type: Number, default: 1 },
  totalUses: { type: Number, default: 1 },
  expired: { type: Boolean, default: false },
  expiration: { type: Date }
}, { timestamps: true })

CouponSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    code: this.code,
    uses: this.uses,
    credits: this.credits,
    expired: this.expired,
    expiration: this.expiration,
    totalUses: this.totalUses
  }
}

export default mongoose.model('Coupon', CouponSchema)
