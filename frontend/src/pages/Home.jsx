import { useEffect, useState } from "react"

export const Home = () => {

    const [ todos , setTodos] = useState([])
    const [error, setError] = useState("")

    useEffect(()=> {
        const fetchTodo = async () => {
            const response = await fetch("/api/todos")
            const json = await response.json()
            if(response.ok){
                setTodos(json)
            }
            if(!response.ok){
                setError(response.error)
            }
        }
        fetchTodo()
    },[])




    return (
        <div>
            Home
            <div>
                {todos && todos.map((todo )=> (
                    todo.title
                ))}
                {error && error}
            </div>
        </div>
    )
}