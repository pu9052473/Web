
interface TaskItems{
    title: string,
    dueDate: string,
    description: string,
}

/* // this is "class based method"
class Task extends React.Component<TaskProp> {
    render(){
        return <div className="TaskItems flex flex-col my-2 py-1 rounded-lg bg-blue-300 border-2 border-blue-500">
                    <div className="flex mx-auto text-xl font-bold text-blue-700">
                        <p className="mr-2"> {this.props.title} </p> 
                        <p> ({this.props.dueDate})</p>
                    </div>
                    <div className="mx-auto w-[40vw] text-slate-600 text-lg break-words">
                         <p>:- {this.props.description}</p>
                    </div>
                </div>
    }
} */

// this is "function based method"
const Task = (props:TaskItems) => {
    return (
        <div className="TaskItems">
            <div className="flex justify-center text-xl font-bold text-blue-700">
              <p className="mr-2"> {props.title} </p> 
              <p> ({props.dueDate})</p>
            </div>
            <div className="text-slate-600 text-lg break-words">
              <p>:- {props.description}</p>
            </div>
        </div>
    )
}

export default Task ;





