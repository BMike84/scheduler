// getAppointmentsForDay returns an array of appointment objects for the given day.
export function getAppointmentsForDay(state, day) {
  const result = [];
  //used to grab the specific day clicked on and show infomation
  const data = state.days.filter(d => d.name === day)

  if(!data[0]) return result;

  //used to loop through the appointments of each day
  for (const appointment of data[0].appointments) {
    result.push(state.appointments[appointment])
  }
  return result;
}

// getInterview returns a full interview object for an interview, object coming from the appointments api
export function getInterview(state, interview) {

  // if not interview booked interview is set to null
  if (!interview) return null;

  //creates a object to show who the interviewer and student is for each interview
  const interviewerObj = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerObj
  }
}

// getInterviewersForDay returns an array of interviewer objects for the given day.
export function getInterviewersForDay(state, day) {
  const result = [];
  //used to grab the specific day clicked on and show infomation
  const data = state.days.filter(d => d.name === day)
  console.log(data)

  if(!data[0]) return result;

  // used to loop through to grab all interviewers for that day
  for (const interviewer of data[0].interviewers) {
    result.push(state.interviewers[interviewer])
  }
  
  return result;
}
