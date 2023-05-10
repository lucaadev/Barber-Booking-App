const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const salaoRoute = require('../routes/salao.route');
const servicoRoute = require('../routes/servico.route');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/salao', salaoRoute);
app.use('/servico', servicoRoute);
app.use(errorMiddleware);

module.exports = app;
