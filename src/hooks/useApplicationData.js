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

  //Sets Day State
  const setDay = (day) => setState({ ...state, day });

  //Ajax GET requests
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

    return Axios.put(`/api/appointments/${id}`, appointment).then(
      setState({
        ...state,
        appointments,
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

    return Axios.delete(`/api/appointments/${id}`)
      .then(
        setState({
          ...state,
          appointments,
        })
      )
      .catch(setState({ ...state }));
  };
};
