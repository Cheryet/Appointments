
//returns an array of appointments for the day
export function getAppointmentsForDay(state, day) {

  let appointArr = []

  state.days.map((element) => {
    if (element.name === day) {
      element.appointments.forEach((appoint) => {
        appointArr.push(state.appointments[appoint])

      })
    }
  })

  return appointArr;

}

//returns an array of Interviewers for day
export function getInterviewersForDay(state, day) {

  let interviewersArr = []

  state.days.forEach((element) => {
    if (element.name === day) {
      element.appointments.forEach((interview) => {
        if (state.interviewers[interview]){
          interviewersArr.push(state.interviewers[interview])
        }
      })
    }
  })

  return interviewersArr;

}


export function getInterview(state, interview) {

  if (!interview){
    return null;
  }

  let obj = {};
  obj.student = interview.student
  obj.interviewer = state.interviewers[interview.interviewer]

  return obj;



}