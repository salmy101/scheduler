import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Save/Create new appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  //transition to confirm message when deleting
  function confirm() {
    transition(CONFIRM);
  }

  //Cancel/Delete an appointment
  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING, true);

    props
    .cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));

  }

  //transition to edit an existing appointment
  // function edit() {
  //   transition(EDIT);
  // }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === SAVING && <Status message={"SAVING..."} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={() => back()}
          onConfirm={cancel}
        />
      )}
      {mode === DELETING && <Status message={"DELETING..."} />}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save} //save the changes
          onCancel={() => back()}
        />
      )}
        {mode === ERROR_SAVE && <Error 
        message={"Error, could not create appointment"}
        onClose={() => back()}
        />}

         {mode === ERROR_DELETE && <Error 
        message={"Error, could not delete appointment"}
        onClose={()=> back()}
        />}

    </article>
  );
}
