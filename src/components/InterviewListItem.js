import React, {useState} from "react";
import classNames from "classnames";
import "components/InterviewListItem.scss"

export default function InterviewListItem (props) {
  const {id, name, avatar, setInterviewer, selected} = props;
  
  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": selected})
  console.log("props are:", props);
  console.log(interviewerClass);
  const handleClick = () =>  
     setInterviewer(id)
    
  return (

    <li onClick={handleClick} className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt="Sylvia Palmer"
  />
  {selected && name}
</li>
  );
}