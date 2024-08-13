import { useReducer } from 'react'
import React from 'react'
import { ToDoList } from './ToDoList'
import { v4 as uuidv4 } from 'uuid'

export const TodosContext = React.createContext()

// Estado inicial para los todos
const todosInitialState = {
  todos: []
}

// Función reductora para manejar las acciones
function todosReducer(state, action) {
  switch (action.type) {
    case 'get':
      return { ...state, todos: action.payload }
    case 'delete':
      const filteredTodoState = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      )
      return { ...state, todos: filteredTodoState }
    case 'add':
      const addedToDos = [...state.todos, action.payload] // Usar action.payload en lugar de newToDo
      return { ...state, todos: addedToDos }
    case 'edit':
      const updatedToDo = { ...action.payload }
      const updatedToDoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      )
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ]
      return { ...state, todos: updatedToDos }
    default:
      return state // Asegúrate de retornar el estado actual por defecto
  }
}

export const App = () => {
  // Hook useReducer para manejar el estado de los todos
  const [state, dispatch] = useReducer(todosReducer, todosInitialState)

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider>
  )
}
