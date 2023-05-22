const moment = require('moment');

module.exports = {
  mergeDateTime: (date, time) => {
    return `${moment(date).format('YYYY-MM-DD')}T${moment(time).format(
      'HH:mm')}`;
  },
};
