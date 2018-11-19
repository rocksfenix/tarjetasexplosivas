import mongoose from 'mongoose'
import shortid from 'shortid'

const TextureSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  author: { type: String, ref: 'User' },
  key: String,
  filename: String,
  position: { type: Number, default: 0 },
  location: String
}, { timestamps: true })

TextureSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    key: this.key,
    filename: this.filename,
    author: this.author,
    location: this.location,
    position: this.position,
    createdAt: this.createdAt
  }
}

export default mongoose.model('Texture', TextureSchema)
