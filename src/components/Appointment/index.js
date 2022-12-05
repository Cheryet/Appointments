import 'components/Appointment/styles.scss'
import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty'
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';



const Appointment = (props) => {

  //Mode Constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY 
  );
  
  return(
    <article className="appointment">
      <Header time={props.time}></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          />
          )}
          {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=>{back()}}  />}

      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
    </article>
  );
}


export default Appointment;