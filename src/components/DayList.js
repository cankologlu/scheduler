import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList (props) {
  const {days} = props;

  const handleClick = (data) => { 
    props.setDay(data)
  }

  const parsedDays = days.map((day) => (
    <DayListItem setDay={handleClick} key={day.id} {...day} selected={props.day === day.name}/>
  ));
  return (
    <ul>{parsedDays}</ul>
  );
};