const moment = require('moment');
const errorThrow = require('../utils/errorThrow');
const { sliceMinutes, DURACAO_SLOT } = require('../utils/sliceMinutes');
const { mergeDateTime } = require('../utils/mergeDateTime');
const { splitByValue } = require('../utils/splitByValue');
const _ = require('lodash');

const Agendamento = require('../database/models/agendamento');
const Horario = require('../database/models/horario');
const Cliente = require('../database/models/cliente');
const Colaborador = require('../database/models/colaborador');
const Salao = require('../database/models/salao');
const Servico = require('../database/models/servico');

const newAgendamento = async (body) => {
  try {
    const { clienteId, colaboradorId, servicoId, salaoId } = body;

    const agendamento = await Agendamento.findOne({
      colaboradorId,
      data: body.data,
    });
    if (agendamento) {
      throw errorThrow(409, 'Lamentamos, este horário já foi reservado.');
    }

    const cliente = await Cliente.findById(clienteId).select('-_id');
    const colaborador = await Colaborador.findById(colaboradorId);
    const servico = await Servico.findById(servicoId).select('nome valor foto');
    const salao = await Salao.findById(salaoId);

    const newAgendamento = await new Agendamento({
      ...body,
      valor: servico.valor,
    }).save();

    return { ...newAgendamento._doc, cliente, colaborador, servico, salao };

  } catch (error) {
    throw error;
  }
};

const filterAgendamentos = async (body) => {
  const { periodo, salaoId } = body;

  const agendamentos = await Agendamento.find({
    salaoId,
    data: {
      $gte: moment(periodo.inicio).startOf('day').toDate(),
      $lte: moment(periodo.fim).endOf('day').toDate(),
    },
  }).populate([
    { path: 'clienteId', select: '-_id' },
    { path: 'colaboradorId', select: 'nome' },
    { path: 'servicoId', select: 'nome valor duracao' },
  ]).select('-valor');

  return { agendamentos: agendamentos };
};

const getDisponibilidade = async (body) => {
  const { data, salaoId, servicoId } = body;
  const servico = await Servico.findById(servicoId).select('duracao');
  const horarios = await Horario.find({ salaoId });

  let agenda = [];
  let colaboradores = [];
  let lastDay = moment(data);

  const duracaoEmMinutos = parseInt(moment(servico.duracao).minutes());

  const minutosSlots = sliceMinutes(
    moment(servico.duracao),
    moment(servico.duracao).add(duracaoEmMinutos, 'minutes'),
    DURACAO_SLOT
  ).length;

  for (let i = 0; i <= 16 && agenda.length <= 14; i += 1) {
    const espacosValidos = horarios.filter(horario => {
      const diasDisponiveis = horario.dias.includes(moment(lastDay).day());

      const servicoDisponivel = horario.especialidades.includes(servicoId);

      return diasDisponiveis && servicoDisponivel;
    });

    if (espacosValidos.length > 0) {
      let todosHorariosDoDia = {};

      for (let espaco of espacosValidos) {
        for (let colaboradorId of espaco.colaboradores) {
          if (!todosHorariosDoDia[colaboradorId]) {
            todosHorariosDoDia[colaboradorId] = [];
          }

          todosHorariosDoDia[colaboradorId] = [
            ...todosHorariosDoDia[colaboradorId],
            ...sliceMinutes(
              mergeDateTime(lastDay, espaco.inicio),
              mergeDateTime(lastDay, espaco.fim),
              DURACAO_SLOT
            ),
          ];
        };
      };

      for (let colaboradorId of Object.keys(todosHorariosDoDia)) {
        const agendamentos = await Agendamento.find({
          colaboradorId,
          data: {
            $gte: moment(lastDay).startOf('day'),
            $lte: moment(lastDay).endOf('day'),
          },
        })
          .select('data servicoId -_id')
          .populate('servicoId', 'duracao');

        let horariosOcupados = agendamentos.map((agendamento) => ({
          inicio: moment(agendamento.data),
          fim: moment(agendamento.data).add(
            parseInt(moment(agendamento.servicoId.duracao).minutes()),
            'minutes'
          ),
        }));

        horariosOcupados = horariosOcupados.flatMap((horario) => {
          return sliceMinutes(
            horario.inicio,
            horario.fim,
            DURACAO_SLOT
          )
        });

        let horariosLivres = splitByValue(
          todosHorariosDoDia[colaboradorId].map((horario) => {
            return horariosOcupados.includes(horario) ? '-' : horario;
          }),
          '-'
        ).filter((horario) => {
          return horario.length > 0;
        });

        horariosLivres = horariosLivres.filter((horario) => {
          return horario.length >= minutosSlots;
        });

        horariosLivres = horariosLivres.flatMap((horario) => {
          return horario.filter((_slot, index) => {
            return horario.length - index >= minutosSlots;
          });
        });

        horariosLivres = _.chunk(horariosLivres, 2);

        if (horariosLivres.length === 0) {
          todosHorariosDoDia = _.omit(todosHorariosDoDia, colaboradorId);
        } else {
          todosHorariosDoDia[colaboradorId] = horariosLivres;
        }
      }

      const totalEspecialistas = Object.keys(todosHorariosDoDia);

      if (totalEspecialistas.length > 0) {
        colaboradores.push(Object.keys(todosHorariosDoDia));
        colaboradores = _.uniq(colaboradores.flat());
        agenda.push({
          [lastDay.format('YYYY-MM-DD')]: todosHorariosDoDia,
        });
      }
    }

    lastDay = lastDay.add(1, 'day');
  }

  colaboradores = await Colaborador.find({
    _id: { $in: colaboradores },
  }).select('nome foto');

  colaboradores = colaboradores.map((colaborador) => {
    return {
      ...colaborador._doc,
      nome: colaborador.nome.split(' ')[0],
    };
  });

  return { colaboradores, agenda };
};

module.exports = {
  newAgendamento,
  filterAgendamentos,
  getDisponibilidade,
};
