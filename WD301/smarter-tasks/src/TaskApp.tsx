import React from "react";
import { TaskItems } from "./Types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface TaskAppProp {}

interface TaskAppState {
  tasks: TaskItems[];
}

class TaskApp extends React.Component<TaskAppProp, TaskAppState> {

  constructor(props: TaskAppProp) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  addTask = (task: TaskItems) => {
    this.setState((state) => {
      return {
        tasks: [...state.tasks, task],
      };
    });
  };

  render() {
    return (
        <div className="container py-5 w-[55vw] mx-auto">
        <h1 className="text-3xl mb-2 font-bold text-blue-700">
          Smarter Tasks
        </h1>
        <h1 className="text-lg mb-5 text-slate-500">
          <span className="font-bold">Project: </span>
          Graduation Final Year Project (Revamp college website)
        </h1>
        <div className="mx-auto w-[55vw]">
          <div className="border-blue-500 border-2 rounded-xl p-2">
            <h1 className="text-blue-700 text-3xl font-bold text-center mb-2">
              Pending
            </h1>
            <TaskForm addTask={this.addTask} />
          </div>
          <div className="flex justify-center my-2">
            <p className="text-3xl text-slate-500 font-bold ">Tasks</p>
          </div>
          <div className="mx-auto w-[55vw]">
            <TaskList tasks={this.state.tasks} />
          </div>
        </div>
        
      </div>
    );
  }

}

export default TaskApp;