import React from "react"

interface TaskProp{
    title: string,
    date: string,
    description: string,
}

class Task extends React.Component<TaskProp> {
    render(){
        return <div className="TaskItems flex flex-col my-2 rounded-lg bg-blue-300 border-2 border-blue-500">
                    <div className="flex mx-auto text-xl">
                        <p className="mr-2"> {this.props.title} </p> 
                        <p> ({this.props.date})</p>
                    </div>
                    <div className="mx-auto w-[53vw] break-words">
                         <p>{this.props.description}</p>
                    </div>
                </div>
    }
}

export default Task ;