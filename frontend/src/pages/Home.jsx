import { useEffect, useState } from "react"
import { useTodoContext } from "../hooks/useTodoContext"
import { TodoDetails } from "../components/TodoDetail"
import { TodoForm } from "../components/TodoForm"
import { useAuthContext } from "../hooks/useAuthContext"

export const Home = () => {

    const {todo,dispatch} = useTodoContext()
    const [error, setError] = useState("")
    const {user} = useAuthContext()
    const status = ["Pending", "Completed"]

    useEffect(()=> {
        const fetchTodo = async () => {
            const response = await fetch("/api/todos",{
                headers : {"Authorization" : `Bearer ${user.token}`}
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type:"SET_TODOS", payload : json})
            }
            if(!response.ok){
                setError(response.Message)
            }
        }
        fetchTodo()
    },[dispatch,user.token])

    const completedTodo = todo.filter((td)=> td.isCompleted === true)
    const pendingTodo = todo.filter((td)=> td.isCompleted === false)

    return (
        <div className="home container">
                <div >Pending</div>
            <div className="todos">
                {todo && pendingTodo.map((td )=> (
                    <TodoDetails key={td._id} todos={td} status={"Pending"}/>
                ))}
                
            <TodoForm/>
            </div>
                <div>Completed</div>
                <div className="todos">
                {todo && completedTodo.map((td )=> (
                    <TodoDetails key={td._id} todos={td} status={"Completed"}/>
                ))}
                
            </div>
            
            {error && <div className="error">{error}</div>}
        </div>
    )
}