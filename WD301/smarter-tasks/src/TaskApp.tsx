/* eslint-disable @typescript-eslint/no-unused-vars */
import { TaskItems } from "./Types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";

// interface TaskAppProp {}

interface TaskAppState {
  tasks: TaskItems[];
}

/* // this is "class based method"
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
        <div className="container py-5 w-[45vw] mx-auto font-serif">
        <h1 className="text-3xl mb-2 font-bold text-blue-700">
          Smarter Tasks
        </h1>
        <h1 className="text-lg mb-5 text-slate-600">
          <span className="font-bold">Project: </span>
          Graduation Final Year Project (Revamp college website)
        </h1>
        <div className="mx-auto w-[45vw]">
          <div className="border-blue-500 border-2 rounded-xl p-2">
            <h1 className="text-blue-700 text-3xl font-bold text-center mb-2">
              Pending
            </h1>
            <TaskForm addTask={this.addTask} />
          </div>
          <div className="flex justify-center my-2">
            <p className="text-3xl text-slate-600 font-bold ">Tasks</p>
          </div>
          <div className="mx-auto w-[45vw]">
            <TaskList tasks={this.state.tasks} />
          </div>
        </div>
      </div>
    );
  }

} */

// this is "function based method"
const TaskApp = () => {

  // this use to do some work on the component mount, mean when the page or component render, and after change state of react components
  // In this type we does "not require the clean-up" function
  // useEffect(() => {
  //   // document.title = `You have ${taskAppState.tasks.length} items`; // this content come in the top of the browser when the title of our page is shown near the web icon`
  //   const id = setTimeout(() => {
  //     console.log(`saved ${taskAppState.tasks.length} items to the backend...`);
  //   }, 5000);

  //   return () => {
  //     console.log("clear or cancel any existing network call");
  //     clearTimeout(id); 
  //   };

  //  }, [taskAppState.tasks] // after adding the "[..]", what are in the [..] only if that component done then only the useEffect called, enyone else component done the the useEffect not called 
  // );

  // In this type we "require the clean-up" function
  // useEffect(() => {
  //   // subscribe or connect to services here

  //   return () => {
  //   // do any clean up here, unsubscribe / disconnect services 
  //   }
  // }) 

  const [taskAppState, setTaskAppState] = useLocalStorage<TaskAppState>("tasks",{
    tasks: [] // in start task will empty, but when the details added then it will update
  })

  const addTask = (task: TaskItems) => {
    setTaskAppState ({ tasks: [...taskAppState.tasks, task] }); // in this the previsoly added taks remains as it is, then the whole new task added into the "tasks:[]" array
  }

  const deletetask = (index: number) => {
    const updatedTasks = [...taskAppState.tasks];
    updatedTasks.splice(index, 1);
    setTaskAppState({ tasks: updatedTasks });
  }

  return <>
    <div className="container py-5 w-[45vw] mx-auto font-serif">
        <h1 className="text-3xl mb-2 font-bold text-blue-700">
          Smarter Tasks
        </h1>
        <h1 className="text-lg mb-5 text-slate-600">
          <span className="font-bold">Project: </span>
          Graduation Final Year Project (Revamp college website)
        </h1>
        <div className="mx-auto w-[45vw]">
          <div className="border-blue-500 border-2 rounded-xl p-2">
            <h1 className="text-blue-700 text-3xl font-bold text-center mb-2">
              Pending
            </h1>
            <TaskForm addTask={addTask} />
          </div>
          <div className="flex justify-center my-2">
            <p className="text-3xl text-slate-600 font-bold ">Tasks</p>
          </div>
          <div className="mx-auto w-[45vw]">
            <TaskList tasks={taskAppState.tasks} onDelete = {deletetask}/>
          </div>
        </div>
    </div>
  </>
}

export default TaskApp;
