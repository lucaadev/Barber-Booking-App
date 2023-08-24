const Horario = require('../database/models/horario');
const Colaborador = require('../database/models/colaborador');
const Servico = require('../database/models/servico');

const createHorario = async (body) => {
  const horario = await new Horario(body).save();
  return horario;
};

const getHorarioOfSalaoById = async (id) => {
  const horarios = await Horario.find({ salaoId: id });
  const colaboradores = await Colaborador.find({ id: horarios.colaboradores }).select('_id nome');
  const servicos = await Servico.find({ salaoId: id }).select('_id nome');

  const servicosMap = servicos.reduce((map, servico) => {
    map[servico._id.toString()] = servico.nome;
    return map;
  }, {});

  const colaboradoresMap = colaboradores.reduce((map, colaborador) => {
    map[colaborador._id.toString()] = colaborador.nome;
    return map;
  }, {});

  const updatedHorarios = horarios.map(horario => {
    const updatedEspecialidades = horario.especialidades.map(especialidadeId =>
      servicosMap[especialidadeId.toString()] || especialidadeId
    );
    const updatedColaboradores = horario.colaboradores.map(colaboradorId =>
      colaboradoresMap[colaboradorId.toString()] || colaboradorId
    );

    return { ...horario._doc, especialidadesNames: updatedEspecialidades, colaboradoresNames: updatedColaboradores };
  });

  return {horarios: updatedHorarios};
};

const updateHorario = async (id, body) => {
  await Horario.findByIdAndUpdate(id, body);
  return { message: 'Horario atualizado com sucesso!' };
};

const deleteHorario = async (id) => {
  await Horario.findByIdAndDelete(id);
  return { message: 'Horario deletado com sucesso!' };
};

module.exports = {
  createHorario,
  getHorarioOfSalaoById,
  updateHorario,
  deleteHorario,
};