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

export function getInterview(state, interview) { 
  const obj = {};
  if(interview) { //if given an interview
    obj["student"] = interview.student // the new obj will have name of student
    obj["interviewer"] = state.interviewers[interview.interviewer] // and the interviwer will have object
  } else {
    return null
  }
   return obj;
} 