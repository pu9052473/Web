import React from "react";
import { TaskItems } from "./Types";

interface TaskFormProps {
    addTask: (task: TaskItems) => void;
  }

interface TaskFormState {
    title: string,
    dueDate: string,
    description: string,
}

// this is "class" based method
// class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  
// // this is en "uncontrolled method" of taking value in form action that controlled by the "DOM"
// /*
//   inputRef = React.createRef<HTMLInputElement>();

//   //   addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
//       //     event.preventDefault();
//       //     console.log("Submitted the form!");
//       //   };

//   addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
//     event.preventDefault();
//     console.log(`Submitted the form with ${this.inputRef.current?.value}`);
//   };

//   render(){
//     return (
//         <form onSubmit={this.addTask}>
//             <input type="text" ref={this.inputRef} placeholder="Enter The Task" className="flex mx-auto w-[60vw] rounded-md border-blue-500 px-1.5 border-2 text-md justify-center my-5" />
//             <button type="submit" className="flex mx-auto rounded-md bg-blue-500 px-1.5 text-lg justify-center">Add items</button>
//         </form>
//     )
//   }
// */

// // this is en "controlled method" of taking value in form action that controlled by the "react"
//   constructor(props: TaskFormProps) {
//       super(props);
//       this.state = {
//         title: "",
//         dueDate: "",
//         description: "",
//       }
//   }

//   titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     // console.log(`${event.target.value}`);
//     this.setState({ title: event.target.value });
//   };

//   dateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     console.log(`${event.target.value}`);
//     this.setState({ dueDate: event.target.value });
//   };

//   descriptionChanged: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
//     console.log(`${event.target.value}`);
//     this.setState({ description: event.target.value });
//   };

//   addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
//     event.preventDefault();
//     // console.log(`Submitted the form with ${this.state.title}`);
//     const newTask = {
//         title: this.state.title,
//         date: this.state.dueDate,
//         description: this.state.description,
//        };
//       this.props.addTask(newTask);
//       this.setState({ title: "" });
//       this.setState({ dueDate: "" });
//       this.setState({ description: "" });
//   };

//   render(){
//       return (
//         <form onSubmit={this.addTask}>
//           <div className="flex mx-auto w-[40vw] justify-evenly mt-5 mb-2">
//             <input type="text" id="todoTitle" value={this.state.title} onChange={this.titleChanged} placeholder="Enter The Task" required  className=" w-[30vw] rounded-md border-blue-500 px-1.5 border-2 text-lg  placeholder-slate-600"/>
//             <input type="date" id="todoDueDate" value={this.state.dueDate} onChange={this.dateChanged} required className="rounded-md border-blue-500 border-2 text-slate-600"/>
//           </div>
//             <textarea id="todoDescription" value={this.state.description} onChange={this.descriptionChanged} placeholder="Enter description" required className="flex mx-auto w-[39.5vw] justify-evenly my-2 rounded-md border-blue-500 px-1.5 border-2 text-lg  placeholder-slate-600" />
//             <button type="submit" id="addTaskButton" className="flex mx-auto rounded-md border-2 bg-blue-300 border-blue-500 px-1.5 text-lg justify-center text-blue-700">Add items</button>
//         </form>
//       )
//   }

// }

 const TaskForm = (props:TaskFormProps) => {
  const [formState, setFormState] = React.useState<TaskFormState>({
    title: "",
    description: "",
    dueDate: "",
  });

  const titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // console.log(`${event.target.value}`)
    setFormState({...formState, title: event.target.value}) // in this "...formState" work as it remains the value of other components as it is, but it only changes the value of the component we declare, like in this "title"
  }

  const dueDateChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // console.log(`${event.target.value}`)
    setFormState({...formState, dueDate: event.target.value}) // in this "...formState" work as it remains the value of other components as it is, but it only changes the value of the component we declare, like in this "dueDate"
  }

  const descriptionChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // console.log(`${event.target.value}`)
    setFormState({...formState, description: event.target.value}) // in this "...formState" work as it remains the value of other components as it is, but it only changes the value of the component we declare, like in this "description"
  }

  const addTask: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // console.log("Submitted the form with");

    if (formState.title.length === 0 || formState.dueDate.length === 0) {
      return;
    }
    props.addTask(formState);
    setFormState({ title: "", description: "", dueDate: "" });
  }

  return <>
     <form onSubmit={addTask}>
          <div className="flex mx-auto w-[40vw] justify-between mt-5 mb-2">
            <input type="text" id="todoTitle" value={formState.title} onChange={titleChanged} placeholder="Enter The Task" required  className=" w-[14.5vw] rounded-md border-blue-500 px-1.5 border-b-2 text-lg  placeholder-slate-600"/>
            <input id="todoDescription" value={formState.description} onChange={descriptionChanged} placeholder="Enter description" required className="w-[14.5vw] rounded-md border-blue-500 px-1.5 border-b-2 text-lg  placeholder-slate-600" />
            <input type="date" id="todoDueDate" value={formState.dueDate} onChange={dueDateChanged} required className="rounded-md border-blue-500 border-b-2 text-slate-600"/>
          </div>
            <button type="submit" id="addTaskButton" className="flex mx-auto rounded-md border-2 bg-blue-300 border-blue-500 px-1.5 text-lg justify-center text-blue-700">Add items</button>
        </form>
  </>

 }

 export default TaskForm;