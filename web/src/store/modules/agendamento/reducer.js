const initialState = {
  agendamentos: [],
  agendamento: {},
};

export const agendamento = (state = initialState.agendamento, action) => {
  switch (action.type) {
    case 'AGENDAMENTO_FETCH_ONE_SUCCESS':
    case 'AGENDAMENTO_CREATE_SUCCESS':
    case 'AGENDAMENTO_UPDATE_SUCCESS':
      return action.payload.data;
    case 'AGENDAMENTO_DELETE_SUCCESS':
      return {};
    default:
      return state;
  }
};
