import { useState } from "react"
import {useAuthContext} from "../hooks/useAuthContext"


export const useSignup = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState("")
    const {dispatch} = useAuthContext()

    const signup = async (userName, firstName, lastName, email, password) => {
        setIsLoading(true)

        const response = await fetch("/api/user/signup", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body: JSON.stringify({userName, firstName, lastName, email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            localStorage.setItem("user", JSON.stringify(json.token))
            dispatch({action : "LOGIN" , payload : json})
            setIsLoading(false)
        }
    }
    return {error, isLoading, signup}
}