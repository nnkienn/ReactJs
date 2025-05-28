import React, { useEffect, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoItem from './components/ToDoItem'
import type { ToDo } from './components/types'
import { todoReducer } from './Reducer/todoReducer';

function App() {

  type FilterType = "all" | "completed" | "uncompleted";

  const [todoList, dispath] = useReducer(todoReducer, [])
  const [inputText, setInputText] = useState<string>("")
  const [filter, setFilter] = useState<FilterType>("all")

  const ToTalToDos = todoList.length;
  const ToTalToDoCompleted = todoList.filter(value => {
    if (value.completed === true) {
      return value
    }
  }).length;
  const filterTodos = todoList.filter(todo => {
    if (filter === 'completed') {
      return todo.completed
    } if (filter === 'uncompleted') {
      return !todo.completed
    }
    return true
  })

  const sortTodos = [...filterTodos].sort((a, b) => b.CreatedAt.localeCompare(a.CreatedAt))



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodoList();
  }

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todoList))
    }
  }, [todoList])
  useEffect(() => {
    const ToDoInLocalStorage = localStorage.getItem("todos");
    if (ToDoInLocalStorage !== null) {
      const convertArray = JSON.parse(ToDoInLocalStorage) as ToDo[];
      if (Array.isArray(convertArray)) {
        dispath({ type: "LOCALSTORAGE_TODO", payload: convertArray });
      }
    }
  }, []);

  const handleAddTodoList = () => {
    if (inputText.trim() === "") return;

    const NewTodoObject: ToDo = {
      id: uuidv4(),
      text: inputText,
      completed: false,
      CreatedAt: new Date().toLocaleString()
    }

    dispath({ type: "ADD_TODO", payload: NewTodoObject })
    setInputText("")
  }
  const handleToggleTodo = (idchange: string) => {
    dispath({ type: "TOGGLE_TODO", payload: idchange })
  }
  const handleDeleteList = (idDelete: string) => {
    dispath({ type: "DELETE_TODO", payload: idDelete })

  }

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-pink-200 rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-pink-400 text-center mb-4">📝 To do List</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Add a todo"
            className="flex-1 p-2 rounded-lg bg-white text-pink-500 placeholder-pink-400 shadow-sm"
          />
          <button className="bg-pink-400 hover:bg-pink-600 rounded-lg px-4 font-bold" type="submit" >Add</button>
        </form>

        <div className='mb-4 flex justify-center items-center'>

          <p className="flex-1 text-pink-600 font-semibold">✅ Đã hoàn thành: {ToTalToDoCompleted} / Tổng: {ToTalToDos}</p>


          <select className="bg-white border text-pink-700 border-pink-300 rounded-md px-2 py-1 shadow-sm" value={filter} onChange={(e) => setFilter(e.target.value as FilterType)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>

          </select>
        </div>

        <ul className='space-y-3'>
          {sortTodos.map((value) =>
            <TodoItem Todo={value} onDelete={handleDeleteList} onToggle={handleToggleTodo}></TodoItem>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
