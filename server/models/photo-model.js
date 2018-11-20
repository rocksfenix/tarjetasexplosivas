import mongoose from 'mongoose'
import shortid from 'shortid'

const PhotoSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  author: { type: String, ref: 'User' },
  work: { type: String, ref: 'Work' },
  key: String,
  location: String,
  thumbnail: String,
  thumbnailKey: String
}, { timestamps: true })

PhotoSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    key: this.key,
    filename: this.filename,
    author: this.author,
    location: this.location,
    thumbnail: this.thumbnail
  }
}

export default mongoose.model('Photo', PhotoSchema)
