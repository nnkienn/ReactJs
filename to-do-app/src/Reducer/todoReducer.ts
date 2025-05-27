import type { ToDo } from "../components/types";

type Action =
    | { type: "ADD_TODO"; payload: ToDo }
    | { type: "DELETE_TODO"; payload: String }
    | { type: "TOGGLE_TODO"; payload: String }

export const todoReducer = (state: ToDo[], action: Action): ToDo[] => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.payload]
        case "DELETE_TODO":
            return state.filter((todo) => todo.id !== action.payload )
        case "TOGGLE_TODO":
            return state.map((todo) => action.payload === todo.id ? { ...todo, completed: !todo.completed } : todo );
        default:
            return state;
    }
}