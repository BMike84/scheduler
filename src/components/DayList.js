import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // creates a array finday to loop through the days api to create the sidebar
  const findDay = props.days.map((day) => {
    return (
    <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.setDay}
    />
    );
  });
  
  return (
    <ul>{findDay}</ul>
  );
}