import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application() {
 
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
      
  const dailyAppointments = getAppointmentsForDay(state, state.day);        

  const parsedAppointment = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        bookInterview={bookInterview}
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        cancelInterview={cancelInterview}
      />
    );
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
      <section className="schedule">{parsedAppointment}
      </section>
    </main>
  );
}
