import React from "react";
import "components/InterviewerList.scss";
import InterviewListItem from "./InterviewListItem";

export default function InterviewerList(props) {
 

  const { interviewers, onChange, value } = props;

  

  const parsedInterviewers = interviewers.map((person) => (
    <InterviewListItem
      selected={value === person.id}
      setInterviewer={() => onChange(person.id)}
      {...person}
      key={person.id}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}
