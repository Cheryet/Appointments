import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import Axios from "axios";
import { getAppointmentsForDay } from "./helpers/selectors";

import "components/Application.scss";







export default function Application(props) {
  

  //State declaration
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  
  
  const setDay = day => setState({ ...state, day });
  
  
  //Ajax GET requests
  useEffect(() => {
    //Get request Promises
    const daysPromise = Axios.get('/api/days')
    const appointmentPromise = Axios.get('/api/appointments')
    const interviewersPromise = Axios.get('/api/interviewers')
    
    Promise.all([
      daysPromise, 
      appointmentPromise, 
      interviewersPromise
    ])
    .then((all) => {
      console.log(all[0]);
      console.log(all[1]);
      console.log(all[2]);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviews: all[2].data}));
    }) 
  }, []);
  


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointList = dailyAppointments.map(appointment => {
    return (
      < Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}/>
    );
  }) 
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          value={state.day}
          onChange={setDay} 
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointList}
      </section>
    </main>
  );
}
