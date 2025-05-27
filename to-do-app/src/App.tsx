import React, { useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoItem from './components/ToDoItem'
import type { ToDo } from './components/types'
import { todoReducer } from './Reducer/todoReducer';

function App() {

  type FilterType = "all" | "completed" | "uncompleted";

  const [todoList, dispath] = useReducer(todoReducer,[])
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

  const sortTodos = [...filterTodos].sort((a,b) =>b.CreatedAt.localeCompare(a.CreatedAt))



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodoList();
  }

  const handleAddTodoList = () => {
    if (inputText.trim() === "") return;

    const NewTodoObject: ToDo = {
      id: uuidv4(),
      text: inputText,
      completed: false,
      CreatedAt: new Date().toLocaleString()
    }

    dispath({type : "ADD_TODO", payload:NewTodoObject})
    setInputText("")
  }
  const handleToggleTodo = (idchange: string) => {
    dispath({type:"TOGGLE_TODO" , payload:idchange})
  }
  const handleDeleteList = (idDelete: string) => {
    dispath({type:"DELETE_TODO" , payload:idDelete})

  }

  return (
    <div>
      <p>Đã hoàn thành: {ToTalToDoCompleted} / Tổng: {ToTalToDos}</p>
      <select value={filter} onChange={(e) => setFilter(e.target.value as FilterType)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>

      </select>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Add a todo"
        />
        <button type="submit" >ADD</button>
      </form>
      <ul>
        {sortTodos.map((value) =>
          <TodoItem Todo={value} onDelete={handleDeleteList} onToggle={handleToggleTodo}></TodoItem>
        )}
      </ul>
    </div>
  )
}

export default App
