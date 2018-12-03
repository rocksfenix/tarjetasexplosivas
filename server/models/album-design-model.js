import mongoose from 'mongoose'
import shortid from 'shortid'

const AlbumDesignSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  author: { type: String, ref: 'User' },
  title: String,
  key: String,
  // Image to represent the category
  location: String,
  thumbnail: String,
  // Pocicion para ordenar
  position: Number,
  // Solo mostrar las activas util para
  // para mostrar diseños tematicos de epoca
  active: { type: Boolean, default: false }
}, { timestamps: true })

AlbumDesignSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    key: this.key,
    title: this.title,
    location: this.location,
    position: this.position,
    active: this.active,
    createdAt: this.createdAt,
    thumbnail: this.thumbnail
  }
}

export default mongoose.model('AlbumDesign', AlbumDesignSchema)
