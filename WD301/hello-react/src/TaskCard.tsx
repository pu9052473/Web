import React from 'react';
import './TaskCard.css'; // import style from "Taskcard.css"

interface TaskCardProps {
  title: string,
  completed: boolean,
  dueDate: string,
  assigneeName: string,
  completedDate?: string, // it is optional because if completed is "true" then it shown , it's type will be same "string"
}

const Taskcard: React.FC<TaskCardProps> = (props) => { // this is known as "component" in react that can reuseable in react , in this we take argument from the App.tsx
//  logic for we the how we display the things
  let Date = props.dueDate ;
  let Assignee = props.assigneeName ;
  let Title = props.title ;
  let CompletedDate = props.completedDate ;
  let DateElement: string ;
  
    if (props.completed) {
     DateElement = "Completed on: " + CompletedDate ;
      }
    else {
      DateElement = "Due date: " + Date ;
    }
   
    return (
      <div className='TaskItems w-[35vw] mb-3'>
        <h2 className='text-xl font-bold text-blue-600'>{Title}</h2>  {/* whatever is written in the "title" in "App.jsx" is display in this tag */}
        <p className='text-blue-500'>{DateElement}</p>
        <p className='text-blue-500'>assigneeName: {Assignee}</p>
      </div>
    )
  }

export default Taskcard