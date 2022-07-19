const countSpots = (state) => {
  const currentDay = state.days.find(day => day.name === state.day)
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
 
    console.log("UPDATEDSTATE:", updatedState);
    return updatedState

   
}

export default updateSpots;


