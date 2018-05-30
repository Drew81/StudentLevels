const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Level = require('./models/levels');
const Student = require('./models/student');
var logger = require('morgan');

mongoose.connect('mongodb://localhost/abc-data');
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
	console.log('connected to abc-data DB');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

app.use('/graphql', expressGraphQL({
	schema: schema,
	graphiql: true,
	pretty:  true
}));

app.listen(4000, () => {
	console.log('Server running 4000 /graphql')
});