import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/Selectors.js";



// const appointments = {
//   1: {
//     id: 1,
//     time: "12pm",
//   },
//   2: {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   3: {
//     id: 3,
//     time: "2pm",
//   },
//   4: {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
//   5: {
//     id: 5,
//     time: "4pm",
//   },
// };



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  console.log(state)

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });
  const setAppointments = appointments => setState({ ...state, appointments });
  const setMany = many => setState({ ...state, ...many });


  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const apptURL = `http://localhost:8001/api/appointments`;
      Promise.all([
        axios.get(daysURL),
        axios.get(apptURL)
      ]).then((all) => {
        // setDays([...response.data])
        // setState(prev => ({ ...prev, days }));
        // console.log(all)

        setMany({days: all[0].data, appointments: all[1].data})

        // console.log("DAYS:", all[0].data);
        // console.log("APPOINTMENTS:", all[1].data);
      })
    }, []);
  


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map(appointment =>{
    return (
      <Appointment 
        key={appointment.id} 
         {...appointment} 
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