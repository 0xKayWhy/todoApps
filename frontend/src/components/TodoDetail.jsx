import React, { useEffect, useState} from 'react'
import { useTodoContext } from '../hooks/useTodoContext'
import { useAuthContext } from '../hooks/useAuthContext'
import {createPortal} from "react-dom"
import { ModalContent } from './ModalContent'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export const TodoDetails = ({todos, status}) => {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState(todos.title)
  const [description, setDescription] = useState(todos.description)
  const [isCompleted, setIsCompleted] = useState(todos.isCompleted)
  const [error , setError] = useState(null)
  const [isEscPressed, setIsEscPressed] = useState(false)
  const {dispatch} = useTodoContext()
  const {user} = useAuthContext()

  useEffect(()=> {
    setTitle(todos.title)
    setDescription(todos.description)
  },[todos])


  const handleDelete = async () => {
    if(!user){
      return 
    }

    try{
      const response = await fetch (`/api/todos/${todos._id}`, {
        method : "DELETE",
        headers : {"Authorization" : `Bearer ${user.token}`}
      })
      if(response.status === 204){
        dispatch({type : "DELETE_TODO", payload : todos})
      }
    }catch(e){
      console.log(e)
    }

    
  }
  const handleEdit = async(e) => {
    e.preventDefault();

      if(!user) return;
      
      // Check if title and description are unchanged
      if(title === todos.title && description === todos.description && isCompleted === todos.isCompleted ){
        return 
      }
      console.log("run")

      if(!title || !description){
        setError("All field must be filled")
        setTimeout(()=> {
          setError("")
        },2000)
        setTitle(todos.title)
        setDescription(todos.description)
        return
      }
      if(isEscPressed){
        setIsEscPressed(false)
        return
      }
      
      try{
        const response = await fetch(`/api/todos/${todos._id}`, {
          method : "PUT",
          headers : {
            "Authorization" : `Bearer ${user.token}`,
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({title, description, isCompleted})
        })
        const json = await response.json()
        
        if(response.ok){
          dispatch({type : "EDIT_TODO", payload : json})
          setError("")
        }
      } catch (err) {
        console.log(err)

    }
  }


  const handleEvent = (e) => {
    if(e.key === "Escape"){
      setIsEscPressed(true)
      setTitle(todos.title)
      setDescription(todos.description)
      setError("")
      setTimeout(()=> {
        e.target.blur()
      },1)
    }else if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      setIsEscPressed(false)
      setTimeout(()=> {
        e.target.blur()
      },1)
    }
  }

  const handleBlur = (e) => {
    if(!isEscPressed){
      handleEdit(e)
    }
  }

  const handleEditStatus = (e) => {
    if(status === "Completed"){
      setIsCompleted(false)
    } else {
      setIsCompleted(true)
    }
    handleEdit(e)
  }


  return (
    <form className='todo__details' onKeyDown={(e)=> handleEvent(e)} onBlur={(e)=> handleBlur(e)} onSubmit={(e)=> handleEdit(e)}>
      <div className='todo__title'>
        <input maxLength={15} value={title} onChange={(e)=> setTitle(e.target.value)} required/>
      </div>
      <div className='todo__description'>
        <textarea 
        maxLength={70}
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        required
        />
        {error && <div className='error'>{error}</div>}
        <button onClick={(e)=> handleEditStatus(e)}>{status === "Completed" ? "Pending" : "Completed"}</button>
        <p>{todos.updatedAt > todos.createdAt ? "Updated" : "Created"} : {formatDistanceToNow(new Date(todos.updatedAt), { addSuffix: true })}</p>
        <i  onClick={()=> setShowModal(true)} className='bx bx-x bx-sm delete'></i>
      {showModal && createPortal(
        <ModalContent onClose={()=> setShowModal(false)} onDelete={handleDelete}/>,
        document.body
      )}
      </div>
    </form>
  )
}
