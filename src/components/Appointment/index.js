import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"; 
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING); 
  
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

    function confirm() {
      transition(CONFIRM);
    }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };  
    transition(DELETING); 

    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
  }
  
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
      <Form 
        interviewers={props.interviewers} 
        onSave={save}          
        onCancel={() => back()}
      />} 

      {mode === SAVING && <Status message={"SAVING..."}/>}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
        />)}
        {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"}onCancel={() => back()} onConfirm={cancel} />}
        {mode === DELETING && <Status message={"DELETING..."}/> }

      
    </article>
    
  );
}

