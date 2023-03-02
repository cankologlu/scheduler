export function getAppointmentsForDay(state, day) {           
  //Returns an array of appointments for the given day
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
  //Updates interviews with interviewer object 
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer,
  };
}

export function getInterviewersForDay(state, day) {   
  //Returns available interviewers by id according to days
  const arrInterviewers = [];
  const daysInterviewers = state.days.filter((obj) => obj.name === day);
  if (daysInterviewers.length === 0) {
    return [];
  }
  for (let number of daysInterviewers[0].interviewers) {
    arrInterviewers.push(state.interviewers[number]);
  }
  return arrInterviewers;
}
