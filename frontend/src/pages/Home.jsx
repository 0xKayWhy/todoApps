import { useEffect, useState } from "react"
import { useTodoContext } from "../hooks/useTodoContext"
import { TodoDetails } from "../components/TodoDetail"
import { TodoForm } from "../components/TodoForm"
import { useAuthContext } from "../hooks/useAuthContext"

export const Home = () => {

    const {todo,dispatch} = useTodoContext()
    const [error, setError] = useState("")
    const {user} = useAuthContext()

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
    },[])


    return (
        <div className="home container">
                <div >Pending</div>
            <div className="todos">
                {todo && todo.map((td )=> (
                    <TodoDetails key={td._id} todo={td}/>
                ))}
            <TodoForm/>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}