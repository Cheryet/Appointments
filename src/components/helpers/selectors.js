
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

// returns an array of Interviewers for day

export function getInterviewersForDay(state, day) {

  let interviewersArr = []

  //Find matching date
  state.days.forEach((obj) => {
    if (obj.name === day) {

      //Pull interviewer ID's from array
      obj.interviewers.forEach((interviewerID) => {

        //Push interviewers Object from that day to a new array
        interviewersArr.push(state.interviews[interviewerID])
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
  obj.interviewer = state.interviews[interview.interviewer]

  return obj;



}


