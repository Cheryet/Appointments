

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