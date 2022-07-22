
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
};

export function getInterview(state, interview) {
  const obj = {};
  if (interview) {
    obj["student"] = interview.student;
    obj["interviewer"] = state.interviewers[interview.interviewer];
  } else {
    return null;
  }
  return obj;
};

export function getInterviewersForDay(state, day) {
  const filteredInterviewers = [];
  for (const obj of state.days) {
    if (obj.name === day) {
      for (const int of obj.interviewers) {
        if (state.interviewers[int]) {
          filteredInterviewers.push(state.interviewers[int]);
        }
      }
    }
  }
  return filteredInterviewers;
};