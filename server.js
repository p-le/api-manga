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
	setTimeout(() => {
		Manga.find({}, (err, data) => {
			if (err) res.send(err);
			res.json(data);
		});
	}, 2000);	
});

router.route('/manga/:name').get((req, res) => {
	console.log(req.params)
	Chapter.find({manga: req.params.name}, { imgs: 0 }, (err, data) => {
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

router.route('/manga/:name/:chapterName').get((req, res) => {
	Chapter.findOne({manga: req.params.name, chapterName: req.params.chapterName}, (err, data) => {
		if (err) res.send(err);
		console.log(data);
		res.json(data);
	});
});

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
