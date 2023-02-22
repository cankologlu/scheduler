import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList (props) {
  const {days} = props;

  const parsedDays = days.map((day) => (
    <DayListItem  key={day.id} {...day}/>
  ));
  return (
    <ul>{parsedDays}</ul>
  );
};