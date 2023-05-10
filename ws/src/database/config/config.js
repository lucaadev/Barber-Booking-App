const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_DB_URL
    || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

module.exports = connectToDatabase;
