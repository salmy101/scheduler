import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay  } from "../helpers/Selectors.js";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Book an Interview
  function bookInterview(id, interview) {
    console.log("BOOKED:", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    }) 
    return axios.put(`/api/appointments/${id}`, {interview})
  }

  //Delete the interview
  function cancelInterview(id, interview) { 
    console.log("DELETED:", id, interview)

    const appointment = { 
      ...state.appointments[id],
      interview: null
    }; 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    } 
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
        })

      })


  }

 

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState({ ...state, days });
  // const setAppointments = appointments => setState({ ...state, appointments });
  const setMany = many => setState({ ...state, ...many });

  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const apptURL = `http://localhost:8001/api/appointments`;
    const intrURL = `http://localhost:8001/api/interviewers`;
      Promise.all([
        axios.get(daysURL),
        axios.get(apptURL),
        axios.get(intrURL)
      ]).then((all) => {
        setMany({days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      })
    }, []);

  const dailyInterviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
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
            value={state.day} 
            onChange={setDay}
            // setDay={.....}
            />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}