import {createContext, useState} from 'react'

export const FirebaseContaxt = createContext(null)


export const AuthContaxt = createContext(null)


export default function Contaxt ({children}){
    const [user,setUser] = useState(null)
    return(
        <AuthContaxt.Provider value={{user,setUser}}>
            {children}
        </AuthContaxt.Provider>
    )
}
