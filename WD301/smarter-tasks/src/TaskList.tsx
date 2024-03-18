/* eslint-disable @typescript-eslint/no-unused-vars */
import Task from "./Task"; // we import "Task"
import { TaskItems } from "./Types";

interface Props{
    tasks: TaskItems[],
    onDelete: (index: number) => void;
}

 interface State{
    // tasks: TaskItems[]
 }

/* // this is "class based method"
class TaskList extends React.Component<Props, State>{

    // constructor(props: Props){
    //     super(props);
    //     this.state = {
    //         tasks: [],
    //     }
    // }

    // this is "first method" to declare state in "componentDidMount()"
    // componentDidMount(): void {
    //     this.setState({
    //         tasks: [
    //             {title: "Pay rent"},
    //             {title: "Watch Movie"},
    //             {title: "Go Gardening"},
    //             {title: "Buy Groceries"},
    //         ]
    //     })
    // }

    // this is "second method" to declare state in "componentDidMount()"
    // componentDidMount(): void {
    //     const tasks = [ {title: "Pay rent"},
    //                     {title: "Watch Movie"},
    //                     {title: "Go Gardening"},
    //                     {title: "Buy Groceries"}, ]
                     
    //     this.setState((state, props) => ({tasks}))
        
    // }

    render() {
        return this.props.tasks.map( (task, idx) => (
          <Task key={idx} title={task.title} dueDate={task.dueDate} description={task.description} />
        ) );
    } 
 } */

// this is "function based method"
const TaskList = (props: Props) => {
  
  const handleTaskDelete = (index: number) => {
    props.onDelete(index); // when click the button this fun. was called which is created in the "TaskApp"
  }

  return(
    <ul>
      {props.tasks.map( (task, idx) => (
         <li key= {idx}>
           <div className="flex flex-col items-center justify-center  my-2 py-1 rounded-lg bg-blue-300 border-2 border-blue-500">
             <Task
               title= {task.title}
               description= {task.description}
               dueDate= {task.dueDate}
              />
             <div className="w-[7vw]">
               <button className="deleteTaskButton flex mx-auto rounded-md border-2 bg-blue-300 border-blue-500 px-1.5 text-lg justify-center text-blue-700" onClick={() => handleTaskDelete(idx)}>Delete</button>
             </div>
           </div>
         </li>
       ))}
    </ul>
  )
};

export default TaskList ;

