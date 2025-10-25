import React, { useContext, useState } from 'react'
import { Card} from './ui/card'
import { Check, Pencil, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { TodoContext } from '@/context/TodoContext'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
const Todo = ({todo})=>{
  const { todos,setTodos}=useContext(TodoContext);
  const[openDeleteDialoge,setOpenDeleteDialoge]=useState(false)
  const[openUpdateDialoge,setUpdateDialoge]=useState(false)
  const[updateTask,setUpdateTask]=useState({
    title:todo.title,
    details:todo.details
  })
const handlePacked=(id)=>{
  console.log("packed");
  const updatedTodo=todos.map((t)=>(
   t.id==id ? {...t,completed:!t.completed} : t 
  )
)
  localStorage.setItem("todos",JSON.stringify(updatedTodo))

    setTodos(updatedTodo)
}
const handleDeleteShow=()=>{
  () => setOpenDeleteDialoge(true)
}
 const handleDelete=(id)=>{
  const deletedItems=todos.filter((t)=>(
    t.id !==id
  ))
    localStorage.setItem("todos",JSON.stringify(deletedItems))

setTodos(deletedItems)
setOpenDeleteDialoge(true)
 }
    const handleClose=()=>{
      setOpenDeleteDialoge(false)
    }
    const handleUpdateTodo=(id)=>{
     
      const updated=todos.map((t)=>(
t.id===id ? {...t,title:updateTask.title,details:updateTask.details}: t
      ))
        localStorage.setItem("todos",JSON.stringify(updated))

      setTodos(updated)
      setUpdateDialoge(false)
    }
  return (
  <Card style={{backgroundColor:"#283593 ",color:"white" ,borderRadius:"0px",padding:"10px",hover:{paddingTop:"20px",paddingBottom:"20px",boxShadow:"0px 7px 7px rgba(0,0,0,0.7)"}}} className='w-full  hover:scale-105 transition-all duration-300 ease-in-out mb-0'>
    <div className='flex w-[350px]'>
        <div className='w-3/4 text-right '>
        <span style={{textDecoration : todo.completed ? "line-through": "none"}}>
          {todo.title}
          </span>
       <p>
        {todo.details}
        </p> 
        </div>
        <div className='w-1/4 flex justify-end gap-2 items-center'>
        {/* delete task */}
 <Dialog open={openDeleteDialoge} onOpenChange={setOpenDeleteDialoge}>
  <DialogTrigger asChild>
    <Button
      onClick={handleDeleteShow}
      size="icon"
      variant="outline"
      className="hover:bg-[#c5c5c5] transition rounded-full bg-white border border-red-500"
    >
      <Trash className="text-red-500" />
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="bg-red-500x text-black text-right ">        هل انت متأكد من انك تريد حذف المهمة؟
</DialogTitle>
      <DialogDescription className="text-right">
        لا يمكنك التراجع عن الحذف بعد اتمامه
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="sm:justify-start ">
        <div className='flex gap-2 items-center'>
      <DialogClose asChild>

        <Button type="button" variant="secondary" onClick={handleClose}>
          اغلاق
        </Button>
      </DialogClose>

      <Button type="button" variant="destructive" onClick={()=>handleDelete(todo.id)}>
        نعم  قم بالحذف 
      </Button>
      </div>
    </DialogFooter>
  </DialogContent>
</Dialog>

        <Button size="icon"  variant="outline" className=" hover:bg-[#c5c5c5] transition  rounded-full bg-white border-green-500 text-blue-500" style={{backgroundColor:todo.completed?"green":"white"}}onClick={()=>handlePacked(todo.id)}>
        <Check />
        </Button>
        {/* update task */}
         <Dialog open={openUpdateDialoge} onOpenChange={setUpdateDialoge}>
      <form>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline" className=" hover:bg-[#c5c5c5] transition  rounded-full bg-white border border-blue-500 text-slate-500">
        <Pencil size={30} />
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label className="text-black" htmlFor="name-1">عنوان المهمة</Label>
              <Input className="text-black" value={updateTask.title} onChange={(e)=>setUpdateTask({...updateTask,title:e.target.value})} />
            </div>
            <div className="grid gap-3">
              <Label className="text-black" htmlFor="username-1">التفاصيل</Label>
              <Input className="text-black"  value={updateTask.details} onChange={(e)=>{setUpdateTask({...updateTask,details:e.target.value})}}/>
            </div>
          </div>
          <DialogFooter>
              <div className='flex gap-2 items-center'>
            <DialogClose asChild>
              <Button onClick={handleClose} className="text-black"  variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={()=>handleUpdateTodo(todo.id)} type="submit">Save changes</Button>
                </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
        </div>
    </div>
</Card>
  )
}
export default Todo
71