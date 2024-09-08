import React, { createContext, useReducer } from 'react'

export const TodoContext = createContext()

const todoReducer = (state, action) => {
    switch (action.type){
        case "SET_TODOS" :
            return {todo : action.payload}
        case "CREATE_TODO":
            return {todo : [action.payload,...state.todo]}
        case "EDIT_TODO" :
            return {todo : state.todo.map((td) => td._id === action.payload._id ? action.payload : td)}
        case "DELETE_TODO":
            return {todo : state.todo.filter((t) => t._id !== action.payload._id)}
        default :
            return state
    }
}

export const TodoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, {
        todo : []
    })


    return (
        <TodoContext.Provider value={{...state, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}
