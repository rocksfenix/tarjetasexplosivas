import mongoose from 'mongoose'
import shortid from 'shortid'

const DesignSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  category: String,
  author: { type: String, ref: 'User' },
  active: { type: Boolean, default: false },
  location: String,
  thumbnail: String,
  thumbnailKey: String,
  title: String,
  key: String
}, { timestamps: true })

DesignSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    category: this.category,
    title: this.title,
    thumbnail: this.thumbnail,
    active: this.active,
    location: this.location,
    key: this.key
  }
}

export default mongoose.model('Design', DesignSchema)
