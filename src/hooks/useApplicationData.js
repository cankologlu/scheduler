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
    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewerURL = "/api/interviewers";

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
  const spotUpdate = (weekday, day, variable, id, appointments) => {
    let spot = day.spots;
    if (
      weekday === day.name &&
      variable === "REMOVE_SPOTS" &&
      appointments[id].interview !== null
    ) {
      return spot;
    }
    if (
      weekday === day.name &&
      variable === "REMOVE_SPOT" &&
      appointments[id].interview === null
    ) {
      return spot - 1;
    }
    if (
      weekday === day.name &&
      variable === "ADD_SPOT" &&
      appointments[id].interview !== null
    ) {
      return spot + 1;
    }
    return spot;
  };

  const updateSpots = (weekday, days, variable, id, appointments) => {
    if (variable === "REMOVE_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable, id, appointments),
        };
      });
      return updatedStateDayArray;
    }
    if (variable === "ADD_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable, id, appointments),
        };
      });
      return updatedStateDayArray;
    }
  };

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

    return axios.put(addAppointmentURL, { interview }).then((res) => {
      const spotUpdate = updateSpots(
        state.day,
        state.days,
        "REMOVE_SPOT",
        id,
        state.appointments
      );
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
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

    return axios.delete(addAppointmentURL).then(() => {
      const spotUpdate = updateSpots(
        state.day,
        state.days,
        "ADD_SPOT",
        id,
        state.appointments
      );
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
    });
  }

 

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
