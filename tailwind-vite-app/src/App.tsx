import { useEffect, useState } from 'react'

import './App.css'

function App() {
  interface Todo {
    text: string;
    createdAt: string;
    complete: boolean;
  }
  const [inputText, setInputText] = useState<string>("")
  const [todoList, setToDoList] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const date = new Date();
      const NewToDo = {
        text: inputText,
        createdAt: date.toLocaleString(),
        complete: false
      }
      setToDoList([...todoList, NewToDo])
      setInputText("")
    }
    console.log(inputText)
    console.log("todoLít ", todoList)
  }

  const toggleComplete = (index: number) => {
   const newTodo =  todoList.map((value, vitri) => {
      if (vitri === index) {
        return {
          ...value,
          complete : !value.complete
        }
      }
      return value
    })
    console.log("new todo", newTodo)
    setToDoList(newTodo)
    
  }
  const handleDelte = (index : number) =>{
   const newToDoList= todoList.filter((value,vitri) =>{
      return vitri !== index
    })
    setToDoList(newToDoList)
  }
useEffect(() => {
  if(todoList.length > 0 ){
    localStorage.setItem("todos", JSON.stringify(todoList))
  }
},[todoList])

useEffect(()=>{
  const saved =  localStorage.getItem("todos")
  if(saved !== null){
    const parsed = JSON.parse(saved)
    if(Array.isArray(parsed)){
      setToDoList(parsed)
    }
  }

},[])

  return (
    <div className='flex min-h-screen justify-center items-center'>
      <div className='w-full bg-white rounded-lg shadow-orange-300 shadow-md p-6'>
        <h1 className='text-orange-400'>🙌 TO TO APP</h1>
        <form onSubmit={handleSubmit} className='flex gap-2 justify-center px-4 py-5'>
          <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} name="" id="" className='w-full text-gray-500 px-4 py-2 border !border-pink-300 rounded-lg ' />
          <button type="submit" className='!bg-pink-300 px-4 py-2  hover:bg-pink-400'>Add</button>
        </form>
        <div className='w-full bg-white rounded-lg shadow-orange-300 shadow-md p-8'>
          <ul>
            {todoList.map((value, index) => (
              <li key={index} className='text-gray-500 flex gap-4 items-center py-4'>
                <input type="checkbox" name="" onChange={()=>toggleComplete(index)} />
                <p className={`text-2xl ${value.complete ? 'line-through opacity-50' : ''}`}>
                    {value.text} {value.createdAt}</p>
                <button type="submit" onClick={()=>handleDelte(index)} className='!bg-pink-300 px-4 py-2  hover:bg-pink-400'>delete</button>
              </li>
            ))}

          </ul>
        </div>
      </div>

    </div>


  );

}

export default App
