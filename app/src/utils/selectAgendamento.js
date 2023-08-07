export default {
  selectAgendamento: (agenda, data = null, colaboradorId = null) => {
  let horariosDisponiveis = [];
  let colaboradoresDia = {};

  if (agenda.length > 0) {
    if (data) {
    const dia = agenda.filter(dia => Object.keys(dia)[0] === data)?.[0];
    const diaObj = dia?.[data];
    if (diaObj) {
      colaboradorId = Object.keys(diaObj)?.[0] || colaboradorId;
      colaboradoresDia = Object.keys(diaObj).includes(colaboradorId) ? diaObj : colaboradoresDia;
      horariosDisponiveis = colaboradoresDia?.[colaboradorId];
    }
  }
}
return { horariosDisponiveis, colaboradoresDia, data, colaboradorId };
},
  diasDaSemana: [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab',
  ],
}