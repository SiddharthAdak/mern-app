import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        
        case 'LOGOUT':
            return {user: null}
        
        default:
            return state
    }


}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});

    useEffect(()=>{
        const checkUser = async() => {
            const response = await fetch('/api/user/check');
            const user = await response.json();
            if(user){
                dispatch({type: 'LOGIN', payload: user});
            }
        }
        checkUser();
    },[])
    console.log("AuthContext state: ", state)
    return(
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}