import { useState } from "react";

function SampleComponent() {

    /* // this is "first method" of defining the "useState" 
     const [title, setTitle] = useState("Hello hooks"); // what we written in the ("...") is assign to the first argument of our array
     console.log(title, "CurrentState");
     console.log(setTitle, "Setter function"); */

     // thisis "second method" of defining the "useState"
     /*const [title, setTitle] = useState(() => {
        return "Hello hooks" // in this it's return the "currentState" value
     })*/

    //if we click the button who have functin that have "setter function" , the value of "CurrentState" is changed to the value of "setter function"
     const [title, setTitle] = useState("Hello Class Components") 
     console.log(title, "CurrentState");

     function changeState() {
        setTitle ("Hooks");
     }

    return (
     <>
      <div className="mx-auto w-[45vw]">
       <div>stateValue: {title}</div>
       <button onClick={changeState} className="bg-blue-300 border-2 border-blue-500 rounded-lg p-2">Change State Value</button>
      </div>
     </>
    );
}

export default SampleComponent;