export function filterAgendamento(start, end) {
  return {
    type: '@agendamento/filterAgendamento',
    start,
    end
  }
}