const app = require('../api/app');
const connectToDatabase = require('../database/config/config');
require('dotenv').config();

const PORT = process.env.PORT;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });