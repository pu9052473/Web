import React from "react"

interface TaskProp{
    title: string,
}

class Task extends React.Component<TaskProp> {
    render(){
        return <div className="flex my-2 mx-auto w-[48vw] text-2xl rounded-lg bg-blue-300 border-2 border-blue-500 justify-center items-center">{this.props.title}</div>
    }
}

export default Task ;