import React, { useState } from 'react'
import { useContext } from 'react'
import { TodosContext } from './App'


export const ToDoList = () => {
  const { state, dispatch } = useContext(TodosContext)
  const [todoText, setTodoText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'add', payload: { text: todoText}})
    setTodoText('')
  }

  return (
    <div className="flex w-[50vw] h-[100vh] bg-white m-auto">
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
            <button className="bg-black text-white rounded-r w-1/4 p-2" onClick={(e) => {
                e.preventDefault()
                dispatch({ type: 'add', payload: { text: todoText } })
                setTodoText('')
                }}>
                Submit
                
                
            </button>
        </form>
      </div>

      <div className="border-2 border-black mt-5 rounded">
        <div className=" bg-white">
          <div className="flex justify-between bg-black p-4">
            <div className="w-1/2 text-white font-bold">To Do</div>
            <div className="w-1/4 text-white font-bold">Edit</div>
            <div className="w-1/4 text-white font-bold">Delete</div>
          </div>
          {state.todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between p-4 border border-b border-black items-center "
            >
              <div className="w-1/2 text-wrap text-ellipsis overflow-hidden ">{todo.text}</div>
              <div className="w-1/4">
                <button className="bg-black text-white px-3 py-2 rounded">
                  Edit
                </button>
              </div>
              <div className="w-1/4">
                <button
                  className="bg-black text-white px-3 py-2 rounded"
                  onClick={() => dispatch({ type: 'delete', payload: todo })}
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
