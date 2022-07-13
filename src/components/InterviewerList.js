import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewList.scss"

export default function InterviewList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return(
      <InterviewerListItem
        key= {interviewer.id} 
        name={interviewer.name} //interviewer object to InterviewerListItem
        avatar={interviewer.avatar} //interviewer object to InterviewerListItem
        selected={interviewer.id === props.value} //from props give to InterviewerList to InterviewerListItem to use
        setInterviewer={()=> {props.onChange(interviewer.id)}} //from props give to InterviewerList to InterviewerListItem to use
        
      />
    )
  })
  

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}
