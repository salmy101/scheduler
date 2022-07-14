import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from 'react';



export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function(){
    setStudent("")
    setInterviewer(null)
  } 
  const cancel = function(){
    props.onCancel(reset())

  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form reset={reset} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="student name"
            type="text"
            value={student}
            onChange={(event) => {setStudent(event.target.value)}}
            placeholder="Enter Student Name"
          />
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
          <Button onClick={() => props.onSave(student, interviewer)} confirm>
            Save 
          </Button>
        </section>
      </section>
    </main>
  );
}