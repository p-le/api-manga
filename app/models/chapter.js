var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chapterSchema = new Schema({
  title: String,
  mangaId: Schema.Types.ObjectId,
  created: String,
  imgs: [String]
}, {
  collection: 'chapter'
});

chapterSchema.index({mangaId: 1});

module.exports = mongoose.model('Chapter', chapterSchema);