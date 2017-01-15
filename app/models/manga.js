var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mangaSchema   = new Schema({
	title: String,
  viewCount: Number
}, {
  collection: 'manga'
});

module.exports = mongoose.model('Manga', mangaSchema);