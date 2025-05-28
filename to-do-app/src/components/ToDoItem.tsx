interface ToDo {
  id: string,
  text: string,
  completed: boolean,
  CreatedAt: string
}

interface TodoItemProps {
  Todo: ToDo,
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
}
function TodoItem({ Todo, onToggle, onDelete }: TodoItemProps) {
  return (
    (<li className="relative items-center justify-between bg-white text-pink-800 rounded-2xl p-3 shadow-sm">
      <button className="absolute top-2 right-2" onClick={() => onDelete(Todo.id)}>
          ❌
      </button>
      <div className="flex items-center gap-2">
        <input className="accent-pink-500 w-5 h-5" type="checkbox" name="" id="" onChange={() => onToggle(Todo.id)} />
        <span className={Todo.completed ? "line-through opacity-60":""}>        
          {Todo.text}
        </span>
      </div>


    </li>)
  )
}
export default TodoItem