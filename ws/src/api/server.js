const app = require('../api/app');
const connectToDatabase = require('../database/config/config');
require('dotenv').config();

const PORT = process.env.API_PORT;
connectToDatabase()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => console.log(`Running server on port: ${PORT}`));
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });