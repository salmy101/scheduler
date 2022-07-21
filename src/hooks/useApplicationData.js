import React, { useEffect, useState} from "react";
import axios from "axios";
import updateSpots from "helpers/updateSpots";




export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setMany = many => setState({ ...state, ...many });

  useEffect(() => {
    const daysURL = `/api/days`;
    const apptURL = `/api/appointments`;
    const intrURL = `/api/interviewers`;
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


    const countSpots = (state) => {
      const currentDay = state.days.find((day) => day.name === state.day)
      const apptIds = currentDay.appointments
      //iterate the apptIds and filter for the empty interview aka null
      const spots = apptIds.filter((id) => state.appointments[id].interview === null).length
      return spots
    } 
    const updateSpots = (state) => {
      const currentDay = state.days.find(day => day.name === state.day)
      const currentDayIndex = state.days.findIndex(day => day.name === state.day)
  
      const updatedDay = {...currentDay}; //copy current day
      updatedDay.spots = countSpots(state); //modify it by adding updated num of spots
      console.log("SPOTSCOUNT:", countSpots(state))
  
      const updatedDayArr = [...state.days] //copy the days array
      updatedDayArr[currentDayIndex] = updatedDay //modify days array by adding the modified current day(find by index) t
  
      const updatedState = {...state} //copy the state
      updatedState.days = updatedDayArr // modify the state by adding the updated days array
   
      console.log("UPDATEDSTATE:", updatedState.appointments);
      
      setState({
        ...state,
        appointments: updatedState.appointments,
        days: updatedDayArr
      }) 

      return state
    }

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
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        // console.log("Initial Days State", state.days);
        setState({
          ...state,
          appointments
        }) 
        updateSpots({...state,appointments}); 
        
        console.log(countSpots(state));


      })
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
        updateSpots({...state,appointments}); 
        console.log(appointments);
      })
  } 

  
  return { state, setDay, bookInterview, cancelInterview };

};