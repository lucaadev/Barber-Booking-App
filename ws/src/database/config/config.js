const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URL
    || MONGO_URL,
) => mongoose.connect(mongoDatabaseURI);

module.exports = connectToDatabase;
