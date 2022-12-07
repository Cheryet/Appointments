import { useEffect, useState } from "react";
import Axios from "axios";

const useApplicationData = () => {
  //Initial state declaration
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Ajax GET requests to populate state
  useEffect(() => {
    //Get request Promises
    const daysPromise = Axios.get("/api/days");
    const appointmentPromise = Axios.get("/api/appointments");
    const interviewersPromise = Axios.get("/api/interviewers");

    Promise.all([daysPromise, appointmentPromise, interviewersPromise]).then(
      (all) => {
        //asign states with api data
        console.log("Days:", all[0].data);
        console.log("Appointments:", all[1].data);
        console.log("Interviewers:", all[2].data);
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviews: all[2].data,
        }));
      }
    );
  }, []);

  //Sets Day State
  const setDay = (day) => setState({ ...state, day });

  //Ajax PUT request ~ Updates the API and state object with the new appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const [today, spots] = getSpots(state, appointments);
    const day = { ...state.days[today], spots: spots };
    const days = [...state.days];
    days.splice(today, 1, day);

    return Axios.put(`/api/appointments/${id}`, appointment).then(
      setState({
        ...state,
        appointments,
        days,
      })
    );
  }

  //Ajax DELETE request ~ Deletes an appointment from the API
  const cancelInterview = (id) => {
    console.log("Deleting Appointment", id);

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const [today, spots] = getSpots(state, appointments);
    const day = { ...state.days[today], spots: spots };
    const days = [...state.days];
    days.splice(today, 1, day);

    return Axios.delete(`/api/appointments/${id}`).then(
      setState({
        ...state,
        appointments,
        days,
      })
    );
  };

  //Gets total spots for day
  const getSpots = (state, newAppointements) => {
    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    const currentDay = state.days[dayIndex];
    const listOfAppointmentIds = currentDay.appointments;

    const listOfFreeAppointments = listOfAppointmentIds.filter(
      (id) => !newAppointements[id].interview
    );

    const spots = listOfFreeAppointments.length;
    return [dayIndex, spots];
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
