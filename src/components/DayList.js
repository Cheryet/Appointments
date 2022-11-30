import DayListItem from "./DayListItem";
import React from "react";

const DayList = function(props){

  const dayList = props.days.map((day)=>{
    return (
      <DayListItem
        key={day.id} 
        name={day.name} 
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange} />
    )
  });

  return (
    <ul>
      {dayList}
    </ul>
  );
}

export default DayList;