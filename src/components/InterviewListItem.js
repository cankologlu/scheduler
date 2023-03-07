import React from "react";
import classNames from "classnames";
import "components/InterviewListItem.scss";

export default function InterviewListItem(props) {
  const { name, avatar, setInterviewer, selected} = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li onClick={setInterviewer} className={interviewerClass}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
