export function getAppointmentsForDay(state, day) {
  const filteredDays = [];
  for (const obj of state.days) { 
    if (obj.name === day) {
      for (const appt of obj.appointments) {
        if (state.appointments[appt]) {
          filteredDays.push(state.appointments[appt]);
        }
      }
    }
  }
  return filteredDays;
}
