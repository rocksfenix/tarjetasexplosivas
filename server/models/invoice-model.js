import mongoose from 'mongoose'
import shortid from 'shortid'

const InvoiceSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  author: { type: String, ref: 'User' },
  paypalPayment: String,
  amount: Number,
  currency: String,
  credits: Number,
  coupon: String
}, { timestamps: true })

export default mongoose.model('Invoice', InvoiceSchema)
