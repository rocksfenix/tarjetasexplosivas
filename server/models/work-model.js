import mongoose from 'mongoose'
import shortid from 'shortid'

const WorkSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  author: { type: String, ref: 'User' },

  // Locacion en S3 de .zip con los diseños
  location: String,

  isCompiled: Boolean,

  // Informacion de pagos
  paid: { type: Boolean, default: false },
  paymentId: String,
  paymentType: { type: String, default: 'paypal' },

  envelopeInsideText: String,

  envelope: String,

  compilationTime: Number,

  compiledAt: Date,

  // Para Locacion de imagenes
  side0: {
    src: String
  },
  side1: {
    src: String
  },
  side2: {
    src: String
  },
  side3: {
    src: String
  },
  side4: {
    src: String
  },
  side5: {
    src: String
  }

}, { timestamps: true })

WorkSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    paid: this.paid, // posible deprecar
    isCompiled: this.isCompiled,
    location: this.location,
    paymentId: this.paymentId,
    paymentType: this.paymentType,
    envelope: this.envelope,
    cover: this.cover,
    side0: this.side0,
    side1: this.side1,
    side2: this.side2,
    side3: this.side3,
    side4: this.side4,
    side5: this.side5,
    compilationTime: this.compilationTime,
    envelopeInsideText: this.envelopeInsideText,
    compiledAt: this.compiledAt
  }
}

export default mongoose.model('Work', WorkSchema)
