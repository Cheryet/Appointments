

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


export function getInterview(state, interview) {

  if (!interview){
    return null;
  }

  let obj = {};
  obj.student = interview.student
  obj.interviewer = state.interviewers[interview.interviewer]

  return obj;



}