import { useAuthContext } from "./useAuthContext"
import { useTodoContext } from "./useTodoContext"

export const useLogout = () => {

    const {dispatch : userDispatch} = useAuthContext()
    const {dispatch , todo} = useTodoContext()

    const logout = () => {
        dispatch({type : "SET_TODOS", payload : []})
        userDispatch({type : "LOGOUT"})
        localStorage.removeItem("user" )
    }

    return {logout}
}