import React, { useEffect, useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



  const setDay = (day) => setState({ ...state, day });

  

  useEffect(() => {
    const daysURL = `api/days`;
    const appointmentsURL = `api/appointments`;
    const interviewerURL = `api/interviewers`;

    Promise.all([
      axios.get(daysURL), 
      axios.get(appointmentsURL),
      axios.get(interviewerURL)]
      ).then(
      (all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
  
      }
    );
  }, []);


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const parsedAppointment = dailyAppointments.map((appointment) => {
   const interview = getInterview(state, appointment.interview);

   return <Appointment key={appointment.id} {...appointment} interview={interview}/>
});

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{parsedAppointment}</section>
    </main>
  );
}


