import React, {useState} from "react";
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

export default function From (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const{value, interviewers, onSave, onCancel, studentSolo} = props;

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
      value={value} interviewers={interviewers}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger {/* your code goes here */}>Cancel</Button>
      <Button confirm {/* your code goes here */}>Save</Button>
    </section>
  </section>
</main>
  )
}