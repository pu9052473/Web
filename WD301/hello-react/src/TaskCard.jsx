import './TaskCard.css'; // import style from "Taskcard.css"

const Taskcard = (props) => { // this is known as "component" in react that can reuseable in react , in this we take argument from the App.jsx
  const CheckID = () => {
    if (props.id === "pending") {
    return <p> Due on </p>
      }

    if (props.id === "done") {
     return <p> Completed on </p>
      }

      return <p>not on date</p>
  }
   
    return (
      <div className='TaskItems w-[35vw] mb-3'>
        <h2 className='text-xl font-bold text-blue-600'>{props.title}</h2>  {/* whatever is written in the "title" in "App.jsx" is display in this tag */}
        <div className='flex'>
        <p className='text-blue-500 mr-1'> <CheckID /></p>
        <p>:{props.date}</p>
        </div>
        <div className='flex'>
        <p className='text-blue-500 mr-1'>Assignee</p>
        <p>:{props.name}</p>
        </div>
       </div>
    )
  }

export default Taskcard