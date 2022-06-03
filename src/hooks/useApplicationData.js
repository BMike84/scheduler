import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // used to call the api's using promises
  useEffect(() => {
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";

    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL),
    ])
      // if succuessful it will pull all the data from api's
      .then((all) => {
        setState((prevState) => ({
          ...prevState,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // when a interview is booked it updates the spots remaining on sidebar without having to refresh page
    const days = state.days.map((day) => {
      if (
        day.appointments.includes(id) &&
        state.appointments[id].interview === null
      ) {
        day.spots -= 1;
      }
      return day;
    });

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments, days }));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // when a interview is booked it updates the spots remaining on sidebar without having to refresh page
    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        day.spots += 1;
      }
      return day;
    });

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  return { state, setDay, bookInterview, cancelInterview };
}
