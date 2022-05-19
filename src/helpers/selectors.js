export function getAppointmentsForDay(state, day) {
  const result = [];
  const data = state.days.filter(d => d.name === day)

  if(!data[0]) return result;

  for (const appointment of data[0].appointments) {
    result.push(state.appointments[appointment])
  }
  
  return result;
}