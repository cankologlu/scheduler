import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days } = props;

 

  const parsedDays = days.map((day) => (
    <DayListItem
      setDay={() => {
        props.onChange(day.name);
      }}
      key={day.id}
      {...day}
      selected={props.value === day.name}
    />
  ));
  return <ul>{parsedDays}</ul>;
}
