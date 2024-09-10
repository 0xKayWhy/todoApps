import { useState } from "react"
import {useAuthContext} from "../hooks/useAuthContext"


export const useSignup = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (username,password) => {
        setIsLoading(true)  
        const response = await fetch("/api/v1/user/signup", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body: JSON.stringify({username, password})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.Message)
        }
        if(response.ok) {
            localStorage.setItem("user", JSON.stringify(json))
            dispatch({type : "LOGIN" , payload : json})
            setIsLoading(false)
        }
    }
    return {error, isLoading, signup}
}