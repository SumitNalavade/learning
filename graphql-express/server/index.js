const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to Mongo DB
connectDB()

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == 'development'
}))

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}`);
});
