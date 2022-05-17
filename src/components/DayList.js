import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const findDay = props.days.map((day) => {
    return (
    <DayListItem 
      key={day.id}
      id={day.id}
      name={day.name}
      spots={day.spots}
      selected={props.day.name === props.day}
      setDay={props.setDay}
    />
    );
  });
  
  return (
    <ul>{findDay}</ul>
  );
}