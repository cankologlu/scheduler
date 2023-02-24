import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const {value, days, onChange } = props;

 

  const parsedDays = days.map((day) => (
    <DayListItem
      setDay={() => {
        onChange(day.name);
      }}
      key={day.id}
      {...day}
      selected={value === day.name}
    />
  ));
  return <ul>{parsedDays}</ul>;
}
