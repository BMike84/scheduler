export function getAppointmentsForDay(state, day) {
  const result = [];
  const data = state.days.filter(d => d.name === day)

  if(!data[0]) return result;

  for (const appointment of data[0].appointments) {
    result.push(state.appointments[appointment])
  }
  
  return result;
}

export function getInterview(state, interview) {

  if (!interview) return null;

  const interviewerObj = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerObj
  }
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const data = state.days.filter(d => d.name === day)

  if(!data[0]) return result;

  for (const interviewer of data[0].interviewers) {
    result.push(state.interviewers[interviewer])
  }
  
  return result;
}
