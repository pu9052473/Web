import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Taskcard from './TaskCard' //importing the "TaskCard" "component" from "TaskCard.jsx"

function App() {
  // let message = "Hii there"
  // if (Math.random() > 0.5) { // "Math.random()" fun. give random num every time when page is refresh 
  //   message = "Bye there"
  // }
  return (
    <div className='w-[80vw] mx-auto my-5'>
      <div className=''>
        <p className='font-bold text-5xl text-blue-800'>Smarter Tasks</p>
        <div className='flex items-center my-5'>
          <h1 className='mr-1 text-blue-500 text-xl'>Project:</h1>
          <p>Graduaction Final Year Project (Revamp College Website)</p>
        </div>
      </div>
      <div className='flex justify-center h-[75vh]'>
        <div className='flex flex-col items-center  w-[40vw] border rounded-2xl  border-blue-400 mr-10'>
          <h1 className='text-blue-800 text-3xl my-4 ' >Pending</h1>
          <Taskcard title = "Build the website with static content" date = "10th April" name = "Rohit S" id = "pending" />
          <Taskcard title = "Add a blog" date = "22nd March" name = "Rahul m" id = "pending"/>
          <div className='flex w-[35vw] text-2xl font-bold text-blue-600 items-center px-1 h-[5.5vh] border rounded-md'>
          <a href="#" className='bg-gray-200 rounded-s-md px-0.5'>+</a>
          <a href="#" className='bg-gray-200 w-full rounded-e-md'>New task</a>
          </div>
        </div>
        <div className='flex flex-col items-center w-[40vw] mx-auto border rounded-2xl border-blue-400'>
          <h1 className='text-blue-800 text-3xl my-4 '>Done</h1>
          <Taskcard title = "Design the Mockup" date = "10th April" name = "Rohit M" id = "done" />
          <Taskcard title = "Get the approval from principal " date = "20nd April" name = "Ajay S" id = "done" />
        </div>
      </div>
  </div>
  )
}

export default App
