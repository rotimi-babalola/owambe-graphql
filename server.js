import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import owambeSchema from './server/schema/index';

/* eslint no-console: 0*/
/* eslint no-unused-vars: 0*/

const app = express();

app.use('/graphql', graphqlHTTP(req => ({
  schema: owambeSchema,
  graphiql: true
})));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  // if NODE_ENV is not test use the dev db
  mongoose.connect('mongodb://127.0.0.1/owambe');
} else {
  mongoose.connect('mongodb://127.0.0.1/owambe-test');
}

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));

db.once('open', () => {
  console.log('owambe db opened');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
