import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        const response = await fetch("/api/v1/user/login", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({username, password})
        })
        const json = await response.json()
        if(!response.ok) {
            setError(json.Message)
            setIsLoading(false)
        }
        if(response.ok){
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type:"LOGIN", payload : json})
            setIsLoading(false)
        }
    }

    return {error, isLoading, login}
}