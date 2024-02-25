const express = require('express');
require('dotenv').config;
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, console.log(`Server running on port ${port}...`));
