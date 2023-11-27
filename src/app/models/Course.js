const mongoose = require('mongoose')
var slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Course = new Schema(
  {
    name: { type: String, maxlength: 255, required: true },
    description: { type: String, maxlength: 255 },
    image: { type: String, maxlength: 255 },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String },
    level: { type: String, maxlength: 255 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Course', Course)
