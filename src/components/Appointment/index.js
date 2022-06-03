import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // when saving a book interview it saves the info of the student and interviewer in the slot
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    // this transitions into the saving wheel we see on the screen after clicking save button
    // using bookInterview function from useApplication.js
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      //this shows the interview booked on the screen
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  // this adds in a confirm when clicking on the delete trash button for a booked interview
  const confirm = () => {
    transition(CONFIRM);
  };

  // deletes the appointment using cancelInterview in useApplicationData.js
  const deleteAppointment = () => {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  // if clicking the edit button will transition into the edit section of the form
  const edit = () => {
    transition(EDIT);
  };

  // returns all html on dependant on which section clicked
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Confirm Delete"
          onConfirm={deleteAppointment}
          onCancel={back}
        />
      )}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}

      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={back} />
      )}
    </article>
  );
}
