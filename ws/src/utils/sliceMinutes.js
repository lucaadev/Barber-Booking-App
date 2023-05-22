const moment = require('moment');

module.exports = {
  DURACAO_SLOT: 20,
  sliceMinutes: (start, end, duracao) => {
    let slots = [];
    let count = 0;

    start = moment(start);
    end = moment(end);

    while (end > start) {
      slots.push(start.format('HH:mm'));

      start = start.add(duracao, 'minutes');
      count++;
    }

    return slots;
  }
}