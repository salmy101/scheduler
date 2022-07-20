import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from 'react';



export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  const reset = function(){
    setStudent("")
    setInterviewer(null)
  } 
  const cancel = function(){
    reset()
    props.onCancel()
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }   if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
  
    props.onSave(student, interviewer);
  } 

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()}autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="student-name"
            type="text"
            value={student}
            onChange={(event) => {setStudent(event.target.value)}}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
        /* your code goes here */
        interviewers={props.interviewers}
        value={interviewer}
        onChange={setInterviewer}
       />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => validate(student, interviewer)} confirm>
            Save 
          </Button>
        </section>
      </section>
    </main>
  );
}