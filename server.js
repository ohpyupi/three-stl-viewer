const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const VAR = require('./config/variables');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((err, req, res, next)=>{
	console.error(err);
	res.status(err.status || 500);
	res.json({
		message: `${err.message}`
	});
})

app.listen(VAR.PORT);
console.log(`Server running on ${VAR.PORT}`);
