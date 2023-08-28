const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const salaoRoute = require('../routes/salao');
const loginRoute = require('../routes/login');
const servicoRoute = require('../routes/servico');
const horarioRoute = require('../routes/horario');
const clienteRoute = require('../routes/cliente');
const colaboradorRoute = require('../routes/colaborador');
const agendamentoRoute = require('../routes/agendamento');
const adicionalRoute = require('../routes/adicional');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/salao', salaoRoute);
app.use('/login', loginRoute);
app.use('/servico', servicoRoute);
app.use('/horario', horarioRoute);
app.use('/cliente', clienteRoute);
app.use('/colaborador', colaboradorRoute);
app.use('/agendamento', agendamentoRoute);
app.use('/adicional', adicionalRoute);
app.use(errorMiddleware);

module.exports = app;
