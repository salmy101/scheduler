import React, { useEffect, useState} from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

    const setDay = function (newDay) {
      setState({...state, day: newDay})
    };

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


  
  return { state, setDay, bookInterview, cancelInterview };

};