  interface ToDo {
    id: string,
    text: string,
    completed: boolean,
    CreatedAt: string
  }

  interface TodoItemProps {
    Todo : ToDo,
    onToggle : (id : string) =>void,
    onDelete : (id :string) => void
  }
  function TodoItem({Todo,onToggle,onDelete} : TodoItemProps){
    return (
        (<li>
            {Todo.text} 
            <button onClick={() => onDelete(Todo.id)}>Delete</button>
            <input type="checkbox" name="" id="" onChange={()=>onToggle(Todo.id)}/>
            <span>{Todo.completed ? "Completed" : "unCompleted"}</span>
            
          </li>)
    )
  } 
  export default TodoItem