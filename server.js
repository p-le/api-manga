var express    = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var app        = express();

var morgan = require('morgan'),
		cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 10000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/allapi');
var Manga = require('./app/models/manga');
var Chapter = require('./app/models/chapter');

var router = express.Router();

router.use(function(req, res, next) {
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/manga').get((req, res) => {
	Manga.find({}, (err, data) => {
		if (err) res.send(err);
		res.json(data);
	})
});

router.route('/manga/:id').get((req, res) => {
	Chapter.find({mangaId: req.params.id}, (err, data) => {
		if (err) res.send(err);
		data.sort((a, b) => {
			if (a.created === b.created) {
				return b.title.localeCompare(a.title);
			} else {
				return moment(b.created, 'DD-MM-YYYY') - moment(a.created, 'DD-MM-YYYY');
			}
		});
		res.json(data);
	});
});

router.route('/manga/:id').post((req, res) => {
	Manga.findByIdAndUpdate(req.params.id,)
});
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
