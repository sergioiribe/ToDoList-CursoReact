import { useReducer } from 'react';
import React from 'react';
import { ToDoList } from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

export const TodosContext = React.createContext();

  // Estado inicial para los todos
  const todosInitialState = {
    todos: [
      { id: 1, text: 'finishing writing hooks chapter' },
      { id: 2, text: 'play with kids' },
      { id: 3, text: 'read bible' }
    ]
  };

  // Función reductora para manejar las acciones
  function todosReducer(state, action) {
    switch (action.type) {
      case 'delete': 
        const filteredTodoState = state.todos.filter(todo => todo.id !== action.payload.id)
        return {...state, todos: filteredTodoState};
      case 'add':
        const newToDo = {
          id: uuidv4(),
          text: action.payload.text
        }
        const addedToDos = [...state.todos, newToDo]
        return {...state, todos: addedToDos}
      default:
        return todosInitialState; // Asegúrate de retornar el estado actual por defecto
    }
  }

export const App = () => {


  // Hook useReducer para manejar el estado de los todos
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider>
  );
};