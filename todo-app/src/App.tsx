import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";

const App = () => {
  interface ToDo {
    text: string, createdAt: string, complete: boolean
  }

  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<ToDo[]>([])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodoList();
  }
  const handleAddTodoList = () => {
    const newTodoObject: ToDo = {
      text: inputText,
      createdAt: new Date().toLocaleString(),
      complete: false
    }
    if (inputText.trim() !== "") {
      setTodoList(prev => [...prev, newTodoObject])
      setInputText("")
    }
  }
  const handleDeleteTodo = (indexDelete: number) => {
    setTodoList(prev => prev.filter((value, index) => indexDelete !== index))
  }
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todoList))
    }
  }, [todoList]
  )
  useEffect(() => {
    const TodoInLocalStorage = localStorage.getItem("todos");
    if (TodoInLocalStorage !== null) {
      const convertArray = JSON.parse(TodoInLocalStorage) as ToDo[];
      if (Array.isArray(convertArray))
        setTodoList(convertArray)
    }
  }, [])
  const handleToggleComplete = (indexCheck: number) => {
    const updatedTodos = todoList.map((value, index) => {
      if (index === indexCheck) {
        return { ...value, complete: !value.complete }
      }
      return value;
    }
    )
    setTodoList(updatedTodos)

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} value={inputText} placeholder="Nhập dô đây" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todoList.map((todo, index) =>
        (<li key={index}>
          {todo.text} - {todo.createdAt}
          <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          <input type="checkbox" onChange={() => handleToggleComplete(index)} />
          <span>
            {todo.complete ? "done" : "none"}
          </span>
        </li>))}

      </ul>
    </div>
  );
};

export default App;
