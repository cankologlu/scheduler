import React from "react";

export default function Status(props) {
  return(
    <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  {props.deleting && <h1 className="text--semi-bold">Deleting</h1>}
  {props.saving && <h1 className="text--semi-bold">Saving</h1>}
</main>
  )
}