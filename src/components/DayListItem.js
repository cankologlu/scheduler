import React, { useState } from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) 

{ 
  const {selected, spots} = props;
  
  const dayClass = classNames("day-list__item",{'--selected': selected , "--full": !spots})
  return (
    <li className={dayClass}>
      <h2 onClick={() => props.setDay(props.name)} className="text-regular">{props.name}</h2>
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
    </li>
  );
};
