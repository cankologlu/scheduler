import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  //Unique hook to run the application returns necessary functions in an object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {              
 //Hook to connect to api and stop loop connection otherwise
    const daysURL = '/api/days';
    const appointmentsURL = '/api/appointments';
    const interviewerURL = '/api/interviewers';

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewerURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
  //Saves appointment with available id key
    const addAppointmentURL = `api/appointments/${id}`;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(addAppointmentURL, { interview })
      .then((res) => {
        const currentSpotsRemaining = calculateSpotsRemaining(state.day)
        const days = state.days.map(day => {
          if (day.name === state.day) {
            return {
              ...day, 
              spots: currentSpotsRemaining - 1
            }
          }else {
            return day;
          }
        })
        setState({ ...state, appointments, days })
      });
  }

  function cancelInterview(id) {
    //Delets appointment with available id key
    const addAppointmentURL = `api/appointments/${id}`;

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(addAppointmentURL)
      .then(() => {
        const currentSpotsRemaining = calculateSpotsRemaining(state.day)
        const days = state.days.map(day => {
          if (day.name === state.day) {
            return {
              ...day, 
              spots: currentSpotsRemaining + 1
            }
          }else {
            return day;
          }
        })
        setState({ ...state, appointments, days })
      });
  }

  function calculateSpotsRemaining(currentDay)  {                             
    // Updates available spots through an array of null interviews
    const [dayObj] = state.days.filter(day => day.name === currentDay)
    const appointmentIds = dayObj.appointments
    const appointments = appointmentIds.map((id) => state.appointments[id])
    const emptySpots = appointments.filter((appt) => appt.interview === null)
    return emptySpots.length
  }

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
