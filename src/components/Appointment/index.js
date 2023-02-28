import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const CREATE = "CREATE";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const { time, interview, interviewers, bookInterview, id, cancelInterview } = props;

  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    bookInterview(id, interview)
    .then(()=> transition(SHOW))
    .catch((err) => {
      transition(ERROR_SAVE, true)
    })
  }

  function cancel() {
    transition(DELETE, true)
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch((err) => transition(ERROR_DELETE, true));
  }


  // console.log("props in appointment:", props )
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
      {mode === CREATE && <Form onSave = {save} onCancel={() => back()} interviewers={interviewers}/>}
      {mode === SAVING && <Status saving={SAVING}/>}
      {mode === DELETE && <Status deleting={DELETE}/>}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={cancel} message={"Did you want to delete?"}/>}
      {mode === EDIT && <Form onSave={save} onCancel={() => back()} student={interview.student} interviewers={interviewers} interviewer={interview.interviewer.id}/>}
      {mode === ERROR_DELETE && <Error onClose={back}/>}
      {mode === ERROR_SAVE && <Error onClose={back}/>}
    </article>
  );
}

