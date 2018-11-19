import mongoose from 'mongoose'
import shortid from 'shortid'

const CategorySchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  author: { type: String, ref: 'User' },
  title: String,
  key: String,
  filename: String,

  // Image to represent the category
  location: String,

  // Pocicion para ordenar
  position: Number,

  // Solo mostrar las activas util para
  // para mostrar diseños tematicos de epoca
  active: Boolean
}, { timestamps: true })

CategorySchema.methods.toJSON = function () {
  return {
    _id: this._id,
    key: this.key,
    filename: this.filename,
    title: this.title,
    author: this.author,
    location: this.location,
    position: this.position,
    active: this.active,
    createdAt: this.createdAt
  }
}

export default mongoose.model('Category', CategorySchema)
