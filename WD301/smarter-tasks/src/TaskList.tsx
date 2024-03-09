import React from "react";
import Task from "./Task"; // we import "Task"
import { TaskItems } from "./Types";

interface Props{
    tasks: TaskItems[];
}

 interface State{
    // tasks: TaskItems[]
 }

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
          <Task key={idx} title={task.title} date={task.date} description={task.description} />
        ) );
    } 
 }


export default TaskList ;