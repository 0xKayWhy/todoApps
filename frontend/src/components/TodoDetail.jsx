import React, { useState } from 'react'
import { useTodoContext } from '../hooks/useTodoContext'
import { useAuthContext } from '../hooks/useAuthContext'
import {createPortal} from "react-dom"
import { ModalContent } from './ModalContent'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export const TodoDetails = ({todo}) => {
  const [showModal, setShowModal] = useState(false)
  const {dispatch} = useTodoContext()
  const {user} = useAuthContext()

  const handleDelete = async () => {
    if(!user){
      return 
    }

    try{
      const response = await fetch (`/api/todos/${todo._id}`, {
        method : "DELETE",
        headers : {"Authorization" : `Bearer ${user.token}`}
      })
      if(response.status === 204){
        dispatch({type : "DELETE_TODO", payload : todo})
      }
    }catch(e){
      console.log(e)
    }

  }

  return (
    <form className='todo__details'>
      <div className='todo__title'>
        <input value={todo.title}/>
      </div>
      <div className='todo__description'>
        <textarea>
            {todo.description}
        </textarea>
        
        <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
        <i  onClick={()=> setShowModal(true)} className='bx bx-x bx-sm delete'></i>
      {showModal && createPortal(
        <ModalContent onClose={()=> setShowModal(false)} onDelete={handleDelete}/>,
        document.body
      )}
      </div>
    </form>
  )
}
