import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useEffect, useState } from "react"
import {Card,CardTitle,} from "./ui/card"
import { v4 as uuidv4 } from 'uuid';
import Todo from "./Todo"
import { Button } from "./ui/button"
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext";
const TodoList = () => {
  const { todos, setTodos } = useContext(TodoContext)
  const [titleInput, setTitleInput] = useState("");
  const[displayedTodos,setDisplayedTodos]=useState("all")
  const completedTodos= todos.filter((t) => t.completed);
  const incompleteTodos= todos.filter((t) => !t.completed);
  let todosToDisplay = displayedTodos;
  if (displayedTodos === "completed") {
    todosToDisplay = completedTodos;
  } else if (displayedTodos === "incomplete") {
    todosToDisplay = incompleteTodos;
  }
  else {
    todosToDisplay = todos;}
  const todoDetails = todosToDisplay.map((t) => (
    <Todo key={t.id}  todo={t} />
  ))
  useEffect(()=>{
    const storageData=JSON.parse(localStorage.getItem("todos")) ?? []
    setTodos(storageData)
  },[])
  const handleAddTodo = () => {
    if (titleInput.trim()) {
  const newItem = {
    id: uuidv4(),
    title: titleInput,
    completed: false,
  }
    
    const updatedTodos=[...todos, newItem]
    setTodos(updatedTodos)
    localStorage.setItem("todos",JSON.stringify(updatedTodos))
    setTitleInput("")
}
  }
// const handleKeyPress=(e)=>{
//   if(e.key==="Enter"){
//     handleAddTodo()
//   }
// }
  return (
      <Card className="border-none w-[400px] p-2">
        {/* Title */}
        <CardTitle className="text-3xl font-bold text-center font-light ">
          مهامي
        </CardTitle>
        <hr/>
        {/* Toggle Group */}
<ToggleGroup 
  type="single" 
  value={displayedTodos} 
  onValueChange={(value) => setDisplayedTodos(value)}
  className="border border-gray-300 text-center flex justify-center mx-auto mb-4"
>
  <ToggleGroupItem value="all" className="bg-gray-400 text-black border-1 border-gray-300 rounded-none data-[state=on]:bg-gray-400x">
    الكل
  </ToggleGroupItem>
  <ToggleGroupItem value="completed" className="bg-white text-black border-1 border-gray-300 rounded-none data-[state=on]:bg-gray-400">
    المنجز
  </ToggleGroupItem>
  <ToggleGroupItem value="incomplete" className="bg-white text-black border-1 border-gray-300 rounded-none data-[state=on]:bg-gray-400">
    غير المنجز
  </ToggleGroupItem>
</ToggleGroup>
       {/* end toggle group */}
          {/* Todo List */}
          {todoDetails}
 <div className='flex mt-0  items-center gap-2 '>
<div className='w-3/4 '>
<input type="text" className='w-[100%] border border-gray-900 py-1'

value={titleInput} 
onChange={(e)=>setTitleInput(e.target.value)} placeholder="ادخل مهمة جديدة"
  />
</div>
<div className="w-1/4 h-[100%]">
<Button className="px-8 py-2 rounded-none  h-[100%] bg-blue-600" disabled={titleInput.length===0} onClick={handleAddTodo}>اضافة</Button>
</div>
    </div>  
      </Card>
  )
}
export default TodoList
