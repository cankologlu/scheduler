import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const CREATE = "CREATE";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const { time, interview, interviewers } = props;



  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer}/>}
      {mode === CREATE && <Form  onCancel={() => back()} interviewers={interviewers}/>}
    </article>
  );
}

