/* eslint-disable eqeqeq */
function parseDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dexembro",
  ];
  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const formattedMonth = months[date.getMonth()];
  const formattedDay = days[date.getDay()];
  return {
    day,
    formattedDay,
    month,
    formattedMonth,
    year,
    hour,
    minutes,
    birthday: `${day}/${month}`,
    format: `${day}/${month}/${year}`,
    iso: `${year}/${month}/${day}`,
    dayAndMonth: `${day} de ${formattedMonth}`,
    gcalendar1: `${year}${month}${day}T110000Z`,
    gcalendar2: `${year}${month}${day}T210000Z`,
  };
}

module.exports = {
  getNextDays(quantity) {
    const today = new Date();
    const days = [];
    while (days.length < quantity) {
      today.setDate(today.getDate() + 1);
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      if (today.getDay() != 0 && today.getDay() != 6) {
        days.push({
          datetime: String(today)
            .replace(" GMT-0300 (Brasilia Standard Time)", "")
            .replace(" GMT-0300 (GMT-03:00)", ""),
          month: parseDate(today).formattedMonth,
          day: parseDate(today).day,
          formattedDay: parseDate(today).formattedDay,
        });
      }
    }
    return days;
  },
  parseDate,
};
