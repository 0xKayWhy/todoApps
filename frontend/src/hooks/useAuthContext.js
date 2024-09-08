import { useContext } from "react";
import { AuthContext } from "../context/AuthContexts"

//create auth hook
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    //check if being used correctly
    if(!context) {
        throw new Error ("Must be used within AuthContextProvider")
    }

    return context
}

