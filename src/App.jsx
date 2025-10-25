import TodoList from "./components/TodoList"
import { TodoContext } from "./context/TodoContext"
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
const initialTodos=[
  { 
    id: uuidv4(),
    title: "Task 1",
    completed: false,
  details: "This is the details of task 1"
},
{
  id: uuidv4(),
  title: "Task 2",
  completed: true,
  details: "This is the details of task 2"
},{
  id: uuidv4(),
  title: "Task 3",
  completed: false,
  details: "This is the details of task 3"
}
]
function App() {
// const[todos,setTodos]=useState(initialTodos)
const[todos,setTodos]=useState([])
const[inputValue,setInputValue]=useState("")
const handleAddItem=()=>{
  setTodos([...todos,inputValue])
  setInputValue("")
}
  
  return (
    <div style={{ direction: "rtl" }} className="flex justify-center items-center  w-[400px]x h-[100] p-6
    ">
      <TodoContext.Provider value={{ todos, setTodos }}>
        <TodoList />
      </TodoContext.Provider>
    </div>
    // <>
    // <ul>

    // {todos.map((t,index)=>(<li key={index}>{t}</li>))}
    // </ul>
    // <input className="border border-gray-300" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
    // <button className="border border-gray-300" onClick={handleAddItem}>Add Item</button>
    // </>
   
  )

}
export default App
