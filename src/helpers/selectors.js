export function getAppointmentsForDay(state, day) {
  const arrAppointments = [];
  const daysAppointments = state.days.filter((obj) => obj.name === day);
  if (daysAppointments.length === 0) {
    return [];
  }
  for (let number of daysAppointments[0].appointments) {
    arrAppointments.push(state.appointments[number]);
  }
  return arrAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer,
  };
}
