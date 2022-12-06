import "components/Appointment/styles.scss";
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// ~ Appointment Component ~
const Appointment = (props) => {
  //Mode Constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Saves/Books new appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    // setTimeout(() => {
    //   transition(SHOW);
    // }, 1000);
    // props.bookInterview(props.id, interview);
    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE);
      });
  }

  //Triggers delete function
  const onConfirm = () => {
    setTimeout(() => {
      transition(EMPTY);
    }, 1000);
    props.cancelInterview(props.id);
    transition(DELETING);
  };

  //Triggers Confirm page
  const onDelete = () => {
    transition(CONFIRM);
  };

  //Triggers Edit page
  const onEdit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={onConfirm}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={(student, interviewer) => save(student, interviewer)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={(student, interviewer) => save(student, interviewer)}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save appointment: Please try again"}
          onClose={() => {
            back();
          }}
        />
      )}
    </article>
  );
};

export default Appointment;
