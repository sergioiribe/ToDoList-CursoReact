import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { TodosContext } from './App'
import { useAPI } from './useAPI'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'


export const ToDoList = () => {
  const { state, dispatch } = useContext(TodosContext)
  const [todoText, setTodoText] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editTodo, setEditTodo] = useState(null)
  const buttonTitle  = editMode? 'Edit' : 'Add'

  const endpoint = "http://localhost:3000/todos/"
  const savedTodos = useAPI(endpoint)


  useEffect(() => {
    dispatch({type: 'get', payload: savedTodos})
  }, [savedTodos])

  const handleSubmit = async event => {
    event.preventDefault()
    if (todoText.trim() === '') {
      // Puedes mostrar un mensaje de error aquí o simplemente retornar para evitar el submit
      alert('Please enter a to-do item before submitting.'); // Ejemplo de mensaje de error
      return;
    }
  
    if(editMode){
      await axios.patch(endpoint + editTodo.id, {text: todoText})
      dispatch({type: 'edit', payload: {...editTodo, text: todoText}})
      setEditMode(false)
      setEditTodo(null)
    } else{
      const newToDo = {id: uuidv4(), text:todoText}
      const response = await axios.post(endpoint, newToDo)
      dispatch({type: 'add', payload: response.data})
      
    }
    setTodoText('')
  }

  return (
    <div className="flex w-[90vw] md:w-[50vw] h-[100vh] bg-white m-auto">
      <div className='flex flex-col w-full h-[100vh]'>
      <div className='mt-10'>
        <form onSubmit={handleSubmit} className='flex'>
            <input
                type="text"
                className="border-2 border-black rounded-l  max-w-4xl p-2 w-3/4 focus:ring-0 focus:outline-none"
                placeholder='Enter To Do'
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
            />
            <button className="text-white rounded-r w-1/4 p-2" style={{ backgroundColor: editMode ? '#6B7280' : 'black' }} onClick={handleSubmit}>
                {buttonTitle}
                
                
            </button>
        </form>
      </div>

      <div className="border-2 border-black mt-5 rounded w-[100%]">
        <div className=" bg-white">
          <div className="flex justify-between bg-black p-4">
            <div className="lg:w-3/4 text-white font-bold">To Do</div>
            <div className='lg:w-1/4 text-white font-bold flex gap-1 lg:gap-10'>
            <div className="text-white font-bold ms-3" >Edit</div>
            <div className="text-white font-bold ">Delete</div>
            </div>
          </div>
          {state.todos.map((todo) => (
            <div
              key={todo.id}
              className="flex p-4 border border-b border-black items-center w-[100%]"
            >
              <div className="w-3/4 break-all">{todo.text}</div>
              <div className='w-1/4 flex-col lg:flex-row lg:gap-5 gap-1 flex items-center'>
                <button className="bg-gray-500 text-white px-3 py-2 rounded w-[70px]" onClick={() => {
              setTodoText(todo.text)
              setEditMode(true)
              setEditTodo(todo)
            }}>
                  Edit
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-2 rounded w-[70px]"
                  onClick={ async () => {
                    await axios.delete(endpoint + todo.id)
                    dispatch({ type: 'delete', payload: todo})
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
