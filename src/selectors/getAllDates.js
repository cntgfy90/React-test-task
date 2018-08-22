export default (events) => {
  const dates = [];

  events.forEach((event) => {
    dates.push(event.date);
  });

  return dates;
};
