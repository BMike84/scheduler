import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  //used to show which interviewer is selected
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const interviewerImageClass = classNames("interviewers__item-image");

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={interviewerImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}